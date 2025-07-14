"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TagPickerProps {
  options: string[];
  picked: string[];
  onChange?: (selectedTags: string[]) => void;
}

export function TagPicker({ options, picked, onChange }: TagPickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleTagSelect = (currentValue: string) => {
    let newSelectedTags: string[];

    if (picked.includes(currentValue)) {
      // Remove tag if already selected
      newSelectedTags = picked.filter((tag) => tag !== currentValue);
    } else {
      // Add tag if not selected
      newSelectedTags = [...picked, currentValue];
    }

    onChange?.(newSelectedTags);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {picked.length > 0 ? `${picked.length} selected` : "Select tags..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>Tag not found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option}
                  onSelect={() => handleTagSelect(option)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      picked.includes(option) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
