/**
 * Payment integration placeholder (Phase 2). Designed as a swappable module:
 * implement a provider, register it below, select it via PAYMENT_PROVIDER env.
 *
 * NEVER hardcode credentials. Read them from env at call time on the server.
 * TODO(Phase 2): implement PayTR and/or iyzico providers.
 */
export type PaymentMethod = "card" | "bank_transfer" | "cash_on_delivery";

export interface PaymentRequest {
  orderId: string;
  amount: number; // kuruş — recompute server-side, never trust the client
  method: PaymentMethod;
  customerEmail: string;
}

export interface PaymentResult {
  status: "pending" | "redirect" | "paid" | "error";
  /** For hosted/redirect flows (e.g. PayTR iframe, iyzico 3DS). */
  redirectUrl?: string;
  message: string;
}

export interface PaymentProvider {
  readonly name: string;
  createPayment(req: PaymentRequest): Promise<PaymentResult>;
}

const notConfigured: PaymentProvider = {
  name: "not-configured",
  async createPayment() {
    return {
      status: "error",
      message:
        "Ödeme sağlayıcısı henüz yapılandırılmadı. (Phase 2: PayTR / iyzico entegrasyonu)",
    };
  },
};

/** Returns the active payment provider based on env (placeholder in Phase 1). */
export function getPaymentProvider(): PaymentProvider {
  // const provider = process.env.PAYMENT_PROVIDER; // "paytr" | "iyzico"
  // TODO(Phase 2): switch on provider and return a real implementation.
  return notConfigured;
}
