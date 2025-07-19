export type Mood = "great" | "good" | "okay" | "bad" | "terrible";

export interface Entry {
  id: number;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
  favorited: boolean;
  tags: string[];
}

export const moodOptions: Record<Mood, { emoji: string; styling: string }> = {
  great: { emoji: "😄", styling: "bg-mood-great" },
  good: { emoji: "🙂", styling: "bg-mood-good" },
  okay: { emoji: "😑", styling: "bg-mood-okay" },
  bad: { emoji: "🙃", styling: "bg-mood-bad" },
  terrible: { emoji: "😟", styling: "bg-mood-terrible" },
} as const;

export const maxPreviewLength = 250;
