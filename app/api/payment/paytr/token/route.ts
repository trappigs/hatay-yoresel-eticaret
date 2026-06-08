import { NextResponse } from "next/server";
import {
  prepareMedusaCart,
  type MedusaOrderLine,
  type MedusaOrderCustomer,
  type MedusaOrderExtra,
} from "@/lib/commerce/medusa-cart";
import {
  generatePaytrToken,
  isPaytrConfigured,
  cartIdToMerchantOid,
  type PaytrBasketItem,
} from "@/lib/integrations/paytr";

/**
 * Starts a PayTR card payment: prepares a Medusa cart (NOT completed) and returns
 * a one-time PayTR iframe token. The cart is completed only after PayTR confirms
 * payment in the callback route. No secrets ever reach the client.
 */
export async function POST(request: Request) {
  if ((process.env.COMMERCE_ADAPTER || "mock").toLowerCase() !== "medusa") {
    return NextResponse.json({ ok: false, error: "medusa_not_active" }, { status: 400 });
  }
  if (!isPaytrConfigured()) {
    // Disabled, not faked. Client shows a clear message and offers manual methods.
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let payload: {
    lines?: MedusaOrderLine[];
    customer?: MedusaOrderCustomer;
    extra?: MedusaOrderExtra;
    basket?: PaytrBasketItem[];
  };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const { lines, customer, extra, basket } = payload;
  if (!lines?.length || !customer?.email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (lines.some((l) => !l.variantId)) {
    return NextResponse.json({ ok: false, error: "missing_variant" }, { status: 400 });
  }

  try {
    // 1. Prepare the Medusa cart (authoritative total in kuruş).
    const { cartId, totalKurus } = await prepareMedusaCart(lines, customer, {
      ...extra,
      paymentMethod: "card",
    });
    const merchantOid = cartIdToMerchantOid(cartId);

    // 2. URLs (env overrides; otherwise derive from the site URL).
    const base = (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, "");
    const okUrl = process.env.PAYTR_SUCCESS_URL || `${base}/odeme/onay?odeme=basarili`;
    const failUrl = process.env.PAYTR_FAIL_URL || `${base}/odeme/hata`;

    // 3. Buyer IP (PayTR requires it).
    const userIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 4. Basket is display-only; the CHARGE is the Medusa total above.
    const items: PaytrBasketItem[] =
      basket && basket.length > 0
        ? basket
        : [{ name: "Sipariş", priceKurus: totalKurus, quantity: 1 }];

    const result = await generatePaytrToken({
      merchantOid,
      email: customer.email,
      amountKurus: totalKurus,
      userIp,
      userName: `${customer.firstName} ${customer.lastName ?? ""}`.trim(),
      userAddress: `${customer.address} ${customer.district}/${customer.city}`,
      userPhone: customer.phone ?? "",
      basket: items,
      okUrl,
      failUrl,
    });

    if (!result.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[paytr/token] failed:", result.error);
      }
      return NextResponse.json({ ok: false, error: "paytr_token_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, token: result.token });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[paytr/token] error:", err instanceof Error ? err.message : err);
    }
    return NextResponse.json({ ok: false, error: "payment_start_failed" }, { status: 502 });
  }
}
