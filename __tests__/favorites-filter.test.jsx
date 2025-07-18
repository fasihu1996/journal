import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/page";
import { entriesApi } from "@/lib/api";
import { favoriteEntries } from "../__mocks__/mockData";
import "@testing-library/jest-dom";

jest.mock("@/lib/api", () => ({
  entriesApi: {
    getEntries: jest.fn(),
    updateEntry: jest.fn(),
  },
}));

describe("Mandatory feature 3: show favorites only", () => {
  it("toggles “show favorites only” and updates entries", async () => {
    entriesApi.getEntries.mockResolvedValue(favoriteEntries);

    render(<Page />);

    await waitFor(() =>
      expect(screen.getByText("Favorited entry")).toBeInTheDocument(),
    );

    expect(screen.getByText("Boring entry")).toBeInTheDocument();

    const toggle = screen.getByRole("switch");
    await userEvent.click(toggle);

    expect(screen.queryByText("Boring entry")).not.toBeInTheDocument();
    expect(screen.getByText("Favorited entry")).toBeInTheDocument();
  });
});
