import { Entry, moodOptions, maxPreviewLength } from "@/types/journal";
import { FavoriteButton } from "./FavoriteButton";
import { Badge } from "@/components/ui/badge";

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
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const trimContent = (content: string) => {
    if (content.length <= maxPreviewLength || isModal) return content;
    return content.substring(0, maxPreviewLength) + "...";
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
          <Badge
            variant="default"
            className={`${moodOptions[entry.mood].styling} text-white`}
          >
            {moodOptions[entry.mood].emoji} {entry.mood}
          </Badge>
        </div>
      </div>

      <div
        className={
          isModal ? "space-y-4" : "flex flex-1 flex-col justify-between"
        }
      >
        <p
          className={"text-muted-foreground text-base leading-relaxed"}
          aria-label="content"
        >
          {trimContent(entry.content)}
        </p>
      </div>
      <div
        className="text-muted-foreground mt-3 flex-shrink-0 text-sm"
        aria-label="datetime"
      >
        {formatDate(entry.createdAt)}
      </div>
      {entry.tags && entry.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {entry.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
