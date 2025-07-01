import { NextRequest, NextResponse } from "next/server";
import { entryOperations } from "@/lib/storage";

export async function GET() {
    try {
        const entries = await entryOperations.getAllEntries();
        return NextResponse.json(entries);
    } catch (error) {
        console.error("Error fetching entries:", error);
        return NextResponse.json(
            { error: "Failed to fetch entries" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const entry = await entryOperations.createEntry(body);

        return NextResponse.json(entry, { status: 201 });
    } catch (error) {
        console.error("Error creating entry:", error);
        return NextResponse.json(
            { error: "Failed to create entry" },
            { status: 500 }
        );
    }
}
