export type RecipeUrlResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

export function validateRecipeUrl(
  value: string | string[] | undefined,
): RecipeUrlResult {
  if (Array.isArray(value)) {
    return { ok: false, message: "Use one recipe URL at a time." };
  }

  const candidate = value?.trim();
  if (!candidate) {
    return { ok: false, message: "Paste a recipe URL to get started." };
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return { ok: false, message: "Enter a valid recipe URL." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      ok: false,
      message: "Recipe URLs must start with http:// or https://.",
    };
  }

  return { ok: true, url: parsed.toString() };
}
