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

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnimate(true);
    onToggle(!favorited);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Toggle
        pressed={favorited}
        onPressedChange={() => {}}
        variant="outline"
        aria-label="Toggle favorite"
      >
        <Star
          className={`h-4 w-4 ${
            favorited
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          } ${animate ? "scale-125" : "scale-100"}`}
        />
      </Toggle>
    </div>
  );
}
