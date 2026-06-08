import { commerceConfig } from "@/lib/config/commerce.config";
import { effectivePrice } from "@/lib/money";
import type { Product, ProductVariant } from "@/lib/commerce/types";

/** Total purchasable stock for a product (sum of variants, or product stock). */
export function totalStock(product: Product): number {
  if (product.variants && product.variants.length > 0) {
    return product.variants.reduce((sum, v) => sum + v.stock, 0);
  }
  return product.stock;
}

export function isOutOfStock(product: Product): boolean {
  return totalStock(product) <= 0;
}

export function isLowStock(product: Product): boolean {
  const stock = totalStock(product);
  return stock > 0 && stock <= commerceConfig.lowStockThreshold;
}

/** First in-stock variant, else the first variant, else undefined. */
export function defaultVariant(product: Product): ProductVariant | undefined {
  if (!product.variants || product.variants.length === 0) return undefined;
  return product.variants.find((v) => v.stock > 0) ?? product.variants[0];
}

interface PriceInfo {
  /** Price the customer pays (discount applied if valid). */
  price: number;
  /** Original price, only set when a discount is active. */
  original?: number;
}

/** Effective price info for a product (optionally for a specific variant). */
export function priceInfo(
  product: Product,
  variant?: ProductVariant,
): PriceInfo {
  const base = variant ?? defaultVariant(product);
  const price = base?.price ?? product.price;
  const discount = base?.discountPrice ?? product.discountPrice;
  const paid = effectivePrice(price, discount);
  return paid < price ? { price: paid, original: price } : { price };
}

/** Lowest effective price across variants — used for "from" labels on cards. */
export function fromPrice(product: Product): PriceInfo {
  if (!product.variants || product.variants.length === 0) {
    return priceInfo(product);
  }
  let best: PriceInfo | null = null;
  for (const v of product.variants) {
    const info = priceInfo(product, v);
    if (!best || info.price < best.price) best = info;
  }
  return best ?? priceInfo(product);
}

/** True when product has more than one distinct variant (show "from" prefix). */
export function hasMultipleVariants(product: Product): boolean {
  return (product.variants?.length ?? 0) > 1;
}
