"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/money";
import { ProductImage } from "@/components/product/ProductImage";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { TrustBadges } from "@/components/TrustBadges";
import { BagIcon, TrashIcon, SnowflakeIcon, AlertIcon } from "@/components/icons";

export function CartView() {
  const { lines, hydrated, updateQuantity, removeItem, hasColdChain, hasFragile } = useCart();

  if (!hydrated) {
    return <div className="h-64 animate-pulse rounded-2xl bg-cream-200" />;
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={<BagIcon />}
        title="Sepetiniz boş"
        description="Hatay'ın yöresel lezzetlerini keşfedin ve sepetinize ekleyin."
        actionLabel="Ürünleri keşfet"
        actionHref="/urunler"
      />
    );
  }

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-4">
        <FreeShippingBar />

        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-4 p-4">
              <Link href={`/urun/${line.slug}`} className="h-20 w-20 shrink-0">
                <ProductImage src={line.image} alt={line.title} title={line.title} categorySlug="" sizes="80px" compact />
              </Link>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/urun/${line.slug}`} className="font-medium leading-snug hover:text-pepper">
                      {line.title}
                    </Link>
                    {line.variantTitle && (
                      <p className="text-xs text-ink-muted">{line.variantTitle}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.key)}
                    className="text-ink-muted hover:text-pepper"
                    aria-label={`${line.title} ürününü sepetten çıkar`}
                  >
                    <TrashIcon className="text-lg" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <QuantitySelector
                    value={line.quantity}
                    onChange={(q) => updateQuantity(line.key, q)}
                    max={line.maxStock}
                    size="sm"
                  />
                  <span className="font-semibold">{formatPrice(line.unitPrice * line.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {(hasColdChain || hasFragile) && (
          <div className="flex flex-wrap gap-2 text-xs text-ink-muted">
            {hasColdChain && (
              <Badge variant="cold">
                <SnowflakeIcon /> Soğuk zincir ürünü içerir
              </Badge>
            )}
            {hasFragile && (
              <Badge variant="fragile">
                <AlertIcon /> Kırılabilir ürün içerir
              </Badge>
            )}
          </div>
        )}

        <Link href="/urunler" className="inline-block text-sm font-semibold text-pepper hover:text-pepper-dark">
          ← Alışverişe devam et
        </Link>
      </div>

      <div>
        <OrderSummary
          action={{ label: "Ödeme Adımına Geç", href: "/odeme" }}
          note="Ödeme adımında teslimat ve fatura bilgilerinizi gireceksiniz."
        />
      </div>
    </div>
    <TrustBadges className="mt-10" />
    </>
  );
}
