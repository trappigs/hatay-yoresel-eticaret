import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = buildMetadata({
  title: "Sipariş Onayı",
  path: "/odeme/onay",
  noIndex: true,
});

export default function OrderConfirmationPage() {
  return (
    <div className="container-px py-12">
      <OrderConfirmation />
    </div>
  );
}
