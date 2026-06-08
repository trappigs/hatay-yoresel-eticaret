import { NextResponse } from "next/server";
import {
  createMedusaOrder,
  type MedusaOrderLine,
  type MedusaOrderCustomer,
  type MedusaOrderExtra,
} from "@/lib/commerce/medusa-cart";

/**
 * Phase 2 order-persistence endpoint. Creates and completes a real Medusa order
 * from cart lines using the manual payment provider. Only meaningful when the
 * Medusa backend is running and seeded (COMMERCE_ADAPTER=medusa).
 *
 * The default storefront checkout still uses the mock (localStorage) receipt;
 * switch CheckoutForm to POST here when going live with Medusa. Prices/totals
 * are recomputed by Medusa server-side — the client never sets the final price.
 */
export async function POST(request: Request) {
  if ((process.env.COMMERCE_ADAPTER || "mock").toLowerCase() !== "medusa") {
    return NextResponse.json(
      { error: "Medusa adapter is not active (set COMMERCE_ADAPTER=medusa)." },
      { status: 400 },
    );
  }

  let payload: {
    lines?: MedusaOrderLine[];
    customer?: MedusaOrderCustomer;
    extra?: MedusaOrderExtra;
  };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { lines, customer, extra } = payload;
  if (!lines?.length || !customer?.email) {
    return NextResponse.json({ error: "lines[] and customer.email are required." }, { status: 400 });
  }
  if (lines.some((l) => !l.variantId)) {
    return NextResponse.json({ error: "Each line requires a variantId." }, { status: 400 });
  }

  try {
    const order = await createMedusaOrder(lines, customer, extra ?? {});
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Detailed (technical) error stays server-side; the client shows a friendly TR message.
    if (process.env.NODE_ENV !== "production") {
      console.error("[checkout/medusa] order creation failed:", message);
    }
    return NextResponse.json({ ok: false, error: "order_creation_failed" }, { status: 502 });
  }
}
