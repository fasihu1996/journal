import { prisma } from "./database";
import { Entry, Mood } from "./types/journal";

export const entryOperations = {
    async createEntry(data: Omit<Entry, "id" | "createdAt">): Promise<Entry> {
        const entry = await prisma.entry.create({
            data: {
                title: data.title,
                content: data.content,
                mood: data.mood,
                favorited: data.favorited || false,
                tags: data.tags ? JSON.stringify(data.tags) : null,
            },
        });

        return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            mood: entry.mood as Mood,
            createdAt: entry.createdAt.toISOString(),
            favorited: entry.favorited,
            tags: entry.tags ? JSON.parse(entry.tags) : undefined,
        };
    },

    async getAllEntries(): Promise<Entry[]> {
        const entries = await prisma.entry.findMany({
            orderBy: { createdAt: "desc" },
        });

        return entries.map((entry) => ({
            id: entry.id,
            title: entry.title,
            content: entry.content,
            mood: entry.mood as Mood,
            createdAt: entry.createdAt.toISOString(),
            favorited: entry.favorited,
            tags: entry.tags ? JSON.parse(entry.tags) : undefined,
        }));
    },
};
