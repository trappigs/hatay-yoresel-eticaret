"use client";

import { cn } from "@/lib/utils";
import { PlusIcon, MinusIcon } from "@/components/icons";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const clamp = (n: number) => Math.max(min, Math.min(n, max));
  const btn =
    "flex items-center justify-center text-ink-soft transition-colors hover:text-pepper disabled:opacity-40 disabled:hover:text-ink-soft";
  const dims = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10";

  return (
    <div className={cn("inline-flex items-center rounded-xl border border-line bg-white", className)}>
      <button
        type="button"
        className={cn(btn, dims)}
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Adet azalt"
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        inputMode="numeric"
        className={cn("w-10 border-x border-line bg-transparent text-center font-semibold", size === "sm" ? "h-8" : "h-10")}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10) || min))}
        aria-label="Adet"
      />
      <button
        type="button"
        className={cn(btn, dims)}
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Adet artır"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
