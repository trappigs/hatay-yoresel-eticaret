import fs from "node:fs";
import path from "node:path";
import { categories, categoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import { slugify } from "@/lib/utils";
import type {
  CommerceAdapter,
  Category,
  Product,
  ProductQuery,
} from "@/lib/commerce/types";

/**
 * Phase 1 commerce backend: serves the Turkish seed catalog from /data.
 * Async signatures mirror a real network backend so the Medusa adapter is a
 * drop-in replacement (see medusa-adapter.ts).
 *
 * This module is server-only (imported solely by server components via
 * lib/commerce/index.ts), so it may touch the filesystem.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Keep only image paths that exist on disk (or remote URLs). Missing local
 * files are dropped so the UI renders the branded placeholder instead of a
 * broken next/image. Drop real photos into /public/products/... to enable them. */
function resolveImages(images: string[]): string[] {
  return images.filter((src) => {
    if (!src.startsWith("/")) return true; // remote URL — leave as-is
    try {
      return fs.existsSync(path.join(PUBLIC_DIR, src));
    } catch {
      return false;
    }
  });
}

// Resolve once at module load (build time for static pages).
const catalog: Product[] = products.map((p) => ({
  ...p,
  images: resolveImages(p.images),
}));

function matches(p: Product, q: ProductQuery): boolean {
  if (q.category && p.categorySlug !== q.category) return false;
  if (q.featured && !p.featured) return false;
  if (q.bestseller && !p.bestseller) return false;
  if (q.isNew && !p.isNew) return false;
  if (q.search) {
    const needle = slugify(q.search);
    const haystack = slugify(`${p.title} ${p.shortDescription} ${p.categorySlug}`);
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

export const mockAdapter: CommerceAdapter = {
  async getCategories(): Promise<Category[]> {
    return categories;
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return categoryBySlug.get(slug) ?? null;
  },

  async getProducts(query: ProductQuery = {}): Promise<Product[]> {
    let list = catalog.filter((p) => matches(p, query));
    if (query.limit) list = list.slice(0, query.limit);
    return list;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    return catalog.find((p) => p.slug === slug) ?? null;
  },

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return catalog.filter((p) => p.categorySlug === categorySlug);
  },

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const list = catalog.filter((p) => p.featured);
    return limit ? list.slice(0, limit) : list;
  },

  async getBestsellers(limit?: number): Promise<Product[]> {
    const list = catalog.filter((p) => p.bestseller);
    return limit ? list.slice(0, limit) : list;
  },

  async getNewProducts(limit?: number): Promise<Product[]> {
    const list = catalog.filter((p) => p.isNew);
    return limit ? list.slice(0, limit) : list;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const needle = slugify(query);
    if (!needle) return [];
    return catalog.filter((p) =>
      slugify(`${p.title} ${p.shortDescription} ${p.categorySlug}`).includes(needle),
    );
  },
};
