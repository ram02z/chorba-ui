import { BrandLink } from "@/components/brand-link";
import { RecipeNavbarForm } from "@/components/recipe-navbar-form";
import { DirectionsFab } from "@/components/recipe/directions-fab";
import { DirectionsList } from "@/components/recipe/directions-list";
import { IngredientChecklist } from "@/components/recipe/ingredient-checklist";
import { RecipePageHeader } from "@/components/recipe/recipe-page-header";
import { RecipeState } from "@/components/recipe/recipe-state";
import { getRecipe } from "@/lib/chorba-api";
import { validateRecipeUrl } from "@/lib/recipe-url";

type RecipePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function RecipePage({ searchParams }: RecipePageProps) {
  const params = await searchParams;
  const validated = validateRecipeUrl(params.url);

  if (!validated.ok) {
    return (
      <RecipeState title="Recipe URL needed" message={validated.message} />
    );
  }

  const result = await getRecipe(validated.url);

  if (result.status === "empty") {
    return (
      <RecipeState
        defaultUrl={validated.url}
        title="No recipe found"
        message="We could not extract a clean recipe from that page. Try another recipe URL."
      />
    );
  }

  if (result.status === "invalid" || result.status === "error") {
    return (
      <RecipeState
        defaultUrl={validated.url}
        title={result.status === "invalid" ? "Unsupported URL" : "Service unavailable"}
        message={result.message}
      />
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/95 text-primary shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-between gap-app-md px-app-gutter">
          <BrandLink />
          <div className="hidden w-full max-w-2xl md:block">
            <RecipeNavbarForm defaultUrl={validated.url} />
          </div>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-container-max flex-grow px-app-gutter pt-app-md pb-28 sm:pt-app-lg lg:py-app-xl lg:pb-app-xl">
        <RecipePageHeader recipe={result.recipe} sourceUrl={validated.url} />
        <div className="grid grid-cols-1 gap-app-xl lg:grid-cols-12">
          <div className="lg:col-span-5">
            <IngredientChecklist ingredients={result.recipe.ingredients} />
          </div>
          <div className="lg:col-span-7">
            <DirectionsList directions={result.recipe.directions} />
          </div>
        </div>
        <DirectionsFab />
      </main>
    </>
  );
}
