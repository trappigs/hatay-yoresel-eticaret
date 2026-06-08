# Ürün Görselleri / Product Images

Place real product photos here. Until a file exists, the storefront shows a
branded placeholder automatically (the mock adapter filters out missing image
paths, so `next/image` never breaks).

## Convention

```
public/products/<kategori-slug>/<urun-slug>.jpg
```

- **Folder name = category slug** (the same slug used in the URL).
- **File name = product slug** (the same slug used in `/urun/<slug>`).
- **Format:** `.jpg` or `.webp`.
- **Dimensions:** square, **1200×1200 px** (min 800×800). Same aspect for all so the
  grid stays even.
- **Compression target:** **≤ 300 KB** per image (JPG ~80% quality, or WebP). Lighter
  is better for mobile performance.
- **Multiple photos** per product: add `-2`, `-3`, e.g. `hatay-biber-salcasi-2.jpg`,
  then list them in the product's `images: [...]` array in
  [`data/products.ts`](../../data/products.ts) (mock) or upload in Medusa Admin.

**Alt text:** generated automatically from the product title (`alt={product.title}`)
— you do **not** need to provide alt text. Just make sure product titles are
descriptive and in Turkish.

After adding files, no rebuild config is needed — they appear on the next build
(`npm run build`) / dev refresh. In Medusa mode, upload images in Admin → Products
instead (the same product title is used as alt text).

## Expected files (current catalog)

| Ürün | Dosya yolu |
|------|------------|
| Hatay Biber Salçası | `public/products/salca/hatay-biber-salcasi.jpg` |
| Hatay Domates Salçası | `public/products/salca/hatay-domates-salcasi.jpg` |
| Soğuk Sıkım Zeytinyağı | `public/products/zeytinyagi/soguk-sikim-zeytinyagi.jpg` |
| Ev Yapımı Nar Ekşisi | `public/products/nar-eksisi/ev-yapimi-nar-eksisi.jpg` |
| Zahter Baharatı | `public/products/baharatlar/zahter-baharati.jpg` |
| Hatay Kırma Zeytin | `public/products/zeytin/hatay-kirma-zeytin.jpg` |
| Ceviz Reçeli | `public/products/recel-kahvaltilik/ceviz-receli.jpg` |
| Hatay Sürk Peyniri | `public/products/peynir-sut-urunleri/hatay-surk-peyniri.jpg` |
| Antakya Künefe Peyniri | `public/products/peynir-sut-urunleri/antakya-kunefe-peyniri.jpg` |
| Evde Künefe Seti | `public/products/tatli-kunefe/kunefe-seti.jpg` |
| Yöresel Kahvaltı Paketi | `public/products/yoresel-paketler/yoresel-kahvalti-paketi.jpg` |
| Hatay Lezzet Kutusu | `public/products/hediyelik-kutular/hatay-lezzet-kutusu.jpg` |

> When you add a **new product**, set its `images` path in `data/products.ts`
> following the same convention and drop the photo in the matching folder.
