import prisma from "@/lib/prisma";
import { getUserAndProfile } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const cookieStore = cookies();
  const { profile, error } = await getUserAndProfile({ cookieStore });
  if (error) {
    return NextResponse.error();
  }
  const { projectName: name, ...rest } = data;

  const res = await prisma.project.create({
    data: {
      name,
      ...rest,
      state: "BETA",
      owners: {
        // todo: validate Links field
        connect: [{ ...profile, Links: undefined }],
      },
    },
  });

  return NextResponse.json(res);
}
