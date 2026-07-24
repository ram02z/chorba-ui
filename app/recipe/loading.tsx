export default function LoadingRecipe() {
  return (
    <main className="mx-auto w-full max-w-container-max flex-grow animate-pulse px-app-gutter py-app-md sm:py-app-lg lg:py-app-xl">
      <div className="mx-auto mb-app-lg h-10 w-2/3 rounded-full bg-outline-variant/40" />
      <div className="mb-app-xl h-72 rounded-xl bg-outline-variant/40 sm:h-[500px]" />
      <div className="grid grid-cols-1 gap-app-xl lg:grid-cols-12">
        <div className="space-y-app-sm lg:col-span-5">
          <div className="h-8 rounded bg-outline-variant/40" />
          <div className="h-64 rounded-xl bg-outline-variant/30" />
        </div>
        <div className="space-y-app-sm lg:col-span-7">
          <div className="h-8 rounded bg-outline-variant/40" />
          <div className="h-20 rounded bg-outline-variant/30" />
          <div className="h-20 rounded bg-outline-variant/30" />
          <div className="h-20 rounded bg-outline-variant/30" />
        </div>
      </div>
    </main>
  );
}
