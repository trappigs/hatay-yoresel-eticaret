import { storeConfig } from "@/lib/config/store.config";
import { priceInfo, totalStock } from "@/lib/commerce/product-helpers";
import type { Product } from "@/lib/commerce/types";

/** kuruş → "149.90" (schema.org expects a plain decimal string). */
function decimal(kurus: number): string {
  return (kurus / 100).toFixed(2);
}

function abs(path: string): string {
  return new URL(path, storeConfig.url).toString();
}

/** schema.org/Product JSON-LD for a product detail page. */
export function productJsonLd(product: Product) {
  const info = priceInfo(product);
  const inStock = totalStock(product) > 0;
  const image = product.images.length > 0 ? product.images.map(abs) : [abs("/og-default.svg")];

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image,
    sku: product.sku,
    category: product.categorySlug,
    brand: { "@type": "Brand", name: storeConfig.name },
    offers: {
      "@type": "Offer",
      url: abs(`/urun/${product.slug}`),
      priceCurrency: "TRY",
      price: decimal(info.price),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if (product.rating && product.reviewCount) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  return data;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: storeConfig.name,
    url: storeConfig.url,
    description: storeConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: storeConfig.contact.email,
      areaServed: "TR",
      availableLanguage: "Turkish",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: storeConfig.name,
    url: storeConfig.url,
    inLanguage: "tr-TR",
  };
}
