import { db } from "./database";
import { entries } from "../db/schema";
import { Entry, Mood } from "../types/journal";
import { eq, desc } from "drizzle-orm";

export const entryOperations = {
  async createEntry(data: Omit<Entry, "id">): Promise<Entry> {
    const [entry] = await db
      .insert(entries)
      .values({
        title: data.title,
        content: data.content,
        mood: data.mood,
        favorited: data.favorited || false,
        tags: data.tags,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      })
      .returning();

    return {
      id: entry.id,
      title: entry.title,
      content: entry.content,
      mood: entry.mood as Mood,
      createdAt: entry.createdAt.toISOString(),
      favorited: entry.favorited,
      tags: entry.tags as string[],
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
      tags: entry.tags as string[],
    }));
  },

  async getEntryById(id: number): Promise<Entry | null> {
    const [entry] = await db.select().from(entries).where(eq(entries.id, id));

    if (!entry) return null;

    return {
      id: entry.id,
      title: entry.title,
      content: entry.content,
      mood: entry.mood as Mood,
      createdAt: entry.createdAt.toISOString(),
      favorited: entry.favorited,
      tags: entry.tags as string[],
    };
  },

  async updateEntry(
    id: number,
    data: Partial<Omit<Entry, "id">>,
  ): Promise<Entry | null> {
    const updateData: Partial<{
      title: string;
      content: string;
      mood: string;
      favorited: boolean;
      tags: string[] | null;
      createdAt: Date;
    }> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.mood !== undefined) updateData.mood = data.mood;
    if (data.favorited !== undefined) updateData.favorited = data.favorited;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.createdAt !== undefined)
      updateData.createdAt = new Date(data.createdAt);

    const [updatedEntry] = await db
      .update(entries)
      .set(updateData)
      .where(eq(entries.id, id))
      .returning();

    if (!updatedEntry) return null;

    return {
      id: updatedEntry.id,
      title: updatedEntry.title,
      content: updatedEntry.content,
      mood: updatedEntry.mood as Mood,
      createdAt: updatedEntry.createdAt.toISOString(),
      favorited: updatedEntry.favorited,
      tags: updatedEntry.tags as string[],
    };
  },

  async deleteEntry(id: number): Promise<boolean> {
    const result = await db
      .delete(entries)
      .where(eq(entries.id, id))
      .returning({ id: entries.id });

    return result.length > 0;
  },
};

export const tagOperations = {
  async getAllTags(): Promise<string[]> {
    const allEntries = await db.select({ tags: entries.tags }).from(entries);

    const allTags = allEntries.flatMap((entry) => {
      if (Array.isArray(entry.tags)) {
        return entry.tags;
      }
      return [];
    });
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags;
  },
};
