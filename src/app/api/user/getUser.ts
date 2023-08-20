import { notFound } from "next/navigation";
import type { User } from "./user";

// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.
import "server-only";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function getUser({ username }: { username: string }) {
  if (!username) {
    throw new Error("username is required");
  }
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("username", username)
    .single();
  console.log(error);
  if (error) {
    throw new Error(error.message);
  }

  return data as User;
}
