import { cn } from "@/lib/utils";
import { formatPrice, discountPercent } from "@/lib/money";

export function PriceDisplay({
  price,
  original,
  size = "md",
  className,
}: {
  /** Effective price in kuruş. */
  price: number;
  /** Original price in kuruş when discounted. */
  original?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const hasDiscount = original != null && original > price;
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  } as const;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-bold text-ink", sizes[size])}>{formatPrice(price)}</span>
      {hasDiscount && (
        <>
          <span className="text-sm text-ink-muted line-through">{formatPrice(original)}</span>
          <span className="badge bg-pepper/12 text-pepper">
            %{discountPercent(original, price)} indirim
          </span>
        </>
      )}
    </div>
  );
}
