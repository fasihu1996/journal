import { Entry, moodEmojis } from "@/types/journal";
import { FavoriteButton } from "./FavoriteButton";

interface EntryContentProps {
  entry: Entry;
  onToggleFavorite: (favorited: boolean) => void;
  isModal?: boolean;
  className?: string;
}

export default function EntryContent({
  entry,
  onToggleFavorite,
  isModal = false,
  className = "",
}: EntryContentProps) {
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
    if (content.length <= maxLength || isModal) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div
      className={`bg-card rounded-lg border p-6 shadow-sm ${
        isModal ? "" : "flex h-full flex-col"
      } ${className}`}
    >
      <div className="mb-3 flex-shrink-0">
        <div className="mb-1 flex items-center justify-between gap-4">
          <h3
            className={`text-card-foreground font-semibold ${
              isModal ? "text-2xl" : "text-xl"
            } line-clamp-2`}
          >
            {entry.title}
          </h3>
          <FavoriteButton
            favorited={entry.favorited}
            onToggle={onToggleFavorite}
          />
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-lg">{moodEmojis[entry.mood]}</span>
          <span className="text-sm font-medium capitalize">{entry.mood}</span>
        </div>
      </div>

      <div
        className={
          isModal ? "space-y-4" : "flex flex-1 flex-col justify-between"
        }
      >
        <p
          className={`text-muted-foreground ${
            isModal ? "text-base leading-relaxed" : "line-clamp-4 flex-1"
          }`}
        >
          {trimContent(entry.content, 250)}
        </p>
        <div className="text-muted-foreground mt-3 flex-shrink-0 text-sm">
          {formatDate(entry.createdAt)}
        </div>
      </div>
    </div>
  );
}
