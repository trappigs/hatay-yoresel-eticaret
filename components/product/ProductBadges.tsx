import { Badge } from "@/components/ui/Badge";
import { SnowflakeIcon, AlertIcon } from "@/components/icons";
import { isLowStock, isOutOfStock } from "@/lib/commerce/product-helpers";
import type { Product } from "@/lib/commerce/types";

/** Categories produced by traditional/handmade methods → "El Yapımı" tag. */
const HANDMADE = new Set([
  "salca",
  "nar-eksisi",
  "recel-kahvaltilik",
  "baharatlar",
  "zeytin",
]);

/**
 * Renders merchandising + logistics badges derived from product data.
 * `context` controls how many are shown ("card" trims to the most important).
 */
export function ProductBadges({
  product,
  context = "detail",
  className,
}: {
  product: Product;
  context?: "card" | "detail";
  className?: string;
}) {
  const out = isOutOfStock(product);
  const low = !out && isLowStock(product);

  const badges: React.ReactNode[] = [];

  if (out) {
    badges.push(
      <Badge key="out" variant="neutral">
        Tükendi
      </Badge>,
    );
  }
  if (product.bestseller) {
    badges.push(
      <Badge key="best" variant="pepper">
        Çok Satan
      </Badge>,
    );
  }
  if (product.isNew) {
    badges.push(
      <Badge key="new" variant="new">
        Yeni
      </Badge>,
    );
  }
  if (low) {
    badges.push(
      <Badge key="low" variant="gold">
        Sınırlı Stok
      </Badge>,
    );
  }
  if (product.cargoType === "cold_chain") {
    badges.push(
      <Badge key="cold" variant="cold">
        <SnowflakeIcon /> Soğuk Zincir
      </Badge>,
    );
  }
  if (product.cargoType === "fragile") {
    badges.push(
      <Badge key="fragile" variant="fragile">
        <AlertIcon /> Kırılabilir
      </Badge>,
    );
  }

  if (context === "detail") {
    badges.unshift(
      <Badge key="hatay" variant="olive">
        Hatay&apos;dan
      </Badge>,
    );
    if (HANDMADE.has(product.categorySlug)) {
      badges.push(
        <Badge key="handmade" variant="olive">
          El Yapımı
        </Badge>,
      );
    }
  }

  const shown = context === "card" ? badges.slice(0, 2) : badges;
  if (shown.length === 0) return null;

  return <div className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>{shown}</div>;
}
