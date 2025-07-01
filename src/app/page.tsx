"use client";

import { useState, useEffect } from "react";
import { Entry } from "@/lib/types/journal";
import { entriesApi } from "@/lib/api";
import EntryCard from "../components/EntryCard";

export default function Home() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadEntries = async () => {
        try {
            setError(null);
            const fetchedEntries = await entriesApi.getEntries();
            setEntries(fetchedEntries);
        } catch (err) {
            console.error("Error loading entries:", err);
            setError("Failed to load entries");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();

        const handleEntriesUpdated = () => {
            loadEntries();
        };

        window.addEventListener("entriesUpdated", handleEntriesUpdated);
        return () =>
            window.removeEventListener("entriesUpdated", handleEntriesUpdated);
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    Loading your entries...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    Error
                </h1>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={loadEntries}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded"
                >
                    Try Again
                </button>
            </div>
        );
    }

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
