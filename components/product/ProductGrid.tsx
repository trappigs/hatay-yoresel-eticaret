import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({
  products,
  priorityCount = 0,
}: {
  products: Product[];
  /** Number of leading cards to mark as priority (above-the-fold images). */
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
