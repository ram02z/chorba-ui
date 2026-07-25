export type RecipeUrlResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

const trackingParameters = new Set([
  "_ga",
  "_gl",
  "dclid",
  "fbclid",
  "gclid",
  "mc_cid",
  "mc_eid",
  "msclkid",
]);

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

  parsed.hash = "";

  for (const key of Array.from(parsed.searchParams.keys())) {
    const normalizedKey = key.toLowerCase();
    if (
      normalizedKey.startsWith("utm_") ||
      trackingParameters.has(normalizedKey)
    ) {
      parsed.searchParams.delete(key);
    }
  }

  parsed.searchParams.sort();

  return { ok: true, url: parsed.toString() };
}
