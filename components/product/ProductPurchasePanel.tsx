"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { commerceConfig } from "@/lib/config/commerce.config";
import { priceInfo, defaultVariant } from "@/lib/commerce/product-helpers";
import type { Product } from "@/lib/commerce/types";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import type { AddToCartInput } from "@/lib/cart/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const initial = defaultVariant(product);
  const [variantId, setVariantId] = useState<string | undefined>(initial?.id);
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants?.find((v) => v.id === variantId);
  const info = useMemo(() => priceInfo(product, variant), [product, variant]);
  const stock = variant?.stock ?? product.stock;
  const out = stock <= 0;
  const low = !out && stock <= commerceConfig.lowStockThreshold;

  const addInput: AddToCartInput = {
    productId: product.id,
    variantId: variant?.id,
    slug: product.slug,
    title: product.title,
    variantTitle: variant?.title,
    unitPrice: info.price,
    image: product.images[0],
    cargoType: product.cargoType,
    maxStock: stock,
  };

  function selectVariant(id: string) {
    setVariantId(id);
    setQuantity(1);
  }

  return (
    <div className="space-y-5">
      <PriceDisplay price={info.price} original={info.original} size="lg" />

      {product.variants && product.variants.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-ink-soft">Boyut / Ağırlık</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const selected = v.id === variantId;
              const vOut = v.stock <= 0;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => selectVariant(v.id)}
                  className={cn(
                    "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                    selected ? "border-pepper bg-pepper/5 text-pepper" : "border-line hover:border-olive",
                    vOut && "text-ink-muted line-through",
                  )}
                  aria-pressed={selected}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div aria-live="polite">
        {out ? (
          <p className="text-sm font-semibold text-pepper">Bu ürün şu anda tükendi.</p>
        ) : low ? (
          <p className="text-sm font-semibold text-gold">Son {stock} adet — sınırlı stok.</p>
        ) : (
          <p className="text-sm font-medium text-olive">Stokta — kısa sürede kargolanır.</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} max={Math.max(1, stock)} />
        <div className="min-w-[12rem] flex-1">
          <AddToCartButton input={addInput} quantity={quantity} outOfStock={out} />
        </div>
      </div>

      <p className="text-xs text-ink-muted">
        {product.cargoType === "cold_chain" && "Soğuk zincir ile gönderilir. "}
        {product.cargoType === "fragile" && "Kırılabilir ürün, özel paketlenir. "}
        Kapıda ödeme ve havale seçenekleri mevcuttur.
      </p>
    </div>
  );
}
