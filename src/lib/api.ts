import { Entry } from "../types/journal";

const API_BASE = "/api";

export const entriesApi = {
  async getEntries(): Promise<Entry[]> {
    const response = await fetch(`${API_BASE}/entries`);
    if (!response.ok) {
      throw new Error("Failed to fetch entries.");
    }
    return response.json();
  },

  async createEntry(entry: Omit<Entry, "id">): Promise<Entry> {
    const response = await fetch(`${API_BASE}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error("Failed to create entry.");
    }

    return response.json();
  },

  async updateEntry(
    id: number,
    entry: Partial<Omit<Entry, "id">>,
  ): Promise<Entry> {
    const response = await fetch(`${API_BASE}/entries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error("Failed to update entry.");
    }

    return response.json();
  },
};

export const tagsApi = {
  async getTags(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/tags`);
    if (!response.ok) {
      throw new Error("Failed to fetch tags.");
    }
    return response.json();
  },
};
