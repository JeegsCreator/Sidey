// import prisma from "@/lib/prisma";
import { getUserAndProfile } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const cookieStore = cookies();
  const { profile, error, supabase } = await getUserAndProfile({ cookieStore });
  if (error) {
    return NextResponse.error();
  }
  const { projectName: name, ...rest } = data;

  const { data: project, error: ErrorProject } = await supabase
    .from("project")
    .insert({
      name,
      ...rest,
    })
    .select()
    .single();

  if (ErrorProject || !project) {
    return NextResponse.error();
  }

  const { error: ErrorProfileToProject } = await supabase
    .from("profileToProject")
    .insert({
      projectId: project.id,
      userId: profile.id,
    })
    .select()
    .single();

  if (ErrorProfileToProject) {
    return NextResponse.error();
  }

  return NextResponse.json(project);
}
