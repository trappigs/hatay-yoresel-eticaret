import type { Category } from "@/lib/commerce/types";

/** Storefront categories with SEO-friendly Turkish slugs. */
const rawCategories: Omit<Category, "imageFolder">[] = [
  {
    slug: "salca",
    title: "Salça",
    description:
      "Güneşte kurutulmuş Hatay biberinden geleneksel yöntemle üretilen Hatay biber salçası ve domates salçası. Katkısız, yoğun kıvam.",
  },
  {
    slug: "zeytinyagi",
    title: "Zeytinyağı",
    description:
      "Soğuk sıkım, naturel sızma Hatay zeytinyağı. Erken hasat, düşük asit; kahvaltıdan yemeğe sofranızın doğal lezzeti.",
  },
  {
    slug: "nar-eksisi",
    title: "Nar Ekşisi",
    description:
      "Katkısız, gerçek nar suyundan kaynatılan ev yapımı Hatay nar ekşisi. Salata ve yöresel yemeklerin vazgeçilmezi.",
  },
  {
    slug: "baharatlar",
    title: "Baharatlar",
    description:
      "Zahter, pul biber, sumak ve yöresel Hatay baharatları. Taze çekim, yoğun aroma.",
  },
  {
    slug: "zeytin",
    title: "Zeytin",
    description:
      "Hatay'ın kırma, çizik ve sele zeytinleri. Kahvaltı sofralarının değişmez tadı.",
  },
  {
    slug: "recel-kahvaltilik",
    title: "Reçel & Kahvaltılık",
    description:
      "Geleneksel yöntemlerle hazırlanan ceviz, incir ve mevsim reçelleri ile kahvaltılık ürünler.",
  },
  {
    slug: "peynir-sut-urunleri",
    title: "Peynir & Süt Ürünleri",
    description:
      "Hatay sürkü, künefelik peynir ve yöresel süt ürünleri. Soğuk zincirle kapınıza kadar.",
  },
  {
    slug: "tatli-kunefe",
    title: "Tatlı & Künefe Ürünleri",
    description:
      "Künefelik kadayıf, künefe peyniri ve Hatay tatlı malzemeleri ile evde künefe keyfi.",
  },
  {
    slug: "yoresel-paketler",
    title: "Yöresel Paketler",
    description:
      "Özenle bir araya getirilmiş yöresel ürün paketleri. Denemek isteyenler için ideal başlangıç.",
  },
  {
    slug: "hediyelik-kutular",
    title: "Hediyelik Kutular",
    description:
      "Sevdiklerinize Hatay'ın lezzetlerini armağan edin. Şık sunumlu hediyelik kutular.",
  },
];

/** Image folder convention: /public/products/<category-slug>/ */
export const categories: Category[] = rawCategories.map((c) => ({
  ...c,
  imageFolder: c.slug,
}));

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

