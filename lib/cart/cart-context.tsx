"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { shippingFor, freeShippingRemaining } from "@/lib/config/commerce.config";
import type { AddToCartInput, CartLine } from "@/lib/cart/types";

const STORAGE_KEY = "hatay-cart-v1";

interface CartContextValue {
  lines: CartLine[];
  /** False until localStorage has been read (avoids hydration mismatch). */
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  hasColdChain: boolean;
  hasFragile: boolean;
  addItem: (input: AddToCartInput) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(productId: string, variantId?: string): string {
  return `${productId}:${variantId ?? "default"}`;
}

function clampQty(qty: number, max: number): number {
  if (Number.isNaN(qty)) return 1;
  return Math.max(1, Math.min(qty, Math.max(1, max)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // Corrupt storage — ignore and start empty.
    }
    setHydrated(true);
  }, []);

  // Persist on change (only after hydration so we don't clobber stored data).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage full / unavailable — non-fatal.
    }
  }, [lines, hydrated]);

  const addItem = useCallback((input: AddToCartInput) => {
    const key = lineKey(input.productId, input.variantId);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      const addQty = input.quantity ?? 1;
      if (existing) {
        return prev.map((l) =>
          l.key === key
            ? { ...l, quantity: clampQty(l.quantity + addQty, input.maxStock), maxStock: input.maxStock }
            : l,
        );
      }
      const line: CartLine = {
        key,
        productId: input.productId,
        variantId: input.variantId,
        slug: input.slug,
        title: input.title,
        variantTitle: input.variantTitle,
        unitPrice: input.unitPrice,
        image: input.image,
        cargoType: input.cargoType,
        quantity: clampQty(addQty, input.maxStock),
        maxStock: input.maxStock,
      };
      return [...prev, line];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, quantity: clampQty(quantity, l.maxStock) } : l)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const derived = useMemo(() => {
    const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
    const shipping = shippingFor(subtotal);
    return {
      itemCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingRemaining: freeShippingRemaining(subtotal),
      hasColdChain: lines.some((l) => l.cargoType === "cold_chain"),
      hasFragile: lines.some((l) => l.cargoType === "fragile"),
    };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    hydrated,
    ...derived,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
