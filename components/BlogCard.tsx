import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { LeafIcon } from "@/components/icons";
import type { BlogPost } from "@/data/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-olive/15 to-gold/10">
          <LeafIcon className="text-4xl text-olive/50" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Badge variant="olive">{post.tag}</Badge>
          <span>{formatDate(post.date)}</span>
          <span>· {post.readingMinutes} dk okuma</span>
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-pepper">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-ink-muted">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-auto pt-2 text-sm font-semibold text-pepper hover:text-pepper-dark">
          Devamını oku →
        </Link>
      </div>
    </article>
  );
}
