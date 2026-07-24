import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/chorba-api", () => ({
  getRecipe: vi.fn().mockResolvedValue({
    status: "success",
    recipe: {
      title: "Soup",
      ingredients: [],
      directions: [],
      time: null,
      video_url: null,
      thumbnail_url: null,
    },
  }),
}));

vi.mock("@/components/recipe/directions-fab", () => ({
  DirectionsFab: () => <div data-testid="directions-fab" />,
}));

import RecipePage from "./page";

describe("RecipePage layout", () => {
  it("reserves mobile bottom space for the fixed FAB", async () => {
    const ui = await RecipePage({
      searchParams: Promise.resolve({ url: "https://example.com/recipe" }),
    });

    render(ui);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("pb-28");
    expect(main).toHaveClass("lg:pb-app-xl");
  });
});
