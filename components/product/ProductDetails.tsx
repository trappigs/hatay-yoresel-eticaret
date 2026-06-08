import type { ReactNode } from "react";
import type { Product } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/money";
import { commerceConfig } from "@/lib/config/commerce.config";
import {
  LeafIcon,
  AlertIcon,
  SnowflakeIcon,
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  InfoIcon,
} from "@/components/icons";

const CARGO_TEXT: Record<Product["cargoType"], string> = {
  standard: "Standart kargo ile özenle paketlenerek gönderilir.",
  cold_chain: "Soğuk zincir ile, buz aküleri eşliğinde özel paketlenerek gönderilir.",
  fragile: "Kırılabilir ürün; ekstra koruyucu ambalaj ile gönderilir.",
};

function InfoCard({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 rounded-xl border border-line bg-white p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/12 text-olive">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-olive">{label}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{value}</p>
      </div>
    </div>
  );
}

/** Food-specific product information sections — premium, trust-building layout. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div>
        <h2 className="font-serif text-2xl font-semibold">Ürün Açıklaması</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{product.longDescription}</p>

        <h2 className="mt-10 font-serif text-2xl font-semibold">Ürün Bilgileri</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <InfoCard icon={<LeafIcon />} label="İçindekiler" value={product.ingredients.join(", ")} />
          <InfoCard icon={<AlertIcon />} label="Alerjen Bilgisi" value={product.allergens.join(", ")} />
          <InfoCard icon={<SnowflakeIcon />} label="Saklama Koşulları" value={product.storage} />
          <InfoCard icon={<ClockIcon />} label="Son Tüketim / Raf Ömrü" value={product.shelfLife} />
          <InfoCard icon={<MapPinIcon />} label="Menşei" value={product.origin} />
          <InfoCard icon={<TruckIcon />} label="Kargo Bilgisi" value={CARGO_TEXT[product.cargoType]} />
          {product.usage && <InfoCard icon={<InfoIcon />} label="Kullanım Önerisi" value={product.usage} />}
        </div>
        <p className="mt-3 text-xs text-ink-muted">Ürün kodu (SKU): {product.sku}</p>
      </div>

      <aside className="h-fit space-y-3 rounded-2xl border border-line bg-cream-100 p-5">
        <h3 className="font-serif text-lg font-semibold">Bilmeniz gerekenler</h3>
        <ul className="space-y-2.5 text-sm text-ink-soft">
          <li className="flex gap-2">
            <TruckIcon className="mt-0.5 shrink-0 text-olive" />
            {formatPrice(commerceConfig.freeShippingThreshold)} ve üzeri siparişlerde kargo ücretsiz.
          </li>
          <li className="flex gap-2">
            <ClockIcon className="mt-0.5 shrink-0 text-olive" />
            Siparişler 1-3 iş günü içinde hazırlanıp kargolanır.
          </li>
          <li className="flex gap-2">
            <InfoIcon className="mt-0.5 shrink-0 text-olive" />
            Ürün görselleri temsilidir. Fiyatlara KDV dahildir.
          </li>
          <li className="flex gap-2">
            <LeafIcon className="mt-0.5 shrink-0 text-olive" />
            İçerik bilgileri tanıtıcıdır; sağlık veya sertifika iddiası içermez.
          </li>
        </ul>
      </aside>
    </div>
  );
}
