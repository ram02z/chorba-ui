import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the landing subtitle without a narrow max width utility", () => {
    render(<Home />);

    expect(
      screen.getByText("Turn any messy recipe link into a clean cooking guide."),
    ).not.toHaveClass("max-w-xl");
  });
});
