import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import type { GetUserAndProfileOutput } from "./utilsDef";
import { profile } from "@prisma/client";

interface GetUserAndProfileInput {
  cookieStore: ReadonlyRequestCookies;
}

export async function getSessionInServer({
  cookieStore,
}: GetUserAndProfileInput): Promise<GetUserAndProfileOutput> {
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  const { data: user, error } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("profile")
    .select()
    .eq("id", user.session?.user?.id)
    .single();

  const profile = data as profile;
  return { user, profile, error, supabase };
}

export async function isUserOwnerServer(...pageIds: string[]) {
  const cookieStore = cookies();
  const session = await getSessionInServer({ cookieStore });
  return pageIds.includes(session.profile.id);
}
