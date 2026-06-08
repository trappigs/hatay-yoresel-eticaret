import Link from "next/link";
import { categoryBySlug } from "@/data/categories";
import {
  defaultVariant,
  priceInfo,
  isOutOfStock,
} from "@/lib/commerce/product-helpers";
import type { Product } from "@/lib/commerce/types";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductBadges } from "@/components/product/ProductBadges";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import type { AddToCartInput } from "@/lib/cart/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const category = categoryBySlug.get(product.categorySlug);
  const out = isOutOfStock(product);
  // Price the card from the exact variant we add, so the displayed price and the
  // cart line never disagree (even if a cheaper variant is out of stock).
  const variant = defaultVariant(product);
  const price = priceInfo(product, variant);
  const href = `/urun/${product.slug}`;

  const addInput: AddToCartInput = {
    productId: product.id,
    variantId: variant?.id,
    slug: product.slug,
    title: product.title,
    variantTitle: variant?.title,
    unitPrice: price.price,
    image: product.images[0],
    cargoType: product.cargoType,
    maxStock: variant?.stock ?? product.stock,
  };

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <div className="relative">
        <Link href={href} aria-label={product.title}>
          <ProductImage
            src={product.images[0]}
            alt={product.title}
            title={product.title}
            categorySlug={product.categorySlug}
            rounded={false}
            priority={priority}
            className="transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3">
          <ProductBadges product={product} context="card" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {category && (
          <Link
            href={`/${category.slug}`}
            className="text-xs font-semibold uppercase tracking-wide text-olive hover:text-olive-dark"
          >
            {category.title}
          </Link>
        )}
        <h3 className="font-serif text-base font-semibold leading-snug">
          <Link href={href} className="hover:text-pepper">
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline justify-between gap-2">
            <PriceDisplay price={price.price} original={price.original} size="md" />
            {variant && <span className="shrink-0 text-xs text-ink-muted">{variant.title}</span>}
          </div>
          <div className="mt-3">
            <AddToCartButton input={addInput} outOfStock={out} />
          </div>
        </div>
      </div>
    </article>
  );
}
