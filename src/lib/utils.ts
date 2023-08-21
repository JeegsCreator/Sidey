import {
  Session,
  SupabaseClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { type ClassValue, clsx } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GetUserAndProfileInput {
  cookieStore: ReadonlyRequestCookies;
}
interface GetUserAndProfileOutput {
  user:
    | {
        session: Session;
      }
    | {
        session: null;
      };
  profile: any;
  error: any | null;
  supabase: SupabaseClient<any, "public", any>;
}

export async function getUserAndProfile({
  cookieStore,
}: GetUserAndProfileInput): Promise<GetUserAndProfileOutput> {
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  const { data: user, error } = await supabase.auth.getSession();
  const { data: profile } = await supabase
    .from("profile")
    .select()
    .eq("id", user.session?.user?.id)
    .single();
  return { user, profile, error, supabase };
}

export function getIdFromParams(slug: string) {
  return slug.split("-")[1];
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
