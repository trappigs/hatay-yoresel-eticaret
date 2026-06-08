import type { MetadataRoute } from "next";
import { storeConfig } from "@/lib/config/store.config";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = storeConfig.url.replace(/\/$/, "");
  const now = new Date();
  const url = (path: string) => `${base}${path}`;

  const staticPaths = [
    "/",
    "/urunler",
    "/hakkimizda",
    "/iletisim",
    "/sss",
    "/blog",
    "/teslimat-ve-iade",
    "/kvkk",
    "/gizlilik",
    "/mesafeli-satis-sozlesmesi",
    "/cerez-politikasi",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: url(p),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...categories.map((c) => ({
      url: url(`/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: url(`/urun/${p.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
