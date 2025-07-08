import Link from "next/link";
import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
    onNewEntryClick: () => void;
}

function Navbar({ onNewEntryClick }: NavbarProps) {
    return (
        <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="text-xl font-bold text-primary font-mono tracking-wider p-4"
                    >
                        Moodjournal
                    </Link>
                </div>
                <div className="ml-auto flex items-center space-x-4 justify-end">
                    <Button onClick={onNewEntryClick}>New entry</Button>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
