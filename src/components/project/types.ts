import { z } from "zod";

export const projectFormSchema = z.object({
  name: z
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

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
