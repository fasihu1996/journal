import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../src/app/page";
import { entriesApi } from "../src/lib/api";

jest.mock("../src/lib/api");
jest.mock("sonner");

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
Object.defineProperty(window, "addEventListener", {
  value: mockAddEventListener,
});
Object.defineProperty(window, "removeEventListener", {
  value: mockRemoveEventListener,
});

const mockEntries = [
  {
    id: 3,
    title: "Newest Entry",
    content: "This is the newest entry content",
    mood: "okay",
    favorited: false,
    createdAt: "2025-07-16T13:45:00.000Z",
    tags: ["new", "latest"],
  },
  {
    id: 2,
    title: "Middle Entry",
    content: "This is the middle entry content",
    mood: "great",
    favorited: true,
    createdAt: "2025-07-15T13:35:27.075Z",
    tags: ["middle"],
  },
  {
    id: 1,
    title: "Oldest Entry",
    content: "This is the oldest entry content",
    mood: "good",
    favorited: false,
    createdAt: "2025-07-14T13:17:17.485Z",
    tags: ["old", "first"],
  },
];

describe("Moodjournal tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    entriesApi.getEntries.mockResolvedValue(mockEntries);
    entriesApi.updateEntry.mockResolvedValue({});
  });

  describe("Mandatory 1: All entries are displayed", () => {
    it("displays entries in chron. order with the newest first, oldest last", async () => {
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      });

      await waitFor(
        () => {
          expect(screen.getByText("Newest Entry")).toBeInTheDocument();
          expect(screen.getByText("Middle Entry")).toBeInTheDocument();
          expect(screen.getByText("Oldest Entry")).toBeInTheDocument();
        },
        { timeout: 5000 },
      );

      const entryTitles = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(entryTitles).toEqual([
        "Newest Entry",
        "Middle Entry",
        "Oldest Entry",
      ]);

      expect(screen.getByText("6 / 3 entries loaded")).toBeInTheDocument();
    });

    it("shows all required entry information", async () => {
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByText("Your Journal Entries")).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText("Newest Entry")).toBeInTheDocument();
        expect(screen.getByText("Middle Entry")).toBeInTheDocument();
        expect(screen.getByText("Oldest Entry")).toBeInTheDocument();

        expect(screen.getByText(/newest entry content/)).toBeInTheDocument();
        expect(screen.getByText(/middle entry content/)).toBeInTheDocument();
        expect(screen.getByText(/oldest entry content/)).toBeInTheDocument();
      });
    });
  });

  describe("Mandatory 3: favorited entries can be filtered and displayed", () => {
    it("only shows favorited entries", async () => {
      render(<Page />);

      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText("Show favorites only")).toBeInTheDocument();
      });

      const $ = require("jquery");
      const favoritesToggle = screen.getByRole("switch", {
        name: /favorites only/i,
      });

      expect(screen.getByText("Newest Entry")).toBeInTheDocument();
      expect(screen.getByText("Middle Entry")).toBeInTheDocument();
      expect(screen.getByText("Oldest Entry")).toBeInTheDocument();

      $("#switch").click();

      await waitFor(() => {
        expect(screen.queryByText("Newest Entry")).not.toBeInTheDocument();
        expect(screen.getByText("Middle Entry")).toBeInTheDocument();
        expect(screen.queryByText("Oldest Entry")).not.toBeInTheDocument();
      });
    });
  });
});
