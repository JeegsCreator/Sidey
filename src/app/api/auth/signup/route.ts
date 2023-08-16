import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const { name, username, twitter } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  console.log("route signup");

  if (name === null) throw new Error("Name don't sent");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${requestUrl.origin}/login`, {
      status: 301,
    });
  }

  const { data: existUsername } = await supabase
    .from("Profile")
    .select("username")
    .filter("username", "eq", username)
    .single();

  if (existUsername) {
    return NextResponse.json(
      { error: "Username already in use" },
      { status: 401, statusText: "Username already in use" },
    );
  }

  const { error } = await supabase.from("Profile").insert({
    id: user?.id,
    name: name,
    username: username,
    twitterUser: twitter,
  });

  if (error) throw error;

  return NextResponse.redirect(`${requestUrl.origin}`, {
    status: 301,
  });
}
