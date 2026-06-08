"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

/**
 * Renders the PayTR secure-payment iframe from the one-time token saved by the
 * checkout form. Card data stays inside the PayTR iframe — never on our pages.
 * On success/fail PayTR redirects to merchant_ok_url / merchant_fail_url.
 */
export default function PaytrPaymentPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = sessionStorage.getItem("paytr-token");
    if (!t) {
      router.replace("/sepet");
      return;
    }
    setToken(t);
  }, [router]);

  function resizeIframe() {
    const fn = (window as unknown as { iFrameResize?: (opts: object, sel: string) => void }).iFrameResize;
    if (fn) fn({}, "#paytriframe");
  }

  return (
    <div className="container-px py-8">
      <h1 className="text-2xl font-bold">Güvenli Ödeme</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Ödemeniz PayTR güvenli ödeme altyapısı üzerinden alınır. Kart bilgileriniz bizimle paylaşılmaz.
      </p>

      {!token ? (
        <div className="mt-6 h-64 animate-pulse rounded-2xl bg-cream-200" />
      ) : (
        <>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
            <iframe
              id="paytriframe"
              src={`https://www.paytr.com/odeme/guvenli/${token}`}
              title="PayTR Güvenli Ödeme"
              style={{ width: "100%", minHeight: "640px", border: 0 }}
            />
          </div>
          <Script src="https://www.paytr.com/js/iframeResizer.min.js" strategy="afterInteractive" onLoad={resizeIframe} />
        </>
      )}
    </div>
  );
}
