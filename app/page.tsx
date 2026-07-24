import { UtensilsIcon } from "@/components/icons";
import { RecipeUrlForm } from "@/components/recipe-url-form";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-grow items-center justify-center overflow-hidden bg-surface px-app-gutter py-app-xl text-on-surface selection:bg-primary/20 selection:text-primary">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-30">
        <div className="size-[800px] rounded-full bg-gradient-to-tr from-primary-fixed/20 to-outline-variant blur-3xl" />
      </div>
      <section className="z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-app-md flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary sm:hidden">
          <UtensilsIcon className="size-8" />
        </div>
        <h1 className="mb-app-sm font-display text-5xl font-bold tracking-tight text-on-surface sm:text-display">
          Chorba
        </h1>
        <p className="mb-app-xl w-full text-balance font-body text-lg leading-relaxed text-secondary">
          Turn any messy recipe link into a clean cooking guide.
        </p>
        <div className="w-full max-w-2xl">
          <RecipeUrlForm />
        </div>
      </section>
    </main>
  );
}
