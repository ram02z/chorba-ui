import Form from "next/form";

import { LinkIcon } from "./icons";
import { RecipeNavbarSubmitButton } from "./recipe-navbar-submit-button";

export function RecipeNavbarForm({ defaultUrl = "" }: { defaultUrl?: string }) {
  return (
    <Form action="/recipe" className="flex w-full items-center gap-app-sm">
      <label className="sr-only" htmlFor="navbar-recipe-url">
        Recipe URL
      </label>
      <div className="flex min-w-0 flex-1 items-center rounded-full bg-secondary-container/30 px-app-sm py-app-xs transition-colors focus-within:ring-1 focus-within:ring-primary dark:bg-surface-container">
        <LinkIcon className="mr-app-sm size-4 shrink-0 text-secondary" />
        <input
          className="min-w-0 flex-1 border-none bg-transparent py-1 font-body text-sm text-on-surface-variant outline-none focus:ring-0"
          defaultValue={defaultUrl}
          id="navbar-recipe-url"
          name="url"
          required
          type="url"
        />
      </div>
      <RecipeNavbarSubmitButton />
    </Form>
  );
}
