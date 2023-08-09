import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const supabase = createRouteHandlerClient({ cookies });

  if (email === null) throw new Error("Email don't sent");

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${requestUrl.origin}/`,
    },
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
