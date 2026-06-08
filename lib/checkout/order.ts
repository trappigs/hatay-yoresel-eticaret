import type { PaymentMethod } from "@/lib/integrations/payment";

/**
 * Phase 1 "order" model. There is no backend yet, so a placed order is kept in
 * sessionStorage purely to render the confirmation page. In Phase 2 this is
 * replaced by a real Medusa order + server-side price recomputation.
 */
export interface PlacedOrderItem {
  title: string;
  variantTitle?: string;
  quantity: number;
  unitPrice: number; // kuruş
}

export interface PlacedOrder {
  orderNo: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    district: string;
    address: string;
    note?: string;
    invoiceType: "individual" | "corporate";
    tckn?: string;
    taxOffice?: string;
    taxNumber?: string;
  };
  paymentMethod: PaymentMethod;
  items: PlacedOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

const ORDER_STORAGE_KEY = "hatay-last-order";

export function generateOrderNo(): string {
  const stamp = Date.now().toString().slice(-6);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `HY-${stamp}-${rand}`;
}

export function saveOrder(order: PlacedOrder): void {
  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Non-fatal.
  }
}

export function loadLastOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}
