import { project, profile } from "@prisma/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GetUserAndProfileOutput } from "./utilsDef";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSessionInClient(): Promise<GetUserAndProfileOutput> {
  const supabase = createClientComponentClient();
  const { data: user, error } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("profile")
    .select()
    .eq("id", user.session?.user?.id)
    .single();

  const profile = data as profile;
  return { user, profile, error, supabase };
}

export function getIdFromParams(slug: string) {
  return slug.split("-")[1];
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function getProjectUrl(project: project) {
  const projectName = encodeURI(project.name.split(" ").join("_"));
  return `/project/${projectName}-${project.id}`;
}

export async function isUserOwnerClient(...pageIds: string[]) {
  const session = await getSessionInClient();

  return pageIds.includes(session.profile.id);
}

export function getPathnameRoute(slug: string) {
  const pathname = slug.split("/");
  return pathname[pathname.length - 1];
}
