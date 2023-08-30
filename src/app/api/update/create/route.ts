import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  if (!data.projectId) {
    return NextResponse.error();
  }

  const { data: update, error } = await supabase
    .from("update")
    .insert(data)
    .select()
    .single();

  if (error || !update) {
    return NextResponse.error();
  }

  return NextResponse.json(update);
}
