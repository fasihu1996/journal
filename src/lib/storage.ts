import { db } from "./database";
import { entries } from "../db/schema";
import { Entry, Mood } from "../types/journal";
import { desc } from "drizzle-orm";

export const entryOperations = {
    async createEntry(data: Omit<Entry, "id" | "createdAt">): Promise<Entry> {
        const [entry] = await db
            .insert(entries)
            .values({
                title: data.title,
                content: data.content,
                mood: data.mood,
                favorited: data.favorited || false,
                tags: data.tags,
                createdAt: new Date(),
            })
            .returning();

        return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            mood: entry.mood as Mood,
            createdAt: entry.createdAt.toISOString(),
            favorited: entry.favorited,
            tags: entry.tags,
        };
    },

    async getAllEntries(): Promise<Entry[]> {
        const entriesList = await db
            .select()
            .from(entries)
            .orderBy(desc(entries.createdAt));

        return entriesList.map((entry) => ({
            id: entry.id,
            title: entry.title,
            content: entry.content,
            mood: entry.mood as Mood,
            createdAt: entry.createdAt.toISOString(),
            favorited: entry.favorited,
            tags: entry.tags,
        }));
    },

    async getEntryById(id: number): Promise<Entry | null> {
        const [entry] = await db
            .select()
            .from(entries)
            .where(eq(entries.id, id));

        if (!entry) return null;

        return {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            mood: entry.mood as Mood,
            createdAt: entry.createdAt.toISOString(),
            favorited: entry.favorited,
            tags: entry.tags,
        };
    },
};
