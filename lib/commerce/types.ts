/**
 * Core commerce domain types. These are backend-agnostic on purpose: the mock
 * adapter (Phase 1) and the Medusa adapter (Phase 2) both produce these shapes,
 * so pages and components never depend on a specific backend.
 *
 * All monetary values are integer kuruş (1 TRY = 100). See lib/money.ts.
 */

export type CargoType = "standard" | "cold_chain" | "fragile";

export interface Category {
  slug: string;
  title: string;
  /** Used as page intro + meta description. */
  description: string;
  /** Optional decorative image path under /public. */
  image?: string;
  /** Folder under /public/products for this category's product images. */
  imageFolder: string;
}

export interface ProductVariant {
  id: string;
  /** e.g. "500 G", "1 KG", "2 KG" */
  title: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  weightGrams: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  categorySlug: string;
  /** May be empty — UI renders a branded placeholder when so. */
  images: string[];

  /** Default / "from" price when no variant is selected. */
  price: number;
  discountPrice?: number;
  sku: string;
  weightGrams: number;

  /** Optional size/weight variants. When present, selected variant overrides
   * price/stock/sku. When absent, the product-level price/stock are used. */
  variants?: ProductVariant[];

  cargoType: CargoType;

  // Food-specific detail sections
  ingredients: string[]; // İçindekiler
  allergens: string[]; // Alerjen Bilgisi
  storage: string; // Saklama Koşulları
  shelfLife: string; // Son Tüketim / Raf Ömrü
  origin: string; // Menşei
  usage?: string; // Kullanım Önerisi

  // Merchandising flags
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;

  /** Used when the product has no variants. */
  stock: number;

  rating?: number;
  reviewCount?: number;

  /** SEO overrides. Fall back to title/shortDescription when omitted. */
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductQuery {
  category?: string;
  search?: string;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  limit?: number;
}

/**
 * The single interface every commerce backend implements. Swapping Phase 1's
 * mock adapter for a Medusa adapter is a one-line change in lib/commerce/index.ts.
 */
export interface CommerceAdapter {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getProducts(query?: ProductQuery): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getBestsellers(limit?: number): Promise<Product[]>;
  getNewProducts(limit?: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}
