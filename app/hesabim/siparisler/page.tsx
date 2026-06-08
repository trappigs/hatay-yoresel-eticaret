import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { BagIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Siparişlerim",
  path: "/hesabim/siparisler",
  noIndex: true,
});

export default function OrdersPage() {
  return (
    <div className="container-px py-10">
      <Breadcrumbs
        items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hesabım", href: "/hesabim" }, { name: "Siparişlerim" }]}
      />
      <h1 className="mt-6 text-3xl font-bold">Siparişlerim</h1>

      <div className="mt-8">
        <EmptyState
          icon={<BagIcon />}
          title="Henüz siparişiniz yok"
          description="Sipariş geçmişi, hesap sistemi ile birlikte Phase 2'de aktif olacaktır."
          actionLabel="Alışverişe başla"
          actionHref="/urunler"
        />
      </div>
    </div>
  );
}
