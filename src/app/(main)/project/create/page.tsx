"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import * as z from "zod";

const formSchema = z.object({
  projectName: z.string().min(2).max(255),
  description: z.string(),
  figmaLink: z.optional(z.string().url()),
  githubLink: z.optional(z.string().url()),
  projectLink: z.optional(z.string().url()),
});

const markdownPlaceholder = `# What is markdown?

Markdown is a simple markup language used to easily add formatting, links and images to plain text.
--- 
to learn how to use markdown you can read this [cheat sheet](https://www.markdownguide.org/cheat-sheet/)

![markdown logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png)
`;

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-expect-error formSchema
    resolver: zodResolver(formSchema),
  });
  const [description, setDescription] = useState("");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="px-20">
      <header className="my-6">
        <h1 className="text-3xl font-semibold">
          Let&apos;s create your Project!
        </h1>
      </header>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sidey | The home of your Side Projects"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The name of your side project + the tagline if you want
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="figmaLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Figma Link (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.figma.com/asdasdasfasfas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Go to your figma file and ... copy the link
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Link (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.github.com/asdasdasfasfas"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The link of your GitHub repository
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Link (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.projectdomaion.app/"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        If your project is already deployed paste here the link
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>
                  This is like the README.MD in your GitHub repository. Use
                  <strong> Markdown</strong> to give styles to this text.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={markdownPlaceholder}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="h-full pt-4 pb-8 px-4 text-base resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Card className="h-full">
                  <ScrollArea className="h-80 relative">
                    <span className="absolute text-slate-400 text-sm right-8 top-4">
                      Mardown preview
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
              </CardContent>
            </Card>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Page;
