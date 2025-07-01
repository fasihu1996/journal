"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    date?: Date;
    time?: string;
    onDateChange?: (date: Date | undefined) => void;
    onTimeChange?: (time: string) => void;
}

export function DatePicker({
    date,
    time,
    onDateChange,
    onTimeChange,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        date
    );
    const [selectedTime, setSelectedTime] = React.useState<string>(
        time ||
            new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
    );

    const handleDateSelect = (newDate: Date | undefined) => {
        setSelectedDate(newDate);
        setOpen(false);
        onDateChange?.(newDate);
    };

    const handleTimeChange = (newTime: string) => {
        setSelectedTime(newTime);
        onTimeChange?.(newTime);
    };

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                        >
                            {selectedDate
                                ? selectedDate.toLocaleDateString()
                                : new Date().toLocaleDateString()}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            captionLayout="dropdown"
                            onSelect={handleDateSelect}
                            disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Time
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={selectedTime}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
