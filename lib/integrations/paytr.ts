import crypto from "node:crypto";

/**
 * PayTR (iFrame API) integration — SERVER ONLY.
 *
 * Security:
 *  - merchant_key / merchant_salt are read from env at call time and never sent
 *    to the client. Only the one-time PayTR `token` reaches the browser.
 *  - The get-token hash and the callback hash are computed/verified here.
 *  - Card data never touches our server or client — it stays in the PayTR iframe.
 *
 * Flow: token route prepares a Medusa cart → generates a PayTR token → client
 * shows the PayTR iframe → user pays → PayTR posts to the callback route (verified
 * here) → on success the Medusa cart is completed into an order.
 *
 * If credentials are missing, the integration is DISABLED (isPaytrConfigured()
 * returns false) and nothing is faked.
 */

interface PaytrConfig {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  testMode: "0" | "1";
}

function getConfig(): PaytrConfig | null {
  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
  if (!merchantId || !merchantKey || !merchantSalt) return null;
  return {
    merchantId,
    merchantKey,
    merchantSalt,
    testMode: process.env.PAYTR_TEST_MODE === "0" ? "0" : "1", // default to TEST for safety
  };
}

export function isPaytrConfigured(): boolean {
  return getConfig() !== null;
}

export function isPaytrTestMode(): boolean {
  return (getConfig()?.testMode ?? "1") === "1";
}

// ---- Medusa cart id <-> PayTR merchant_oid (alphanumeric only) ----
// Medusa cart ids are `cart_<ULID>` (a single underscore). PayTR requires an
// alphanumeric merchant_oid, so we strip the underscore and restore it later.
export function cartIdToMerchantOid(cartId: string): string {
  return cartId.replace(/[^a-zA-Z0-9]/g, "");
}
export function merchantOidToCartId(oid: string): string {
  return oid.startsWith("cart") ? `cart_${oid.slice(4)}` : oid;
}

export interface PaytrBasketItem {
  name: string;
  /** unit price in kuruş */
  priceKurus: number;
  quantity: number;
}

export interface PaytrTokenInput {
  merchantOid: string;
  email: string;
  /** authoritative amount in kuruş (from Medusa, never the client) */
  amountKurus: number;
  userIp: string;
  userName: string;
  userAddress: string;
  userPhone: string;
  basket: PaytrBasketItem[];
  okUrl: string;
  failUrl: string;
}

export type PaytrTokenResult = { ok: true; token: string } | { ok: false; error: string };

/** Generate a PayTR iframe token via the get-token API. */
export async function generatePaytrToken(input: PaytrTokenInput): Promise<PaytrTokenResult> {
  const cfg = getConfig();
  if (!cfg) return { ok: false, error: "not_configured" };

  const no_installment = "0";
  const max_installment = "0";
  const currency = "TL";
  const payment_amount = String(Math.round(input.amountKurus));

  // user_basket = base64( JSON [[name, unitPriceMajor, qty], ...] )
  const basket = input.basket.map((b) => [b.name, (b.priceKurus / 100).toFixed(2), b.quantity]);
  const user_basket = Buffer.from(JSON.stringify(basket)).toString("base64");

  const hashStr =
    cfg.merchantId +
    input.userIp +
    input.merchantOid +
    input.email +
    payment_amount +
    user_basket +
    no_installment +
    max_installment +
    currency +
    cfg.testMode;

  const paytr_token = crypto
    .createHmac("sha256", cfg.merchantKey)
    .update(hashStr + cfg.merchantSalt)
    .digest("base64");

  const form = new URLSearchParams({
    merchant_id: cfg.merchantId,
    user_ip: input.userIp,
    merchant_oid: input.merchantOid,
    email: input.email,
    payment_amount,
    paytr_token,
    user_basket,
    debug_on: cfg.testMode,
    no_installment,
    max_installment,
    user_name: input.userName.slice(0, 60) || "Müşteri",
    user_address: input.userAddress.slice(0, 200) || "-",
    user_phone: input.userPhone || "-",
    merchant_ok_url: input.okUrl,
    merchant_fail_url: input.failUrl,
    timeout_limit: "30",
    currency,
    test_mode: cfg.testMode,
    lang: "tr",
  });

  let res: Response;
  try {
    res = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      cache: "no-store",
    });
  } catch {
    return { ok: false, error: "paytr_unreachable" };
  }

  const data = (await res.json().catch(() => null)) as
    | { status?: string; token?: string; reason?: string }
    | null;
  if (!data || data.status !== "success" || !data.token) {
    return { ok: false, error: data?.reason || "paytr_token_failed" };
  }
  return { ok: true, token: data.token };
}

export interface PaytrCallbackResult {
  valid: boolean;
  merchantOid?: string;
  success?: boolean;
  failedReason?: string;
}

/** Verify a PayTR callback POST (hash check) — never trust the callback blindly. */
export function verifyPaytrCallback(body: Record<string, string>): PaytrCallbackResult {
  const cfg = getConfig();
  if (!cfg) return { valid: false };

  const { merchant_oid, status, total_amount, hash } = body;
  if (!merchant_oid || !status || !total_amount || !hash) return { valid: false };

  const computed = crypto
    .createHmac("sha256", cfg.merchantKey)
    .update(merchant_oid + cfg.merchantSalt + status + total_amount)
    .digest("base64");

  const a = Buffer.from(computed);
  const b = Buffer.from(hash);
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);

  return {
    valid,
    merchantOid: merchant_oid,
    success: status === "success",
    failedReason: body.failed_reason_msg,
  };
}
