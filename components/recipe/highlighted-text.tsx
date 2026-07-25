import type { IngredientHighlight } from "@/lib/recipe-types";

type HighlightedTextProps = {
  text: string;
  highlights: IngredientHighlight[];
};

export function HighlightedText({ text, highlights }: HighlightedTextProps) {
  const parts = buildParts(text, highlights);

  if (!parts) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) =>
        part.highlighted ? (
          <span
            className="mx-0.5 rounded bg-highlight-bg px-1 py-0.5 text-sm font-medium text-highlight-text dark:bg-highlight-bg-dark dark:text-highlight-text-dark"
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

function buildParts(text: string, highlights: IngredientHighlight[]) {
  if (highlights.length === 0) {
    return [{ text, highlighted: false }];
  }

  const characters = Array.from(text);
  const ranges = [...highlights].sort((a, b) => a.start - b.start);
  const parts: Array<{ text: string; highlighted: boolean }> = [];
  let cursor = 0;

  for (const range of ranges) {
    if (
      range.start < cursor ||
      range.start < 0 ||
      range.end <= range.start ||
      range.end > characters.length
    ) {
      return null;
    }

    if (range.start > cursor) {
      parts.push({
        text: characters.slice(cursor, range.start).join(""),
        highlighted: false,
      });
    }

    parts.push({
      text: characters.slice(range.start, range.end).join(""),
      highlighted: true,
    });
    cursor = range.end;
  }

  if (cursor < characters.length) {
    parts.push({ text: characters.slice(cursor).join(""), highlighted: false });
  }

  return parts;
}
