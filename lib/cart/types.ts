import type { CargoType } from "@/lib/commerce/types";

/** A single line in the client cart. */
export interface CartLine {
  /** Stable line key: `${productId}:${variantId ?? "default"}` */
  key: string;
  productId: string;
  variantId?: string;
  slug: string;
  title: string;
  variantTitle?: string;
  /** Effective unit price (kuruş) at add time. Recomputed server-side on order. */
  unitPrice: number;
  image?: string;
  cargoType: CargoType;
  quantity: number;
  /** Max units the customer may add (variant or product stock). */
  maxStock: number;
}

export interface AddToCartInput {
  productId: string;
  variantId?: string;
  slug: string;
  title: string;
  variantTitle?: string;
  unitPrice: number;
  image?: string;
  cargoType: CargoType;
  maxStock: number;
  quantity?: number;
}
