import type { Project } from "./project";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { getIdFromParams } from "@/lib/utils";
import { isUserOwnerServer } from "@/lib/utilsServer";
// This is likely a module that is only used on the server-side.
// import "server-only";

// Define an asynchronous function called `getUser` that takes an object with a `username` property as its argument.
export async function getProject({ projectId }: { projectId: string }) {
  if (!projectId) {
    throw new Error("username is required");
  }

  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  // Query the Supabase client for a single row from the "profile" table where the "username" column equals the `username` argument.
  const { data, error } = await supabase
    .from("project")
    .select(
      "*, profileToProject(profile(name, username, id)), update(id, title, description, createdAt, projectId)"
    )
    .filter("id", "eq", getIdFromParams(projectId))
    .filter("profileToProject.projectId", "eq", getIdFromParams(projectId))
    .single();

  // Log any errors to the console.
  console.log(error);
  if (error) {
    throw new Error(error.message);
  }

  const project = data as Project;
  const ownersId = project.profileToProject.map((p) => p.profile.id);
  const isOwner = await isUserOwnerServer(...ownersId);
  // If there's an error, throw an error with the error message.

  // Return the data from the query as a `User` object.
  return { project, isOwner };
}
