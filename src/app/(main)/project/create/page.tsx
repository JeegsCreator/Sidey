"use client";

import { ButtonWithLoading } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useRouter } from "next/navigation";
import { project } from "@prisma/client";
import { getProjectUrl } from "@/lib/utils";
import { MARKDOWN_PLACEHOLDER } from "@/lib/constants";

const formSchema = z.object({
  projectName: z
    .string()
    .min(2, { message: "Project name must contain at least 2 characters" })
    .max(255, { message: "Project name must contain at most 255 characters" }),
  tagline: z
    .string()
    .min(2, { message: "Tagline must contain at least 2 characters" })
    .max(255, { message: "Tagline must contain at most 255 characters" }),
  description: z.string(),
  figmaLink: z.optional(z.string().url().or(z.string().max(0))),
  githubLink: z.optional(z.string().url().or(z.string().max(0))),
  projectLink: z.optional(z.string().url().or(z.string().max(0))),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createProject = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    fetch("/api/project/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        console.log(res);
        if (res.status === 200) {
          const data: project = await res.json();
          console.log(data);
          router.push(getProjectUrl(data));
        }
      })
      .finally(() => setLoading(false));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [description, setDescription] = useState("");
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createProject(values);
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
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic information</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sidey" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="The home of your Side Projects"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="figmaLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Figma Link (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.figma.com/example"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This link must be read-only
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
                            placeholder="https://www.github.com/user/repository"
                            {...field}
                          />
                        </FormControl>
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
                            placeholder="https://www.projectdomain.app/"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
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
                          placeholder={MARKDOWN_PLACEHOLDER}
                          value={description}
                          onChange={(e) => {
                            field.onChange(e);
                            setDescription(e.target.value);
                          }}
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
                          : MARKDOWN_PLACEHOLDER}
                      </ReactMarkdown>
                    </CardContent>
                  </ScrollArea>
                </Card>
              </CardContent>
            </Card>
            <div className="pb-12 flex justify-end">
              <ButtonWithLoading type="submit" loading={loading}>
                Create Project
              </ButtonWithLoading>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Page;
