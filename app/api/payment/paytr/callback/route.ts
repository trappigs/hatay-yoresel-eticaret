import { completeMedusaCart } from "@/lib/commerce/medusa-cart";
import { verifyPaytrCallback, merchantOidToCartId } from "@/lib/integrations/paytr";

/**
 * PayTR server-to-server callback. PayTR POSTs (form-urlencoded) the payment
 * result here. We MUST verify the hash and reply with the literal "OK" so PayTR
 * stops retrying. On a verified success we complete the prepared Medusa cart.
 *
 * Configure this URL ("Bildirim URL") in the PayTR merchant panel:
 *   https://<your-domain>/api/payment/paytr/callback
 * (locally, expose it with a tunnel such as ngrok.)
 */
export async function POST(request: Request) {
  let body: Record<string, string> = {};
  try {
    const form = await request.formData();
    for (const [k, v] of form.entries()) body[k] = typeof v === "string" ? v : "";
  } catch {
    return new Response("PAYTR notification failed: bad body", { status: 400 });
  }

  const result = verifyPaytrCallback(body);

  // Invalid hash (or PayTR not configured) → reject. Never trust an unverified callback.
  if (!result.valid) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[paytr/callback] invalid hash for merchant_oid:", body.merchant_oid);
    }
    return new Response("PAYTR notification failed: bad hash", { status: 400 });
  }

  if (result.success && result.merchantOid) {
    const cartId = merchantOidToCartId(result.merchantOid);
    try {
      await completeMedusaCart(cartId);
    } catch (err) {
      // Likely already completed (PayTR can call twice) — the order exists. Log,
      // but still acknowledge so PayTR stops retrying.
      if (process.env.NODE_ENV !== "production") {
        console.error("[paytr/callback] complete error:", err instanceof Error ? err.message : err);
      }
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.error("[paytr/callback] payment failed:", result.failedReason);
  }

  // PayTR requires exactly "OK" for any verified notification.
  return new Response("OK", { status: 200, headers: { "content-type": "text/plain" } });
}
