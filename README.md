# Hatay Yöresel Ürünler E-Ticaret

Hatay'ın yöresel gıda ürünleri (salça, zeytinyağı, nar ekşisi, baharat, reçel, peynir,
zeytin, künefe ürünleri, yöresel paketler ve hediyelik kutular) için mobil öncelikli,
SEO dostu, Türkçe e-ticaret mağazası.

> **Phase 1 (mevcut):** Çalışan, gezilebilir Next.js mağaza yüzü. Ürün/kategori/sepet/ödeme
> akışı, tüm sayfalar ve seed verisiyle birlikte. Ödeme, kargo, SMS, e-posta ve gerçek
> müşteri girişi entegrasyonları **placeholder** olarak tasarlandı.
>
> **Phase 2 (planlanan):** Medusa.js + PostgreSQL backend, gerçek auth ve ödeme/kargo/SMS
> entegrasyonları. Bkz. [`docs/PHASE-2-MEDUSA.md`](docs/PHASE-2-MEDUSA.md).

---

## Teknoloji

- **Next.js 15** (App Router, Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v3**
- **Commerce veri katmanı** — backend-agnostik adaptör arayüzü (`lib/commerce`):
  Phase 1'de mock adaptör (seed verisi), Phase 2'de Medusa adaptörü (aynı arayüz).
- Harici bağımlılık minimumda: yalnızca `clsx`. İkonlar elle yazılmış inline SVG.

## Mimari

```
app/                 # App Router sayfaları (home, kategori, ürün, sepet, ödeme, blog, yasal…)
components/          # Yeniden kullanılabilir bileşenler (Header, ProductCard, CheckoutForm…)
lib/
  commerce/          # types · mock-adapter · medusa-adapter (stub) · index (seçici)
  cart/              # localStorage tabanlı sepet context'i
  config/            # store.config · commerce.config (kargo/eşik/ödeme — yapılandırılabilir)
  integrations/      # payment · cargo · sms · email (pluggable stub'lar)
  seo/               # metadata + JSON-LD yardımcıları
  checkout/          # Phase 1 sipariş modeli (sessionStorage)
data/                # Türkçe seed: products · categories · reviews · blog
public/              # og-default.svg
```

**Para birimi:** tüm fiyatlar tam sayı **kuruş** olarak tutulur (1 TL = 100). Görüntüleme
sınırında `lib/money.ts` ile biçimlendirilir. Float kullanılmaz.

## Yerel Kurulum

Gereksinim: Node.js 18+ (geliştirme Node 24 ile yapıldı), npm.

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev                  # http://localhost:3000
```

Phase 1, `.env.local` olmadan da çalışır — değerler isteğe bağlıdır.

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi |
| `npm run start` | Üretim sunucusu (build sonrası) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Ortam Değişkenleri

Tümü `.env.example` içindedir. Phase 1 için hiçbiri zorunlu değildir.

- **Mağaza:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STORE_NAME`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
  `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`
- **Commerce backend (Phase 2):** `COMMERCE_ADAPTER` (`mock` | `medusa`), `MEDUSA_BACKEND_URL`,
  `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `MEDUSA_PUBLISHABLE_KEY`, `DATABASE_URL`
- **Ödeme (Phase 2):** `PAYTR_*`, `IYZICO_*`
- **Kargo (Phase 2):** `CARGO_PROVIDER`, `CARGO_API_KEY`, `CARGO_API_SECRET`
- **SMS/E-posta (Phase 2):** `NETGSM_*`, `EMAIL_*`, `SMTP_*`
- **Analitik (opsiyonel):** `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`
  (sadece tanımlıysa script yüklenir)

## Mağaza Kimliği (tek kaynak)

Tüm genel görünen bilgiler [`lib/config/store.config.ts`](lib/config/store.config.ts)
içinden yönetilir — bileşenlere dağıtılmaz:
- Mağaza adı, slogan, açıklama, site URL
- Telefon, WhatsApp, e-posta, kısa + açık adres
- Çalışma saatleri
- Sosyal medya bağlantıları
- **Havale/EFT bilgileri** (banka, hesap, IBAN — *placeholder*)
- **Şirket yasal kimliği** (ünvan, adres, vergi dairesi/no, MERSİS, ticaret sicil, KEP — *placeholder*)

`[köşeli parantez]` içindeki değerler placeholder'dır; yayından önce gerçek değerlerle değiştirin.
Public alanlar `.env.local` üzerinden de geçersiz kılınabilir (bkz. `.env.example`).

İş kuralları [`lib/config/commerce.config.ts`](lib/config/commerce.config.ts):
`shippingFee`, `freeShippingThreshold`, `lowStockThreshold`, `payment.card/bankTransfer/cashOnDelivery`.

## Ürün ve Görsel Ekleme

**Ürünler** — [`data/products.ts`](data/products.ts). Her ürün production yapısında:
başlık, slug, kısa/uzun açıklama, içindekiler, alerjen, saklama, raf ömrü, menşei,
kullanım, ağırlık/varyant, SKU, stok, kargo tipi, `seoTitle`/`seoDescription` ve
`images` (yerel yol). Backend Phase 2'de Medusa olunca bu alanlar Medusa'ya taşınır.

**Görseller** — konvansiyon:
```
public/products/<kategori-slug>/<urun-slug>.jpg   (kare, ~1200×1200, < 300 KB)
```
Dosya yoksa otomatik olarak markalı placeholder gösterilir (`next/image` kırılmaz).
Foto eklemek için dosyayı ilgili klasöre koyun ve `npm run build` çalıştırın.
Tam liste + isimlendirme: [`public/products/README.md`](public/products/README.md).

Yeni ürün eklerken `data/products.ts` içine yeni nesne ekleyin ve görselini aynı
konvansiyonla ilgili klasöre koyun.

## Entegrasyon TODO'ları (Phase 2)

`lib/integrations/` altındaki stub'lar gerçek sağlayıcılarla değiştirilecek:
- [ ] **Ödeme:** PayTR / iyzico (`payment.ts`)
- [ ] **Kargo:** Yurtiçi / MNG / Aras / Sürat / PTT (`cargo.ts`)
- [ ] **SMS:** Netgsm (`sms.ts`)
- [ ] **E-posta:** SMTP / Resend / SendGrid (`email.ts`)
- [ ] **Backend:** Medusa adaptörü (`lib/commerce/medusa-adapter.ts`)
- [ ] **Auth:** Medusa müşteri girişi (`/giris`, `/kayit`, `/hesabim`)

## Phase 2 — Medusa Backend (gerçek backend)

Storefront, backend-agnostik adaptör mimarisi sayesinde **UI değişmeden** gerçek
Medusa backend'ine geçebilir. Mock adaptör fallback olarak kalır.

```
Sayfalar/Bileşenler ─► lib/commerce (CommerceAdapter)
                          ├─ mock-adapter.ts     (seed verisi — varsayılan)
                          ├─ medusa-adapter.ts   (Medusa Store API — okuma)
                          └─ medusa-cart.ts      (Medusa cart→order — sipariş kalıcılığı)
```

Medusa v2 backend + PostgreSQL `backend/` klasöründedir. Kurulum:

```bash
cd backend
docker compose up -d        # PostgreSQL (Docker gerekir)
npm install
npm run db:migrate          # şema + Hatay kataloğunu otomatik seed'ler (10 kategori, 12 ürün, TRY region, kargo, manuel ödeme)
# Not: migrate seed'i otomatik çalıştırır; ayrıca `npm run seed` ÇALIŞTIRMAYIN (duplicate olur).
npx medusa user -e admin@hatay.test -p supersecret   # admin kullanıcı
npm run dev                 # backend + admin
```

- **Admin:** http://localhost:9000/app · **Store API:** http://localhost:9000/store
- Admin → Settings → API Keys'ten **publishable key** (`pk_...`) alın.

Storefront'u Medusa'ya bağlamak için repo kökünde `.env.local`:

```env
COMMERCE_ADAPTER=medusa
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_PUBLISHABLE_KEY=pk_...
```

Detaylar: [`backend/README.md`](backend/README.md) ve [`docs/PHASE-2-MEDUSA.md`](docs/PHASE-2-MEDUSA.md).

> **Mock'a dönmek:** `COMMERCE_ADAPTER=mock` (veya değişkeni kaldırın) — backend gerekmez.
>
> **Not:** Sipariş kalıcılığı Medusa'nın manuel ödeme sağlayıcısı ile çalışır;
> gerçek kart tahsilatı (PayTR/iyzico) hâlâ bekliyor. Ürün görselleri Admin'den
> yüklenir; indirimler Medusa price list/promosyon ile yönetilir.

## Dağıtım (Deployment)

> **Adım adım production deploy:** [`docs/DEPLOYMENT-RUNBOOK.md`](docs/DEPLOYMENT-RUNBOOK.md)
> (Vercel storefront + VPS Medusa backend + Postgres/Redis + Caddy + DNS + smoke testler).

- Storefront: Vercel veya Node sunucusu (`npm run build` → `npm run start`).
- `NEXT_PUBLIC_SITE_URL` üretim alan adına ayarlanmalı (canonical/OG/sitemap/robots için).
- `metadataBase`, `sitemap.xml`, `robots.txt`, favicon (`app/icon.svg`) ve OG görseli hazır
  (sosyal paylaşım için 1200×630 **PNG** OG önerilir).
- Backend: ayrı bir Medusa servisi + PostgreSQL (+ Redis) gerektirir.

### Ortam ayrımı (env separation)

| Dosya | Kapsam | Commit? |
|---|---|---|
| `.env.example` | Storefront — yerel geliştirme | ✅ |
| `.env.production.example` | Storefront — production şablonu | ✅ |
| `.env.local` | Storefront — yerel gerçek değerler | ❌ (gitignored) |
| `backend/.env.template` | Backend — yerel geliştirme | ✅ |
| `backend/.env.production.example` | Backend — production şablonu | ✅ |
| `backend/.env` | Backend — gerçek değerler | ❌ (gitignored) |

Yönetilen değişkenler: **frontend URL** (`NEXT_PUBLIC_SITE_URL`), **backend URL**
(`MEDUSA_BACKEND_URL`), **admin URL** (`https://api.../app`), **DATABASE_URL**,
**REDIS_URL**, **publishable key** (`MEDUSA_PUBLISHABLE_KEY`), **JWT/COOKIE secret**
(backend), **CORS origins** (`STORE_CORS`/`ADMIN_CORS`/`AUTH_CORS`).

### Güvenlik (production)

- Tüm gerçek değerler platform secret manager'ında; repoda asla. `.env*`
  gitignored, yalnızca `*.example`/`*.template` commit edilir.
- **Secret üret:** `openssl rand -base64 32` → `JWT_SECRET`, `COOKIE_SECRET`
  (dev'deki `supersecret-*` değerlerini ASLA prod'da kullanmayın).
- **CORS:** prod'da tam origin'ler — `*` yok, `localhost` yok. `STORE_CORS` =
  storefront domain, `ADMIN_CORS` = backend/admin domain, `AUTH_CORS` = ikisi.
- **Admin kullanıcısı:** `admin@hatay.test / supersecret` yalnızca **yerel test**
  içindir — prod'da gerçek e-posta + güçlü parola ile oluşturun, bu hesabı prod'a koymayın.
- Postgres SSL açık (`?ssl=true`), DB public internete açık olmamalı.
- Publishable key (`pk_...`) açığa çıkması güvenlidir; admin/secret anahtarları değil.

### Deployment planı — 3 seçenek

**A) Tek VPS + Docker Compose** — storefront + Medusa + Postgres + Redis aynı sunucuda,
reverse proxy (Caddy/Nginx) + TLS. En ucuz, tek sorumluluk; ölçeklenme ve yedek
manuel. Küçük başlangıç için uygun.

**B) Yönetilen Postgres + ayrı Node süreçleri** — Medusa ve storefront ayrı Node
servisleri (PM2/systemd veya Railway/Render), Postgres + Redis yönetilen servis.
Otomatik yedek, daha az ops riski.

**C) Vercel (storefront) + VPS/PaaS Medusa + yönetilen Postgres** — storefront Vercel'de
(otomatik TLS/CDN/ölçek), Medusa backend Railway/Render/VPS'te, Postgres yönetilen
(Neon/Supabase/RDS), Redis yönetilen.

> **Öneri (en güvenli): C.** Storefront Vercel'de (sıfır-ops, TLS, önbellek);
> Medusa ayrı bir Node host'unda; **yönetilen Postgres** (otomatik yedek + PITR)
> veri kaybı riskini en aza indirir. Bütçe kısıtlıysa **A** kabul edilebilir ama
> yedeği siz kurarsınız. Her durumda storefront ve backend ayrı domain/origin'lerde
> olmalı ve CORS buna göre ayarlanmalı.

### Veri güvenliği (data safety)

- **Yedek (PostgreSQL):**
  - Yönetilen Postgres'te otomatik günlük yedek + point-in-time recovery'i açın.
  - Self-host'ta cron ile: `pg_dump -Fc $DATABASE_URL > backup_$(date +%F).dump`
    (off-site'a kopyalayın). Geri yükleme: `pg_restore -d $DATABASE_URL backup.dump`.
- **Tekrar seed'i önleme:** seed `src/migration-scripts/` içindedir ve `db:migrate`
  ile **tek sefer** çalışır (uygulanmış migration olarak izlenir). Ayrıca seed başında
  **idempotency guard** vardır: ürün varsa hiçbir şey yapmadan çıkar.
- ⚠️ **Production'da launch sonrası `npm run seed` ÇALIŞTIRMAYIN.** Migrate seed'i
  zaten bir kez çalıştırır; manuel `seed` guard sayesinde no-op olsa da, alışkanlık
  haline getirmeyin. Ürünleri Admin'den yönetin.
- **Production ürün ekleme/güncelleme:** Medusa **Admin** (Products) üzerinden yapın —
  food alanları her ürünün **metadata**'sında (`cargo_type`, `ingredients`, `allergens`,
  `origin`, `storage`, `shelf_life`, `usage`, `featured`, `bestseller`, `is_new`,
  `seo_title`, `seo_description`) tutulur; storefront bunları otomatik okur. Toplu işlem
  için Medusa Admin API ile idempotent (handle/SKU bazlı upsert) script yazın — seed'i
  tekrar kullanmayın.

## ✅ Yayına Alma Kontrol Listesi (Launch Checklist)

- [ ] **Alan adı**: `NEXT_PUBLIC_SITE_URL` gerçek domain'e ayarlandı
- [ ] **Mağaza bilgileri**: `store.config.ts` / env → ad, telefon, WhatsApp, e-posta, adres, çalışma saatleri, sosyal medya
- [ ] **Havale/EFT**: gerçek banka + IBAN bilgileri girildi (`store.config.ts → bankTransfer`)
- [ ] **Şirket yasal kimliği**: ünvan, vergi, MERSİS vb. girildi (`store.config.ts → legal`)
- [ ] **Ürünler**: gerçek ürünler, fiyat (kuruş), stok, SKU `data/products.ts` içinde güncellendi
- [ ] **Ürün görselleri**: `public/products/...` altına eklendi
- [ ] **Yasal metinler**: KVKK, Gizlilik, Mesafeli Satış, Çerez, İade — avukat onayıyla değiştirildi
- [ ] **Ödeme**: PayTR/iyzico entegrasyonu yapılandırıldı (Phase 2)
- [ ] **Kargo**: kargo firması entegrasyonu yapılandırıldı (Phase 2)
- [ ] **E-posta/SMS**: sipariş bildirimi için sağlayıcı bağlandı (Phase 2)
- [ ] **Analitik**: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` / `NEXT_PUBLIC_META_PIXEL_ID` (opsiyonel)
- [ ] **Deploy**: `npm run build` ile derlendi ve yayınlandı
- [ ] **Checkout testi**: sepet → ödeme → sipariş onayı akışı test edildi
- [ ] **Google Search Console**: site doğrulandı ve `sitemap.xml` gönderildi

## İşletme Sahibinden Gereken Gerçek Değerler

Aşağıdakiler şu an placeholder; yayından önce gerçek değerleri gerekir:

- Telefon, WhatsApp numarası, sipariş e-postası, açık adres, çalışma saatleri
- Sosyal medya hesap bağlantıları (Instagram, Facebook, vb.)
- Banka adı, hesap sahibi ünvanı ve IBAN (havale için)
- Şirket ticari ünvanı, vergi dairesi/no, MERSİS no, ticaret sicil no, KEP adresi
- Gerçek ürün listesi, fiyat/stok ve ürün fotoğrafları
- Avukat onaylı yasal metinler
- Ödeme (PayTR/iyzico) ve kargo sözleşme bilgileri

## ⚠️ Yasal Uyarı

`/kvkk`, `/gizlilik`, `/mesafeli-satis-sozlesmesi`, `/cerez-politikasi` ve
`/teslimat-ve-iade` sayfalarındaki metinler **örnek/placeholder** içeriktir ve hukuki
tavsiye niteliği taşımaz. Yayına almadan önce bir **avukat** tarafından gözden geçirilmeli
ve işletmenize göre düzenlenmelidir.

Ürün açıklamaları organik/sertifika/sağlık iddiası içermez; yalnızca tanıtıcıdır.
Bu tür iddialar yalnızca doğrulanmış ve yasal olarak desteklenebiliyorsa eklenmelidir.
