export type Mood = "great" | "good" | "okay" | "bad" | "terrible";

export interface Entry {
    id: string;
    user: string;
    mood?: Mood;
    title: string;
    content: string;
    created_at: Date;
    favorited: boolean;
    tags?: string[];
}
