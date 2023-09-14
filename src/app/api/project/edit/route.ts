import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  if (!data.id) {
    return NextResponse.error();
  }

  const { data: edit, error } = await supabase
    .from("project")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();

  if (error || !edit) {
    console.log(error);
    return NextResponse.error();
  }

  return NextResponse.json(edit);
}
