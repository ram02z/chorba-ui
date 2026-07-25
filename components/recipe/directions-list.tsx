import type { Direction } from "@/lib/recipe-types";

import { HighlightedText } from "./highlighted-text";

type DirectionsListProps = {
  directions: Direction[];
};

export function DirectionsList({ directions }: DirectionsListProps) {
  return (
    <section aria-labelledby="directions-heading" className="scroll-mt-24" id="directions-section">
      <h2 className="border-b border-outline-variant/30 pb-app-sm font-headline text-headline-lg text-on-surface" id="directions-heading">
        Directions
      </h2>
      <div className="relative mt-app-md space-y-app-lg pl-1 sm:pl-0">
        {directions.map((direction, index) => {
          const showSection =
            direction.section && direction.section !== directions[index - 1]?.section;

          return (
            <div className="space-y-app-sm" key={direction.id}>
              {showSection ? (
                <h3 className="font-headline text-headline text-on-surface">
                  {direction.section}
                </h3>
              ) : null}
              <div className="group flex gap-app-md">
                <div className="flex-shrink-0">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary-fixed font-display text-xl font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary dark:bg-highlight-bg-dark dark:text-highlight-text-dark">
                    {index + 1}
                  </div>
                </div>
                <p className="pt-1 font-body text-lg leading-relaxed text-on-surface-variant">
                  <HighlightedText
                    text={direction.text}
                    highlights={direction.highlights}
                  />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
