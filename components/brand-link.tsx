import Link from "next/link";

export function BrandLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className={`font-display font-bold tracking-tight text-primary transition-transform active:scale-95 ${compact ? "text-2xl" : "text-title"}`}
      href="/"
    >
      Chorba
    </Link>
  );
}
