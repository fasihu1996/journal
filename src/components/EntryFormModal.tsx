"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import { Entry, moodOptions } from "@/types/journal";
import { entriesApi, tagsApi } from "@/lib/api";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { TagPicker } from "./TagPicker";

interface EntryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEntryAdded: () => void;
}

export default function EntryFormModal({
  isOpen,
  onClose,
  onEntryAdded,
}: EntryFormModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<Entry["mood"]>("okay");
  const [favorited, setFavorited] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [tags, setTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    new Date().toLocaleTimeString("de-DE", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTags = async () => {
    try {
      const fetchedTags = await tagsApi.getTags();
      setAvailableTags(fetchedTags);
    } catch (_error) {
      toast.error("Failed to load tags.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTags();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const createDateTime = () => {
    const date = selectedDate || new Date();
    const [hours, minutes, seconds] = selectedTime.split(":").map(Number);

    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, seconds || 0);

    return dateTime;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const entryDateTime = createDateTime();

      await entriesApi.createEntry({
        title: title.trim(),
        content: content.trim(),
        mood: mood || undefined,
        favorited: favorited,
        tags: tags,
        createdAt: entryDateTime.toISOString(),
      });

      setTitle("");
      setContent("");
      setMood("okay");
      setFavorited(false);
      setTags([]);
      setSelectedDate(new Date());
      setSelectedTime(
        new Date().toLocaleTimeString("de-DE", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );

      onEntryAdded();
      window.dispatchEvent(new CustomEvent("entriesUpdated"));
      toast.success("Created successfully.", {
        description: `New entry "${title}" has been created successfully.`,
      });
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (_error) {
      toast.error("Failed to create new entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-card-foreground text-xl font-bold">
            New Journal Entry
          </h2>
          <FavoriteButton favorited={favorited} onToggle={setFavorited} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="title"
              className="text-card-foreground mb-2 block text-sm font-medium"
            >
              Title
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
              placeholder="What's on your mind?"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="mood"
              className="text-card-foreground mb-2 block text-sm font-medium"
            >
              Mood
            </Label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value as Entry["mood"])}
              className="border-border bg-background text-foreground focus:ring-ring inset-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
            >
              {Object.entries(moodOptions).map(([value, { emoji }]) => (
                <option key={value} value={value}>
                  {emoji} {value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label
              htmlFor="content"
              className="text-card-foreground mb-2 block text-sm font-medium"
            >
              Content
            </Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="border-border bg-background text-foreground focus:ring-ring w-full resize-none rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
              placeholder="Write about your day, thoughts, feelings or anything else..."
              required
            />
          </div>
          <div className="">
            <Label htmlFor="tags" className="mb-2">
              Tags
            </Label>
            <TagPicker
              options={availableTags}
              picked={tags}
              onChange={setTags}
            />
          </div>
          <div>
            <DatePicker
              date={selectedDate}
              time={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
