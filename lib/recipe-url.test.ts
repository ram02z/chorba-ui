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

  it("removes fragments before returning accepted URLs", () => {
    expect(validateRecipeUrl("https://example.com/recipe#ingredients")).toEqual({
      ok: true,
      url: "https://example.com/recipe",
    });
  });

  it("removes known tracking parameters case-insensitively", () => {
    expect(
      validateRecipeUrl(
        "https://example.com/recipe?UTM_Source=newsletter&fbclid=abc&gclid=def&dclid=ghi&msclkid=jkl&mc_cid=mno&mc_eid=pqr&_ga=stu&_gl=vwx&id=123",
      ),
    ).toEqual({
      ok: true,
      url: "https://example.com/recipe?id=123",
    });
  });

  it("sorts remaining query parameters for stable cache keys", () => {
    expect(validateRecipeUrl("https://example.com/recipe?z=last&a=first")).toEqual({
      ok: true,
      url: "https://example.com/recipe?a=first&z=last",
    });
  });

  it("preserves meaningful URL parts", () => {
    expect(
      validateRecipeUrl(
        "https://www.example.com/recipe/?ingredient=tomato&ingredient=basil",
      ),
    ).toEqual({
      ok: true,
      url: "https://www.example.com/recipe/?ingredient=tomato&ingredient=basil",
    });
  });

  it("uses standard URL serialization", () => {
    expect(validateRecipeUrl("HTTPS://EXAMPLE.COM:443/recipe")).toEqual({
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
