import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = buildMetadata({ title: "Sepetim", path: "/sepet", noIndex: true });

export default function CartPage() {
  return (
    <div className="container-px py-10">
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "Sepetim" }]} />
      <h1 className="mt-6 text-3xl font-bold">Sepetim</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
