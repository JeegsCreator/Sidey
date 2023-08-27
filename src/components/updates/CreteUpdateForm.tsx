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
import { Button } from "../ui/button";

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
  projectData: Project;
  isOwner: boolean;
}

const CreateUpdateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [description, setDescription] = useState("");
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                      className="h-52 pt-4 pb-8 px-4 text-base resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Add Update</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateUpdateForm;
