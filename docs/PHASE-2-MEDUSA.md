# Phase 2 — Medusa Backend Entegrasyonu

> **Durum:** Foundation kuruldu. Medusa v2 backend `backend/` altında; okuma
> adaptörü (`lib/commerce/medusa-adapter.ts`), sipariş kalıcılığı
> (`lib/commerce/medusa-cart.ts` + `app/api/checkout/medusa/route.ts`) ve seed/
> import (`backend/src/migration-scripts/initial-data-seed.ts`) hazır. Çalıştırma
> adımları: [`backend/README.md`](../backend/README.md). Bu doküman tasarım/mimari
> referansıdır.

Phase 1 mağaza yüzü, backend-agnostik bir commerce adaptör arayüzü üzerine kuruludur.
Bu sayede Medusa'ya geçiş, sayfaları/bileşenleri **değiştirmeden** yapılabilir: yalnızca
adaptör implementasyonu yazılır ve seçim env ile değiştirilir.

## Genel Bakış

```
Sayfalar/Bileşenler  ──►  lib/commerce (CommerceAdapter arayüzü)
                                 ├─ mock-adapter.ts    (Phase 1 — seed verisi)
                                 └─ medusa-adapter.ts  (Phase 2 — Medusa Store API)
```

`lib/commerce/index.ts`, `COMMERCE_ADAPTER` env değerine göre adaptör seçer
(`mock` varsayılan, `medusa` ile gerçek backend).

## Adımlar

### 1. Medusa backend'i kur

Ayrı bir Medusa v2 projesi oluştur (bu repo dışında veya bir monorepo paketi olarak):

```bash
npx create-medusa-app@latest
```

PostgreSQL gerekir. Yerelde Docker ile:

```bash
docker run --name hatay-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16
```

Medusa `.env`: `DATABASE_URL`, `REDIS_URL` (opsiyonel), admin kullanıcı vb.
Migration + seed çalıştır, Medusa Admin'den ürün/kategori gir.

### 2. Ürün modelini eşle

`lib/commerce/types.ts` içindeki `Product` tipine Medusa ürünlerini map'le.
Bu projede özel alanlar var (food-specific); bunları Medusa tarafında **metadata** veya
custom alanlar olarak tut:

| Bu proje (`Product`) | Medusa kaynağı (öneri) |
|----------------------|------------------------|
| `title`, `slug`, `images`, `shortDescription`, `longDescription` | product temel alanları / handle / description |
| `price`, `discountPrice` (kuruş) | price list / variant prices (TRY, kuruş) |
| `variants[]` (500g/1kg…) | product variants |
| `stock` | inventory levels |
| `ingredients`, `allergens`, `storage`, `shelfLife`, `origin`, `usage` | `metadata` |
| `cargoType` (standard/cold_chain/fragile) | `metadata.cargo_type` |
| `featured`, `bestseller`, `isNew` | `metadata` flag'leri veya koleksiyon/etiket |

> Not: Para birimi bu projede **kuruş (integer)**. Medusa fiyatlarını kuruşa çevirerek map'le.

### 3. `medusa-adapter.ts` metotlarını yaz

`lib/commerce/medusa-adapter.ts` içindeki her metodu Medusa Store API'ye bağla
(`${MEDUSA_BACKEND_URL}/store/...`, `x-publishable-api-key` header ile). Şu an her metot
açık bir hata fırlatır; gerçek `fetch` çağrılarıyla değiştir ve sonucu `Product`/`Category`
tipine map'le.

### 4. Env ayarla ve adaptörü değiştir

```env
COMMERCE_ADAPTER=medusa
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_PUBLISHABLE_KEY=pk_...
```

`next.config.mjs` → `images.remotePatterns` içine Medusa/CDN görsel host'unu ekle.

### 5. Sepet & sipariş

Phase 1 sepeti client-side (localStorage) ve sipariş `sessionStorage`'da tutulur.
Phase 2'de:
- Sepeti Medusa cart API'ye taşı (server-side cart).
- **Fiyatları sunucuda yeniden hesapla** — client fiyatına asla güvenme
  (`components/checkout/CheckoutForm.tsx` içindeki not).
- Siparişi Medusa order olarak oluştur; onay sayfasını gerçek order'dan doldur.

### 6. Auth

`/giris`, `/kayit`, `/hesabim`, `/hesabim/siparisler` sayfaları Phase 1'de UI + bilgilendirme.
Medusa müşteri auth (customer sessions / JWT) ile bağla.

### 7. Entegrasyonlar

`lib/integrations/` stub'larını gerçek sağlayıcılarla doldur:
- `payment.ts` → PayTR / iyzico (hosted/3DS akışı, `redirectUrl`)
- `cargo.ts` → seçilen kargo firması API'si
- `sms.ts` → Netgsm
- `email.ts` → SMTP / Resend / SendGrid

Kimlik bilgileri **yalnızca sunucuda**, env'den okunur. Asla client'a sızdırma.

## Kontrol Listesi

- [ ] Medusa v2 backend + PostgreSQL ayağa kalktı
- [ ] Admin'den kategori + ürünler girildi (metadata alanları dahil)
- [ ] `medusa-adapter.ts` tüm metotlar implement edildi
- [ ] `COMMERCE_ADAPTER=medusa` ile mağaza Medusa'dan besleniyor
- [ ] Sepet/sipariş server-side, fiyatlar sunucuda doğrulanıyor
- [ ] Ödeme/kargo/SMS/e-posta entegrasyonları bağlandı
- [ ] Müşteri auth aktif
