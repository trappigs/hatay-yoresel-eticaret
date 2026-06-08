import { cn } from "@/lib/utils";

type BadgeVariant =
  | "olive"
  | "pepper"
  | "gold"
  | "cold"
  | "fragile"
  | "new"
  | "neutral";

const VARIANTS: Record<BadgeVariant, string> = {
  olive: "bg-olive/12 text-olive-dark",
  pepper: "bg-pepper/12 text-pepper",
  gold: "bg-gold/15 text-[#946410]",
  cold: "bg-sky-100 text-sky-700",
  fragile: "bg-amber-100 text-amber-700",
  new: "bg-olive text-cream-50",
  neutral: "bg-cream-300 text-ink-soft",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("badge", VARIANTS[variant], className)}>{children}</span>;
}
