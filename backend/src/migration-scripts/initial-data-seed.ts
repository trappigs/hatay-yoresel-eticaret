import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Hatay Yöresel Ürünler — Medusa seed/import.
 * Mirrors the storefront catalog (data/products.ts, data/categories.ts) into
 * Medusa: TR region (TRY), single "tr" service zone, 10 categories and 12
 * products. Food-specific fields the storefront needs are stored in `metadata`
 * and read back by lib/commerce/medusa-adapter.ts.
 *
 * Run:  npm run seed   (after `npm run db:migrate`)
 * Prices here are major TRY units (kuruş ÷ 100). Discounts are intentionally not
 * seeded — use Medusa price lists / promotions for those (Phase 2.1).
 */

const CATEGORIES = [
  { handle: "salca", name: "Salça", description: "Hatay biber ve domates salçaları." },
  { handle: "zeytinyagi", name: "Zeytinyağı", description: "Soğuk sıkım Hatay zeytinyağı." },
  { handle: "nar-eksisi", name: "Nar Ekşisi", description: "Katkısız Hatay nar ekşisi." },
  { handle: "baharatlar", name: "Baharatlar", description: "Zahter ve yöresel baharatlar." },
  { handle: "zeytin", name: "Zeytin", description: "Hatay kırma ve sele zeytinleri." },
  { handle: "recel-kahvaltilik", name: "Reçel & Kahvaltılık", description: "Yöresel reçeller ve kahvaltılıklar." },
  { handle: "peynir-sut-urunleri", name: "Peynir & Süt Ürünleri", description: "Sürk, künefelik peynir." },
  { handle: "tatli-kunefe", name: "Tatlı & Künefe Ürünleri", description: "Künefelik malzemeler." },
  { handle: "yoresel-paketler", name: "Yöresel Paketler", description: "Yöresel ürün paketleri." },
  { handle: "hediyelik-kutular", name: "Hediyelik Kutular", description: "Şık hediyelik kutular." },
];

interface VariantSpec {
  title: string;
  sku: string;
  priceKurus: number;
  stock: number;
  weightGrams: number;
}
interface ProductSpec {
  title: string;
  handle: string;
  category: string;
  description: string;
  weightGrams: number;
  cargoType: "standard" | "cold_chain" | "fragile";
  origin: string;
  storage: string;
  shelfLife: string;
  usage?: string;
  ingredients: string[];
  allergens: string[];
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  seoTitle: string;
  seoDescription: string;
  variants: VariantSpec[];
}

const PRODUCTS: ProductSpec[] = [
  {
    title: "Hatay Biber Salçası 1 KG", handle: "hatay-biber-salcasi", category: "salca",
    description: "Güneşte kurutulmuş kırmızı biberden, tuz dışında katkı içermeyen geleneksel acılı salça.",
    weightGrams: 1000, cargoType: "standard", origin: "Antakya, Hatay",
    storage: "Açıldıktan sonra buzdolabında, ağzı kapalı saklayınız.", shelfLife: "12 ay (açılmamış).",
    usage: "Çorba, et ve sebze yemeklerinde kullanılır.",
    ingredients: ["Kırmızı biber", "Tuz"], allergens: ["Bilinen alerjen içermez"],
    featured: true, bestseller: true, isNew: false, rating: 4.8, reviewCount: 124,
    seoTitle: "Hatay Biber Salçası 1 KG | Acılı Ev Salçası",
    seoDescription: "Güneşte kurutulmuş Hatay biberinden katkısız acılı biber salçası. 500 G – 2 KG.",
    variants: [
      { title: "500 G", sku: "SAL-BIB-0500", priceKurus: 8990, stock: 40, weightGrams: 500 },
      { title: "1 KG", sku: "SAL-BIB-1000", priceKurus: 15990, stock: 32, weightGrams: 1000 },
      { title: "2 KG", sku: "SAL-BIB-2000", priceKurus: 29990, stock: 18, weightGrams: 2000 },
    ],
  },
  {
    title: "Ev Yapımı Nar Ekşisi 500 ML", handle: "ev-yapimi-nar-eksisi", category: "nar-eksisi",
    description: "Gerçek nar suyundan, şeker ve katkı eklenmeden kıvamına gelene dek kaynatılmış nar ekşisi.",
    weightGrams: 700, cargoType: "fragile", origin: "Samandağ, Hatay",
    storage: "Serin yerde; açıldıktan sonra buzdolabında.", shelfLife: "18 ay (açılmamış).",
    usage: "Salata sosu, et marinasyonu ve yöresel yemeklerde.",
    ingredients: ["Nar suyu (%100)"], allergens: ["Bilinen alerjen içermez"],
    featured: true, bestseller: true, isNew: false, rating: 4.9, reviewCount: 98,
    seoTitle: "Ev Yapımı Nar Ekşisi 500 ML | Katkısız Hatay",
    seoDescription: "Gerçek nar suyundan kaynatılmış katkısız Hatay nar ekşisi. Samandağ üretimi.",
    variants: [
      { title: "500 ML", sku: "NAR-EKS-0500", priceKurus: 11990, stock: 50, weightGrams: 700 },
      { title: "1 LT", sku: "NAR-EKS-1000", priceKurus: 21990, stock: 28, weightGrams: 1300 },
    ],
  },
  {
    title: "Soğuk Sıkım Zeytinyağı 1 LT", handle: "soguk-sikim-zeytinyagi", category: "zeytinyagi",
    description: "Erken hasat zeytinlerden soğuk sıkım, naturel sızma zeytinyağı. Düşük asitli, meyvemsi aroma.",
    weightGrams: 1000, cargoType: "standard", origin: "Altınözü, Hatay",
    storage: "Işık almayan, serin yerde, ağzı kapalı saklayınız.", shelfLife: "24 ay.",
    usage: "Kahvaltıda, salatada ve soğuk mezelerde.",
    ingredients: ["%100 naturel sızma zeytinyağı"], allergens: ["Bilinen alerjen içermez"],
    featured: true, bestseller: true, isNew: false, rating: 4.7, reviewCount: 211,
    seoTitle: "Soğuk Sıkım Zeytinyağı 1 LT | Naturel Sızma",
    seoDescription: "Erken hasat, soğuk sıkım naturel sızma Hatay zeytinyağı. Altınözü üretimi.",
    variants: [
      { title: "1 LT", sku: "ZYT-SOG-1000", priceKurus: 24990, stock: 60, weightGrams: 1000 },
      { title: "2 LT", sku: "ZYT-SOG-2000", priceKurus: 47990, stock: 35, weightGrams: 2000 },
      { title: "5 LT", sku: "ZYT-SOG-5000", priceKurus: 109990, stock: 20, weightGrams: 5000 },
    ],
  },
  {
    title: "Zahter Baharatı 250 G", handle: "zahter-baharati", category: "baharatlar",
    description: "Hatay'a özgü zahter otu, susam, sumak ve baharatların yöresel karışımı.",
    weightGrams: 250, cargoType: "standard", origin: "Antakya, Hatay",
    storage: "Ağzı kapalı, kuru ve serin yerde saklayınız.", shelfLife: "12 ay.",
    usage: "Zeytinyağına bandırarak tüketilir.",
    ingredients: ["Zahter otu", "Kavrulmuş susam", "Sumak", "Tuz"], allergens: ["Susam içerir"],
    featured: false, bestseller: true, isNew: false, rating: 4.8, reviewCount: 64,
    seoTitle: "Zahter Baharatı 250 G | Hatay Kahvaltısı",
    seoDescription: "Susam, sumak ve zahter otundan yöresel Hatay zahter karışımı.",
    variants: [
      { title: "250 G", sku: "BAH-ZAH-0250", priceKurus: 7490, stock: 44, weightGrams: 250 },
      { title: "500 G", sku: "BAH-ZAH-0500", priceKurus: 13490, stock: 26, weightGrams: 500 },
    ],
  },
  {
    title: "Hatay Kırma Zeytin 1 KG", handle: "hatay-kirma-zeytin", category: "zeytin",
    description: "Çizik/kırma yöntemiyle hazırlanmış, sarımsak ve baharatlarla lezzetlendirilmiş yeşil zeytin.",
    weightGrams: 1000, cargoType: "standard", origin: "Altınözü, Hatay",
    storage: "Buzdolabında, kendi suyu içinde saklayınız.", shelfLife: "6 ay.",
    usage: "Kahvaltıda ve meze tabaklarında.",
    ingredients: ["Yeşil zeytin", "Su", "Tuz", "Sarımsak", "Limon"], allergens: ["Bilinen alerjen içermez"],
    featured: false, bestseller: false, isNew: false, rating: 4.6, reviewCount: 41,
    seoTitle: "Hatay Kırma Zeytin 1 KG | Baharatlı Yeşil Zeytin",
    seoDescription: "Sarımsak ve baharatlarla lezzetlenen Hatay kırma yeşil zeytin.",
    variants: [{ title: "1 KG", sku: "ZTN-KIR-1000", priceKurus: 13990, stock: 38, weightGrams: 1000 }],
  },
  {
    title: "Ceviz Reçeli 450 G", handle: "ceviz-receli", category: "recel-kahvaltilik",
    description: "Olgunlaşmamış yeşil cevizden, geleneksel yöntemle hazırlanan yoğun kıvamlı ceviz reçeli.",
    weightGrams: 600, cargoType: "fragile", origin: "Antakya, Hatay",
    storage: "Serin ve kuru yerde; açıldıktan sonra buzdolabında.", shelfLife: "18 ay (açılmamış).",
    usage: "Kahvaltıda ve tatlı sunumlarında.",
    ingredients: ["Yeşil ceviz", "Şeker", "Su", "Limon tuzu"], allergens: ["Sert kabuklu yemiş (ceviz) içerir"],
    featured: false, bestseller: false, isNew: true, rating: 4.9, reviewCount: 33,
    seoTitle: "Ceviz Reçeli 450 G | Geleneksel Yöresel Reçel",
    seoDescription: "Yeşil cevizden geleneksel yöntemle hazırlanan yoğun kıvamlı ceviz reçeli.",
    variants: [{ title: "450 G", sku: "REC-CEV-0450", priceKurus: 16990, stock: 5, weightGrams: 600 }],
  },
  {
    title: "Yöresel Kahvaltı Paketi", handle: "yoresel-kahvalti-paketi", category: "yoresel-paketler",
    description: "Zahter, zeytinyağı, kırma zeytin ve nar ekşisinden oluşan kahvaltı başlangıç paketi.",
    weightGrams: 2500, cargoType: "cold_chain", origin: "Hatay",
    storage: "Soğuk zincir ürünleri buzdolabında saklayınız.", shelfLife: "Ürünlerin kendi tarihleri geçerlidir.",
    usage: "Kahvaltı sofranızda servis edilir.",
    ingredients: ["Zahter", "Zeytinyağı", "Kırma zeytin", "Nar ekşisi"], allergens: ["Susam içerir"],
    featured: true, bestseller: false, isNew: true, rating: 4.8, reviewCount: 17,
    seoTitle: "Yöresel Kahvaltı Paketi | Hatay Kahvaltılık Seti",
    seoDescription: "Zahter, zeytinyağı, kırma zeytin ve nar ekşisinden Hatay kahvaltı paketi.",
    variants: [{ title: "Standart", sku: "PKT-KAH-0001", priceKurus: 49990, stock: 24, weightGrams: 2500 }],
  },
  {
    title: "Hatay Lezzet Kutusu", handle: "hatay-lezzet-kutusu", category: "hediyelik-kutular",
    description: "Şık sunumlu hediyelik kutu: biber salçası, zeytinyağı, zahter ve ceviz reçeli bir arada.",
    weightGrams: 3000, cargoType: "standard", origin: "Hatay",
    storage: "Ürünlerin kendi saklama koşullarına uyunuz.", shelfLife: "Ürünlerin kendi tarihleri geçerlidir.",
    usage: "Hediye olarak sunulabilir.",
    ingredients: ["Biber salçası", "Zeytinyağı", "Zahter", "Ceviz reçeli"], allergens: ["Susam ve ceviz içerir"],
    featured: true, bestseller: true, isNew: false, rating: 5.0, reviewCount: 52,
    seoTitle: "Hatay Lezzet Kutusu | Yöresel Hediyelik Set",
    seoDescription: "Biber salçası, zeytinyağı, zahter ve ceviz reçelinden şık hediyelik Hatay lezzet kutusu.",
    variants: [{ title: "Standart", sku: "HED-LZT-0001", priceKurus: 64990, stock: 30, weightGrams: 3000 }],
  },
  {
    title: "Hatay Domates Salçası 1 KG", handle: "hatay-domates-salcasi", category: "salca",
    description: "Tarla domatesinden, güneşte kurutularak hazırlanan katkısız domates salçası.",
    weightGrams: 1000, cargoType: "standard", origin: "Amik Ovası, Hatay",
    storage: "Açıldıktan sonra buzdolabında, ağzı kapalı saklayınız.", shelfLife: "12 ay (açılmamış).",
    usage: "Çorba, yemek ve soslarda.",
    ingredients: ["Domates", "Tuz"], allergens: ["Bilinen alerjen içermez"],
    featured: false, bestseller: false, isNew: false, rating: 4.7, reviewCount: 48,
    seoTitle: "Hatay Domates Salçası 1 KG | Katkısız Ev Salçası",
    seoDescription: "Güneşte kurutulmuş tarla domatesinden katkısız domates salçası. Amik Ovası üretimi.",
    variants: [
      { title: "500 G", sku: "SAL-DOM-0500", priceKurus: 7990, stock: 36, weightGrams: 500 },
      { title: "1 KG", sku: "SAL-DOM-1000", priceKurus: 13990, stock: 30, weightGrams: 1000 },
    ],
  },
  {
    title: "Evde Künefe Seti", handle: "kunefe-seti", category: "tatli-kunefe",
    description: "Künefelik tel kadayıf ve tuzsuz künefe peyniri ile evde iki kişilik künefe keyfi.",
    weightGrams: 1000, cargoType: "cold_chain", origin: "Antakya, Hatay",
    storage: "Buzdolabında saklayınız, soğuk zincir ürünüdür.", shelfLife: "Sevkiyattan itibaren 7 gün.",
    usage: "Tepside katmanlayıp kızartın, şerbetini ekleyin.",
    ingredients: ["Tel kadayıf", "Tuzsuz künefe peyniri"], allergens: ["Gluten ve süt içerir"],
    featured: false, bestseller: false, isNew: true, rating: 4.9, reviewCount: 29,
    seoTitle: "Evde Künefe Seti | Tel Kadayıf + Künefe Peyniri",
    seoDescription: "Künefelik tel kadayıf ve tuzsuz künefe peyniriyle evde Hatay künefesi.",
    variants: [{ title: "İki Kişilik", sku: "TAT-KUN-0001", priceKurus: 18990, stock: 12, weightGrams: 1000 }],
  },
  {
    title: "Hatay Sürk (Çökelek) Peyniri 500 G", handle: "hatay-surk-peyniri", category: "peynir-sut-urunleri",
    description: "Baharatlarla yoğrulmuş, koni şeklinde kurutulan geleneksel Hatay sürk peyniri.",
    weightGrams: 500, cargoType: "cold_chain", origin: "Antakya, Hatay",
    storage: "Buzdolabında saklayınız, soğuk zincir ürünüdür.", shelfLife: "60 gün.",
    usage: "Zeytinyağıyla ezerek kahvaltıda.",
    ingredients: ["Çökelek", "Tuz", "Kekik", "Kimyon", "Pul biber"], allergens: ["Süt içerir"],
    featured: false, bestseller: false, isNew: false, rating: 4.7, reviewCount: 22,
    seoTitle: "Hatay Sürk Peyniri 500 G | Baharatlı Çökelek",
    seoDescription: "Kekik, kimyon ve pul biberle yoğrulan geleneksel Hatay sürk peyniri.",
    variants: [{ title: "500 G", sku: "PEY-SUR-0500", priceKurus: 17990, stock: 16, weightGrams: 500 }],
  },
  {
    title: "Antakya Künefe Peyniri 500 G", handle: "antakya-kunefe-peyniri", category: "peynir-sut-urunleri",
    description: "Tuzsuz, taze künefelik peynir. Künefe ve peynirli tatlılar için ideal kıvam.",
    weightGrams: 500, cargoType: "cold_chain", origin: "Antakya, Hatay",
    storage: "Buzdolabında saklayınız, soğuk zincir ürünüdür.", shelfLife: "21 gün.",
    usage: "Künefe ve peynirli tatlılarda.",
    ingredients: ["Pastörize inek sütü", "Peynir mayası"], allergens: ["Süt içerir"],
    featured: false, bestseller: false, isNew: false, rating: 4.8, reviewCount: 19,
    seoTitle: "Antakya Künefe Peyniri 500 G | Tuzsuz Taze",
    seoDescription: "Künefe ve peynirli tatlılar için tuzsuz, taze Antakya künefe peyniri.",
    variants: [{ title: "500 G", sku: "PEY-KUN-0500", priceKurus: 15990, stock: 0, weightGrams: 500 }],
  },
];

export default async function initial_data_seed({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(ModuleRegistrationName.FULFILLMENT);

  const countries = ["tr"];

  // Idempotency guard: never duplicate data. Safe to re-run; no-op once seeded.
  // This is also why it must NOT be run again on production after launch.
  const { data: existingProducts } = await query.graph({ entity: "product", fields: ["id"] });
  if (existingProducts.length > 0) {
    logger.info(`Seed skipped: ${existingProducts.length} products already exist. Manage products in Medusa Admin.`);
    return;
  }

  logger.info("Seeding store data (Hatay)...");
  const { result: [defaultSalesChannel] } = await createSalesChannelsWorkflow(container).run({
    input: { salesChannelsData: [{ name: "Hatay Yöresel Satış Kanalı" }] },
  });

  const { result: [publishableApiKey] } = await createApiKeysWorkflow(container).run({
    input: { api_keys: [{ title: "Storefront Publishable Key", type: "publishable", created_by: "seed" }] },
  });
  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [defaultSalesChannel.id] },
  });

  await createStoresWorkflow(container).run({
    input: {
      stores: [{
        name: "Hatay Yöresel Ürünler",
        supported_currencies: [{ currency_code: "try", is_default: true }],
        default_sales_channel_id: defaultSalesChannel.id,
      }],
    },
  });

  logger.info("Seeding TR region...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [{
        name: "Türkiye",
        currency_code: "try",
        countries,
        payment_providers: ["pp_system_default"],
      }],
    },
  });
  const region = regionResult[0];

  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({ country_code, provider_id: "tp_system" })),
  });

  logger.info("Seeding stock location...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
    input: { locations: [{ name: "Antakya Deposu", address: { city: "Antakya", country_code: "TR", address_1: "" } }] },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  });

  const { data: shippingProfileResult } = await query.graph({ entity: "shipping_profile", fields: ["id"] });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Türkiye Teslimat",
    type: "shipping",
    service_zones: [{ name: "Türkiye", geo_zones: [{ country_code: "tr", type: "country" }] }],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [{
      name: "Standart Kargo",
      price_type: "flat",
      provider_id: "manual_manual",
      service_zone_id: fulfillmentSet.service_zones[0].id,
      shipping_profile_id: shippingProfile.id,
      type: { label: "Standart", description: "1-3 iş günü içinde kargo.", code: "standard" },
      prices: [
        { currency_code: "try", amount: 49.9 },
        { region_id: region.id, amount: 49.9 },
      ],
      rules: [
        { attribute: "enabled_in_store", value: "true", operator: "eq" },
        { attribute: "is_return", value: "false", operator: "eq" },
      ],
    }],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [defaultSalesChannel.id] },
  });
  logger.info("Finished store/region/fulfillment setup.");

  logger.info("Seeding categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: CATEGORIES.map((c) => ({
        name: c.name,
        handle: c.handle,
        is_active: true,
        metadata: { description: c.description, image_folder: c.handle },
      })),
    },
  });
  const categoryIdByHandle = new Map(categoryResult.map((c) => [c.handle, c.id]));

  logger.info("Seeding products...");
  await createProductsWorkflow(container).run({
    input: {
      products: PRODUCTS.map((p) => ({
        title: p.title,
        handle: p.handle,
        description: p.description,
        status: ProductStatus.PUBLISHED,
        weight: p.weightGrams,
        shipping_profile_id: shippingProfile.id,
        category_ids: categoryIdByHandle.has(p.category) ? [categoryIdByHandle.get(p.category)!] : [],
        sales_channels: [{ id: defaultSalesChannel.id }],
        options: [{ title: "Boyut", values: p.variants.map((v) => v.title) }],
        variants: p.variants.map((v) => ({
          title: v.title,
          sku: v.sku,
          manage_inventory: true,
          options: { Boyut: v.title },
          prices: [{ currency_code: "try", amount: v.priceKurus / 100 }],
          metadata: { weight_grams: v.weightGrams },
        })),
        metadata: {
          short_description: p.description,
          category_slug: p.category,
          cargo_type: p.cargoType,
          origin: p.origin,
          storage: p.storage,
          shelf_life: p.shelfLife,
          usage: p.usage ?? "",
          ingredients: p.ingredients,
          allergens: p.allergens,
          featured: p.featured,
          bestseller: p.bestseller,
          is_new: p.isNew,
          rating: p.rating,
          review_count: p.reviewCount,
          seo_title: p.seoTitle,
          seo_description: p.seoDescription,
          weight_grams: p.weightGrams,
        },
      })),
    },
  });
  logger.info("Finished seeding products.");

  logger.info("Seeding inventory levels...");
  const stockBySku = new Map<string, number>();
  for (const p of PRODUCTS) for (const v of p.variants) stockBySku.set(v.sku, v.stock);

  const { data: inventoryItems } = await query.graph({ entity: "inventory_item", fields: ["id", "sku"] });
  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item: { id: string; sku?: string | null }) => ({
        location_id: stockLocation.id,
        inventory_item_id: item.id,
        stocked_quantity: item.sku && stockBySku.has(item.sku) ? stockBySku.get(item.sku)! : 100,
      })),
    },
  });
  logger.info("Finished seeding inventory levels.");

  logger.info("Seed complete. Get the publishable key from Admin → Settings → API Key Management (or `npx medusa exec`).");
}
