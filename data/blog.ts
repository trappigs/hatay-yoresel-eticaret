export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Plain-text paragraphs; rendered as <p> blocks. */
  content: string[];
  author: string;
  date: string; // ISO
  readingMinutes: number;
  tag: string;
}

/** Content-marketing blog seed posts (Turkish). */
export const blogPosts: BlogPost[] = [
  {
    slug: "hatay-biber-salcasi-nasil-yapilir",
    title: "Hatay Biber Salçası Nasıl Yapılır?",
    excerpt:
      "Güneşte kurutmadan kavanoza kadar, geleneksel Hatay biber salçasının hazırlanış sürecini anlattık.",
    content: [
      "Hatay biber salçası, yörenin en bilinen lezzetlerinden biridir. Her yıl yaz sonunda toplanan kırmızı biberler, salçanın temelini oluşturur.",
      "İlk adım biberlerin ayıklanıp yıkanmasıdır. Ardından biberler güneşte serili kalır ve suyunu yavaşça bırakır. Bu kuruma süreci salçanın yoğun aromasının sırrıdır.",
      "Kurutulan biberler taş değirmende çekilir ve tuz ile harmanlanır. Geleneksel üretimde koruyucu veya katkı maddesi kullanılmaz; salçanın üzerine ince bir tabaka zeytinyağı gezdirilerek saklanır.",
      "Evde saklarken kavanozun ağzını kapalı tutmak ve buzdolabında muhafaza etmek tazeliği korur.",
    ],
    author: "Hatay Yöresel Mutfak",
    date: "2026-05-10",
    readingMinutes: 4,
    tag: "Üretim",
  },
  {
    slug: "soguk-sikim-zeytinyagi-rehberi",
    title: "Soğuk Sıkım Zeytinyağı Rehberi",
    excerpt:
      "Soğuk sıkım ne demek, naturel sızma zeytinyağı nasıl seçilir ve nasıl saklanır? Kısa bir rehber.",
    content: [
      "Soğuk sıkım, zeytinin 27°C'nin altındaki sıcaklıkta işlenmesi anlamına gelir. Bu yöntem, yağın aromasını ve doğal yapısını korur.",
      "İyi bir zeytinyağını meyvemsi kokusundan ve dengeli acılığından anlayabilirsiniz. Erken hasat ürünler genellikle daha yoğun aromaya sahiptir.",
      "Zeytinyağını ışık almayan, serin bir yerde ve ağzı kapalı saklamak önemlidir. Işık ve sıcaklık, yağın zamanla bozulmasına neden olur.",
      "Kahvaltıda, salatalarda ve soğuk mezelerde günlük kullanım için naturel sızma zeytinyağı idealdir.",
    ],
    author: "Hatay Yöresel Mutfak",
    date: "2026-04-02",
    readingMinutes: 3,
    tag: "Rehber",
  },
  {
    slug: "evde-kunefe-yapmanin-puf-noktalari",
    title: "Evde Künefe Yapmanın Püf Noktaları",
    excerpt:
      "Tel kadayıf seçiminden şerbet kıvamına, evde Hatay künefesi yaparken işinize yarayacak ipuçları.",
    content: [
      "Künefenin sırrı malzemede başlar: tuzsuz künefe peyniri ve ince tel kadayıf kullanmak gerekir.",
      "Kadayıfı tereyağıyla iyice yoğurmak, gözenekli ve çıtır bir doku sağlar. Peyniri iki kadayıf katmanının arasına yaymak idealdir.",
      "Künefe kısık ateşte, her iki yüzü de altın rengini alana kadar pişirilmelidir. Acele etmek dış yüzeyin yanmasına yol açabilir.",
      "Şerbet, künefe sıcakken eklenmelidir. Şerbetin ılık değil oda sıcaklığında olması çıtırlığı korur.",
    ],
    author: "Hatay Yöresel Mutfak",
    date: "2026-03-05",
    readingMinutes: 4,
    tag: "Tarif",
  },
];

export const blogBySlug = new Map(blogPosts.map((p) => [p.slug, p]));
