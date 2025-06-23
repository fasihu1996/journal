export type Mood = "great" | "good" | "okay" | "bad" | "terrible";

export interface Entry {
    id: string;
    mood: Mood;
    title: string;
    content: string;
    createAt: Date;
    isFavorited: boolean;
    tags?: string[];
}
