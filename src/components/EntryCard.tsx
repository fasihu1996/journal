"use client";

import { Entry } from "@/types/journal";
import EntryContent from "./EntryContent";

interface EntryCardProps {
  entry: Entry;
  onToggleFavorite: (entryId: number, favorited: boolean) => void;
  onClickEntry: (entryId: number) => void;
  className?: string;
}

export default function EntryCard({
  entry,
  onToggleFavorite,
  onClickEntry,
  className,
}: EntryCardProps) {
  const handleFavoriteToggle = (favorited: boolean) => {
    onToggleFavorite(entry.id, favorited);
  };

  return (
    <div
      onClick={() => onClickEntry(entry.id)}
      className={`h-80 cursor-pointer rounded-lg transition-all duration-100 hover:scale-[1.02] hover:shadow-lg ${className}`}
    >
      <EntryContent
        entry={entry}
        onToggleFavorite={handleFavoriteToggle}
        isModal={false}
      />
    </div>
  );
}
