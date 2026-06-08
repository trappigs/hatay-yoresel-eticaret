# Hatay Yöresel — Medusa Backend (Phase 2)

Medusa v2 backend that powers the storefront's `medusa` commerce adapter
(products, categories, carts, orders, customers via Medusa Admin + Store API).

The Next.js storefront lives in the repo root and stays separate. By default the
storefront uses the **mock** adapter; switch it to this backend by setting
`COMMERCE_ADAPTER=medusa` (see root README → "Phase 2").

## Requirements

- **Node 20 or 22** (Medusa's supported LTS). Node 24 may fail to boot — use nvm
  to switch if needed.
- **Docker** (for PostgreSQL via the included `docker-compose.yml`).

## Setup

```bash
cd backend
cp .env.template .env          # already filled with local dev defaults

# 1. Start PostgreSQL (+ Redis). Requires Docker Desktop running.
docker compose up -d

# 2. Install deps (if not already)
npm install

# 3. Run migrations — this ALSO seeds the Hatay catalog automatically
#    (10 categories, 12 products, TRY region, shipping, manual payment), because
#    the seed lives in src/migration-scripts/ and runs as a one-time migration.
npm run db:migrate

#    Do NOT run `npm run seed` after a successful migrate — it re-runs the seed
#    and creates duplicates. `npm run seed` is only for re-seeding a fresh DB.

# 4. Create an admin user
npx medusa user -e admin@hatay.test -p supersecret

# 5. Start backend + admin
npm run dev
```

- **Admin panel:** http://localhost:9000/app  (login with the user from step 5)
- **Store API:** http://localhost:9000/store
- **Health:** http://localhost:9000/health

## Get the publishable API key

The storefront needs a **publishable API key** linked to the sales channel.
After seeding, open **Admin → Settings → API Key Management → Publishable API
Keys**, copy the `pk_...` token. (The seed creates one named "Storefront
Publishable Key" linked to the Hatay sales channel.)

## Connect the storefront

In the **repo root** `.env.local`:

```env
COMMERCE_ADAPTER=medusa
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_PUBLISHABLE_KEY=pk_...        # from Admin
```

Restart the storefront (`npm run dev` in the root). Products/categories now come
from Medusa. Verify a product appears: open http://localhost:3000/urunler.

## How food-specific fields map

Medusa has no native columns for ingredients/allergens/etc., so the seed stores
them in product `metadata` and the storefront reads them back
(`lib/commerce/medusa-adapter.ts`):

| Storefront field | Medusa source |
|---|---|
| title, slug, description | product.title / handle / description |
| variants, prices (kuruş) | product.variants[].calculated_price (×100) |
| sku, stock | variant.sku, inventory level |
| category | product.categories[0].handle |
| ingredients, allergens, storage, shelf_life, origin, usage | `metadata.*` |
| cargoType | `metadata.cargo_type` |
| featured, bestseller, isNew | `metadata.featured / bestseller / is_new` |
| seoTitle, seoDescription | `metadata.seo_title / seo_description` |

## Orders / checkout

The storefront's order path (`lib/commerce/medusa-cart.ts` + `app/api/checkout/
medusa/route.ts`) creates and completes a real Medusa cart using the **manual
payment provider** (`pp_system_default`) and the **Standart Kargo** shipping
option the seed creates — no PayTR/iyzico needed to persist orders. Completed
orders appear in **Admin → Orders**.

## Production

Use [`.env.production.example`](.env.production.example) as the template. Set values
via the host's secret manager — **never commit `.env`** (gitignored).

- **Secrets:** generate fresh `JWT_SECRET` + `COOKIE_SECRET` with
  `openssl rand -base64 32`. Do NOT reuse the dev `supersecret-*` values.
- **CORS:** exact production origins only (no `*`, no `localhost`).
  `STORE_CORS`=storefront domain, `ADMIN_CORS`=backend/admin domain,
  `AUTH_CORS`=both.
- **Admin user:** `admin@hatay.test / supersecret` is **local test only**. In
  production create a real admin (`npx medusa user -e you@domain.com -p 'STRONG'`)
  and never deploy the test account.
- **Database:** managed Postgres with SSL (`?ssl=true`) + automated backups; do not
  expose the DB to the public internet. Run Redis in production.
- **Migrations/seed:** `npm run db:migrate` on deploy. The seed runs **once** (it's a
  migration script with an idempotency guard). **Do NOT run `npm run seed` on
  production after launch** — manage products in Admin instead.
- **Backups:** `pg_dump -Fc $DATABASE_URL > backup.dump` (off-site) or rely on the
  managed provider's automated backup + PITR.

## Notes / TODO (Phase 2.1+)

- Discounts: seed prices are list prices. Use Medusa **price lists / promotions**
  for discounts (the storefront adapter already reads `original_amount` vs
  `calculated_amount`).
- Product images: seed ships without photos (storefront placeholder). Upload via
  Admin or configure a file module (S3/MinIO) and add the host to the storefront
  `next.config.mjs` (handled via env).
- Real payment (PayTR/iyzico), cargo, SMS (Netgsm), transactional email: still
  pending — see root README.
