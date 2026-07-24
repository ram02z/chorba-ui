import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HighlightedText } from "./highlighted-text";
import type { IngredientHighlight } from "@/lib/recipe-types";

function highlight(start: number, end: number, text: string): IngredientHighlight {
  return { type: "ingredient", ids: ["i1"], start, end, text };
}

describe("HighlightedText", () => {
  it("renders plain text without highlights", () => {
    render(<HighlightedText text="Stir the soup." highlights={[]} />);

    expect(screen.getByText("Stir the soup.")).toBeInTheDocument();
  });

  it("renders multiple sorted highlight ranges", () => {
    render(
      <HighlightedText
        text="Add onions and oil."
        highlights={[highlight(15, 18, "oil"), highlight(4, 10, "onions")]}
      />,
    );

    expect(screen.getByText("onions")).toHaveClass("bg-highlight-bg");
    expect(screen.getByText("oil")).toHaveClass("bg-highlight-bg");
  });

  it("uses code point offsets for Unicode text", () => {
    render(
      <HighlightedText
        text="Add 🍋 juice."
        highlights={[highlight(6, 11, "juice")]}
      />,
    );

    expect(screen.getByText("juice")).toHaveClass("bg-highlight-bg");
  });

  it("falls back to plain text for overlapping ranges", () => {
    render(
      <HighlightedText
        text="Add red lentils."
        highlights={[highlight(4, 7, "red"), highlight(6, 14, "d lentil")]}
      />,
    );

    expect(screen.getByText("Add red lentils.")).toBeInTheDocument();
    expect(screen.queryByText("red")).not.toBeInTheDocument();
  });

  it("falls back to plain text for out-of-bounds ranges", () => {
    render(
      <HighlightedText
        text="Add salt."
        highlights={[highlight(4, 20, "salt")]}
      />,
    );

    expect(screen.getByText("Add salt.")).toBeInTheDocument();
  });
});
