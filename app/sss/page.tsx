import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { commerceConfig } from "@/lib/config/commerce.config";
import { formatPrice } from "@/lib/money";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ChevronDownIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Sıkça Sorulan Sorular",
  description: "Sipariş, kargo, ödeme ve iade hakkında sıkça sorulan sorular.",
  path: "/sss",
});

const faqs: { q: string; a: string }[] = [
  {
    q: "Siparişim ne zaman kargoya verilir?",
    a: "Siparişleriniz genellikle 1-3 iş günü içinde hazırlanır ve kargoya teslim edilir. Soğuk zincir ürünleri haftanın belirli günlerinde gönderilebilir.",
  },
  {
    q: "Kargo ücreti ne kadar?",
    a: `Standart kargo ücreti ${formatPrice(commerceConfig.shippingFee)}'dir. ${formatPrice(commerceConfig.freeShippingThreshold)} ve üzeri siparişlerde kargo ücretsizdir.`,
  },
  {
    q: "Hangi ödeme yöntemleri var?",
    a: `Kredi/banka kartı, havale/EFT${commerceConfig.payment.cashOnDelivery ? " ve kapıda ödeme" : ""} seçenekleri sunulmaktadır. Online ödeme altyapısı kurulum aşamasındadır.`,
  },
  {
    q: "Soğuk zincir ürünler nasıl gönderiliyor?",
    a: "Peynir gibi hassas ürünler buz aküleri ile özel olarak paketlenir ve soğuk zincire uygun şekilde gönderilir.",
  },
  {
    q: "İade ve değişim koşulları neler?",
    a: "Gıda ürünlerinde, ambalajı açılmamış ve bozulmamış ürünler için yasal süre içinde iade hakkınız bulunur. Detaylar İade ve Teslimat Koşulları sayfamızdadır.",
  },
  {
    q: "Ürünleriniz organik/sertifikalı mı?",
    a: "Ürün açıklamalarımız içeriği tanıtıcı niteliktedir. Aksi belirtilmedikçe organik veya sertifika iddiası içermez; içerik ve menşei bilgileri ürün sayfalarında yer alır.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container-px py-10">
      <JsonLd data={faqJsonLd} />
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "S.S.S." }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Sıkça Sorulan Sorular</h1>

      <div className="mt-8 max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white">
        {faqs.map((f, i) => (
          <details key={i} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {f.q}
              <ChevronDownIcon className="shrink-0 text-lg transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
