"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";

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
  const [inputValue, setInputValue] = React.useState("");

  const handleTagSelect = (currentValue: string) => {
    let newSelectedTags: string[];

    if (picked.includes(currentValue)) {
      newSelectedTags = picked.filter((tag) => tag !== currentValue);
    } else {
      newSelectedTags = [...picked, currentValue];
    }

    onChange?.(newSelectedTags);
    setInputValue("");
  };

  const handleNewTag = (tagName: string) => {
    const trimmedTag = tagName.trim();
    if (
      trimmedTag &&
      !picked.includes(trimmedTag) &&
      !options.includes(trimmedTag)
    ) {
      const newSelectedTags = [...picked, trimmedTag];
      onChange?.(newSelectedTags);
      setInputValue("");
    }
  };

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()) &&
      !picked.includes(option),
  );

  const showCreateOption =
    inputValue.trim() &&
    !options.includes(inputValue.trim()) &&
    !picked.includes(inputValue.trim());

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
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search or create tags..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {filteredOptions.length === 0 && !showCreateOption && (
              <CommandEmpty>No tags found.</CommandEmpty>
            )}

            {showCreateOption && (
              <CommandGroup>
                <CommandItem
                  value={inputValue}
                  onSelect={() => handleNewTag(inputValue)}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create &quot;{inputValue.trim()}&quot;
                </CommandItem>
              </CommandGroup>
            )}

            {filteredOptions.length > 0 && (
              <CommandGroup>
                {filteredOptions.map((option, index) => (
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
            )}

            {picked.length > 0 && (
              <CommandGroup>
                <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                  Selected tags:
                </div>
                {picked.map((tag, index) => (
                  <CommandItem
                    key={`selected-${index}`}
                    value={tag}
                    onSelect={() => handleTagSelect(tag)}
                  >
                    <CheckIcon className="mr-2 h-4 w-4 opacity-100" />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
