import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getRecipe } from "./chorba-api";
import type { Recipe } from "./recipe-types";

const recipe: Recipe = {
  title: "Soup",
  ingredients: [],
  directions: [],
  time: null,
  video_url: null,
  thumbnail_url: null,
};

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

describe("getRecipe", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("fetches a recipe from the configured API without caching", async () => {
    vi.stubEnv(
      "CHORBA_API_URL",
      "https://your-chorba-api.example.com",
    );
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(jsonResponse({ recipe }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "success",
      recipe,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://your-chorba-api.example.com/recipe?url=https%3A%2F%2Fsource.example.com%2Fr",
      { cache: "no-store" },
    );
  });

  it("returns empty when the API cannot extract a recipe", async () => {
    vi.stubEnv("CHORBA_API_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ recipe: null })));

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "empty",
    });
  });

  it("returns invalid for API validation errors", async () => {
    vi.stubEnv("CHORBA_API_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ detail: [] }, { status: 422 })),
    );

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "invalid",
      message: "The recipe URL was rejected by the extraction service.",
    });
  });

  it("returns an error for non-2xx service responses", async () => {
    vi.stubEnv("CHORBA_API_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ error: "boom" }, { status: 500 })),
    );

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "error",
      message: "The recipe service is unavailable right now.",
    });
  });

  it("returns an error for unexpected JSON", async () => {
    vi.stubEnv("CHORBA_API_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ recipe: 123 })));

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "error",
      message: "The recipe service returned an unexpected response.",
    });
  });

  it("returns an error when the API base URL is not configured", async () => {
    vi.stubEnv("CHORBA_API_URL", "");

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "error",
      message: "The recipe service is not configured.",
    });
  });

  it("returns an error for network failures without exposing internals", async () => {
    vi.stubEnv("CHORBA_API_URL", "https://api.example.com");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("socket hang up")));

    await expect(getRecipe("https://source.example.com/r")).resolves.toEqual({
      status: "error",
      message: "The recipe service is unavailable right now.",
    });
  });
});
