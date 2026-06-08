import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Tarifler, üretim notları ve Hatay yöresel lezzet rehberleri.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="container-px py-10">
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "Blog" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
        <p className="mt-2 text-ink-muted">
          Mutfaktan tarifler, üretim notları ve yöresel lezzet rehberleri.
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
