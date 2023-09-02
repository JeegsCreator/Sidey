import { getIdFromParams } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const projectId = searchParams.get("projectId");
  const supabase = createRouteHandlerClient({ cookies });

  console.log("page", page);
  if (!projectId) throw new Error("ProjectId is required");
  if (!page && page !== 0) throw new Error("page is required");

  const amount = 2;
  let nextPage: number | null = page + amount + 1;

  const { data, error: LatestUpdatesError } = await supabase
    .from("update")
    .select("*, project(*)")
    .filter("projectId", "eq", getIdFromParams(projectId))
    .order("createdAt", { ascending: false })
    .range(page, page + amount);

  if (LatestUpdatesError) throw LatestUpdatesError;

  if (data.length <= amount) {
    nextPage = null;
  }

  return NextResponse.json({
    data,
    nextPage,
  });
}
