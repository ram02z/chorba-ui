import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { IngredientChecklist } from "./ingredient-checklist";
import type { Ingredient } from "@/lib/recipe-types";

const ingredients: Ingredient[] = [
  {
    id: "olive-oil",
    sentence: "2 tbsp olive oil",
    names: ["olive oil"],
    amounts: [{ quantity: "2", quantity_max: "2", unit: "tbsp", text: "2 tbsp" }],
    size: null,
    preparation: null,
    comment: null,
    purpose: null,
  },
  {
    id: "onion",
    sentence: "1 large onion, diced",
    names: ["onion"],
    amounts: [{ quantity: "1", quantity_max: "1", unit: null, text: "1 large" }],
    size: "large",
    preparation: "diced",
    comment: null,
    purpose: null,
  },
];

describe("IngredientChecklist", () => {
  it("renders unchecked ingredients by default", () => {
    render(<IngredientChecklist ingredients={ingredients} />);

    expect(screen.getByRole("region", { name: "Ingredients" })).toHaveAttribute(
      "id",
      "ingredients-section",
    );
    expect(screen.getByRole("region", { name: "Ingredients" })).toHaveClass("scroll-mt-24");
    expect(screen.getByLabelText("2 tbsp olive oil")).not.toBeChecked();
    expect(screen.getByLabelText("2 tbsp olive oil")).toHaveClass("accent-primary");
    expect(screen.getByLabelText("2 tbsp olive oil")).toHaveClass("shrink-0");
    expect(screen.getByText("2 tbsp")).toHaveClass("font-semibold");
    expect(screen.getByText("olive oil")).toHaveClass("font-semibold");
  });

  it("toggles an ingredient through its label and applies completed styling", async () => {
    const user = userEvent.setup();
    render(<IngredientChecklist ingredients={ingredients} />);

    await user.click(screen.getByText("2 tbsp"));

    expect(screen.getByLabelText("2 tbsp olive oil")).toBeChecked();
    expect(screen.getByText("2 tbsp").closest("span")).toHaveClass("line-through");
  });

  it("tracks checked ingredients independently", async () => {
    const user = userEvent.setup();
    render(<IngredientChecklist ingredients={ingredients} />);

    await user.click(screen.getByLabelText("2 tbsp olive oil"));

    expect(screen.getByLabelText("2 tbsp olive oil")).toBeChecked();
    expect(screen.getByLabelText("1 large onion, diced")).not.toBeChecked();
  });
});
