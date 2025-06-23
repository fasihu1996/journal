"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JournalEntry } from "@/lib/types";
import { saveEntry } from "@/lib/storage";

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
    const [mood, setMood] = useState<JournalEntry["mood"]>("okay");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Form is not valid");
            return;
        }

        const newEntry: JournalEntry = {
            id: Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
            mood,
            createdAt: new Date().toISOString(),
        };

        saveEntry(newEntry);
        setTitle("");
        setContent("");
        setMood("okay");
        onClose();
        onEntryAdded();
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-card-foreground">
                        New Journal Entry
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-card-foreground mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Something to remember this entry by"
                            maxLength={100}
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
                                setMood(e.target.value as JournalEntry["mood"])
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
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-vertical"
                            placeholder="Just let the words flow..."
                            maxLength={2000}
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                            {content.length}/2000 characters
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Save Entry
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
