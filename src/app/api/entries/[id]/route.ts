import { NextRequest, NextResponse } from "next/server";
import { entryOperations } from "@/lib/storage";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid entry ID" }, { status: 400 });
    }

    const updateData = await request.json();

    const updatedEntry = await entryOperations.updateEntry(id, updateData);

    if (!updatedEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEntry);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 },
    );
  }
}
