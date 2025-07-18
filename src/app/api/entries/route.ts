import { NextRequest, NextResponse } from "next/server";
import { entryOperations } from "@/lib/storage";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { title, content, mood, favorited, tags, createdAt } =
      await request.json();
    const entry = await entryOperations.createEntry({
      title,
      content,
      mood,
      favorited: Boolean(favorited),
      tags,
      createdAt,
    });
    return NextResponse.json(entry);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const entries = await entryOperations.getAllEntries();
    return NextResponse.json(entries);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 },
    );
  }
}
