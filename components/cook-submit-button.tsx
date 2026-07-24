"use client";

import { useFormStatus } from "react-dom";

import { RestaurantIcon } from "./icons";

export function CookSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-[#d62f0f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      <RestaurantIcon className="size-5" />
      {pending ? "Cooking..." : "Cook"}
    </button>
  );
}
