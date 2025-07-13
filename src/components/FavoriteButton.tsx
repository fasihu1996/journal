import { Star } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

interface FavoriteButtonProps {
  favorited: boolean;
  onToggle: (favorited: boolean) => void;
}
export function FavoriteButton({ favorited, onToggle }: FavoriteButtonProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 100);
    onToggle(!favorited);
  };

  return (
    <div onClick={handleClick}>
      <Toggle
        pressed={favorited}
        onPressedChange={() => {}}
        variant="outline"
        aria-label="Toggle favorite"
        className="cursor-pointer"
      >
        <Star
          className={`h-4 w-4 transition-all duration-300 ease-in-out ${
            favorited
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground fill-transparent"
          } ${animating ? "brightness-110" : ""}`}
        />
      </Toggle>
    </div>
  );
}
