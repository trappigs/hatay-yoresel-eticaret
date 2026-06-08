import type {
  CommerceAdapter,
  Category,
  Product,
  ProductQuery,
  ProductVariant,
} from "@/lib/commerce/types";

/**
 * Phase 2 commerce backend: reads from a Medusa v2 Store API and maps results
 * to our backend-agnostic Product/Category types. Pages/components are unchanged.
 *
 * Activate by setting (storefront .env.local):
 *   COMMERCE_ADAPTER=medusa
 *   MEDUSA_BACKEND_URL=http://localhost:9000
 *   MEDUSA_PUBLISHABLE_KEY=pk_...
 *
 * Food-specific fields that Medusa has no native column for are stored in the
 * product/variant `metadata` by the import script (backend/src/scripts/seed.ts)
 * and read back here. Prices are converted Medusa major-units (TRY) → integer kuruş.
 */

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "";
const PUBLISHABLE_KEY = process.env.MEDUSA_PUBLISHABLE_KEY || "";

function requireConfig(): { url: string; key: string } {
  if (!BACKEND_URL || !PUBLISHABLE_KEY) {
    throw new Error(
      "[medusa-adapter] MEDUSA_BACKEND_URL and MEDUSA_PUBLISHABLE_KEY must be set " +
        "when COMMERCE_ADAPTER=medusa. See backend/README.md.",
    );
  }
  return { url: BACKEND_URL.replace(/\/$/, ""), key: PUBLISHABLE_KEY };
}

async function medusaFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const { url, key } = requireConfig();
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const query = qs.toString();
  const res = await fetch(`${url}${path}${query ? `?${query}` : ""}`, {
    headers: { "x-publishable-api-key": key },
    // Cache product/category reads for a minute; tune per needs.
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`[medusa-adapter] ${path} -> ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// ---- Medusa response shapes (only the fields we use) ----
interface MedusaPrice {
  calculated_amount?: number;
  original_amount?: number;
}
interface MedusaVariant {
  id: string;
  title?: string;
  sku?: string;
  calculated_price?: MedusaPrice;
  inventory_quantity?: number;
  metadata?: Record<string, unknown> | null;
}
interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
  description?: string;
  metadata?: Record<string, unknown> | null;
}
interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description?: string;
  thumbnail?: string | null;
  images?: { url: string }[];
  categories?: MedusaCategory[];
  variants?: MedusaVariant[];
  metadata?: Record<string, unknown> | null;
}

// ---- metadata helpers (Medusa metadata values arrive as strings/JSON) ----
function meta(m: Record<string, unknown> | null | undefined, key: string): unknown {
  return m ? m[key] : undefined;
}
function metaStr(m: Record<string, unknown> | null | undefined, key: string, fallback = ""): string {
  const v = meta(m, key);
  return typeof v === "string" ? v : v != null ? String(v) : fallback;
}
function metaBool(m: Record<string, unknown> | null | undefined, key: string): boolean {
  const v = meta(m, key);
  return v === true || v === "true" || v === 1 || v === "1";
}
function metaNum(m: Record<string, unknown> | null | undefined, key: string): number | undefined {
  const v = meta(m, key);
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
}
/** Parse a metadata value that may be a JSON array or a comma-separated string. */
function metaList(m: Record<string, unknown> | null | undefined, key: string): string[] {
  const v = meta(m, key);
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string") {
    const s = v.trim();
    if (s.startsWith("[")) {
      try {
        const arr = JSON.parse(s);
        if (Array.isArray(arr)) return arr.map(String);
      } catch {
        /* fall through */
      }
    }
    return s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [];
  }
  return [];
}

/** Medusa major-unit amount (e.g. 149.9 TRY) → integer kuruş (14990). */
function toKurus(amount?: number): number {
  return Math.round((amount ?? 0) * 100);
}

function mapVariant(v: MedusaVariant): ProductVariant {
  const price = toKurus(v.calculated_price?.calculated_amount);
  const original = toKurus(v.calculated_price?.original_amount);
  return {
    id: v.id,
    title: v.title ?? "",
    sku: v.sku ?? metaStr(v.metadata, "sku"),
    price: original > price ? original : price,
    discountPrice: original > price ? price : undefined,
    stock: v.inventory_quantity ?? metaNum(v.metadata, "stock") ?? 0,
    weightGrams: metaNum(v.metadata, "weight_grams") ?? 0,
  };
}

function mapCategory(c: MedusaCategory): Category {
  return {
    slug: c.handle,
    title: c.name,
    description: c.description || metaStr(c.metadata, "description"),
    imageFolder: metaStr(c.metadata, "image_folder", c.handle),
  };
}

function mapProduct(p: MedusaProduct): Product {
  const m = p.metadata;
  const variants = (p.variants ?? []).map(mapVariant);
  const first = variants[0];
  const images = (p.images?.map((i) => i.url) ?? []).filter(Boolean);
  if (p.thumbnail && !images.includes(p.thumbnail)) images.unshift(p.thumbnail);

  return {
    id: p.id,
    slug: p.handle,
    title: p.title,
    shortDescription: metaStr(m, "short_description") || (p.description ?? "").slice(0, 160),
    longDescription: p.description ?? "",
    categorySlug: p.categories?.[0]?.handle ?? metaStr(m, "category_slug"),
    images,
    price: first?.price ?? metaNum(m, "price") ?? 0,
    discountPrice: first?.discountPrice,
    sku: first?.sku ?? metaStr(m, "sku"),
    weightGrams: first?.weightGrams ?? metaNum(m, "weight_grams") ?? 0,
    variants: variants.length > 0 ? variants : undefined,
    cargoType: (metaStr(m, "cargo_type", "standard") as Product["cargoType"]) || "standard",
    ingredients: metaList(m, "ingredients"),
    allergens: metaList(m, "allergens"),
    storage: metaStr(m, "storage"),
    shelfLife: metaStr(m, "shelf_life"),
    origin: metaStr(m, "origin"),
    usage: metaStr(m, "usage") || undefined,
    featured: metaBool(m, "featured"),
    bestseller: metaBool(m, "bestseller"),
    isNew: metaBool(m, "is_new"),
    stock: variants.reduce((s, v) => s + v.stock, 0) || (metaNum(m, "stock") ?? 0),
    rating: metaNum(m, "rating"),
    reviewCount: metaNum(m, "review_count"),
    seoTitle: metaStr(m, "seo_title") || undefined,
    seoDescription: metaStr(m, "seo_description") || undefined,
  };
}

// Resolve a region (for currency-aware calculated prices) once and cache it.
let regionIdCache: string | undefined;
async function regionId(): Promise<string | undefined> {
  if (regionIdCache) return regionIdCache;
  try {
    const data = await medusaFetch<{ regions: { id: string; currency_code: string }[] }>("/store/regions");
    const tr = data.regions.find((r) => r.currency_code?.toLowerCase() === "try") ?? data.regions[0];
    regionIdCache = tr?.id;
  } catch {
    regionIdCache = undefined;
  }
  return regionIdCache;
}

const PRODUCT_FIELDS =
  "id,title,handle,description,thumbnail,metadata,*images,*categories,*variants,*variants.calculated_price,+variants.inventory_quantity";

async function fetchProducts(extra: Record<string, string | number | undefined> = {}): Promise<Product[]> {
  const region_id = await regionId();
  const data = await medusaFetch<{ products: MedusaProduct[] }>("/store/products", {
    limit: 100,
    fields: PRODUCT_FIELDS,
    region_id,
    ...extra,
  });
  return data.products.map(mapProduct);
}

export const medusaAdapter: CommerceAdapter = {
  async getCategories(): Promise<Category[]> {
    const data = await medusaFetch<{ product_categories: MedusaCategory[] }>("/store/product-categories", {
      limit: 100,
      fields: "id,name,handle,description,metadata",
    });
    return data.product_categories.map(mapCategory);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const data = await medusaFetch<{ product_categories: MedusaCategory[] }>("/store/product-categories", {
      handle: slug,
      fields: "id,name,handle,description,metadata",
    });
    const c = data.product_categories[0];
    return c ? mapCategory(c) : null;
  },

  async getProducts(query: ProductQuery = {}): Promise<Product[]> {
    let list = await fetchProducts(query.search ? { q: query.search } : {});
    if (query.category) list = list.filter((p) => p.categorySlug === query.category);
    if (query.featured) list = list.filter((p) => p.featured);
    if (query.bestseller) list = list.filter((p) => p.bestseller);
    if (query.isNew) list = list.filter((p) => p.isNew);
    return query.limit ? list.slice(0, query.limit) : list;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await fetchProducts({ handle: slug });
    return products[0] ?? null;
  },

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const list = await fetchProducts();
    return list.filter((p) => p.categorySlug === categorySlug);
  },

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const list = (await fetchProducts()).filter((p) => p.featured);
    return limit ? list.slice(0, limit) : list;
  },

  async getBestsellers(limit?: number): Promise<Product[]> {
    const list = (await fetchProducts()).filter((p) => p.bestseller);
    return limit ? list.slice(0, limit) : list;
  },

  async getNewProducts(limit?: number): Promise<Product[]> {
    const list = (await fetchProducts()).filter((p) => p.isNew);
    return limit ? list.slice(0, limit) : list;
  },

  async searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) return [];
    return fetchProducts({ q: query });
  },
};
