export type Mood = "great" | "good" | "okay" | "bad" | "terrible";

export interface Entry {
    id: string;
    mood: Mood;
    title: string;
    content: string;
    createdAt: string;
    favorited: boolean;
    tags?: string[];
}
