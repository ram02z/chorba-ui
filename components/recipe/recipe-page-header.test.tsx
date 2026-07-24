import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecipePageHeader } from "./recipe-page-header";
import type { Recipe } from "@/lib/recipe-types";

const baseRecipe: Recipe = {
  title: "Spicy Soup",
  ingredients: [],
  directions: [],
  time: { valueMs: 2700000, valueFormatted: "45 min" },
  video_url: null,
  thumbnail_url: "https://images.example.com/soup.jpg",
};

describe("RecipePageHeader", () => {
  it("renders title, source host, time, and thumbnail", () => {
    render(
      <RecipePageHeader recipe={baseRecipe} sourceUrl="https://bonappetit.com/recipe/soup" />,
    );

    expect(screen.getByRole("heading", { name: "Spicy Soup" })).toBeInTheDocument();
    const sourceLink = screen.getByRole("link", { name: /open original recipe/i });
    expect(sourceLink).toHaveAttribute("href", "https://bonappetit.com/recipe/soup");
    expect(sourceLink).toHaveAttribute("target", "_blank");
    expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("bonappetit.com")).toBeInTheDocument();
    expect(screen.getByText("45 min")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Spicy Soup" })).toHaveAttribute(
      "src",
      "https://images.example.com/soup.jpg",
    );
  });

  it("renders a safe external video link when video_url is available", () => {
    render(
      <RecipePageHeader
        recipe={{ ...baseRecipe, video_url: "https://video.example.com/watch" }}
        sourceUrl="https://bonappetit.com/recipe/soup"
      />,
    );

    const link = screen.getByRole("link", { name: /watch video/i });
    expect(link).toHaveAttribute("href", "https://video.example.com/watch");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("Watch video")).toBeInTheDocument();
  });

  it("omits unavailable optional fields", () => {
    render(
      <RecipePageHeader
        recipe={{ ...baseRecipe, time: null, thumbnail_url: null }}
        sourceUrl="https://bonappetit.com/recipe/soup"
      />,
    );

    expect(screen.queryByText("Time")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
