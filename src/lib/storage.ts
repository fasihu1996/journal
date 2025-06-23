import { JournalEntry } from "@/lib/types/journal";

const STORAGE_KEY = "journal-entries";

export const getEntries = (): JournalEntry[] => {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return [];
    }
};

export const saveEntry = (entry: JournalEntry): void => {
    if (typeof window === "undefined") return;

    try {
        const entries = getEntries();
        const updatedEntries = [entry, ...entries];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export const deleteEntry = (id: string): void => {
    if (typeof window === "undefined") return;

    try {
        const entries = getEntries();
        const filteredEntries = entries.filter((entry) => entry.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
        console.error("Error deleting from localStorage:", error);
    }
};
