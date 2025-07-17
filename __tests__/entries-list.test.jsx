// integration test API -> Page
import { render, screen, waitFor } from "@testing-library/react";
import Page from "@/app/page";
import { entriesApi } from "@/lib/api";
import "@testing-library/jest-dom";

jest.mock("@/lib/api", () => ({
  entriesApi: {
    getEntries: jest.fn(),
    updateEntry: jest.fn(),
  },
}));

describe("Mandatory 1: display all entries", () => {
  it("shows newest entry first", async () => {
    entriesApi.getEntries.mockResolvedValue([
      {
        id: 2,
        title: "Newest Entry",
        content: "Newest Content",
        mood: "great",
        favorited: true,
        createdAt: "2025-07-16T13:35:27.075Z",
      },
      {
        id: 1,
        title: "Middle Entry",
        content: "Middle Content",
        mood: "okay",
        favorited: false,
        createdAt: "2025-07-16T13:17:17.485Z",
      },
      {
        id: 3,
        title: "Oldest Entry",
        content: "Oldest Content",
        mood: "terrible",
        favorited: true,
        createdAt: "2025-07-14T13:35:27.075Z",
      },
    ]);

    render(<Page />);

    await waitFor(() => {
      const titles = screen.getAllByRole("heading", { level: 3 });
      expect(titles[0]).toHaveTextContent("Newest Entry");
      expect(titles[1]).toHaveTextContent("Middle Entry");
      expect(titles[2]).toHaveTextContent("Oldest Entry");
    });
  });
});
