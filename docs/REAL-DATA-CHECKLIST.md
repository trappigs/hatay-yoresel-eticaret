# Gerçek Veri Kontrol Listesi (Real Data Checklist)

Yayına almadan önce doldurulması gereken tüm gerçek değerler. Placeholder kalan
değerler müşteriye **gösterilmez** (UI bunları otomatik gizler) — ama eksik kalırlarsa
mağaza yarım görünür.

> **Nasıl okunur:** "Gerekli?" = launch öncesi zorunlu mu. "Nerede" = değerin
> ayarlandığı yer. Public değerler `lib/config/store.config.ts` veya env'dedir;
> ürün/sipariş verisi Medusa Admin'dedir.

## 1. Marka & İletişim (storefront)

| Değer | Nerede | Gerekli? | Örnek format |
|---|---|---|---|
| Mağaza adı | `NEXT_PUBLIC_STORE_NAME` veya `store.config.ts → name` | Evet | `Hatay Yöresel Ürünler` |
| Slogan | `store.config.ts → slogan` | Hayır (varsayılan var) | `Hatay'ın bereketli toprağından…` |
| Telefon | `NEXT_PUBLIC_CONTACT_PHONE` | Evet | `+90 326 214 55 66` |
| WhatsApp | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Önerilir | `905555555555` (sadece rakam) |
| E-posta | `NEXT_PUBLIC_CONTACT_EMAIL` | Evet | `siparis@hatayyoresel.com` |
| Kısa adres | `NEXT_PUBLIC_CONTACT_ADDRESS` | Evet | `Antakya, Hatay` |
| Açık adres | `NEXT_PUBLIC_CONTACT_ADDRESS_FULL` | Önerilir | `X Mah. Y Cad. No:1, Antakya/Hatay` |
| Çalışma saatleri | `store.config.ts → workingHours` | Önerilir | `Hafta içi: 09:00 – 18:00` |
| Instagram | `NEXT_PUBLIC_INSTAGRAM_URL` | Hayır | `https://instagram.com/hesabiniz` |
| Facebook | `NEXT_PUBLIC_FACEBOOK_URL` | Hayır | `https://facebook.com/hesabiniz` |
| YouTube | `NEXT_PUBLIC_YOUTUBE_URL` | Hayır | `https://youtube.com/@hesabiniz` |

> Telefon "000 000…", e-posta `…@…example`, sosyal medya bare-root (`instagram.com/`)
> placeholder sayılır ve UI'da **gizlenir**. Gerçek değer girilince otomatik görünür.

## 2. Ödeme & Yasal (storefront)

| Değer | Nerede | Gerekli? | Örnek format |
|---|---|---|---|
| Banka adı | `store.config.ts → bankTransfer.bankName` | Havale açıksa Evet | `Ziraat Bankası` |
| Hesap sahibi | `store.config.ts → bankTransfer.accountName` | Havale açıksa Evet | `ABC Gıda Ltd. Şti.` |
| IBAN | `store.config.ts → bankTransfer.iban` | Havale açıksa Evet | `TR12 0001 0000 0000 0000 0000 00` |
| Ticari ünvan | `store.config.ts → legal.companyName` | Evet (KVKK/Mesafeli) | `ABC Gıda San. Tic. Ltd. Şti.` |
| Şirket adresi | `store.config.ts → legal.address` | Evet | tam tebligat adresi |
| Vergi dairesi / no | `store.config.ts → legal.taxOffice` / `taxNumber` | Evet | `Antakya VD / 1234567890` |
| MERSİS no | `store.config.ts → legal.mersis` | Evet | `0123456789012345` |
| Ticaret sicil no | `store.config.ts → legal.tradeRegistryNo` | Önerilir | `12345` |
| KEP adresi | `store.config.ts → legal.kep` | Önerilir | `abc@hs01.kep.tr` |

> Banka bilgileri `[bracket]`/`TR00…` ise checkout/onay sayfasında IBAN gösterilmez;
> "bilgiler e-posta/SMS ile paylaşılacaktır" notu gösterilir. Yasal kimlik `[bracket]`
> ise KVKK/Mesafeli Satış sayfalarındaki şirket listesi gizlenir.

## 3. Konfigürasyon değerleri

| Değer | Nerede | Gerekli? | Örnek |
|---|---|---|---|
| Kargo ücreti | `lib/config/commerce.config.ts → shippingFee` (kuruş) | Evet | `4990` = ₺49,90 |
| Ücretsiz kargo eşiği | `commerce.config.ts → freeShippingThreshold` | Evet | `75000` = ₺750 |
| Kapıda ödeme aç/kapa | `commerce.config.ts → payment.cashOnDelivery` | Evet | `true`/`false` |
| Site URL | `NEXT_PUBLIC_SITE_URL` | Evet | `https://www.hatayyoresel.com` |

## 4. Ürün verisi (Medusa Admin — Phase 2)

| Değer | Nerede | Gerekli? | Not |
|---|---|---|---|
| Ürün adı / handle | Admin → Products | Evet | handle = SEO slug |
| Fiyat (TRY) | Admin → variant prices | Evet | Admin majör birim; storefront kuruşa çevirir |
| Stok | Admin → Inventory | Evet | 0 = "Tükendi" rozeti |
| SKU | Admin → variant | Evet | `SAL-BIB-1000` |
| Açıklama | Admin → description | Evet | uzun açıklama |
| Food alanları | Admin → product **metadata** | Evet | `cargo_type`, `ingredients`, `allergens`, `origin`, `storage`, `shelf_life`, `usage`, `featured`, `bestseller`, `is_new`, `seo_title`, `seo_description` |
| Ürün görseli | Admin upload veya `public/products/...` (mock) | Önerilir | yoksa markalı placeholder |

> Mock modda (Phase 1) ürünler `data/products.ts` içindedir. Medusa modunda Admin'den
> yönetilir. **Seed'i prod'da tekrar çalıştırmayın** (idempotency guard no-op yapar).

## 5. Görsel varlıklar

| Değer | Nerede | Gerekli? | Not |
|---|---|---|---|
| Logo | `components/layout/Logo.tsx` (markalı SVG) | Hayır | placeholder değil, marka logosu |
| Favicon | `app/icon.svg` (markalı) | Hayır | gerçek logoyla değiştirilebilir |
| OG görseli | `public/og-default.svg` | Önerilir | sosyal paylaşım için **1200×630 PNG** ekleyin |
| Ürün fotoğrafları | `public/products/<kategori>/<slug>.jpg` | Önerilir | bkz. [public/products/README.md](../public/products/README.md) |

## 6. Yasal metinler (avukat onayı)

| Sayfa | Dosya | Gerekli? |
|---|---|---|
| KVKK Aydınlatma | `app/kvkk/page.tsx` | Evet — avukat onayı |
| Gizlilik Politikası | `app/gizlilik/page.tsx` | Evet — avukat onayı |
| Mesafeli Satış Sözleşmesi | `app/mesafeli-satis-sozlesmesi/page.tsx` | Evet — avukat onayı |
| İade ve Teslimat | `app/teslimat-ve-iade/page.tsx` | Evet — avukat onayı |
| Çerez Politikası | `app/cerez-politikasi/page.tsx` | Evet — avukat onayı |

Tüm yasal sayfalar "örnek içerik, avukat onayı gerekir" uyarısı ile işaretlidir.

---

İş sahibinden toplanacak ham veriler için doldurulabilir şablon:
[BUSINESS-DATA-TEMPLATE.md](BUSINESS-DATA-TEMPLATE.md).
