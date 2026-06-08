import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { products } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBadges } from "@/components/product/ProductBadges";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductGrid } from "@/components/product/ProductGrid";
import { StarRating } from "@/components/ui/StarRating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadges } from "@/components/TrustBadges";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";

interface Params {
  params: Promise<{ slug: string }>;
}

// Phase 1: fixed seed catalog → unknown slugs return a real 404.
// Phase 2 (Medusa): set to true for on-demand product pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await commerce.getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Ürün bulunamadı", noIndex: true });
  return buildMetadata({
    title: product.seoTitle ?? product.title,
    description: product.seoDescription ?? product.shortDescription,
    path: `/urun/${product.slug}`,
    images: product.images.length > 0 ? product.images : undefined,
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await commerce.getProductBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug.get(product.categorySlug);
  const related = (await commerce.getProductsByCategory(product.categorySlug))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-px py-8">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          ...(category ? [{ name: category.title, path: `/${category.slug}` }] : []),
          { name: product.title, path: `/urun/${product.slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", href: "/" },
          ...(category ? [{ name: category.title, href: `/${category.slug}` }] : []),
          { name: product.title },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery product={product} />

        <div>
          {category && (
            <Link
              href={`/${category.slug}`}
              className="text-sm font-semibold uppercase tracking-wide text-olive hover:text-olive-dark"
            >
              {category.title}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>

          {product.rating != null && (
            <div className="mt-3">
              <StarRating value={product.rating} count={product.reviewCount} />
            </div>
          )}

          <div className="mt-4">
            <ProductBadges product={product} context="detail" />
          </div>

          <p className="mt-4 text-ink-soft">{product.shortDescription}</p>

          <div className="mt-6 border-t border-line pt-6">
            <ProductPurchasePanel product={product} />
          </div>

          <TrustBadges className="mt-6" />
        </div>
      </div>

      <ProductDetails product={product} />

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="Benzer ürünler" href={category ? `/${category.slug}` : "/urunler"} />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
