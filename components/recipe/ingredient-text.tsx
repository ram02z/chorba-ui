import type { Ingredient } from "@/lib/recipe-types";

type IngredientTextProps = {
  ingredient: Ingredient;
  checked?: boolean;
};

export function IngredientText({ ingredient, checked = false }: IngredientTextProps) {
  const ranges = findRanges(ingredient);

  if (!ranges) {
    return <>{ingredient.sentence}</>;
  }

  const parts: Array<{ text: string; emphasized: boolean }> = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      parts.push({ text: ingredient.sentence.slice(cursor, range.start), emphasized: false });
    }
    parts.push({ text: ingredient.sentence.slice(range.start, range.end), emphasized: true });
    cursor = range.end;
  }

  if (cursor < ingredient.sentence.length) {
    parts.push({ text: ingredient.sentence.slice(cursor), emphasized: false });
  }

  return (
    <>
      {parts.map((part, index) =>
        part.emphasized ? (
          <span
            className={`font-semibold text-on-surface ${checked ? "line-through opacity-60" : ""}`}
            key={`${part.text}-${index}`}
          >
            {part.text}
          </span>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </>
  );
}

function findRanges(ingredient: Ingredient) {
  const candidates = [
    ...ingredient.amounts.map((amount) => amount.text),
    ...ingredient.names,
  ].filter(Boolean);
  const ranges: Array<{ start: number; end: number }> = [];

  for (const candidate of candidates) {
    const start = ingredient.sentence.toLowerCase().indexOf(candidate.toLowerCase());
    if (start === -1) {
      continue;
    }
    const end = start + candidate.length;
    if (ranges.some((range) => start < range.end && end > range.start)) {
      return null;
    }
    ranges.push({ start, end });
  }

  if (ranges.length === 0) {
    return null;
  }

  return ranges.sort((a, b) => a.start - b.start);
}
