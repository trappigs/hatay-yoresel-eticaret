import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, blogBySlug } from "@/data/blog";
import { storeConfig } from "@/lib/config/store.config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/JsonLd";
import { LeafIcon } from "@/components/icons";

interface Params {
  params: Promise<{ slug: string }>;
}

// Phase 1: fixed seed posts → unknown slugs return a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogBySlug.get(slug);
  if (!post) return buildMetadata({ title: "Yazı bulunamadı", noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = blogBySlug.get(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: storeConfig.name },
  };

  return (
    <article className="container-px py-10">
      <JsonLd data={articleJsonLd} />
      <Breadcrumbs
        items={[{ name: "Ana Sayfa", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title }]}
      />

      <div className="mx-auto mt-6 max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Badge variant="olive">{post.tag}</Badge>
          <span>{formatDate(post.date)}</span>
          <span>· {post.readingMinutes} dk okuma</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-lg text-ink-soft">{post.excerpt}</p>

        <div className="mt-6 flex aspect-[16/7] items-center justify-center rounded-2xl bg-gradient-to-br from-olive/15 to-gold/10">
          <LeafIcon className="text-5xl text-olive/50" />
        </div>

        <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <Link href="/blog" className="text-sm font-semibold text-pepper hover:text-pepper-dark">
            ← Tüm yazılar
          </Link>
        </div>
      </div>
    </article>
  );
}
