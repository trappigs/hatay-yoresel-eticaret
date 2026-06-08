import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { BagIcon } from "@/components/icons";

interface Params {
  params: Promise<{ category: string }>;
}

// Phase 1: the category set is fixed/known, so any other slug is a real 404
// (not a soft 200). Phase 2 (Medusa) may switch this to true for on-demand pages.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = await commerce.getCategoryBySlug(category);
  if (!cat) return buildMetadata({ title: "Kategori bulunamadı", noIndex: true });
  return buildMetadata({
    title: cat.title,
    description: cat.description,
    path: `/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = await commerce.getCategoryBySlug(category);
  if (!cat) notFound();

  const products = await commerce.getProductsByCategory(cat.slug);

  return (
    <div className="container-px py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: cat.title, path: `/${cat.slug}` },
        ])}
      />
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: cat.title }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">{cat.title}</h1>
        <p className="mt-3 text-ink-muted">{cat.description}</p>
        <p className="mt-2 text-sm text-ink-muted">{products.length} ürün</p>
      </header>

      <div className="mt-8">
        {products.length > 0 ? (
          <ProductGrid products={products} priorityCount={4} />
        ) : (
          <EmptyState
            icon={<BagIcon />}
            title="Bu kategoride henüz ürün yok"
            description="Yakında yeni ürünler eklenecek. Diğer kategorilere göz atabilirsiniz."
            actionLabel="Tüm ürünler"
            actionHref="/urunler"
          />
        )}
      </div>
    </div>
  );
}
