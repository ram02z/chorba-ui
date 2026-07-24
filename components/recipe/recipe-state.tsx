import { RecipeUrlForm } from "../recipe-url-form";

type RecipeStateProps = {
  title: string;
  message: string;
  defaultUrl?: string;
};

export function RecipeState({ title, message, defaultUrl }: RecipeStateProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-app-gutter py-app-xl">
      <section className="w-full max-w-xl rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-app-lg text-center shadow-[0px_10px_30px_rgba(44,62,80,0.08)] dark:bg-surface-container">
        <h1 className="font-display text-3xl font-bold text-on-surface">{title}</h1>
        <p className="mt-app-sm mb-app-lg font-body text-on-surface-variant">{message}</p>
        <RecipeUrlForm defaultUrl={defaultUrl} />
      </section>
    </main>
  );
}
