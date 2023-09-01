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
import { MARKDOWN_PLACEHOLDER } from "@/lib/constants";
import MarkdownInput from "../shared/MarkdownInput";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must contain at least 2 characters" })
    .max(80, { message: "Title name must contain at most 80 characters" }),
  description: z.string(),
});

interface CreateUpdateFormProps {
  projectId: string | number;
  closeSheet: () => void;
}

const CreateUpdateForm = ({ projectId, closeSheet }: CreateUpdateFormProps) => {
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
      closeSheet();
    }
    setLoading(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createUpdate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <MarkdownInput
          formControl={form.control}
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          label="Description *"
          variant="tabs"
        />
        <div className="flex justify-end">
          <ButtonWithLoading type="submit" loading={loading}>
            Add Update
          </ButtonWithLoading>
        </div>
      </form>
    </Form>
  );
};

export default CreateUpdateForm;
