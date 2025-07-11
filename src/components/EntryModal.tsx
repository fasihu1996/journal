import { Entry } from "@/types/journal";
import EntryCard from "./EntryCard";

interface EntryModalProps {
  entry: Entry;
  onClose: () => void;
}

export default function EntryModal({ entry, onClose }: EntryModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleBackdropClick}
    >
      <div className="flex h-1/2 w-1/2 justify-center">
        <EntryCard
          entry={entry}
          onToggleFavorite={() => {}}
          onClickEntry={() => {}}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
