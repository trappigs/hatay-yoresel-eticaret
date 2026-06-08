# Deployment Runbook — Hatay Yöresel E‑Ticaret

Production deploy of the current Medusa‑mode site. Card payment (PayTR) ships
**disabled** (no credentials yet) — bank transfer + cash on delivery are the live
payment paths. PayTR is enabled later by setting env vars once the domain is
approved.

## Architecture

```
 Browser ──► www.<domain>   (Storefront — Vercel, Next.js)
                  │ server-side fetch + publishable key
                  ▼
            api.<domain>     (Medusa backend + Admin — VPS/Railway/Render)
                  │
            PostgreSQL + Redis  (Docker on the VPS, or managed)
```

**Deploy order: backend FIRST** (storefront needs `api.<domain>` to exist), then DNS, then storefront.

## Prerequisites

- A domain you control (DNS access).
- A VPS (Ubuntu 22.04+, 2 GB RAM min) with **Node 20 or 22** + Docker, OR a
  Railway/Render account for the backend.
- A Vercel account (free tier is fine) connected to the git repo.
- This repo pushed to GitHub/GitLab.

---

## Part A — Backend (VPS)

> Railway/Render alternative: create a Node service from `backend/`, add managed
> Postgres + Redis, set the env vars from the table below, run `npm run db:migrate`
> + create an admin user via the service shell. Skip the Caddy/Docker steps.

### A1. Server prep
```bash
ssh root@<VPS_IP>
# Node 20 (nvm) + Docker + Caddy
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs
curl -fsSL https://get.docker.com | sh
apt-get install -y caddy git
```

### A2. Get the code + Postgres/Redis
```bash
git clone <repo-url> /opt/hatay && cd /opt/hatay/backend
docker compose up -d            # Postgres + Redis (backend/docker-compose.yml)
```
For a **managed** Postgres/Redis instead, skip compose and point `DATABASE_URL`
/ `REDIS_URL` at the managed instances (recommended for automatic backups).

### A3. Backend env
```bash
cp .env.production.example .env
nano .env
```
Fill (see **Backend env** table below). Generate secrets:
```bash
openssl rand -base64 32   # JWT_SECRET
openssl rand -base64 32   # COOKIE_SECRET
```
Set `STORE_CORS=https://www.<domain>`, `ADMIN_CORS=https://api.<domain>`,
`AUTH_CORS=https://www.<domain>,https://api.<domain>`,
`MEDUSA_BACKEND_URL=https://api.<domain>`.

### A4. Build, migrate (⚠ seeds once), admin user
```bash
npm install
npm run build
npm run db:migrate     # runs migrations AND seeds the sample catalog ONCE
npx medusa user -e admin@<domain> -p 'STRONG_PASSWORD'
```
> ⚠️ **Seed warning:** `db:migrate` auto‑runs the seed (it's a migration script
> with an idempotency guard) — on a fresh prod DB it loads the **12 sample
> products**. Re‑running is a no‑op (guard). To go live with real products:
> edit/delete the samples in **Admin → Products**, or add real ones. Do **NOT**
> run `npm run seed` manually in production.

### A5. Run the backend (PM2)
```bash
npm install -g pm2
pm2 start "npm run start" --name medusa --cwd /opt/hatay/backend
pm2 save && pm2 startup     # restart on reboot
```

### A6. Reverse proxy + TLS (Caddy)
```bash
cp Caddyfile.example /etc/caddy/Caddyfile
nano /etc/caddy/Caddyfile     # set api.<domain>
systemctl reload caddy        # auto HTTPS via Let's Encrypt
```

### A7. Get the publishable key
Open `https://api.<domain>/app` → **Settings → API Key Management → Publishable
Keys** → copy the `pk_...` linked to the Hatay sales channel (the seed creates it).
You'll paste it into Vercel.

---

## Part B — DNS

| Record | Host | Value |
|---|---|---|
| A | `api` | `<VPS_IP>` |
| CNAME | `www` | `cname.vercel-dns.com` (Vercel shows the exact target) |
| A/ALIAS | `@` (apex, optional) | redirect apex → www (in Vercel) |

TLS: `api` → Caddy/Let's Encrypt (automatic). `www` → Vercel (automatic).

---

## Part C — Storefront (Vercel)

1. **Import** the repo in Vercel → **New Project**. Root directory = repo root.
   Framework = **Next.js** (auto). `.vercelignore` already excludes `backend/`.
2. **Environment Variables** (Production) — set the **Storefront env** table below.
   Leave all `PAYTR_*` **empty** for now.
3. **Deploy.** Then **Settings → Domains** → add `www.<domain>` (and apex redirect).
4. Re‑deploy after adding the domain so `NEXT_PUBLIC_SITE_URL` is correct.

> The storefront calls the Medusa Store API **server‑side** (Vercel functions),
> so `MEDUSA_BACKEND_URL` must be the public `https://api.<domain>`. Product
> images load from `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (allowed via
> `next.config.mjs` remotePatterns from env).

---

## Exact env vars

### Storefront (Vercel → Settings → Environment Variables)

| Var | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://www.<domain>` |
| `COMMERCE_ADAPTER` | ✅ | `medusa` |
| `MEDUSA_BACKEND_URL` | ✅ | `https://api.<domain>` |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | ✅ | `https://api.<domain>` |
| `MEDUSA_PUBLISHABLE_KEY` | ✅ | `pk_...` (from A7) |
| `PAYTR_MERCHANT_ID` / `_KEY` / `_SALT` | ❌ now | leave EMPTY → card disabled |
| `NEXT_PUBLIC_*` contact/brand | optional | override `store.config.ts` defaults |

### Backend (VPS `.env` / host secrets)

| Var | Required | Value |
|---|---|---|
| `NODE_ENV` | ✅ | `production` |
| `DATABASE_URL` | ✅ | `postgres://user:pass@host:5432/db?ssl=true` |
| `REDIS_URL` | ✅ | `redis://host:6379` |
| `JWT_SECRET` | ✅ | `openssl rand -base64 32` |
| `COOKIE_SECRET` | ✅ | `openssl rand -base64 32` |
| `STORE_CORS` | ✅ | `https://www.<domain>` |
| `ADMIN_CORS` | ✅ | `https://api.<domain>` |
| `AUTH_CORS` | ✅ | `https://www.<domain>,https://api.<domain>` |
| `MEDUSA_BACKEND_URL` | ✅ | `https://api.<domain>` |

---

## PayTR (enable later)

Card payment is disabled until all three secrets are set; the checkout shows
"Kart ödemesi şu anda kullanılamıyor" and customers use havale/EFT or kapıda ödeme.

When the domain is live and PayTR approves the merchant, give PayTR these URLs and
add the env vars (Vercel, redeploy):

| PayTR panel field | Value |
|---|---|
| Site / Mağaza URL | `https://www.<domain>` |
| Başarılı (OK) URL | `https://www.<domain>/odeme/onay?odeme=basarili` |
| Başarısız (Fail) URL | `https://www.<domain>/odeme/hata` |
| **Bildirim (Callback) URL** | `https://www.<domain>/api/payment/paytr/callback` |

Then set on Vercel: `PAYTR_MERCHANT_ID`, `PAYTR_MERCHANT_KEY`,
`PAYTR_MERCHANT_SALT`, `PAYTR_TEST_MODE=0` → redeploy. Card option activates
automatically.

---

## Production smoke tests

Run after deploy (replace `<domain>`):

- [ ] `https://www.<domain>` opens (home renders)
- [ ] `https://api.<domain>/health` → `200`
- [ ] `https://api.<domain>/app` → Admin login works (`admin@<domain>`)
- [ ] `https://www.<domain>/urunler` lists products **from Medusa**
- [ ] Product detail loads; **Sepete Ekle** works (in‑stock)
- [ ] Checkout with **Havale/EFT** or **Kapıda Ödeme** → confirmation page shows an order number
- [ ] **Kredi/Banka Kartı** shows "şu an kullanılamıyor" (PayTR creds absent) — no crash
- [ ] The order appears in **Admin → Orders**
- [ ] (negative) `https://www.<domain>/api/payment/paytr/token` POST → `503 not_configured`

```bash
curl -s https://api.<domain>/health
curl -s -o /dev/null -w "%{http_code}\n" https://www.<domain>/urunler
```

---

## Notes / rollback

- **Rollback storefront:** Vercel → Deployments → promote a previous build.
- **Rollback backend:** `pm2 restart medusa` after `git checkout <prev>` + `npm run build`.
- **Backups:** `pg_dump -Fc $DATABASE_URL > backup.dump` (cron, off‑site) or use the
  managed provider's automated backup.
- **Switch to mock** (emergency, products only): set `COMMERCE_ADAPTER=mock` on
  Vercel + redeploy (uses the bundled sample data; checkout falls back to the local
  receipt). Not recommended for real orders.
- Legal texts (`/kvkk`, `/gizlilik`, `/mesafeli-satis-sozlesmesi`, `/teslimat-ve-iade`,
  `/cerez-politikasi`) are still placeholders — replace with lawyer‑approved text
  before taking real orders.
