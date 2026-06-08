/**
 * Money is stored everywhere as an integer number of kuruş (1 TRY = 100 kuruş).
 * Never use floats for prices. Format only at the display boundary.
 */

const formatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format an integer kuruş amount as a Turkish Lira string, e.g. 14990 → "₺149,90". */
export function formatPrice(kurus: number): string {
  return formatter.format(kurus / 100);
}

/** Discount percentage as a positive integer, e.g. price 20000, discount 15000 → 25. */
export function discountPercent(price: number, discountPrice: number): number {
  if (!price || discountPrice >= price) return 0;
  return Math.round((1 - discountPrice / price) * 100);
}

/** The price a customer actually pays for an item (discount if present and valid). */
export function effectivePrice(price: number, discountPrice?: number): number {
  if (discountPrice != null && discountPrice > 0 && discountPrice < price) {
    return discountPrice;
  }
  return price;
}
