"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/money";
import { ShieldCheckIcon } from "@/components/icons";

/**
 * Order totals box, shared by cart + checkout. Reads live cart state.
 * `action` optionally renders a CTA (e.g. "Ödemeye geç").
 */
export function OrderSummary({
  action,
  note,
}: {
  action?: { label: string; href: string };
  note?: string;
}) {
  const { subtotal, shipping, total, itemCount } = useCart();

  return (
    <div className="card sticky top-24 space-y-4 p-5">
      <h2 className="font-serif text-lg font-semibold">Sipariş Özeti</h2>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-muted">Ara toplam ({itemCount} ürün)</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Kargo</dt>
          <dd className="font-medium">{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</dd>
        </div>
        <div className="my-2 border-t border-line" />
        <div className="flex items-baseline justify-between">
          <dt className="font-semibold">Toplam</dt>
          <dd className="text-xl font-bold text-pepper">{formatPrice(total)}</dd>
        </div>
        <p className="text-xs text-ink-muted">KDV dahildir.</p>
      </dl>

      {action && (
        <Link href={action.href} className="btn-primary w-full">
          {action.label}
        </Link>
      )}
      {note && <p className="text-xs text-ink-muted">{note}</p>}

      <p className="flex items-center justify-center gap-1.5 border-t border-line pt-3 text-xs text-ink-muted">
        <ShieldCheckIcon className="text-sm text-olive" /> Güvenli alışveriş · bilgileriniz korunur
      </p>
    </div>
  );
}
