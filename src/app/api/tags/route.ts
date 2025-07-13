import { NextResponse } from "next/server";
import { tagOperations } from "@/lib/storage";

export async function GET() {
  try {
    const tags = await tagOperations.getAllTags();
    return NextResponse.json(tags);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}
