# İşletme Veri Şablonu (Business Data Template)

İşletme sahibi bu formu doldurur; geliştirici değerleri `lib/config/store.config.ts`,
env dosyaları ve Medusa Admin'e aktarır. Boş alanları `____` yerine gerçek değerle
doldurun. Doldurmadığınız (placeholder kalan) alanlar sitede otomatik gizlenir.

---

## 1. Marka Bilgileri (Brand)

- Mağaza adı: `____`
- Kısa marka adı: `____`
- Slogan / tagline: `____`
- Kısa tanıtım (1-2 cümle): `____`

## 2. İletişim (Contact)

- Telefon (görüşme): `____`  (örn. +90 326 214 55 66)
- WhatsApp numarası: `____`  (sadece rakam, örn. 905555555555)
- Sipariş e-postası: `____`  (örn. siparis@alanadiniz.com)

## 3. Adres (Address)

- Kısa adres (header/footer): `____`  (örn. Antakya, Hatay)
- Açık adres (tam): `____`

## 4. Çalışma Saatleri (Working Hours)

- Hafta içi: `____`  (örn. 09:00 – 18:00)
- Cumartesi: `____`
- Pazar: `____`  (örn. Kapalı)

## 5. Sosyal Medya (Social Links)

- Instagram: `____`
- Facebook: `____`
- YouTube: `____`
- (Diğer): `____`

## 6. Havale / EFT Bilgileri (Bank Transfer)

> Havale ödemesi açacaksanız zorunlu. Açmayacaksanız boş bırakın.

- Banka adı: `____`
- Hesap sahibi / ünvan: `____`
- IBAN: `____`  (TR ile başlayan 26 karakter)

## 7. Şirket Yasal Bilgileri (Company Legal)

> KVKK ve Mesafeli Satış Sözleşmesi için zorunlu.

- Ticari ünvan: `____`
- Tebligat adresi: `____`
- Vergi dairesi: `____`
- Vergi / TCKN no: `____`
- MERSİS no: `____`
- Ticaret sicil no: `____`
- KEP adresi: `____`

## 8. Kargo Politikası (Shipping Policy)

- Kargo ücreti: `____` TL
- Ücretsiz kargo eşiği: `____` TL
- Kapıda ödeme sunulacak mı? `____` (Evet/Hayır)
- Tahmini teslim süresi: `____` (örn. 1-3 iş günü)
- Soğuk zincir gönderi günleri: `____`

## 9. İade Politikası (Return Policy)

- İade kabul süresi: `____` gün
- İade koşulları (özet): `____`
- Hasarlı/yanlış ürün süreci: `____`
- İade kargo ücretini kim karşılar? `____`

## 10. Ürün Tablosu (Product Table)

Her ürün için bir satır. (Medusa Admin'e veya `data/products.ts`'e girilir.)

| Ürün adı | Slug (handle) | Kategori | Varyant | SKU | Fiyat (TL) | Stok | Kargo tipi | Menşei |
|---|---|---|---|---|---|---|---|---|
| `____` | `____` | `____` | `____` | `____` | `____` | `____` | standard/cold_chain/fragile | `____` |
| `____` | `____` | `____` | `____` | `____` | `____` | `____` | `____` | `____` |

Her ürün için ayrıca:
- İçindekiler: `____`
- Alerjen bilgisi: `____`
- Saklama koşulları: `____`
- Raf ömrü: `____`
- Kullanım önerisi: `____`
- Kısa açıklama: `____`
- Uzun açıklama: `____`
- SEO başlığı: `____`
- SEO açıklaması: `____`

## 11. Ürün Görseli İsimlendirme (Image Naming)

- Klasör: `public/products/<kategori-slug>/`
- Dosya adı: `<ürün-slug>.jpg`  (ek görseller: `<ürün-slug>-2.jpg`, `-3.jpg`)
- Boyut: kare, **1200×1200 px** önerilir
- Sıkıştırma: **< 300 KB** (JPG ~80% kalite veya WebP)
- Alt metin: otomatik olarak ürün adından üretilir (ayrıca girmenize gerek yok)

Örnek: `public/products/salca/hatay-biber-salcasi.jpg`
Detay: [public/products/README.md](../public/products/README.md)

## 12. Yasal Metin Değişim Kontrol Listesi (Legal Replacement)

- [ ] KVKK Aydınlatma Metni — avukat onaylı metin verildi
- [ ] Gizlilik Politikası — avukat onaylı metin verildi
- [ ] Mesafeli Satış Sözleşmesi — avukat onaylı metin verildi
- [ ] İade ve Teslimat Koşulları — avukat onaylı metin verildi
- [ ] Çerez Politikası — avukat onaylı metin verildi

> Mevcut metinler **örnektir** ve yayına alınmadan önce avukat tarafından gözden
> geçirilmelidir. Sayfa dosyaları: `app/kvkk`, `app/gizlilik`,
> `app/mesafeli-satis-sozlesmesi`, `app/teslimat-ve-iade`, `app/cerez-politikasi`.
