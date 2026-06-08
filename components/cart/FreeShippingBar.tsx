"use client";

import { useCart } from "@/lib/cart/cart-context";
import { commerceConfig } from "@/lib/config/commerce.config";
import { formatPrice } from "@/lib/money";

export function FreeShippingBar() {
  const { subtotal, freeShippingRemaining } = useCart();
  const threshold = commerceConfig.freeShippingThreshold;
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  const reached = freeShippingRemaining <= 0;

  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-sm text-ink-soft">
        {reached ? (
          <span className="font-semibold text-olive">Tebrikler! Kargo ücretsiz 🎉</span>
        ) : (
          <>
            Ücretsiz kargoya <span className="font-semibold text-pepper">{formatPrice(freeShippingRemaining)}</span> kaldı.
          </>
        )}
      </p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream-300">
        <div
          className="h-full rounded-full bg-olive transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
