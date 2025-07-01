import { Entry } from "../types/journal";

const API_BASE = "/api";

export const entriesApi = {
    async getEntries(): Promise<Entry[]> {
        const response = await fetch(`${API_BASE}/entries`);
        if (!response.ok) {
            throw new Error("Failed to fetch entries");
        }
        return response.json();
    },

    async createEntry(entry: Omit<Entry, "id" | "createdAt">): Promise<Entry> {
        const response = await fetch(`${API_BASE}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
        });

        if (!response.ok) {
            throw new Error("Failed to create entry");
        }

        return response.json();
    },
};
