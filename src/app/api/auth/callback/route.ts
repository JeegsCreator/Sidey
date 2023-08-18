import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  console.log("USER");

  const { data } = await supabase
    .from("profile")
    .select()
    .filter("id", "eq", user.id)
    .single();
  console.log(data);
  if (!data || !data?.name) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.redirect(new URL("/", req.url));
}
