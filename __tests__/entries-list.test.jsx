// uni test for Page
import { render, screen, waitFor } from "@testing-library/react";
import Page from "@/app/page";
import { entriesApi } from "@/lib/api";
import "@testing-library/jest-dom";
import { mockEntries } from "../__mocks__/mockData.ts";

jest.mock("@/lib/api", () => ({
  entriesApi: {
    getEntries: jest.fn(),
    updateEntry: jest.fn(),
  },
}));

describe("Mandatory feature 1: display all entries", () => {
  beforeEach(() => {
    entriesApi.getEntries.mockResolvedValue(mockEntries);
  });
  it("shows the titles from newest to oldest", async () => {
    render(<Page />);
    await waitFor(() => {
      const titles = screen.getAllByRole("heading", { level: 3 });
      expect(titles[0]).toHaveTextContent("Newest Entry");
      expect(titles[1]).toHaveTextContent("Middle Entry");
      expect(titles[2]).toHaveTextContent("Oldest Entry");
    });
  });

  it("shows the content", async () => {
    render(<Page />);
    await waitFor(() => {
      const contents = screen.getAllByLabelText("content");
      expect(contents[0]).toHaveTextContent("Newest Content");
      expect(contents[1]).toHaveTextContent("Middle Content");
      expect(contents[2]).toHaveTextContent("Oldest Content");
    });
  });

  it("shows the time stamp", async () => {
    render(<Page />);
    await waitFor(() => {
      const timestamps = screen.getAllByLabelText("datetime");
      expect(timestamps[0]).toHaveTextContent("16. Juli 2025, 13:35");
      expect(timestamps[1]).toHaveTextContent("16. Juli 2025, 13:17");
      expect(timestamps[2]).toHaveTextContent("14. Juli 2025, 13:35");
    });
  });
});
