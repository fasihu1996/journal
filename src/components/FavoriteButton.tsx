import { Star } from "lucide-react";
import { useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

interface FavoriteButtonProps {
  favorited: boolean;
  onToggle: (favorited: boolean) => void;
}

export function FavoriteButton({ favorited, onToggle }: FavoriteButtonProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setAnimate(false), 30);
      return () => clearTimeout(timeout);
    }
  }, [animate]);

  const handleToggle = (value: boolean) => {
    setAnimate(true);
    onToggle(value);
  };

  return (
    <Toggle
      pressed={favorited}
      onPressedChange={handleToggle}
      variant="outline"
      aria-label="Toggle favorite"
    >
      <Star
        className={`h-4 w-4 ${
          favorited
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        } ${animate ? "scale-130" : "scale-100"}`}
      />
    </Toggle>
  );
}
