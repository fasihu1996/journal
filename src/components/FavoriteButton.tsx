import { Star } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface FavoriteButtonProps {
  favorited: boolean;
  onToggle: (favorited: boolean) => void;
}
export function FavoriteButton({ favorited, onToggle }: FavoriteButtonProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle(!favorited);
  };

  return (
    <div onClick={handleClick}>
      <Toggle
        pressed={favorited}
        variant="outline"
        aria-label="Toggle favorite"
        className="cursor-pointer"
      >
        <Star
          className={`h-4 w-4 transition-all duration-300 ease-in-out ${
            favorited
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground fill-transparent"
          }`}
        />
      </Toggle>
    </div>
  );
}
