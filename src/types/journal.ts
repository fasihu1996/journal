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
