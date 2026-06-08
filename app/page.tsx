import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { buildMetadata } from "@/lib/seo/metadata";
import { reviews } from "@/data/reviews";
import { blogPosts } from "@/data/blog";
import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { StorySection } from "@/components/home/StorySection";
import { WhyUs } from "@/components/home/WhyUs";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ReviewCard } from "@/components/ReviewCard";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default async function HomePage() {
  const [bestsellers, paketler, kutular] = await Promise.all([
    commerce.getBestsellers(8),
    commerce.getProductsByCategory("yoresel-paketler"),
    commerce.getProductsByCategory("hediyelik-kutular"),
  ]);
  const gifts = [...paketler, ...kutular].slice(0, 8);

  return (
    <>
      <Hero />
      <FeaturedCategories />

      <section className="container-px py-4">
        <SectionHeading
          eyebrow="Çok satanlar"
          title="En sevilen ürünler"
          description="Müşterilerimizin en çok tercih ettiği yöresel lezzetler."
          href="/urunler"
        />
        <div className="mt-8">
          <ProductGrid products={bestsellers} priorityCount={4} />
        </div>
      </section>

      <StorySection />

      {gifts.length > 0 && (
        <section className="container-px py-14">
          <SectionHeading
            eyebrow="Hediyelik & paketler"
            title="Yöresel paketler ve hediye kutuları"
            description="Denemek ya da sevdiklerinize armağan etmek için özenle hazırlanan setler."
            href="/hediyelik-kutular"
          />
          <div className="mt-8">
            <ProductGrid products={gifts} />
          </div>
        </section>
      )}

      <WhyUs />

      <section className="bg-cream-200/60">
        <div className="container-px py-14">
          <SectionHeading eyebrow="Yorumlar" title="Müşterilerimiz ne diyor?" align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-px py-14">
        <SectionHeading
          eyebrow="Blog"
          title="Mutfaktan & üretimden"
          description="Tarifler, üretim notları ve yöresel lezzet rehberleri."
          href="/blog"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
