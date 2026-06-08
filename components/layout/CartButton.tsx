"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { BagIcon } from "@/components/icons";

export function CartButton() {
  const { itemCount, hydrated } = useCart();
  const count = hydrated ? itemCount : 0;

  return (
    <Link
      href="/sepet"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-cream-200"
      aria-label={`Sepet${count > 0 ? `, ${count} ürün` : ""}`}
    >
      <BagIcon className="text-xl" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pepper px-1 text-[0.7rem] font-bold text-cream-50">
          {count}
        </span>
      )}
    </Link>
  );
}
