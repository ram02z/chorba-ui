import type { RecipeResult } from "./chorba-api";

type HasNoEmptyResult = Extract<RecipeResult, { status: "empty" }> extends never
  ? true
  : false;

const hasNoEmptyResult: HasNoEmptyResult = true;

void hasNoEmptyResult;
