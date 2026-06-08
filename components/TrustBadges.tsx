import { cn } from "@/lib/utils";
import { ShieldCheckIcon, TruckIcon, SnowflakeIcon, LeafIcon } from "@/components/icons";

const DEFAULT_ITEMS = [
  { icon: <ShieldCheckIcon />, label: "Güvenli paketleme", sub: "Özenli ve sağlam ambalaj" },
  { icon: <TruckIcon />, label: "Hızlı teslimat", sub: "1-3 iş günü içinde kargo" },
  { icon: <SnowflakeIcon />, label: "Soğuk zincir", sub: "Hassas ürünlerde buz aküsü" },
  { icon: <LeafIcon />, label: "Aile üretimi", sub: "Doğal, taze, yöresel" },
];

/**
 * Brand trust signals. `card` = bordered grid (cart/checkout/PDP sections),
 * `bar` = slim single-line strip (footer top).
 */
export function TrustBadges({
  variant = "card",
  className,
}: {
  variant?: "card" | "bar";
  className?: string;
}) {
  if (variant === "bar") {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-3", className)}>
        {DEFAULT_ITEMS.map((it) => (
          <span key={it.label} className="flex items-center gap-2 text-sm font-medium text-ink-soft">
            <span className="text-olive">{it.icon}</span>
            {it.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {DEFAULT_ITEMS.map((it) => (
        <div key={it.label} className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/12 text-olive">
            {it.icon}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">{it.label}</p>
            <p className="text-xs text-ink-muted">{it.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
