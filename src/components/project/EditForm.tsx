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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MARKDOWN_PLACEHOLDER } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormSchema, projectFormSchema } from "./types";
import { useRouter } from "next/navigation";
import { getProjectUrl } from "@/lib/utils";
import { project } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@/app/api/project/project";

interface EditFormProjectProps {
  project: Project;
  closeSheet?: () => void;
}

const EditFormProject = ({ project, closeSheet }: EditFormProjectProps) => {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createProject = async (data: ProjectFormSchema) => {
    setLoading(true);

    fetch("/api/project/edit", {
      method: "POST",
      body: JSON.stringify({ id: project.id, ...data }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data: project = await res.json();
          router.push(getProjectUrl(data));
        }
      })
      .finally(() => {
        setLoading(false);
        closeSheet && closeSheet();
      });
  };

  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: ProjectFormSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createProject(values);
  }
  useEffect(() => {
    // set the initial value of the form
    form.setValue("name", project.name);
    form.setValue("tagline", project.tagline);
    form.setValue("description", project.description);
    form.setValue("figmaLink", project.figmaLink);
    form.setValue("githubLink", project.githubLink);
    form.setValue("projectLink", project.projectLink);
    setDescription(project.description);
  }, [project, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
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
                  Markdown preview
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
        <div className="flex justify-end mt-4">
          <ButtonWithLoading type="submit" loading={loading}>
            Save
          </ButtonWithLoading>
        </div>
      </form>
    </Form>
  );
};

export default EditFormProject;
