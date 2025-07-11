export type Mood = "great" | "good" | "okay" | "bad" | "terrible";

export interface Entry {
  id: number;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
  favorited: boolean;
  tags?: string[];
}

export const moodEmojis: Record<Mood, string> = {
  great: "😄",
  good: "🙂",
  okay: "😑",
  bad: "🙃",
  terrible: "😟",
} as const;

export const maxPreviewLength = 250;
