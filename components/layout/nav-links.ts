/** Primary navigation links shared by header and footer. */
export const mainNav = [
  { label: "Tüm Ürünler", href: "/urunler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
  { label: "S.S.S.", href: "/sss" },
] as const;

/** Customer/legal links used in the footer. */
export const legalNav = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Gizlilik Politikası", href: "/gizlilik" },
  { label: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis-sozlesmesi" },
  { label: "İade ve Teslimat Koşulları", href: "/teslimat-ve-iade" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
] as const;

export const accountNav = [
  { label: "Hesabım", href: "/hesabim" },
  { label: "Siparişlerim", href: "/hesabim/siparisler" },
  { label: "Giriş Yap", href: "/giris" },
] as const;
