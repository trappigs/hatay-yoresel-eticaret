"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import { storeConfig, identity } from "@/lib/config/store.config";
import { useCart } from "@/lib/cart/cart-context";
import { loadLastOrder, type PlacedOrder } from "@/lib/checkout/order";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckIcon, BagIcon } from "@/components/icons";

const PAYMENT_LABELS: Record<string, string> = {
  card: "Kredi / Banka Kartı",
  bank_transfer: "Havale / EFT",
  cash_on_delivery: "Kapıda Ödeme",
};

export function OrderConfirmation() {
  const { clear } = useCart();
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);
  const [paytrSuccess, setPaytrSuccess] = useState(false);

  useEffect(() => {
    const o = loadLastOrder();
    const success = new URLSearchParams(window.location.search).get("odeme") === "basarili";
    setOrder(o);
    setPaytrSuccess(success);
    setReady(true);
    // Confirmed order → empty the cart (manual orders, or card after PayTR success).
    if (o && (o.paymentMethod !== "card" || success)) clear();
  }, [clear]);

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-2xl bg-cream-200" />;
  }

  if (!order) {
    return (
      <EmptyState
        icon={<BagIcon />}
        title="Görüntülenecek sipariş bulunamadı"
        description="Sipariş bilgisi bulunamadı. Alışverişe devam edebilirsiniz."
        actionLabel="Ana sayfaya dön"
        actionHref="/"
      />
    );
  }

  // Card order not yet confirmed by PayTR (direct navigation / abandoned payment).
  if (order.paymentMethod === "card" && !paytrSuccess) {
    return (
      <EmptyState
        icon={<BagIcon />}
        title="Ödeme tamamlanmadı"
        description="Kart ödemeniz tamamlanmadıysa sepetinizden tekrar deneyebilirsiniz."
        actionLabel="Ödemeye dön"
        actionHref="/odeme"
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-olive text-cream-50">
          <CheckIcon className="text-3xl" />
        </span>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Siparişiniz alındı!</h1>
        <p className="mt-2 text-ink-muted">
          Teşekkürler {order.customer.fullName}.{" "}
          {order.orderNo ? (
            <>
              Sipariş numaranız <span className="font-semibold text-ink">{order.orderNo}</span>.
            </>
          ) : (
            "Siparişiniz oluşturuldu."
          )}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Sipariş onayı {order.customer.email} adresine gönderilecektir (e-posta entegrasyonu Phase 2).
        </p>
      </div>

      <div className="card mt-8 p-5">
        <h2 className="font-serif text-lg font-semibold">Sipariş Özeti</h2>
        <ul className="mt-4 divide-y divide-line">
          {order.items.map((item, i) => (
            <li key={i} className="flex items-center justify-between py-3 text-sm">
              <span>
                {item.title}
                {item.variantTitle ? ` · ${item.variantTitle}` : ""}{" "}
                <span className="text-ink-muted">× {item.quantity}</span>
              </span>
              <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-ink-muted">
            <span>Ara toplam</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-muted">
            <span>Kargo</span>
            <span>{order.shipping === 0 ? "Ücretsiz" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Toplam</span>
            <span className="text-pepper">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="card mt-4 p-5 text-sm">
        <h2 className="font-serif text-lg font-semibold">Teslimat & Ödeme</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p>
            <span className="text-ink-muted">Adres: </span>
            {order.customer.address}, {order.customer.district}/{order.customer.city}
          </p>
          <p>
            <span className="text-ink-muted">Telefon: </span>
            {order.customer.phone}
          </p>
          <p>
            <span className="text-ink-muted">Ödeme: </span>
            {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
          </p>
          <p>
            <span className="text-ink-muted">Fatura: </span>
            {order.customer.invoiceType === "corporate" ? "Kurumsal" : "Bireysel"}
          </p>
        </div>
      </div>

      {order.paymentMethod === "bank_transfer" && (
        <div className="card mt-4 space-y-1 p-5 text-sm">
          <h2 className="font-serif text-lg font-semibold">Havale / EFT Bilgileri</h2>
          {identity.hasBankDetails ? (
            <>
              <p className="text-ink-muted">
                Aşağıdaki hesaba ödeme yaparken açıklama kısmına sipariş numaranızı (
                <span className="font-semibold text-ink">{order.orderNo}</span>) yazınız.
              </p>
              <p className="mt-2">Banka: {storeConfig.bankTransfer.bankName}</p>
              <p>Hesap Sahibi: {storeConfig.bankTransfer.accountName}</p>
              <p>IBAN: {storeConfig.bankTransfer.iban}</p>
            </>
          ) : (
            <p className="text-ink-muted">
              Havale/EFT hesap bilgileri kısa süre içinde e-posta/SMS ile paylaşılacaktır. Açıklama
              kısmına sipariş numaranızı (<span className="font-semibold text-ink">{order.orderNo}</span>)
              yazmayı unutmayın.
            </p>
          )}
        </div>
      )}

      {order.paymentMethod === "cash_on_delivery" && (
        <div className="card mt-4 p-5 text-sm text-ink-soft">
          Siparişiniz <span className="font-semibold text-ink">kapıda ödeme</span> ile hazırlanıyor.
          Teslimatta ödemenizi nakit veya kart ile yapabilirsiniz.
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/urunler" className="btn-primary">
          Alışverişe devam et
        </Link>
      </div>
    </div>
  );
}
