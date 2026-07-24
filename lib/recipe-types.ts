export type IngredientAmount = {
  quantity: string;
  quantity_max: string;
  unit: string | null;
  text: string;
};

export type Ingredient = {
  id: string;
  sentence: string;
  names: string[];
  amounts: IngredientAmount[];
  size: string | null;
  preparation: string | null;
  comment: string | null;
  purpose: string | null;
};

export type IngredientHighlight = {
  type: "ingredient";
  text: string;
  ids: string[];
  start: number;
  end: number;
};

export type Direction = {
  id: string;
  text: string;
  section: string | null;
  highlights: IngredientHighlight[];
};

export type RecipeTime = {
  valueMs: number;
  valueFormatted: string;
};

export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  directions: Direction[];
  time: RecipeTime | null;
  video_url: string | null;
  thumbnail_url: string | null;
};

export type RecipeResponse = {
  recipe: Recipe | null;
};
