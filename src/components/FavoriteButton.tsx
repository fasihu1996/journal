import { Star } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

interface FavoriteButtonProps {
  favorited: boolean;
  onToggle: (favorited: boolean) => void;
}

export function FavoriteButton({ favorited, onToggle }: FavoriteButtonProps) {
  return (
    <Toggle
      pressed={favorited}
      onPressedChange={onToggle}
      variant="outline"
      aria-label="Toggle favorite"
    >
      <Star
        className={`h-4 w-4 ${
          favorited
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    </Toggle>
  );
}
