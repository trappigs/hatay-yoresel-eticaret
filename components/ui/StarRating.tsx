import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

export function StarRating({
  value,
  count,
  className,
}: {
  value: number;
  /** Optional review count shown next to the stars. */
  count?: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`${value} / 5 puan`}>
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={cn("text-sm", i < rounded ? "fill-gold" : "fill-transparent text-line")}
          />
        ))}
      </div>
      {count != null && <span className="text-xs text-ink-muted">({count})</span>}
    </div>
  );
}
