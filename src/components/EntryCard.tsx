"use client";

import { Entry } from "@/lib/types/journal";

interface EntryCardProps {
    entry: Entry;
}

const moodEmojis = {
    great: "😄",
    good: "😊",
    okay: "😐",
    bad: "😞",
    terrible: "😢",
};

export default function EntryCard({ entry }: EntryCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-card-foreground">
                    {entry.title}
                </h3>
                <div className="flex items-center gap-1">
                    <span className="text-lg">{moodEmojis[entry.mood]}</span>
                    <span className="text-sm font-medium capitalize">
                        {entry.mood}
                    </span>
                </div>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-3">
                {entry.content}
            </p>

            <div className="text-sm text-muted-foreground">
                {formatDate(entry.createdAt)}
            </div>
        </div>
    );
}
