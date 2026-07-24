import Form from "next/form";

import { CookSubmitButton } from "./cook-submit-button";
import { LinkIcon } from "./icons";

export function RecipeUrlForm({ defaultUrl = "" }: { defaultUrl?: string }) {
  return (
    <Form action="/recipe" className="flex w-full flex-col gap-4">
      <label className="sr-only" htmlFor="recipe-url">
        Recipe URL
      </label>
      <div className="flex w-full items-center rounded-full border border-outline-variant bg-surface-container-lowest px-4 shadow-[0px_10px_30px_rgba(44,62,80,0.08)] transition-all focus-within:border-primary dark:bg-surface-container">
        <LinkIcon className="mr-app-sm size-5 text-tertiary" />
        <input
          className="w-full border-none bg-transparent py-4 font-body text-on-surface outline-none placeholder:text-secondary/60 focus:ring-0"
          defaultValue={defaultUrl}
          id="recipe-url"
          name="url"
          placeholder="Paste recipe URL here..."
          required
          type="url"
        />
      </div>
      <CookSubmitButton />
    </Form>
  );
}
