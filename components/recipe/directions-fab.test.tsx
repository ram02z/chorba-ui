import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DirectionsFab } from "./directions-fab";

type ObserverInstance = {
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  trigger: (intersecting: boolean) => void;
};

let observer: ObserverInstance;

beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = '<section id="ingredients-section"></section><section id="directions-section"></section>';

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(function MockIntersectionObserver(callback: IntersectionObserverCallback) {
      observer = {
        observe: vi.fn(),
        disconnect: vi.fn(),
        trigger: (intersecting: boolean) =>
          callback([{ isIntersecting: intersecting } as IntersectionObserverEntry], {} as IntersectionObserver),
      };
      return observer;
    }),
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("DirectionsFab", () => {
  it("starts collapsed and points to directions", () => {
    render(<DirectionsFab />);

    expect(screen.getByRole("link", { name: "View directions" })).toHaveAttribute(
      "href",
      "#directions-section",
    );
    expect(screen.getByRole("link", { name: "View directions" })).toHaveClass("w-12");
    expect(screen.getByText("View directions")).toHaveClass("opacity-0");
    expect(screen.getByText("View directions")).toHaveClass("absolute");
    expect(screen.getByTestId("fab-arrow")).not.toHaveClass("rotate-180");
    expect(screen.getByTestId("fab-arrow")).toHaveClass("absolute");
  });

  it("expands with a single-line label while scrolling and collapses after 700ms", () => {
    render(<DirectionsFab />);

    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByRole("link", { name: "View directions" })).toHaveClass("w-48");
    expect(screen.getByText("View directions")).toHaveClass("whitespace-nowrap");
    expect(screen.getByText("View directions")).toHaveClass("opacity-100");

    act(() => vi.advanceTimersByTime(699));
    expect(screen.getByText("View directions")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("link", { name: "View directions" })).toHaveClass("w-12");
    expect(screen.getByText("View directions")).toHaveClass("opacity-0");
  });

  it("switches to ingredients with a rotating arrow when directions are visible", () => {
    render(<DirectionsFab />);

    act(() => observer.trigger(true));
    expect(screen.getByRole("link", { name: "View ingredients" })).toHaveAttribute(
      "href",
      "#ingredients-section",
    );
    expect(screen.getByTestId("fab-arrow")).toHaveClass("rotate-180");

    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByText("View ingredients")).toHaveClass("whitespace-nowrap");
  });

  it("keeps a collapsed width during click-triggered anchor scrolling", async () => {
    render(<DirectionsFab />);

    fireEvent.click(screen.getByRole("link", { name: "View directions" }));

    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByRole("link", { name: "View directions" })).toHaveClass("w-12");
  });

  it("keeps an expanded width during click-triggered anchor scrolling", async () => {
    render(<DirectionsFab />);

    act(() => window.dispatchEvent(new Event("scroll")));
    expect(screen.getByRole("link", { name: "View directions" })).toHaveClass("w-48");

    fireEvent.click(screen.getByRole("link", { name: "View directions" }));
    act(() => window.dispatchEvent(new Event("scroll")));

    expect(screen.getByRole("link", { name: "View directions" })).toHaveClass("w-48");
  });
});
