import "server-only";

import type { Recipe, RecipeResponse } from "./recipe-types";

export type RecipeResult =
  | { status: "success"; recipe: Recipe }
  | { status: "empty" }
  | { status: "invalid"; message: string }
  | { status: "error"; message: string };

export async function getRecipe(sourceUrl: string): Promise<RecipeResult> {
  const apiBase = process.env.CHORBA_API_URL?.trim();
  if (!apiBase) {
    return {
      status: "error",
      message: "The recipe service is not configured.",
    };
  }

  let endpoint: URL;
  try {
    endpoint = new URL("/recipe", apiBase);
  } catch {
    return {
      status: "error",
      message: "The recipe service is not configured.",
    };
  }
  endpoint.searchParams.set("url", sourceUrl);

  let response: Response;
  try {
    response = await fetch(endpoint.toString(), { cache: "no-store" });
  } catch {
    return {
      status: "error",
      message: "The recipe service is unavailable right now.",
    };
  }

  if (response.status === 422) {
    return {
      status: "invalid",
      message: "The recipe URL was rejected by the extraction service.",
    };
  }

  if (!response.ok) {
    return {
      status: "error",
      message: "The recipe service is unavailable right now.",
    };
  }

  let body: RecipeResponse;
  try {
    body = (await response.json()) as RecipeResponse;
  } catch {
    return {
      status: "error",
      message: "The recipe service returned an unexpected response.",
    };
  }

  if (body.recipe === null) {
    return { status: "empty" };
  }

  if (!body.recipe || typeof body.recipe !== "object") {
    return {
      status: "error",
      message: "The recipe service returned an unexpected response.",
    };
  }

  return { status: "success", recipe: body.recipe };
}
