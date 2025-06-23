"use client";

import { useState, useEffect } from "react";
import { JournalEntry } from "@/lib/types";
import { getEntries } from "@/lib/storage";
import EntryCard from "../components/EntryCard";

export default function Home() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const loadEntries = () => {
        setEntries(getEntries());
    };

    useEffect(() => {
        loadEntries();
    }, []);

    if (entries.length === 0) {
        return (
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    Welcome to Moodjournal
                </h1>
                <p className="text-muted-foreground mb-8">
                    Track your daily thoughts and emotions
                </p>
                <div className="bg-muted/50 p-8 rounded-lg">
                    <p className="text-muted-foreground">
                        No entries yet. Click &quot;New Entry&quot; in the
                        navigation to create your first journal entry!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Your Journal Entries
                </h1>
                <p className="text-muted-foreground">
                    {entries.length}{" "}
                    {entries.length === 1 ? "entry" : "entries"}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                ))}
            </div>
        </div>
    );
}
