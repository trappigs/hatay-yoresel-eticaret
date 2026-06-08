"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart/cart-context";
import { commerceConfig } from "@/lib/config/commerce.config";
import { storeConfig, identity } from "@/lib/config/store.config";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { BagIcon, InfoIcon, ShieldCheckIcon } from "@/components/icons";
import {
  generateOrderNo,
  saveOrder,
  type PlacedOrder,
} from "@/lib/checkout/order";
import type { PaymentMethod } from "@/lib/integrations/payment";

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  note: string;
  invoiceType: "individual" | "corporate";
  tckn: string;
  taxOffice: string;
  taxNumber: string;
  paymentMethod: PaymentMethod;
}

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  district: "",
  address: "",
  note: "",
  invoiceType: "individual",
  tckn: "",
  taxOffice: "",
  taxNumber: "",
  paymentMethod: "card",
};

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-ink-soft">
        {label} {required && <span className="text-pepper">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-pepper">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-olive";

export function CheckoutForm({
  mode = "mock",
  paytrConfigured = false,
}: {
  mode?: "mock" | "medusa";
  paytrConfigured?: boolean;
}) {
  const router = useRouter();
  const { lines, hydrated, subtotal, shipping, total, clear } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Ad soyad gerekli.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Geçerli bir telefon girin.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Geçerli bir e-posta girin.";
    if (!form.city.trim()) e.city = "İl gerekli.";
    if (!form.district.trim()) e.district = "İlçe gerekli.";
    if (form.address.trim().length < 10) e.address = "Açık adres gerekli.";
    if (form.invoiceType === "corporate") {
      if (!form.taxOffice.trim()) e.taxOffice = "Vergi dairesi gerekli.";
      if (form.taxNumber.replace(/\D/g, "").length < 10) e.taxNumber = "Vergi numarası gerekli.";
    }
    return e;
  }

  /** Build the local receipt snapshot shown on the confirmation page. */
  function buildOrder(orderNo: string): PlacedOrder {
    return {
      orderNo,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        district: form.district.trim(),
        address: form.address.trim(),
        note: form.note.trim() || undefined,
        invoiceType: form.invoiceType,
        tckn: form.tckn.trim() || undefined,
        taxOffice: form.invoiceType === "corporate" ? form.taxOffice.trim() : undefined,
        taxNumber: form.invoiceType === "corporate" ? form.taxNumber.trim() : undefined,
      },
      paymentMethod: form.paymentMethod,
      items: lines.map((l) => ({
        title: l.title,
        variantTitle: l.variantTitle,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
      })),
      subtotal,
      shipping,
      total,
    };
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setCheckoutError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.getElementById(Object.keys(e)[0]);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    // Mock mode: keep the Phase 1 local receipt behavior unchanged.
    if (mode !== "medusa") {
      saveOrder(buildOrder(generateOrderNo()));
      clear();
      router.push("/odeme/onay");
      return;
    }

    // Medusa mode: server-side order. Totals are recomputed by Medusa — the
    // client never sets the final price. No silent fallback to mock.
    const medusaLines = lines.map((l) => ({ variantId: l.variantId ?? "", quantity: l.quantity }));
    if (medusaLines.some((l) => !l.variantId)) {
      setSubmitting(false);
      setCheckoutError("Sepetteki bir ürünün varyant bilgisi eksik. Sepeti güncelleyip tekrar deneyin.");
      return;
    }

    const parts = form.fullName.trim().split(/\s+/);
    const customer = {
      email: form.email.trim(),
      firstName: parts[0] || form.fullName.trim(),
      lastName: parts.slice(1).join(" "),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      district: form.district.trim(),
    };
    const extra = {
      note: form.note.trim() || undefined,
      invoiceType: form.invoiceType,
      tckn: form.invoiceType === "individual" ? form.tckn.trim() || undefined : undefined,
      taxOffice: form.invoiceType === "corporate" ? form.taxOffice.trim() : undefined,
      taxNumber: form.invoiceType === "corporate" ? form.taxNumber.trim() : undefined,
      paymentMethod: form.paymentMethod,
    };

    // --- Card (PayTR) ---
    if (form.paymentMethod === "card") {
      if (!paytrConfigured) {
        setSubmitting(false);
        setCheckoutError("Kart ödemesi şu anda kullanılamıyor. Lütfen havale/EFT veya kapıda ödeme seçin.");
        return;
      }
      const basket = lines.map((l) => ({
        name: l.variantTitle ? `${l.title} ${l.variantTitle}` : l.title,
        priceKurus: l.unitPrice,
        quantity: l.quantity,
      }));
      try {
        const res = await fetch("/api/payment/paytr/token", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lines: medusaLines, customer, extra, basket }),
        });
        const data = (await res.json().catch(() => null)) as { ok?: boolean; token?: string; error?: string } | null;
        if (!res.ok || !data?.ok || !data.token) {
          setSubmitting(false);
          setCheckoutError(
            data?.error === "not_configured"
              ? "Kart ödemesi şu anda kullanılamıyor. Lütfen havale/EFT veya kapıda ödeme seçin."
              : "Ödeme başlatılamadı. Lütfen tekrar deneyin veya farklı bir ödeme yöntemi seçin.",
          );
          return;
        }
        // Pending receipt (order number set after PayTR confirms). Cart kept until success.
        saveOrder(buildOrder(""));
        sessionStorage.setItem("paytr-token", data.token);
        router.push("/odeme/paytr");
      } catch {
        setSubmitting(false);
        setCheckoutError("Bağlantı hatası. Ödeme başlatılamadı, lütfen tekrar deneyin.");
      }
      return;
    }

    // --- Bank transfer / Cash on delivery: create + complete the order now ---
    try {
      const res = await fetch("/api/checkout/medusa", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lines: medusaLines, customer, extra }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; order?: { orderId: string; displayId?: number } }
        | null;

      if (!res.ok || !data?.ok || !data.order) {
        // Failure: do NOT clear the cart, keep form values, show a clear error.
        setSubmitting(false);
        setCheckoutError("Siparişiniz oluşturulamadı. Lütfen tekrar deneyin; sorun sürerse bizimle iletişime geçin.");
        return;
      }

      const orderNo = data.order.displayId != null ? `HY-${data.order.displayId}` : data.order.orderId;
      saveOrder(buildOrder(orderNo));
      clear();
      router.push("/odeme/onay");
    } catch {
      setSubmitting(false);
      setCheckoutError("Bağlantı hatası. Siparişiniz oluşturulamadı, lütfen tekrar deneyin.");
    }
  }

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-2xl bg-cream-200" />;
  }

  // `submitting` guard: after a successful order we clear() the cart, which would
  // otherwise flash this empty state for a frame before the redirect completes.
  if (lines.length === 0 && !submitting) {
    return (
      <EmptyState
        icon={<BagIcon />}
        title="Sepetiniz boş"
        description="Ödeme yapabilmek için önce sepetinize ürün ekleyin."
        actionLabel="Ürünleri keşfet"
        actionHref="/urunler"
      />
    );
  }

  const payments: { value: PaymentMethod; label: string; enabled: boolean; hint: string }[] = [
    {
      value: "card",
      label: "Kredi / Banka Kartı",
      enabled: commerceConfig.payment.card,
      hint:
        mode === "medusa"
          ? paytrConfigured
            ? "PayTR ile güvenli ödeme"
            : "Şu an kullanılamıyor — havale/EFT veya kapıda ödeme seçin"
          : "Güvenli ödeme",
    },
    { value: "bank_transfer", label: "Havale / EFT", enabled: commerceConfig.payment.bankTransfer, hint: "Sipariş sonrası IBAN paylaşılır" },
    { value: "cash_on_delivery", label: "Kapıda Ödeme", enabled: commerceConfig.payment.cashOnDelivery, hint: "Teslimatta nakit/kart" },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_22rem]" noValidate>
      <div className="space-y-8">
        {/* Teslimat */}
        <section className="card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Teslimat Bilgileri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ad Soyad" htmlFor="fullName" required error={errors.fullName} className="sm:col-span-2">
              <input id="fullName" className={inputClass} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Telefon" htmlFor="phone" required error={errors.phone}>
              <input id="phone" type="tel" className={inputClass} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="05XX XXX XX XX" autoComplete="tel" />
            </Field>
            <Field label="E-posta" htmlFor="email" required error={errors.email}>
              <input id="email" type="email" className={inputClass} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
            </Field>
            <Field label="İl" htmlFor="city" required error={errors.city}>
              <input id="city" className={inputClass} value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level1" />
            </Field>
            <Field label="İlçe" htmlFor="district" required error={errors.district}>
              <input id="district" className={inputClass} value={form.district} onChange={(e) => set("district", e.target.value)} autoComplete="address-level2" />
            </Field>
            <Field label="Açık Adres" htmlFor="address" required error={errors.address} className="sm:col-span-2">
              <textarea id="address" rows={3} className={inputClass} value={form.address} onChange={(e) => set("address", e.target.value)} autoComplete="street-address" />
            </Field>
            <Field label="Sipariş Notu" htmlFor="note" className="sm:col-span-2">
              <textarea id="note" rows={2} className={inputClass} value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="Teslimat için not (opsiyonel)" />
            </Field>
          </div>
        </section>

        {/* Fatura */}
        <section className="card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Fatura Bilgileri</h2>
          <div className="mb-4 flex gap-2">
            {(["individual", "corporate"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("invoiceType", t)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-semibold",
                  form.invoiceType === t ? "border-pepper bg-pepper/5 text-pepper" : "border-line",
                )}
                aria-pressed={form.invoiceType === t}
              >
                {t === "individual" ? "Bireysel" : "Kurumsal"}
              </button>
            ))}
          </div>

          {form.invoiceType === "individual" ? (
            <Field label="TCKN (opsiyonel)" htmlFor="tckn">
              <input id="tckn" inputMode="numeric" className={inputClass} value={form.tckn} onChange={(e) => set("tckn", e.target.value)} maxLength={11} />
            </Field>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vergi Dairesi" htmlFor="taxOffice" required error={errors.taxOffice}>
                <input id="taxOffice" className={inputClass} value={form.taxOffice} onChange={(e) => set("taxOffice", e.target.value)} />
              </Field>
              <Field label="Vergi Numarası" htmlFor="taxNumber" required error={errors.taxNumber}>
                <input id="taxNumber" inputMode="numeric" className={inputClass} value={form.taxNumber} onChange={(e) => set("taxNumber", e.target.value)} maxLength={11} />
              </Field>
            </div>
          )}
        </section>

        {/* Ödeme */}
        <section className="card p-5">
          <h2 className="mb-4 font-serif text-lg font-semibold">Ödeme Yöntemi</h2>
          <div className="space-y-2">
            {payments.filter((p) => p.enabled).map((p) => (
              <label
                key={p.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3",
                  form.paymentMethod === p.value ? "border-pepper bg-pepper/5" : "border-line",
                )}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={p.value}
                  checked={form.paymentMethod === p.value}
                  onChange={() => set("paymentMethod", p.value)}
                  className="accent-pepper"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{p.label}</span>
                  <span className="text-xs text-ink-muted">{p.hint}</span>
                </span>
              </label>
            ))}
          </div>
          {form.paymentMethod === "bank_transfer" && (
            <div className="mt-3 space-y-1 rounded-xl border border-line bg-cream-100 p-3 text-xs text-ink-soft">
              <p className="font-semibold text-ink">Havale / EFT Bilgileri</p>
              {identity.hasBankDetails ? (
                <>
                  <p>Banka: {storeConfig.bankTransfer.bankName}</p>
                  <p>Hesap Sahibi: {storeConfig.bankTransfer.accountName}</p>
                  <p>IBAN: {storeConfig.bankTransfer.iban}</p>
                  <p className="mt-1">
                    Açıklama kısmına sipariş numaranızı yazmanız yeterlidir. Ödemeniz onaylandıktan
                    sonra siparişiniz hazırlanır.
                  </p>
                </>
              ) : (
                <p>
                  Havale/EFT hesap bilgileri, siparişiniz oluştuktan sonra e-posta/SMS ile sizinle
                  paylaşılacaktır.
                </p>
              )}
            </div>
          )}

          <p className="mt-3 flex gap-2 rounded-xl border border-olive/25 bg-olive/5 p-3 text-xs text-ink-soft">
            <InfoIcon className="mt-0.5 shrink-0 text-sm text-olive" />
            <span>
              {paytrConfigured
                ? "Kart ödemeleri PayTR güvenli ödeme altyapısı ile alınır; kart bilgileriniz bizimle paylaşılmaz. Havale/EFT ve kapıda ödeme de mevcuttur."
                : "Online kart ödemesi henüz aktif değil. Şu an siparişinizi oluşturabilir, havale/EFT veya kapıda ödeme ile ilerleyebilirsiniz."}
            </span>
          </p>
        </section>
      </div>

      <div className="space-y-3">
        <OrderSummary />
        {checkoutError && (
          <div className="rounded-xl border border-pepper/30 bg-pepper/5 p-3 text-sm text-pepper" role="alert">
            {checkoutError}
          </div>
        )}
        <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-base">
          {submitting ? "İşleniyor…" : "Siparişi Tamamla"}
        </button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
          <ShieldCheckIcon className="text-sm text-olive" /> Bilgileriniz yalnızca siparişiniz için kullanılır.
        </p>
        <Link href="/sepet" className="block text-center text-sm text-pepper hover:text-pepper-dark">
          ← Sepete dön
        </Link>
      </div>
    </form>
  );
}
