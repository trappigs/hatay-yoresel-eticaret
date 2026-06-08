import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { UserIcon, BagIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({ title: "Hesabım", path: "/hesabim", noIndex: true });

export default function AccountPage() {
  return (
    <div className="container-px py-10">
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hesabım" }]} />
      <h1 className="mt-6 text-3xl font-bold">Hesabım</h1>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Müşteri hesabı ve giriş sistemi Phase 2&apos;de Medusa müşteri kimlik doğrulaması ile
        eklenecektir. Şu anda sipariş vermek için hesap gerekmez.
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link href="/hesabim/siparisler" className="card flex items-center gap-4 p-5 hover:shadow-card-hover">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive/12 text-olive">
            <BagIcon className="text-xl" />
          </span>
          <span>
            <span className="block font-semibold">Siparişlerim</span>
            <span className="text-sm text-ink-muted">Geçmiş siparişlerinizi görüntüleyin</span>
          </span>
        </Link>

        <Link href="/giris" className="card flex items-center gap-4 p-5 hover:shadow-card-hover">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive/12 text-olive">
            <UserIcon className="text-xl" />
          </span>
          <span>
            <span className="block font-semibold">Giriş / Üyelik</span>
            <span className="text-sm text-ink-muted">Hesabınıza erişin (Phase 2)</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
