"use client";

import { useState, useEffect } from "react";
import { Entry } from "@/types/journal";
import { entriesApi } from "@/lib/api";
import EntryCard from "../components/EntryCard";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import EntryModal from "@/components/EntryModal";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

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

  const handleEntryClick = async (entryId: number) => {
    const entry = entries.find((e) => e.id === entryId);
    if (entry) setSelectedEntry(entry);
  };

  const handleToggleFavorite = async (entryId: number, favorited: boolean) => {
    try {
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryId ? { ...entry, favorited } : entry,
        ),
      );
      await entriesApi.updateEntry(entryId, { favorited });

      toast.success(
        favorited ? "Added to favorites" : "Removed from favorites",
      );
    } catch (_error) {
      toast.error("Failed to update favorite status");

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryId ? { ...entry, favorited: !favorited } : entry,
        ),
      );
    }
  };

  const displayedEntries = favoritesOnly
    ? entries.filter((entry) => entry.favorited)
    : entries;

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Your Journal Entries
          </h1>
          <p className="text-muted-foreground">
            {displayedEntries.length}{" "}
            {displayedEntries.length === 1 ? "entry" : "entries"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="favorites-only"
            checked={favoritesOnly}
            onCheckedChange={setFavoritesOnly}
          />
          <Label htmlFor="favorites-only" className="text-md">
            Show favorites only
          </Label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedEntries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onToggleFavorite={handleToggleFavorite}
            onClickEntry={handleEntryClick}
          />
        ))}
      </div>
      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
}
