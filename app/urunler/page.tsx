import type { Metadata } from "next";
import Link from "next/link";
import { commerce } from "@/lib/commerce";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Tüm Ürünler",
  description: "Hatay yöresel ürünlerinin tamamı: salça, zeytinyağı, nar ekşisi, baharat ve daha fazlası.",
  path: "/urunler",
});

interface Props {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q, kategori } = await searchParams;

  const products = q
    ? await commerce.searchProducts(q)
    : kategori
      ? await commerce.getProductsByCategory(kategori)
      : await commerce.getProducts();

  const activeCat = kategori ? categories.find((c) => c.slug === kategori) : undefined;
  const heading = q ? `“${q}” için sonuçlar` : activeCat ? activeCat.title : "Tüm Ürünler";

  return (
    <div className="container-px py-10">
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "Ürünler" }]} />

      <header className="mt-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{heading}</h1>
        <p className="mt-2 text-sm text-ink-muted">{products.length} ürün bulundu</p>
      </header>

      {/* Category filter chips (hidden while searching) */}
      {!q && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/urunler"
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium",
              !kategori ? "border-pepper bg-pepper/5 text-pepper" : "border-line text-ink-soft hover:border-olive",
            )}
          >
            Tümü
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/urunler?kategori=${c.slug}`}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium",
                kategori === c.slug ? "border-pepper bg-pepper/5 text-pepper" : "border-line text-ink-soft hover:border-olive",
              )}
            >
              {c.title}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8">
        {products.length > 0 ? (
          <ProductGrid products={products} priorityCount={4} />
        ) : (
          <EmptyState
            icon={<SearchIcon />}
            title={q ? "Sonuç bulunamadı" : "Ürün bulunamadı"}
            description={
              q
                ? "Farklı bir arama deneyin ya da tüm ürünlere göz atın."
                : "Bu seçimde ürün yok. Diğer kategorilere göz atın."
            }
            actionLabel="Tüm ürünler"
            actionHref="/urunler"
          />
        )}
      </div>
    </div>
  );
}
