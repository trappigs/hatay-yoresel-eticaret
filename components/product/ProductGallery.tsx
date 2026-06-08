"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/product/ProductImage";
import type { Product } from "@/lib/commerce/types";

/**
 * Product image gallery. With the Phase 1 seed catalog (no photos) it shows a
 * single branded placeholder. When images are present, thumbnails switch the
 * main image.
 */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images;
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <ProductImage
        src={images[active]}
        alt={product.title}
        title={product.title}
        categorySlug={product.categorySlug}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-lg border-2",
                i === active ? "border-pepper" : "border-line",
              )}
              aria-label={`${product.title} görsel ${i + 1}`}
            >
              <ProductImage
                src={src}
                alt=""
                title={product.title}
                categorySlug={product.categorySlug}
                rounded={false}
                sizes="80px"
                compact
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
