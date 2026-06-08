# CLAUDE.md

Behavioral and project-specific guidelines for Claude Code.

This project is a custom e-commerce application for selling Hatay local food products.

These instructions are designed to reduce common LLM coding mistakes, keep the codebase maintainable, and guide implementation decisions.

---

# 1. Project Context

## Project Name

Hatay Yöresel Ürünler E-Ticaret

## Goal

Build a production-ready custom e-commerce website for selling local Hatay food products.

The system should support:

* Product browsing
* Product detail pages
* Cart
* Checkout
* Customer accounts
* Orders
* Admin-managed products and categories
* SEO-friendly pages
* Mobile-first storefront
* Pluggable payment, cargo, SMS and analytics integrations

This is not a fake static demo. Build real, maintainable project structure and working vertical slices.

---

# 2. Default Stack

Unless the existing project already uses a different stack, use:

* Next.js App Router
* TypeScript
* Tailwind CSS
* Medusa.js
* PostgreSQL
* Medusa Admin
* Turkish UI by default

Use `npm` unless the existing project already uses another package manager.

Do not introduce unnecessary libraries.

---

# 3. Business Context

The store sells local Hatay food products such as:

* Hatay biber salçası
* Domates salçası
* Nar ekşisi
* Zeytinyağı
* Baharatlar
* Zahter
* Zeytin
* Reçel
* Kahvaltılık ürünler
* Peynir ve süt ürünleri
* Künefe-related products
* Yöresel paketler
* Hediyelik kutular

The brand should feel:

* Warm
* Trustworthy
* Local
* Clean
* Premium but natural
* Family-business friendly
* Not like a cheap marketplace template

Avoid unsupported claims such as:

* Organic
* Certified organic
* Medical benefits
* Disease treatment
* Guaranteed health effects

Only use such claims if explicitly provided and legally verified.

---

# 4. Project Mode

This is a new custom e-commerce build, not a small bug-fix task.

When the task is project initialization or feature implementation:

* It is acceptable to create new files, folders, components, routes, schemas and configuration.
* Do not be overly restrictive with surgical changes during initial setup.
* Prefer a complete, working vertical slice over many half-finished placeholders.
* Still avoid unnecessary features, speculative abstractions and unrelated changes.
* Do not build features that were not requested or are not required for the current milestone.
* For existing code edits, return to strict surgical-change behavior.

---

# 5. Think Before Coding

Do not assume silently. Do not hide confusion.

Before implementing:

* State important assumptions explicitly.
* If multiple interpretations exist, present them.
* If a simpler approach exists, mention it.
* Push back when a requested approach would create unnecessary complexity.
* If something critical is unclear and implementation would likely be wrong, ask before coding.

For multi-step tasks, state a brief plan:

```text
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Then implement.

---

# 6. Simplicity First

Use the minimum code that solves the actual problem.

Rules:

* No speculative features.
* No abstractions for single-use code.
* No unnecessary configurability.
* No complicated architecture where simple code is enough.
* No large dependency just for a small helper.
* If a file becomes too large, split it only when the split improves readability.
* If 200 lines can reasonably be 50 lines, simplify.

Ask:

> Would a senior engineer say this is overcomplicated?

If yes, rewrite simpler.

---

# 7. Surgical Changes for Existing Code

When editing existing code:

* Touch only what is required.
* Do not refactor unrelated files.
* Do not improve adjacent code unless necessary for the requested task.
* Match the existing style.
* Do not change formatting across unrelated files.
* Do not delete unrelated dead code.
* If unrelated dead code is noticed, mention it instead of removing it.

When your changes create unused imports, variables, functions or files, clean up only the unused code created by your changes.

Every changed line should trace back to the requested task.

---

# 8. Core Storefront Pages

The storefront should support these pages:

* Home page
* Product listing page
* Category page
* Product detail page
* Cart page
* Checkout page
* Order confirmation page
* Login page
* Register page
* Customer account page
* Customer orders page
* About page
* Contact page
* FAQ page
* Shipping & Returns page
* KVKK page
* Privacy Policy page
* Distance Sales Agreement page
* Cookie Policy placeholder
* Blog listing page
* Blog detail page

Do not leave broken routes.

If a page is not fully implemented yet, create a clean, honest placeholder that fits the design and clearly indicates what is pending.

---

# 9. Home Page Requirements

The home page should include:

* Hero section
* Featured categories
* Best-selling products
* “Hatay’dan sofranıza” trust/story section
* Gift boxes / yöresel paketler section
* Why choose us section
* Customer reviews section
* Blog/content teaser section
* Newsletter or WhatsApp CTA
* Footer with legal links

Use Turkish UI text.

Keep the layout mobile-first.

---

# 10. Product Categories

Initial categories:

* Salça
* Zeytinyağı
* Nar Ekşisi
* Baharatlar
* Zeytin
* Reçel & Kahvaltılık
* Peynir & Süt Ürünleri
* Tatlı & Künefe Ürünleri
* Yöresel Paketler
* Hediyelik Kutular

Use SEO-friendly Turkish slugs.

Example:

```text
/salca
/zeytinyagi
/nar-eksisi
/baharatlar
/yoresel-paketler
```

---

# 11. Product Model Requirements

Products should support:

* Title
* Slug
* Short description
* Long description
* Images
* Category
* Price
* Discount price
* Stock quantity
* SKU
* Weight
* Variant support, such as 500g / 1kg / 2kg
* Cargo type: standard / cold_chain / fragile
* Ingredients
* Allergen information
* Storage conditions
* Shelf life
* Expiration date if applicable
* Origin location, such as Antakya, Samandağ, Altınözü
* Featured product flag
* Bestseller flag
* New product flag
* Low-stock state
* Out-of-stock state

Out-of-stock products must not be purchasable.

Discount prices must be displayed clearly and correctly.

---

# 12. Food Product Detail Requirements

Product detail pages should include sections for:

* İçindekiler
* Alerjen Bilgisi
* Saklama Koşulları
* Raf Ömrü
* Menşei
* Kargo Bilgisi
* Kullanım Önerisi

Cold-chain or fragile products should be visually marked.

Do not make unsupported health or certification claims.

---

# 13. Shopping Flow

The shopping flow should support:

* Add to cart
* Update quantity
* Remove item
* Cart summary
* Discount code placeholder
* Shipping cost placeholder
* Free shipping threshold if configured
* Checkout form
* Order confirmation page

Checkout form fields:

* Name surname
* Phone
* Email
* City
* District
* Full address
* Invoice type: individual / corporate
* TCKN optional
* Tax office for corporate invoices
* Tax number for corporate invoices
* Order note

Payment method placeholders:

* Credit/debit card
* Bank transfer
* Cash on delivery, optional and configurable

Do not hardcode real payment credentials.

---

# 14. Integration Strategy

Design integrations as replaceable modules.

Required placeholders:

* Payment: PayTR / iyzico
* Cargo: Yurtiçi / MNG / Aras / Sürat / PTT
* SMS: Netgsm
* Email provider
* Analytics: Google Analytics
* Ads tracking: Meta Pixel

Use `.env.example` for required environment variables.

Never commit real secrets.

---

# 15. Admin Requirements

Use Medusa Admin where appropriate.

Admin-side requirements:

* Product management
* Category management
* Inventory management
* Order management
* Customer management
* Discount management
* Basic order status flow
* Gift boxes / bundles if feasible without overengineering

Do not rebuild an entire admin panel from scratch if Medusa Admin already solves the need.

---

# 16. Frontend Components

Create clean reusable components where useful.

Expected components:

* Header
* Mobile menu
* Search bar
* Category navigation
* Product card
* Product grid
* Product image gallery
* Price display
* Add to cart button
* Quantity selector
* Cart drawer or cart page components
* Checkout form
* Footer
* Breadcrumbs
* Badge
* Review card
* Blog card
* Section heading
* Legal page layout
* Empty state
* Loading skeleton

Avoid creating components that are used only once unless they improve readability.

---

# 17. Design Guidelines

Design direction:

* Warm cream background
* Olive green accents
* Deep red / pepper paste red accents
* Dark readable text
* Clean typography
* Generous spacing
* Premium product cards
* Minimal clutter
* Mobile-first layout

Badges may include:

* Hatay’dan
* El Yapımı
* Çok Satan
* Yeni
* Sınırlı Stok
* Soğuk Zincir
* Kırılabilir

Header should include:

* Logo area
* Navigation
* Search
* Account icon/link
* Cart icon/link
* Mobile menu

Product cards should show:

* Image
* Category
* Title
* Price
* Discount price if available
* Badge
* Add-to-cart action

Product detail pages should look trustworthy and premium.

Checkout should be simple, clear and not overwhelming.

---

# 18. Turkish Language Rules

The UI language is Turkish by default.

Use consistent Turkish terms:

* Sepet
* Sepete Ekle
* Ürünler
* Kategoriler
* Siparişlerim
* Hesabım
* Giriş Yap
* Üye Ol
* Ödeme
* Teslimat
* Fatura Bilgileri
* İade ve Teslimat
* Mesafeli Satış Sözleşmesi
* Gizlilik Politikası
* KVKK Aydınlatma Metni

Avoid mixing English UI labels into customer-facing pages.

English is acceptable only in code, internal comments, environment names and developer documentation.

---

# 19. Sample Products

Use realistic Turkish mock products during development.

Example products:

* Hatay Biber Salçası 1 KG
* Ev Yapımı Nar Ekşisi 500 ML
* Soğuk Sıkım Zeytinyağı 1 LT
* Zahter Baharatı 250 G
* Hatay Kırma Zeytin 1 KG
* Ceviz Reçeli 450 G
* Yöresel Kahvaltı Paketi
* Hatay Lezzet Kutusu

Mock content must not claim certifications unless explicitly verified.

---

# 20. SEO Requirements

Implement SEO-friendly structure.

Requirements:

* Turkish SEO-friendly URLs
* Product page metadata
* Category page metadata
* Open Graph metadata
* Product structured data where appropriate
* Blog structure for content marketing
* Clean heading hierarchy
* Fast page performance
* Image alt text
* Canonical URL strategy where appropriate

Do not keyword-stuff.

Use natural Turkish copy.

---

# 21. Legal and Compliance

Create placeholder legal pages in Turkish:

* KVKK Aydınlatma Metni
* Gizlilik Politikası
* Mesafeli Satış Sözleşmesi
* İade ve Teslimat Koşulları
* Çerez Politikası

Clearly mark legal texts as placeholders that must be reviewed by a lawyer before production use.

Do not present placeholder legal text as final legal advice.

---

# 22. Configuration Rules

Values that should be configurable:

* Shipping fee
* Free shipping threshold
* Cash on delivery availability
* Payment provider
* Cargo provider
* SMS provider
* Analytics IDs
* Store name
* Store contact info
* WhatsApp number
* Social links

Do not over-configure early.

If a value is likely to change per client or per environment, put it in config or environment variables.

---

# 23. Error, Loading and Empty States

Add proper UI states for:

* Loading product lists
* Empty categories
* Empty cart
* Failed data loading
* Out-of-stock products
* Invalid checkout form
* Missing product
* Missing category

Avoid raw error dumps in the UI.

---

# 24. Security Rules

Security basics:

* Never expose secrets to the client.
* Never commit `.env` with real values.
* Use `.env.example`.
* Validate checkout form inputs.
* Sanitize user-generated content where applicable.
* Do not trust client-side prices for final order calculation.
* Avoid unsafe HTML rendering.
* Use server-side checks for important operations.

---

# 25. Performance Rules

Keep performance in mind:

* Use `next/image` for images.
* Avoid huge client components.
* Prefer Server Components where appropriate.
* Avoid unnecessary JavaScript on static content pages.
* Avoid loading all products if pagination/filtering is needed.
* Use sensible caching where appropriate.
* Keep mobile performance strong.

---

# 26. Testing and Verification

Transform tasks into verifiable goals.

Examples:

```text
Add cart quantity update
-> verify: add item, increase quantity, decrease quantity, remove item
```

```text
Add product detail page
-> verify: product route loads, images render, price displays, out-of-stock state works
```

When possible, run:

```bash
npm run lint
npm run typecheck
npm run build
```

If a command does not exist, do not invent success. Mention that it is missing and add it only if appropriate.

Fix:

* TypeScript errors
* Broken imports
* Unused imports from your changes
* Runtime errors caused by your changes
* Obvious responsive layout issues

---

# 27. README Requirements

Maintain a clear README.

README should include:

* Project overview
* Tech stack
* Local setup
* Required environment variables
* Database setup
* Medusa setup
* Development commands
* Build command
* Seed command if available
* Integration TODOs
* Deployment notes
* Legal disclaimer for placeholder legal pages

---

# 28. Environment Files

Provide `.env.example` files where needed.

Do not put real secrets.

Example variable categories:

```text
DATABASE_URL=
MEDUSA_BACKEND_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_STORE_NAME=
NEXT_PUBLIC_WHATSAPP_NUMBER=
PAYTR_MERCHANT_ID=
PAYTR_MERCHANT_KEY=
PAYTR_MERCHANT_SALT=
IYZICO_API_KEY=
IYZICO_SECRET_KEY=
NETGSM_USERCODE=
NETGSM_PASSWORD=
GOOGLE_ANALYTICS_ID=
META_PIXEL_ID=
```

Only include variables that are actually used or planned in integration placeholders.

---

# 29. Development Workflow

When starting a new task:

1. Inspect the existing project structure.
2. Identify relevant files.
3. State assumptions and plan briefly.
4. Implement the smallest complete solution.
5. Run available checks.
6. Fix errors.
7. Summarize what changed and what remains.

Do not skip inspection.

Do not rewrite the project unless explicitly asked.

---

# 30. Output Expectations

After completing a task, provide a short summary:

* What was changed
* Files touched
* How it was verified
* What still needs credentials or manual configuration
* Any important TODOs

Do not write long essays after every code task.

Be precise.

---

# 31. Anti-Patterns to Avoid

Avoid:

* Fake static-only storefront pretending to be real e-commerce
* Hardcoded product data everywhere
* Hardcoded prices in the client checkout
* Unused giant component libraries
* Overly complex state management
* Rebuilding Medusa Admin from scratch
* Mixing Turkish and English in customer-facing UI
* Making health or organic claims without proof
* Leaving broken imports
* Ignoring mobile layout
* Creating many placeholder files with no real behavior
* Changing unrelated code
* Refactoring entire app during small tasks
* Claiming checks passed without running them

---

# 32. Final Rule

Build the simplest production-oriented version that can actually be extended.

Prefer:

* Working vertical slices
* Clean structure
* Turkish UX
* Mobile-first design
* Real commerce foundations
* Replaceable integrations
* Clear TODOs for external services

Avoid:

* Demo-only code
* Overengineering
* Unrelated refactors
* Hidden assumptions
* Broken builds