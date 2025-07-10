import { Entry } from "@/types/journal";
import EntryCard from "./EntryCard";

interface EntryModalProps {
  entry: Entry;
  onClose: () => void;
}

export default function EntryModal({ entry }: EntryModalProps) {
  return (
    <div>
      <EntryCard
        entry={entry}
        onToggleFavorite={() => {}}
        onClickEntry={() => {}}
      />
    </div>
  );
}
