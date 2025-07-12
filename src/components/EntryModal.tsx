import { Entry } from "@/types/journal";
import EntryContent from "./EntryContent";
import { useEffect, useState } from "react";

interface EntryModalProps {
  entry: Entry;
  onClose: () => void;
  onToggleFavorite: (entryId: number, favorited: boolean) => void;
}

export default function EntryModal({
  entry,
  onClose,
  onToggleFavorite,
}: EntryModalProps) {
  const [currentEntry, setCurrentEntry] = useState(entry);

  useEffect(() => {
    setCurrentEntry(entry);
  }, [entry]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFavoriteToggle = (favorited: boolean) => {
    setCurrentEntry((prev) => ({ ...prev, favorited }));
    onToggleFavorite(currentEntry.id, favorited);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto">
        <EntryContent
          entry={currentEntry}
          onToggleFavorite={handleFavoriteToggle}
          isModal={true}
          className="shadow-2xl"
        />
      </div>
    </div>
  );
}
