export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number; // 1..5
  date: string; // ISO
  title: string;
  body: string;
  productSlug?: string;
}

/** Customer reviews used on the home page social-proof section. */
export const reviews: Review[] = [
  {
    id: "rev_1",
    author: "Ayşe K.",
    city: "İstanbul",
    rating: 5,
    date: "2026-04-18",
    title: "Tam aradığım lezzet",
    body: "Biber salçası tıpkı anneannemin yaptığı gibi. Kıvamı ve acısı harika, paketleme çok özenliydi.",
    productSlug: "hatay-biber-salcasi",
  },
  {
    id: "rev_2",
    author: "Mehmet T.",
    city: "Ankara",
    rating: 5,
    date: "2026-03-30",
    title: "Zeytinyağı bambaşka",
    body: "Soğuk sıkım zeytinyağının kokusu bile farklı. Kahvaltıda ekmeğe bandırınca anlıyorsunuz.",
    productSlug: "soguk-sikim-zeytinyagi",
  },
  {
    id: "rev_3",
    author: "Zeynep A.",
    city: "İzmir",
    rating: 4,
    date: "2026-03-12",
    title: "Hızlı kargo, taze ürün",
    body: "Soğuk zincir ürünleri buz aküleriyle geldi, peynir taptaze. Tekrar sipariş vereceğim.",
    productSlug: "hatay-surk-peyniri",
  },
  {
    id: "rev_4",
    author: "Burak D.",
    city: "Bursa",
    rating: 5,
    date: "2026-02-22",
    title: "Hediye kutusu çok beğenildi",
    body: "Hatay Lezzet Kutusu'nu hediye ettim, sunumu gerçekten şıktı. Herkese tavsiye ederim.",
    productSlug: "hatay-lezzet-kutusu",
  },
];
