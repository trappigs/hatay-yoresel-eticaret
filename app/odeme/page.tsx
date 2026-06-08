import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { activeAdapter } from "@/lib/commerce";
import { isPaytrConfigured } from "@/lib/integrations/paytr";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = buildMetadata({ title: "Ödeme", path: "/odeme", noIndex: true });

export default function CheckoutPage() {
  // Server reads the (server-only) COMMERCE_ADAPTER + PayTR creds and hands them
  // to the client form, so checkout submits real Medusa orders and card payments
  // start the PayTR flow only when configured.
  const mode = activeAdapter === "medusa" ? "medusa" : "mock";
  const paytrConfigured = mode === "medusa" && isPaytrConfigured();

  return (
    <div className="container-px py-10">
      <Breadcrumbs
        items={[{ name: "Ana Sayfa", href: "/" }, { name: "Sepetim", href: "/sepet" }, { name: "Ödeme" }]}
      />
      <h1 className="mt-6 text-3xl font-bold">Ödeme</h1>
      <div className="mt-8">
        <CheckoutForm mode={mode} paytrConfigured={paytrConfigured} />
      </div>
    </div>
  );
}
