import { describe, expect, it } from "vitest";

import { validateRecipeUrl } from "./recipe-url";

describe("validateRecipeUrl", () => {
  it("accepts absolute http and https URLs", () => {
    expect(validateRecipeUrl("https://example.com/recipe")).toEqual({
      ok: true,
      url: "https://example.com/recipe",
    });

    expect(validateRecipeUrl("http://example.com/recipe")).toEqual({
      ok: true,
      url: "http://example.com/recipe",
    });
  });

  it("trims surrounding whitespace", () => {
    expect(validateRecipeUrl("  https://example.com/recipe  ")).toEqual({
      ok: true,
      url: "https://example.com/recipe",
    });
  });

  it("rejects a missing URL", () => {
    expect(validateRecipeUrl(undefined)).toEqual({
      ok: false,
      message: "Paste a recipe URL to get started.",
    });
  });

  it("rejects repeated URL parameters", () => {
    expect(validateRecipeUrl(["https://a.test", "https://b.test"])).toEqual({
      ok: false,
      message: "Use one recipe URL at a time.",
    });
  });

  it("rejects malformed URLs", () => {
    expect(validateRecipeUrl("not a url")).toEqual({
      ok: false,
      message: "Enter a valid recipe URL.",
    });
  });

  it("rejects unsupported protocols", () => {
    expect(validateRecipeUrl("ftp://example.com/recipe")).toEqual({
      ok: false,
      message: "Recipe URLs must start with http:// or https://.",
    });
  });
});
