"use client";

import { useState, useEffect } from "react";
import { Entry } from "@/types/journal";
import { entriesApi } from "@/lib/api";
import EntryCard from "../components/EntryCard";
import { toast } from "sonner";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEntries = async () => {
    try {
      setError(null);
      const fetchedEntries = await entriesApi.getEntries();
      setEntries(fetchedEntries);
    } catch (_error) {
      setError("Failed to load entries");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async (entryId: number, favorited: boolean) => {
    try {
      // update UI before actual database change
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryId ? { ...entry, favorited } : entry,
        ),
      );

      // send change to API
      await entriesApi.updateEntry(entryId, { favorited });

      toast.success(
        favorited ? "Added to favorites" : "Removed from favorites",
      );
    } catch (_error) {
      toast.error("Failed to update favorite status");

      // revert UI if API failed
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryId ? { ...entry, favorited: !favorited } : entry,
        ),
      );
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
      <div className="space-y-8">
        <div>
          <div className="bg-muted mb-2 h-9 w-64 animate-pulse rounded-md" />
          <div className="bg-muted h-5 w-32 animate-pulse rounded-md" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border p-6 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div className="bg-muted h-6 w-3/4 animate-pulse rounded-md" />
                <div className="flex items-center gap-1">
                  <div className="bg-muted h-6 w-6 animate-pulse rounded-full" />
                  <div className="bg-muted h-4 w-16 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="mb-4 space-y-2">
                <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-3/4 animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-1/2 animate-pulse rounded-md" />
              </div>
              <div className="bg-muted h-4 w-32 animate-pulse rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-foreground mb-4 text-3xl font-bold">Error</h1>
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={loadEntries}
          className="bg-primary text-primary-foreground rounded px-4 py-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-foreground mb-4 text-3xl font-bold">
          Welcome to Moodjournal
        </h1>
        <p className="text-muted-foreground mb-8">
          Track your daily thoughts and emotions
        </p>
        <div className="bg-muted/50 rounded-lg p-8">
          <p className="text-muted-foreground">
            No entries yet. Click &quot;New Entry&quot; in the navigation to
            create your first journal entry!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          Your Journal Entries
        </h1>
        <p className="text-muted-foreground">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
