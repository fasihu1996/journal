"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Entry } from "@/lib/types/journal";
import { entriesApi } from "@/lib/api";

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await entriesApi.createEntry({
                title: title.trim(),
                content: content.trim(),
                mood: mood || undefined,
                favorited: false,
                tags: [],
            });

            setTitle("");
            setContent("");
            setMood("okay");
            onEntryAdded();
            window.dispatchEvent(new CustomEvent("entriesUpdated"));
            onClose();
        } catch (error) {
            console.error("Error creating entry:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const moodOptions = [
        { value: "great", label: "😄 Great", color: "text-green-600" },
        { value: "good", label: "😊 Good", color: "text-green-500" },
        { value: "okay", label: "😐 Okay", color: "text-yellow-500" },
        { value: "bad", label: "😞 Bad", color: "text-orange-500" },
        { value: "terrible", label: "😢 Terrible", color: "text-red-500" },
    ] as const;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-card p-6 rounded-lg border shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-card-foreground mb-4">
                    New Journal Entry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-card-foreground mb-2"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="What's on your mind?"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="mood"
                            className="block text-sm font-medium text-card-foreground mb-2"
                        >
                            Mood
                        </label>
                        <select
                            id="mood"
                            value={mood}
                            onChange={(e) =>
                                setMood(e.target.value as Entry["mood"])
                            }
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            {moodOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-card-foreground mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            placeholder="Write about your day, thoughts, or feelings..."
                            required
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
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Entry"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
