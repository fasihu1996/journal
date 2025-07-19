// unit test for EntryContent
import { render, screen } from "@testing-library/react";
import EntryContent from "@/components/EntryContent";
import { maxPreviewLength } from "@/types/journal";
import "@testing-library/jest-dom";
import { entryTemplate } from "../__mocks__/mockData";

const longText =
  "Ut convallis justo a sapien porta, sed aliquet ex consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer vehicula arcu ac dolor ultricies pretium. Fusce rutrum lobortis lorem, et ultricies est congue eget. Mauris mattis magna venenatis turpis duis.";

const shortText = longText.substring(0, maxPreviewLength) + "...";

describe("Mandatory feature 4: trim content after 250 symbols", () => {
  it("shows full string if max 250 symbols", () => {
    render(
      <EntryContent
        entry={entryTemplate(shortText)}
        onToggleFavorite={jest.fn()}
        isModal={false}
      />,
    );

    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  it("trims and adds “...” if longer than 250 symbols", () => {
    render(
      <EntryContent
        entry={entryTemplate(longText)}
        onToggleFavorite={jest.fn()}
        isModal={false}
      />,
    );
    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  it("shows the full content in the modal", () => {
    render(
      <EntryContent
        entry={entryTemplate(longText)}
        onToggleFavorite={jest.fn()}
        isModal={true}
      />,
    );
    expect(screen.getByText(longText)).toBeInTheDocument();
  });
});
