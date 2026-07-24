"use client";

import { useFormStatus } from "react-dom";

import { UtensilsIcon } from "./icons";

export function RecipeNavbarSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-label="Cook this recipe URL"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/20 transition-colors hover:bg-[#d62f0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      <UtensilsIcon className="size-5" />
    </button>
  );
}
