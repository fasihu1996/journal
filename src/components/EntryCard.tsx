"use client";

import { Entry } from "@/types/journal";
import { FavoriteButton } from "./FavoriteButton";

interface EntryCardProps {
  entry: Entry;
  onToggleFavorite: (entryId: number, favorited: boolean) => void;
  onClickEntry: (entryId: number) => void;
  className?: string;
}

const moodEmojis = {
  great: "😁",
  good: "😊",
  okay: "😐",
  bad: "😞",
  terrible: "😢",
};

export default function EntryCard({
  entry,
  onToggleFavorite,
  onClickEntry,
  className,
}: EntryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-DE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const trimContent = (content: string, maxLength: number = 250) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const handleFavoriteToggle = (favorited: boolean) => {
    onToggleFavorite(entry.id, favorited);
  };

  return (
    <div
      className={`bg-card rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
      onClick={() => onClickEntry(entry.id)}
    >
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between gap-4">
          <h3 className="text-card-foreground text-xl font-semibold">
            {entry.title}
          </h3>
          <FavoriteButton
            favorited={entry.favorited}
            onToggle={handleFavoriteToggle}
          />
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-lg">{moodEmojis[entry.mood]}</span>
          <span className="text-sm font-medium capitalize">{entry.mood}</span>
        </div>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-3">
        {trimContent(entry.content)}
      </p>

      <div className="text-muted-foreground text-sm">
        {formatDate(entry.createdAt)}
      </div>
    </div>
  );
}
