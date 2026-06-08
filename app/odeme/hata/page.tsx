import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { AlertIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({ title: "Ödeme Başarısız", path: "/odeme/hata", noIndex: true });

/**
 * PayTR fail redirect target. The cart is intentionally kept so the customer can
 * retry or switch to bank transfer / cash on delivery.
 */
export default function PaymentFailedPage() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pepper/10 text-pepper">
          <AlertIcon className="text-3xl" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">Ödeme tamamlanamadı</h1>
        <p className="mt-2 text-ink-muted">
          Kart ödemeniz tamamlanamadı veya iptal edildi. Sepetiniz korunuyor — tekrar
          deneyebilir ya da havale/EFT veya kapıda ödeme ile ilerleyebilirsiniz.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/odeme" className="btn-primary">
            Ödemeyi tekrar dene
          </Link>
          <Link href="/sepet" className="btn-outline">
            Sepete dön
          </Link>
        </div>
      </div>
    </div>
  );
}
