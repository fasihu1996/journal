"use client";

import { useState, useEffect } from "react";
import { Entry } from "@/types/journal";
import { entriesApi } from "@/lib/api";
import EntryCard from "../components/EntryCard";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import EntryModal from "@/components/EntryModal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [entriesShown, setEntriesShown] = useState(6);

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

  const totalEntries = displayedEntries.length;

  const visibleEntries = displayedEntries.slice(0, entriesShown);

  const handleVisibleIncrease = (currDisplay: number) => {
    if (currDisplay + 6 <= totalEntries) {
      setEntriesShown(currDisplay + 6);
    } else {
      setEntriesShown(totalEntries);
    }
    toast.success("Additional entries loaded");
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
        <div className="flex items-center justify-between">
          <div>
            <div className="bg-muted mb-2 h-9 w-64 animate-pulse rounded-md" />
            <div className="bg-muted h-5 w-32 animate-pulse rounded-md" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-muted h-5 w-8 animate-pulse rounded-full" />
            <div className="bg-muted h-5 w-24 animate-pulse rounded-md" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card flex h-80 flex-col rounded-lg border p-6 shadow-sm"
            >
              <div className="mb-3 flex-shrink-0">
                <div className="mb-1 flex items-center justify-between gap-4">
                  <div className="bg-muted h-6 w-2/3 animate-pulse rounded-md" />
                  <div className="bg-muted h-6 w-6 animate-pulse rounded-full" />
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <div className="bg-muted h-5 w-5 animate-pulse rounded-full" />
                  <div className="bg-muted h-4 w-16 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-2">
                  <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
                  <div className="bg-muted h-4 w-5/6 animate-pulse rounded-md" />
                  <div className="bg-muted h-4 w-2/3 animate-pulse rounded-md" />
                </div>
                <div className="bg-muted h-4 w-32 animate-pulse rounded-md" />
              </div>
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
            No entries yet. Click &quot;New Entry&quot; to create your first
            journal entry!
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
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              {entriesShown} / {displayedEntries.length}{" "}
              {displayedEntries.length === 1
                ? "entry loaded"
                : "entries loaded"}
            </p>
            <Button
              variant="outline"
              disabled={entriesShown === totalEntries}
              onClick={(entriesShown) => handleVisibleIncrease(entriesShown)}
              className="cursor-pointer"
            >
              Load more
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="favorites-only"
            checked={favoritesOnly}
            onCheckedChange={setFavoritesOnly}
            className="cursor-pointer"
          />
          <Label htmlFor="favorites-only" className="text-md cursor-pointer">
            Show favorites only
          </Label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleEntries.map((entry) => (
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
          onClose={() => setSelectedEntry(undefined)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
