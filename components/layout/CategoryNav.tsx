import Link from "next/link";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

/** Horizontal category links (desktop header strip). */
export function CategoryNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Kategoriler" className={cn("flex items-center gap-1 overflow-x-auto", className)}>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}`}
          className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-200 hover:text-pepper"
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}
