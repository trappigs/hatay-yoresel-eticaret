import type { Product } from "@/lib/commerce/types";

/**
 * Production-style seed catalog (Turkish). Structured exactly as real products
 * will be entered: full food info, variants, SKU, SEO fields and local image
 * paths under /public/products/<category-slug>/<product-slug>.jpg.
 *
 * Images: paths below are the convention. Until the real photo files exist on
 * disk, the mock adapter filters them out (see lib/commerce/mock-adapter.ts) and
 * the UI shows a branded placeholder — next/image never gets a missing file.
 * Drop the photos into the listed paths to make them appear (see README).
 *
 * Prices are integer kuruş. No organic / medical / certification claims.
 */
export const products: Product[] = [
  {
    id: "prd_biber_salcasi",
    slug: "hatay-biber-salcasi",
    title: "Hatay Biber Salçası 1 KG",
    shortDescription:
      "Güneşte kurutulmuş kırmızı biberden, tuz dışında katkı içermeyen geleneksel acılı salça.",
    longDescription:
      "Hatay'ın bereketli topraklarında yetişen kırmızı biberler güneşte kurutulup taş " +
      "değirmende çekilerek hazırlanır. Yoğun kıvamı ve dengeli acısıyla çorbalara, " +
      "yemeklere ve kavurmalara karakter katar. El emeği üretim, cam kavanozda.",
    categorySlug: "salca",
    images: ["/products/salca/hatay-biber-salcasi.jpg"],
    price: 15990,
    sku: "SAL-BIB-1000",
    weightGrams: 1000,
    variants: [
      { id: "v_bib_500", title: "500 G", sku: "SAL-BIB-0500", price: 8990, stock: 40, weightGrams: 500 },
      { id: "v_bib_1000", title: "1 KG", sku: "SAL-BIB-1000", price: 15990, stock: 32, weightGrams: 1000 },
      { id: "v_bib_2000", title: "2 KG", sku: "SAL-BIB-2000", price: 29990, stock: 18, weightGrams: 2000 },
    ],
    cargoType: "standard",
    ingredients: ["Kırmızı biber", "Tuz"],
    allergens: ["Bilinen alerjen içermez"],
    storage: "Açıldıktan sonra buzdolabında, ağzı kapalı şekilde saklayınız. Üzerine bir miktar zeytinyağı gezdirilmesi önerilir.",
    shelfLife: "Üretim tarihinden itibaren 12 ay (açılmamış).",
    origin: "Antakya, Hatay",
    usage: "Çorba, et ve sebze yemeklerinde, kavurma ve soslarda kullanılabilir.",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 90,
    rating: 4.8,
    reviewCount: 124,
    seoTitle: "Hatay Biber Salçası 1 KG | Acılı Ev Salçası",
    seoDescription:
      "Güneşte kurutulmuş Hatay biberinden, katkısız acılı biber salçası. Yoğun kıvam, geleneksel üretim. 500 G – 2 KG seçenekleri, güvenli ve hızlı kargo.",
  },
  {
    id: "prd_nar_eksisi",
    slug: "ev-yapimi-nar-eksisi",
    title: "Ev Yapımı Nar Ekşisi 500 ML",
    shortDescription:
      "Gerçek nar suyundan, şeker ve katkı eklenmeden kıvamına gelene dek kaynatılmış nar ekşisi.",
    longDescription:
      "Mevsiminde toplanan ekşi narların suyu, bakır kazanlarda ağır ateşte saatlerce " +
      "kaynatılarak elde edilir. Koyu kıvamı ve dengeli ekşiliğiyle salataların ve " +
      "yöresel yemeklerin vazgeçilmez tamamlayıcısıdır.",
    categorySlug: "nar-eksisi",
    images: ["/products/nar-eksisi/ev-yapimi-nar-eksisi.jpg"],
    price: 11990,
    sku: "NAR-EKS-0500",
    weightGrams: 700,
    variants: [
      { id: "v_nar_500", title: "500 ML", sku: "NAR-EKS-0500", price: 11990, stock: 50, weightGrams: 700 },
      { id: "v_nar_1000", title: "1 LT", sku: "NAR-EKS-1000", price: 21990, stock: 28, weightGrams: 1300 },
    ],
    cargoType: "fragile",
    ingredients: ["Nar suyu (%100)"],
    allergens: ["Bilinen alerjen içermez"],
    storage: "Serin ve güneş almayan yerde saklayınız. Açıldıktan sonra buzdolabında muhafaza ediniz.",
    shelfLife: "Üretim tarihinden itibaren 18 ay (açılmamış).",
    origin: "Samandağ, Hatay",
    usage: "Salata sosu, et marinasyonu ve yöresel yemeklerde kullanılır.",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 78,
    rating: 4.9,
    reviewCount: 98,
    seoTitle: "Ev Yapımı Nar Ekşisi 500 ML | Katkısız Hatay",
    seoDescription:
      "Gerçek nar suyundan kaynatılmış, şeker ve katkı içermeyen Hatay nar ekşisi. Salata ve yemekler için yoğun kıvam. Samandağ üretimi, taze.",
  },
  {
    id: "prd_zeytinyagi",
    slug: "soguk-sikim-zeytinyagi",
    title: "Soğuk Sıkım Zeytinyağı 1 LT",
    shortDescription:
      "Erken hasat zeytinlerden soğuk sıkım, naturel sızma zeytinyağı. Düşük asitli, meyvemsi aroma.",
    longDescription:
      "Hatay'ın asırlık zeytin ağaçlarından erken hasatla toplanan zeytinler, 27°C'nin " +
      "altında soğuk sıkım yöntemiyle işlenir. Böylece aroması ve doğal yapısı korunur. " +
      "Kahvaltıda, salatada ve yemeklerde günlük kullanım için idealdir.",
    categorySlug: "zeytinyagi",
    images: ["/products/zeytinyagi/soguk-sikim-zeytinyagi.jpg"],
    price: 24990,
    discountPrice: 19990,
    sku: "ZYT-SOG-1000",
    weightGrams: 1000,
    variants: [
      { id: "v_zyt_1000", title: "1 LT", sku: "ZYT-SOG-1000", price: 24990, discountPrice: 19990, stock: 60, weightGrams: 1000 },
      { id: "v_zyt_2000", title: "2 LT", sku: "ZYT-SOG-2000", price: 47990, discountPrice: 42990, stock: 35, weightGrams: 2000 },
      { id: "v_zyt_5000", title: "5 LT", sku: "ZYT-SOG-5000", price: 109990, stock: 20, weightGrams: 5000 },
    ],
    cargoType: "standard",
    ingredients: ["%100 naturel sızma zeytinyağı"],
    allergens: ["Bilinen alerjen içermez"],
    storage: "Işık almayan, serin bir yerde, ağzı kapalı saklayınız.",
    shelfLife: "Üretim tarihinden itibaren 24 ay.",
    origin: "Altınözü, Hatay",
    usage: "Kahvaltıda, salatada ve soğuk mezelerde önerilir.",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 115,
    rating: 4.7,
    reviewCount: 211,
    seoTitle: "Soğuk Sıkım Zeytinyağı 1 LT | Naturel Sızma",
    seoDescription:
      "Erken hasat, soğuk sıkım naturel sızma Hatay zeytinyağı. Düşük asit, meyvemsi aroma. 1–5 LT seçenekleri, Altınözü üretimi.",
  },
  {
    id: "prd_zahter",
    slug: "zahter-baharati",
    title: "Zahter Baharatı 250 G",
    shortDescription:
      "Hatay'a özgü zahter otu, susam, sumak ve baharatların yöresel karışımı.",
    longDescription:
      "Zahter, Hatay kahvaltılarının olmazsa olmazıdır. Kavrulmuş susam, sumak ve yöresel " +
      "otların dengeli karışımı zeytinyağına bandırılarak tüketilir. Taze çekim, yoğun aroma.",
    categorySlug: "baharatlar",
    images: ["/products/baharatlar/zahter-baharati.jpg"],
    price: 7490,
    sku: "BAH-ZAH-0250",
    weightGrams: 250,
    variants: [
      { id: "v_zah_250", title: "250 G", sku: "BAH-ZAH-0250", price: 7490, stock: 44, weightGrams: 250 },
      { id: "v_zah_500", title: "500 G", sku: "BAH-ZAH-0500", price: 13490, stock: 26, weightGrams: 500 },
    ],
    cargoType: "standard",
    ingredients: ["Zahter otu", "Kavrulmuş susam", "Sumak", "Tuz", "Yöresel baharatlar"],
    allergens: ["Susam içerir"],
    storage: "Ağzı kapalı, kuru ve serin yerde saklayınız.",
    shelfLife: "Üretim tarihinden itibaren 12 ay.",
    origin: "Antakya, Hatay",
    usage: "Zeytinyağına bandırarak veya simit/poğaça yanında tüketebilirsiniz.",
    featured: false,
    bestseller: true,
    isNew: false,
    stock: 70,
    rating: 4.8,
    reviewCount: 64,
    seoTitle: "Zahter Baharatı 250 G | Hatay Kahvaltısı",
    seoDescription:
      "Susam, sumak ve zahter otundan yöresel Hatay zahter karışımı. Zeytinyağına bandırarak kahvaltıda. Taze çekim, yoğun aroma.",
  },
  {
    id: "prd_kirma_zeytin",
    slug: "hatay-kirma-zeytin",
    title: "Hatay Kırma Zeytin 1 KG",
    shortDescription:
      "Çizik/kırma yöntemiyle hazırlanmış, sarımsak ve baharatlarla lezzetlendirilmiş yeşil zeytin.",
    longDescription:
      "Elde kırılarak hazırlanan yeşil zeytinler; sarımsak, limon ve yöresel baharatlarla " +
      "kıvamına gelir. Kahvaltı sofralarının iddialı lezzeti, dengeli tuz oranıyla.",
    categorySlug: "zeytin",
    images: ["/products/zeytin/hatay-kirma-zeytin.jpg"],
    price: 13990,
    sku: "ZTN-KIR-1000",
    weightGrams: 1000,
    cargoType: "standard",
    ingredients: ["Yeşil zeytin", "Su", "Tuz", "Sarımsak", "Limon", "Baharatlar"],
    allergens: ["Bilinen alerjen içermez"],
    storage: "Buzdolabında, zeytinler kendi suyu içinde kalacak şekilde saklayınız.",
    shelfLife: "Üretim tarihinden itibaren 6 ay.",
    origin: "Altınözü, Hatay",
    usage: "Kahvaltıda ve meze tabaklarında servis edilir.",
    featured: false,
    bestseller: false,
    isNew: false,
    stock: 38,
    rating: 4.6,
    reviewCount: 41,
    seoTitle: "Hatay Kırma Zeytin 1 KG | Baharatlı Yeşil Zeytin",
    seoDescription:
      "Sarımsak ve baharatlarla lezzetlenen Hatay kırma yeşil zeytin. Kahvaltı sofraları için dengeli tuz. Altınözü üretimi, taze.",
  },
  {
    id: "prd_ceviz_receli",
    slug: "ceviz-receli",
    title: "Ceviz Reçeli 450 G",
    shortDescription:
      "Olgunlaşmamış yeşil cevizden, geleneksel yöntemle hazırlanan yoğun kıvamlı ceviz reçeli.",
    longDescription:
      "Yeşil cevizler özenle işlenip şekerle ağır ateşte kıvama getirilir. Tane tane, " +
      "yoğun aromalı bu reçel kahvaltıların özel lezzetidir. Cam kavanozda.",
    categorySlug: "recel-kahvaltilik",
    images: ["/products/recel-kahvaltilik/ceviz-receli.jpg"],
    price: 16990,
    sku: "REC-CEV-0450",
    weightGrams: 600,
    cargoType: "fragile",
    ingredients: ["Yeşil ceviz", "Şeker", "Su", "Limon tuzu", "Karanfil"],
    allergens: ["Sert kabuklu yemiş (ceviz) içerir"],
    storage: "Serin ve kuru yerde saklayınız. Açıldıktan sonra buzdolabında muhafaza ediniz.",
    shelfLife: "Üretim tarihinden itibaren 18 ay (açılmamış).",
    origin: "Antakya, Hatay",
    usage: "Kahvaltıda ve tatlı sunumlarında tüketilebilir.",
    featured: false,
    bestseller: false,
    isNew: true,
    stock: 5,
    rating: 4.9,
    reviewCount: 33,
    seoTitle: "Ceviz Reçeli 450 G | Geleneksel Yöresel Reçel",
    seoDescription:
      "Yeşil cevizden geleneksel yöntemle hazırlanan yoğun kıvamlı ceviz reçeli. Kahvaltının özel lezzeti. Cam kavanozda, Antakya üretimi.",
  },
  {
    id: "prd_kahvalti_paketi",
    slug: "yoresel-kahvalti-paketi",
    title: "Yöresel Kahvaltı Paketi",
    shortDescription:
      "Zahter, zeytinyağı, kırma zeytin ve nar ekşisinden oluşan, kahvaltıya başlangıç paketi.",
    longDescription:
      "Hatay kahvaltısını evinize taşıyan özenli bir set. Zahter, soğuk sıkım zeytinyağı, " +
      "kırma zeytin ve nar ekşisini bir arada sunar. Denemek isteyenler ve hediye için ideal.",
    categorySlug: "yoresel-paketler",
    images: ["/products/yoresel-paketler/yoresel-kahvalti-paketi.jpg"],
    price: 49990,
    sku: "PKT-KAH-0001",
    weightGrams: 2500,
    cargoType: "cold_chain",
    ingredients: ["Zahter 250 G", "Soğuk sıkım zeytinyağı 500 ML", "Kırma zeytin 500 G", "Nar ekşisi 500 ML"],
    allergens: ["Susam içerir"],
    storage: "Soğuk zincir ürünleri buzdolabında saklayınız. Kuru ürünleri serin yerde muhafaza ediniz.",
    shelfLife: "Paket içindeki ürünlerin kendi son tüketim tarihleri geçerlidir.",
    origin: "Hatay",
    usage: "Kahvaltı sofranızda birlikte servis edebilirsiniz.",
    featured: true,
    bestseller: false,
    isNew: true,
    stock: 24,
    rating: 4.8,
    reviewCount: 17,
    seoTitle: "Yöresel Kahvaltı Paketi | Hatay Kahvaltılık Seti",
    seoDescription:
      "Zahter, zeytinyağı, kırma zeytin ve nar ekşisinden Hatay kahvaltı paketi. Denemek ve hediye için ideal. Özenli, güvenli paketleme.",
  },
  {
    id: "prd_lezzet_kutusu",
    slug: "hatay-lezzet-kutusu",
    title: "Hatay Lezzet Kutusu",
    shortDescription:
      "Şık sunumlu hediyelik kutu: biber salçası, zeytinyağı, zahter ve ceviz reçeli bir arada.",
    longDescription:
      "Sevdiklerinize Hatay'ın lezzetlerini armağan etmenin en şık yolu. Özel kutusunda " +
      "biber salçası, soğuk sıkım zeytinyağı, zahter ve ceviz reçeli ile gelir. Kurumsal " +
      "ve bireysel hediye için uygundur.",
    categorySlug: "hediyelik-kutular",
    images: ["/products/hediyelik-kutular/hatay-lezzet-kutusu.jpg"],
    price: 64990,
    sku: "HED-LZT-0001",
    weightGrams: 3000,
    cargoType: "standard",
    ingredients: ["Biber salçası 500 G", "Soğuk sıkım zeytinyağı 500 ML", "Zahter 250 G", "Ceviz reçeli 450 G"],
    allergens: ["Susam ve sert kabuklu yemiş (ceviz) içerir"],
    storage: "Ürünlerin kendi saklama koşullarına uyunuz.",
    shelfLife: "Paket içindeki ürünlerin kendi son tüketim tarihleri geçerlidir.",
    origin: "Hatay",
    usage: "Hediye olarak sunulabilir; ürünler ayrı ayrı tüketilebilir.",
    featured: true,
    bestseller: true,
    isNew: false,
    stock: 30,
    rating: 5.0,
    reviewCount: 52,
    seoTitle: "Hatay Lezzet Kutusu | Yöresel Hediyelik Set",
    seoDescription:
      "Biber salçası, zeytinyağı, zahter ve ceviz reçelinden şık hediyelik Hatay lezzet kutusu. Kurumsal ve bireysel hediye için ideal.",
  },
  {
    id: "prd_domates_salcasi",
    slug: "hatay-domates-salcasi",
    title: "Hatay Domates Salçası 1 KG",
    shortDescription:
      "Tarla domatesinden, güneşte kurutularak hazırlanan katkısız domates salçası.",
    longDescription:
      "Mevsiminde toplanan domatesler güneşte kurutulup kaynatılarak yoğun bir salçaya " +
      "dönüşür. Tatlı-mayhoş dengesiyle her yemeğin temel lezzeti. Tuz dışında katkı içermez.",
    categorySlug: "salca",
    images: ["/products/salca/hatay-domates-salcasi.jpg"],
    price: 13990,
    sku: "SAL-DOM-1000",
    weightGrams: 1000,
    variants: [
      { id: "v_dom_500", title: "500 G", sku: "SAL-DOM-0500", price: 7990, stock: 36, weightGrams: 500 },
      { id: "v_dom_1000", title: "1 KG", sku: "SAL-DOM-1000", price: 13990, stock: 30, weightGrams: 1000 },
    ],
    cargoType: "standard",
    ingredients: ["Domates", "Tuz"],
    allergens: ["Bilinen alerjen içermez"],
    storage: "Açıldıktan sonra buzdolabında, ağzı kapalı saklayınız.",
    shelfLife: "Üretim tarihinden itibaren 12 ay (açılmamış).",
    origin: "Amik Ovası, Hatay",
    usage: "Çorba, yemek ve soslarda kullanılır.",
    featured: false,
    bestseller: false,
    isNew: false,
    stock: 66,
    rating: 4.7,
    reviewCount: 48,
    seoTitle: "Hatay Domates Salçası 1 KG | Katkısız Ev Salçası",
    seoDescription:
      "Güneşte kurutulmuş tarla domatesinden katkısız domates salçası. Yoğun kıvam, tatlı-mayhoş denge. Amik Ovası üretimi. 500 G – 1 KG.",
  },
  {
    id: "prd_kunefe_seti",
    slug: "kunefe-seti",
    title: "Evde Künefe Seti",
    shortDescription:
      "Künefelik tel kadayıf ve tuzsuz künefe peyniri ile evde iki kişilik künefe keyfi.",
    longDescription:
      "Hatay'ın meşhur künefesini evinizde hazırlayın. Set; künefelik tel kadayıf ve " +
      "geleneksel tuzsuz künefe peynirini içerir. Soğuk zincirle gönderilir.",
    categorySlug: "tatli-kunefe",
    images: ["/products/tatli-kunefe/kunefe-seti.jpg"],
    price: 18990,
    sku: "TAT-KUN-0001",
    weightGrams: 1000,
    cargoType: "cold_chain",
    ingredients: ["Tel kadayıf (buğday unu, su)", "Tuzsuz künefe peyniri (pastörize süt)"],
    allergens: ["Gluten ve süt içerir"],
    storage: "Buzdolabında saklayınız, soğuk zincir ürünüdür.",
    shelfLife: "Sevkiyattan itibaren 7 gün içinde tüketiniz.",
    origin: "Antakya, Hatay",
    usage: "Tepside katmanlayıp her iki yüzünü kızartın, şerbetini ekleyin.",
    featured: false,
    bestseller: false,
    isNew: true,
    stock: 12,
    rating: 4.9,
    reviewCount: 29,
    seoTitle: "Evde Künefe Seti | Tel Kadayıf + Künefe Peyniri",
    seoDescription:
      "Künefelik tel kadayıf ve tuzsuz künefe peyniriyle evde Hatay künefesi. Soğuk zincir ile gönderilir. İki kişilik set.",
  },
  {
    id: "prd_surk_peyniri",
    slug: "hatay-surk-peyniri",
    title: "Hatay Sürk (Çökelek) Peyniri 500 G",
    shortDescription:
      "Baharatlarla yoğrulmuş, koni şeklinde kurutulan geleneksel Hatay sürk peyniri.",
    longDescription:
      "Çökeleğin kekik, kimyon ve pul biber gibi baharatlarla yoğrulup kurutulmasıyla " +
      "hazırlanır. Yoğun aromalı bu peynir, zeytinyağıyla ezilerek kahvaltıda tüketilir.",
    categorySlug: "peynir-sut-urunleri",
    images: ["/products/peynir-sut-urunleri/hatay-surk-peyniri.jpg"],
    price: 17990,
    sku: "PEY-SUR-0500",
    weightGrams: 500,
    cargoType: "cold_chain",
    ingredients: ["Çökelek (pastörize süt)", "Tuz", "Kekik", "Kimyon", "Pul biber"],
    allergens: ["Süt içerir"],
    storage: "Buzdolabında saklayınız, soğuk zincir ürünüdür.",
    shelfLife: "Üretim tarihinden itibaren 60 gün.",
    origin: "Antakya, Hatay",
    usage: "Zeytinyağıyla ezerek kahvaltıda tüketebilirsiniz.",
    featured: false,
    bestseller: false,
    isNew: false,
    stock: 16,
    rating: 4.7,
    reviewCount: 22,
    seoTitle: "Hatay Sürk Peyniri 500 G | Baharatlı Çökelek",
    seoDescription:
      "Kekik, kimyon ve pul biberle yoğrulan geleneksel Hatay sürk (çökelek) peyniri. Zeytinyağıyla kahvaltıda. Soğuk zincir kargo.",
  },
  {
    id: "prd_kunefe_peyniri",
    slug: "antakya-kunefe-peyniri",
    title: "Antakya Künefe Peyniri 500 G",
    shortDescription:
      "Tuzsuz, taze künefelik peynir. Künefe ve peynirli tatlılar için ideal kıvam.",
    longDescription:
      "Geleneksel yöntemle üretilen tuzsuz künefe peyniri, ısıtıldığında uzayan yapısıyla " +
      "künefe ve peynirli tatlıların temel malzemesidir. Soğuk zincirle gönderilir.",
    categorySlug: "peynir-sut-urunleri",
    images: ["/products/peynir-sut-urunleri/antakya-kunefe-peyniri.jpg"],
    price: 15990,
    sku: "PEY-KUN-0500",
    weightGrams: 500,
    cargoType: "cold_chain",
    ingredients: ["Pastörize inek sütü", "Peynir mayası"],
    allergens: ["Süt içerir"],
    storage: "Buzdolabında saklayınız, soğuk zincir ürünüdür.",
    shelfLife: "Üretim tarihinden itibaren 21 gün.",
    origin: "Antakya, Hatay",
    usage: "Künefe ve peynirli tatlılarda kullanılır.",
    featured: false,
    bestseller: false,
    isNew: false,
    stock: 0,
    rating: 4.8,
    reviewCount: 19,
    seoTitle: "Antakya Künefe Peyniri 500 G | Tuzsuz Taze",
    seoDescription:
      "Künefe ve peynirli tatlılar için tuzsuz, taze Antakya künefe peyniri. Isıtıldığında uzayan yapı. Soğuk zincir ile gönderilir.",
  },
];

export const productBySlug = new Map(products.map((p) => [p.slug, p]));
