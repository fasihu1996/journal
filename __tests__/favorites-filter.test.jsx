import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import { entriesApi } from "@/lib/api";
import "@testing-library/jest-dom";

jest.mock("@/lib/api", () => ({
  entriesApi: {
    getEntries: jest.fn(),
    updateEntry: jest.fn(),
  },
}));

describe("Optional 1: show favorites only", () => {
  it("toggles “show favorites only” and updates list", async () => {
    entriesApi.getEntries.mockResolvedValue([
      {
        id: 1,
        title: "A",
        content: "",
        createdAt: new Date().toISOString(),
        favorited: true,
        mood: "good",
        tags: [],
      },
      {
        id: 2,
        title: "B",
        content: "",
        createdAt: new Date().toISOString(),
        favorited: false,
        mood: "bad",
        tags: [],
      },
    ]);

    render(<Home />);

    await waitFor(() => expect(screen.getByText("A")).toBeInTheDocument());

    expect(screen.getByText("B")).toBeInTheDocument();

    const toggle = screen.getByRole("switch", {
      name: /show favorites only/i,
    });
    await userEvent.click(toggle);

    expect(screen.queryByText("B")).not.toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
