/**
 * Commerce business rules. All amounts are integer kuruş (1 TRY = 100).
 * These are intentionally configurable — do not hardcode them in components.
 */
export const commerceConfig = {
  currency: "TRY" as const,

  /** Flat shipping fee applied below the free-shipping threshold. ₺49,90 */
  shippingFee: 4990,

  /** Order subtotal (kuruş) at/above which shipping is free. ₺750,00 */
  freeShippingThreshold: 75000,

  /** Stock at/below this count shows a "Sınırlı Stok" badge. */
  lowStockThreshold: 8,

  /** Payment methods offered at checkout (placeholders in Phase 1). */
  payment: {
    card: true, // Kredi / banka kartı
    bankTransfer: true, // Havale / EFT
    cashOnDelivery: true, // Kapıda ödeme (configurable)
  },
} as const;

/** Shipping cost (kuruş) for a given subtotal. Returns 0 at/above the threshold. */
export function shippingFor(subtotalKurus: number): number {
  if (subtotalKurus <= 0) return 0;
  return subtotalKurus >= commerceConfig.freeShippingThreshold
    ? 0
    : commerceConfig.shippingFee;
}

/** Remaining kuruş to reach free shipping (0 once reached). */
export function freeShippingRemaining(subtotalKurus: number): number {
  return Math.max(0, commerceConfig.freeShippingThreshold - subtotalKurus);
}
