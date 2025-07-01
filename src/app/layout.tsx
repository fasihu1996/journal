"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "../components/Navbar";
import EntryFormModal from "@/components/EntryFormModal";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNewEntryClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleEntryAdded = () => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("entriesUpdated"));
        }
    };

    return (
        <html lang="de">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <Navbar onNewEntryClick={handleNewEntryClick} />
                    <main className="container mx-auto px-4 py-8">
                        {children}
                    </main>
                    <EntryFormModal
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        onEntryAdded={handleEntryAdded}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
