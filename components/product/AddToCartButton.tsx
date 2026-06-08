"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart/cart-context";
import { BagIcon, CheckIcon } from "@/components/icons";
import type { AddToCartInput } from "@/lib/cart/types";

export function AddToCartButton({
  input,
  quantity = 1,
  disabled = false,
  outOfStock = false,
  className,
  label = "Sepete Ekle",
  variant = "primary",
}: {
  input: AddToCartInput;
  quantity?: number;
  disabled?: boolean;
  outOfStock?: boolean;
  className?: string;
  label?: string;
  variant?: "primary" | "olive";
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (outOfStock) {
    return (
      <button type="button" disabled className={cn("btn-outline w-full", className)}>
        Tükendi
      </button>
    );
  }

  function handleClick() {
    addItem({ ...input, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(variant === "olive" ? "btn-olive" : "btn-primary", "w-full", className)}
      aria-live="polite"
    >
      {added ? (
        <>
          <CheckIcon /> Sepete eklendi
        </>
      ) : (
        <>
          <BagIcon /> {label}
        </>
      )}
    </button>
  );
}
