"use client";

import { useState } from "react";

import type { Ingredient } from "@/lib/recipe-types";

import { IngredientText } from "./ingredient-text";

type IngredientChecklistProps = {
  ingredients: Ingredient[];
};

export function IngredientChecklist({ ingredients }: IngredientChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  function toggleIngredient(id: string) {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section aria-labelledby="ingredients-heading" className="scroll-mt-24" id="ingredients-section">
      <div className="mb-app-md flex items-center justify-between border-b border-outline-variant/30 pb-app-sm">
        <h2 className="font-headline text-headline-lg text-on-surface" id="ingredients-heading">Ingredients</h2>
        <span className="rounded-full bg-primary-fixed px-app-sm py-app-xs text-xs font-semibold text-primary dark:bg-highlight-bg-dark dark:text-highlight-text-dark">
          {ingredients.length} items
        </span>
      </div>
      <div className="rounded-xl border border-outline-variant/20 bg-secondary-container/30 p-app-md dark:bg-surface-container">
        <ul className="space-y-4">
          {ingredients.map((ingredient) => {
            const checked = checkedIds.has(ingredient.id);

            return (
              <li key={ingredient.id}>
                <label className="group flex cursor-pointer select-none items-start gap-app-sm">
                  <input
                    checked={checked}
                    className="mt-1 size-5 shrink-0 rounded border-outline-variant bg-surface accent-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
                    id={`ingredient-${ingredient.id}`}
                    onChange={() => toggleIngredient(ingredient.id)}
                    type="checkbox"
                  />
                  <span
                    className={`font-body text-base leading-snug text-on-surface-variant transition-colors group-hover:text-on-surface ${checked ? "line-through opacity-60" : ""}`}
                  >
                    <IngredientText ingredient={ingredient} checked={checked} />
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
