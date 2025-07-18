export const mockEntries = [
  {
    id: 1,
    title: "Middle Entry",
    content: "Middle Content",
    mood: "okay",
    favorited: false,
    createdAt: "2025-07-16T13:17:17.485Z",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 2,
    title: "Newest Entry",
    content: "Newest Content",
    mood: "great",
    favorited: true,
    createdAt: "2025-07-16T13:35:27.075Z",
    tags: [],
  },
  {
    id: 3,
    title: "Oldest Entry",
    content: "Oldest Content",
    mood: "terrible",
    favorited: true,
    createdAt: "2025-07-14T13:35:27.075Z",
    tags: [],
  },
];

export const favoriteEntries = [
  {
    id: 1,
    title: "Favorited entry",
    content: "",
    createdAt: new Date().toISOString(),
    favorited: true,
    mood: "good",
    tags: [],
  },
  {
    id: 2,
    title: "Boring entry",
    content: "",
    createdAt: new Date().toISOString(),
    favorited: false,
    mood: "bad",
    tags: [],
  },
];

export const entryTemplate = (content: string) => ({
  id: 1,
  title: "Test",
  content: content,
  createdAt: new Date().toISOString(),
  favorited: false,
  mood: "okay",
  tags: [],
});
