/**
 * Medusa cart → order persistence (Phase 2).
 *
 * Two-phase so payment providers can complete AFTER payment:
 *   - prepareMedusaCart()  — create cart, add items, address, shipping, manual
 *                            payment session. Does NOT complete. Returns id + total.
 *   - completeMedusaCart()  — complete the prepared cart into an order.
 *   - createMedusaOrder()   — prepare + complete in one call (manual bank/COD flow).
 *
 * Server-only (uses the publishable key from server env).
 */

const MANUAL_PROVIDER = "pp_system_default";

function cfg() {
  const url = (process.env.MEDUSA_BACKEND_URL || "").replace(/\/$/, "");
  const key = process.env.MEDUSA_PUBLISHABLE_KEY || "";
  if (!url || !key) {
    throw new Error("[medusa-cart] MEDUSA_BACKEND_URL and MEDUSA_PUBLISHABLE_KEY are required.");
  }
  return { url, key };
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const { url, key } = cfg();
  const res = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-publishable-api-key": key,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`[medusa-cart] ${init?.method ?? "GET"} ${path} -> ${res.status} ${body}`);
  }
  return (await res.json()) as T;
}

export interface MedusaOrderLine {
  variantId: string;
  quantity: number;
}

export interface MedusaOrderCustomer {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  address: string;
  city: string;
  district: string;
}

export interface MedusaOrderResult {
  orderId: string;
  displayId?: number;
}

/** Extra fields with no native Store-API column — stored as cart/order metadata. */
export interface MedusaOrderExtra {
  note?: string;
  invoiceType?: "individual" | "corporate";
  tckn?: string;
  taxOffice?: string;
  taxNumber?: string;
  paymentMethod?: string;
  /** Free-form extra metadata (e.g. PayTR merchant_oid). */
  [key: string]: string | undefined;
}

export interface PreparedCart {
  cartId: string;
  /** Authoritative grand total in integer kuruş (Medusa-computed). */
  totalKurus: number;
}

async function resolveRegionId(): Promise<string> {
  const data = await api<{ regions: { id: string; currency_code: string }[] }>("/store/regions");
  const tr = data.regions.find((r) => r.currency_code?.toLowerCase() === "try") ?? data.regions[0];
  if (!tr) throw new Error("[medusa-cart] No region configured in Medusa. Run the seed script.");
  return tr.id;
}

function buildMetadata(extra: MedusaOrderExtra): Record<string, string> {
  const map: Record<string, string | undefined> = {
    note: extra.note,
    invoice_type: extra.invoiceType,
    tckn: extra.tckn,
    tax_office: extra.taxOffice,
    tax_number: extra.taxNumber,
    payment_method: extra.paymentMethod,
  };
  // Pass through any additional string keys (e.g. paytr_merchant_oid).
  for (const [k, v] of Object.entries(extra)) {
    if (
      typeof v === "string" &&
      !["note", "invoiceType", "tckn", "taxOffice", "taxNumber", "paymentMethod"].includes(k)
    ) {
      map[k] = v;
    }
  }
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(map)) if (v) out[k] = v;
  return out;
}

/**
 * Create a cart, add items + address + shipping + a manual payment session, but
 * do NOT complete it. Returns the cart id and the Medusa-computed total (kuruş).
 */
export async function prepareMedusaCart(
  lines: MedusaOrderLine[],
  customer: MedusaOrderCustomer,
  extra: MedusaOrderExtra = {},
): Promise<PreparedCart> {
  const region_id = await resolveRegionId();

  const { cart } = await api<{ cart: { id: string } }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({ region_id, email: customer.email }),
  });
  const cartId = cart.id;

  for (const line of lines) {
    await api(`/store/carts/${cartId}/line-items`, {
      method: "POST",
      body: JSON.stringify({ variant_id: line.variantId, quantity: line.quantity }),
    });
  }

  const address = {
    first_name: customer.firstName,
    last_name: customer.lastName ?? "",
    address_1: customer.address,
    city: customer.city,
    province: customer.district,
    country_code: "tr",
    phone: customer.phone ?? "",
  };
  const metadata = buildMetadata(extra);
  await api(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      email: customer.email,
      shipping_address: address,
      billing_address: address,
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
    }),
  });

  const { shipping_options } = await api<{ shipping_options: { id: string }[] }>(
    `/store/shipping-options?cart_id=${cartId}`,
  );
  if (shipping_options[0]) {
    await api(`/store/carts/${cartId}/shipping-methods`, {
      method: "POST",
      body: JSON.stringify({ option_id: shipping_options[0].id }),
    });
  }

  const { payment_collection } = await api<{ payment_collection: { id: string } }>(
    "/store/payment-collections",
    { method: "POST", body: JSON.stringify({ cart_id: cartId }) },
  );
  await api(`/store/payment-collections/${payment_collection.id}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({ provider_id: MANUAL_PROVIDER }),
  });

  // Authoritative total (kuruş) — used for the PayTR charge amount.
  const { cart: full } = await api<{ cart: { total: number } }>(`/store/carts/${cartId}?fields=total`);
  return { cartId, totalKurus: Math.round((full.total ?? 0) * 100) };
}

/** Complete a prepared cart into a real order. Idempotent-friendly for callbacks. */
export async function completeMedusaCart(cartId: string): Promise<MedusaOrderResult> {
  const result = await api<
    | { type: "order"; order: { id: string; display_id?: number } }
    | { type: "cart"; error?: { message?: string } }
  >(`/store/carts/${cartId}/complete`, { method: "POST" });

  if (result.type !== "order") {
    throw new Error(
      `[medusa-cart] Cart completion failed: ${result.error?.message ?? "unknown error"}. ` +
        "Ensure the backend has a TRY region, a shipping option, and the manual payment provider.",
    );
  }
  return { orderId: result.order.id, displayId: result.order.display_id };
}

/** Prepare + complete in one call — manual (bank transfer / cash on delivery) flow. */
export async function createMedusaOrder(
  lines: MedusaOrderLine[],
  customer: MedusaOrderCustomer,
  extra: MedusaOrderExtra = {},
): Promise<MedusaOrderResult> {
  const { cartId } = await prepareMedusaCart(lines, customer, extra);
  return completeMedusaCart(cartId);
}
