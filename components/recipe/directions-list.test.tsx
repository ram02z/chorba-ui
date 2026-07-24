import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DirectionsList } from "./directions-list";
import type { Direction } from "@/lib/recipe-types";

const directions: Direction[] = [
  {
    id: "d1",
    text: "Chop onions.",
    section: "Prep",
    highlights: [],
  },
  {
    id: "d2",
    text: "Heat oil.",
    section: "Prep",
    highlights: [{ type: "ingredient", ids: ["i1"], start: 5, end: 8, text: "oil" }],
  },
  {
    id: "d3",
    text: "Simmer soup.",
    section: "Cook",
    highlights: [],
  },
];

describe("DirectionsList", () => {
  it("renders numbered directions", () => {
    render(<DirectionsList directions={directions} />);

    expect(screen.getByRole("region", { name: "Directions" })).toHaveClass("scroll-mt-24");
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Chop onions.")).toBeInTheDocument();
    expect(screen.getByText("Simmer soup.")).toBeInTheDocument();
  });

  it("renders adjacent duplicate section headings once", () => {
    render(<DirectionsList directions={directions} />);

    expect(screen.getAllByRole("heading", { name: "Prep" })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Cook" })).toBeInTheDocument();
  });

  it("renders direction ingredient highlights", () => {
    render(<DirectionsList directions={directions} />);

    expect(screen.getByText("oil")).toHaveClass("bg-highlight-bg");
  });

  it("does not render a decorative timeline line through step numbers", () => {
    const { container } = render(<DirectionsList directions={directions} />);

    expect(container.querySelector("[data-testid='directions-timeline']")).not.toBeInTheDocument();
  });
});
