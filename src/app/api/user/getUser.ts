import type { Profile } from "./user";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// This is likely a module that is only used on the server-side.
// import "server-only";

// Define an asynchronous function called `getUser` that takes an object with a `username` property as its argument.
export async function getProfile({ username }: { username: string }) {
  if (!username) {
    throw new Error("username is required");
  }

  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  // Query the Supabase client for a single row from the "profile" table where the "username" column equals the `username` argument.
  const { data, error } = await supabase
    .from("profile")
    .select("*, profileToProject(*,project(*))")
    .eq("username", username)
    .single();

  // Log any errors to the console.
  console.log(error);

  // If there's an error, throw an error with the error message.
  if (error) {
    throw new Error(error.message);
  }

  // Return the data from the query as a `User` object.
  return data as Profile;
}
