import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecipeNavbarForm } from "./recipe-navbar-form";

describe("RecipeNavbarForm", () => {
  it("renders a compact single-row url form with an icon-only submit button", () => {
    render(<RecipeNavbarForm defaultUrl="https://example.com/recipe" />);

    expect(screen.getByLabelText("Recipe URL")).toHaveValue("https://example.com/recipe");
    expect(screen.getByRole("button", { name: "Cook this recipe URL" })).toHaveClass("size-10");
    expect(screen.queryByText("Cook")).not.toBeInTheDocument();
  });
});
