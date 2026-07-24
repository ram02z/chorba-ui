import type { Recipe } from "@/lib/recipe-types";

import { ClockIcon, GlobeIcon, PlayIcon } from "../icons";

type RecipePageHeaderProps = {
  recipe: Recipe;
  sourceUrl: string;
};

export function RecipePageHeader({ recipe, sourceUrl }: RecipePageHeaderProps) {
  const host = new URL(sourceUrl).hostname.replace(/^www\./, "");

  return (
    <article className="mb-app-xl flex flex-col gap-app-lg">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-app-sm text-center">
        <a
          aria-label={`Open original recipe on ${host}; opens in a new tab`}
          className="inline-flex items-center gap-app-xs rounded-lg border border-outline-variant/40 bg-surface-container-lowest/90 px-app-sm py-app-xs text-xs font-bold uppercase tracking-wide text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:bg-surface-container sm:hidden"
          href={sourceUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GlobeIcon className="size-4 text-primary" />
          <span>{host}</span>
        </a>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-on-surface sm:text-display">
          {recipe.title}
        </h1>
        {recipe.time ? (
          <div className="mt-app-sm flex items-center gap-app-sm rounded-full border border-outline-variant/20 bg-surface-container px-app-md py-app-sm">
            <ClockIcon className="size-5 text-primary" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                Time
              </span>
              <span className="text-sm font-semibold text-on-surface">
                {recipe.time.valueFormatted}
              </span>
            </div>
          </div>
        ) : null}
      </header>
      {recipe.thumbnail_url ? <RecipeMedia recipe={recipe} /> : null}
    </article>
  );
}

function RecipeMedia({ recipe }: { recipe: Recipe }) {
  const image = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- API thumbnails can come from arbitrary hosts. */}
      <img
        alt={recipe.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        src={recipe.thumbnail_url ?? ""}
      />
      {recipe.video_url ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30 group-focus-visible:bg-black/30">
            <span className="flex size-16 scale-90 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-xl transition-all group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
              <PlayIcon className="size-7" />
            </span>
          </div>
          <span className="absolute right-app-md bottom-app-md inline-flex items-center gap-app-xs rounded-full bg-surface/95 px-app-sm py-app-xs text-sm font-bold text-primary shadow-lg backdrop-blur-sm">
            <PlayIcon className="size-3" />
            Watch video
          </span>
          <span className="sr-only">Opens in a new tab</span>
        </>
      ) : null}
    </>
  );

  if (recipe.video_url) {
    return (
      <a
        aria-label={`Watch video for ${recipe.title}; opens in a new tab`}
        className="group relative block h-72 overflow-hidden rounded-[2rem] shadow-[0px_10px_30px_rgba(44,62,80,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:h-[500px] sm:rounded-xl"
        href={recipe.video_url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {image}
      </a>
    );
  }

  return (
    <div className="group relative h-72 overflow-hidden rounded-[2rem] shadow-[0px_10px_30px_rgba(44,62,80,0.08)] sm:h-[500px] sm:rounded-xl">
      {image}
    </div>
  );
}
