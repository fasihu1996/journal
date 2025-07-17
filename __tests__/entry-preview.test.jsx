import { render, screen } from "@testing-library/react";
import EntryContent from "@/components/EntryContent";
import { maxPreviewLength } from "@/types/journal";
import "@testing-library/jest-dom";

const mockEntry = (content) => ({
  id: 1,
  title: "Test",
  content,
  createdAt: new Date().toISOString(),
  favorited: false,
  mood: "okay",
  tags: [],
});

describe("Mandatory 4: trim content after 250 symbols", () => {
  it("shows full string if max 250 symbols", () => {
    const short = "a".repeat(250);
    render(
      <EntryContent
        entry={mockEntry(short)}
        onToggleFavorite={jest.fn()}
        isModal={false}
      />,
    );
    expect(screen.getByText(short)).toBeInTheDocument();
  });

  it("trims and adds “...” if longer than 250 symbols", () => {
    const long = "b".repeat(300);
    render(
      <EntryContent
        entry={mockEntry(long)}
        onToggleFavorite={jest.fn()}
        isModal={false}
      />,
    );
    expect(
      screen.getByText(`${long.slice(0, maxPreviewLength)}...`),
    ).toBeInTheDocument();
  });
});
