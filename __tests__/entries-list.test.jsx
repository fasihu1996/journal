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
  it("shows newest entry first", async () => {
    entriesApi.getEntries.mockResolvedValue(mockEntries);

    render(<Page />);

    await waitFor(() => {
      const titles = screen.getAllByRole("heading", { level: 3 });
      expect(titles[0]).toHaveTextContent("Newest Entry");
      expect(titles[1]).toHaveTextContent("Middle Entry");
      expect(titles[2]).toHaveTextContent("Oldest Entry");
    });
  });
});
