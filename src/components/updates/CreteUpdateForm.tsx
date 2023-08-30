"use client";

import { Project } from "@/app/api/project/project";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { Button, ButtonWithLoading } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must contain at least 2 characters" })
    .max(80, { message: "Title name must contain at most 80 characters" }),
  description: z.string(),
  projectId: z.optional(z.string()),
});

const markdownPlaceholder = `
  # What is markdown?
  
  Markdown is a simple markup language used to easily add formatting, links and images to plain text.
  
  ---
  
  to learn how to use markdown you can read this [cheat sheet](https://www.markdownguide.org/cheat-sheet/)
  
  ![markdown logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png)
  `;

interface CreateUpdateFormProps {
  projectId: string;
}

const CreateUpdateForm = ({ projectId }: CreateUpdateFormProps) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createUpdate = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const res = await fetch("/api/update/create", {
      method: "POST",
      body: JSON.stringify({ projectId, ...data }),
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    }
    setLoading(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createUpdate(values);
  }
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center py-4">
        <CardTitle className="mt-1">Add Update</CardTitle>
      </CardHeader>
      <CardContent className="pl-7 h-[calc(100%-80px)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="New Feature" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 items-end">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={markdownPlaceholder}
                        value={description}
                        onChange={(e) => {
                          field.onChange(e);
                          setDescription(e.target.value);
                        }}
                        className="h-72 pt-4 pb-8 px-4 text-base resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card className="h-72">
                <ScrollArea className="h-72 relative">
                  <span className="absolute text-slate-400 text-sm right-8 top-4">
                    Markdown preview
                  </span>
                  <CardContent className="pt-4 pb-8">
                    <ReactMarkdown className="markdown">
                      {description.length > 0
                        ? description
                        : markdownPlaceholder}
                    </ReactMarkdown>
                  </CardContent>
                </ScrollArea>
              </Card>
            </div>
            <div className="flex justify-end">
              <ButtonWithLoading type="submit" loading={loading}>
                Add Update
              </ButtonWithLoading>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateUpdateForm;
