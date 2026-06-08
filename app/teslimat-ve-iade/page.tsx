import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { commerceConfig } from "@/lib/config/commerce.config";
import { formatPrice } from "@/lib/money";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = buildMetadata({
  title: "İade ve Teslimat Koşulları",
  description: "Kargo, teslimat süreleri ve iade koşulları hakkında bilgiler.",
  path: "/teslimat-ve-iade",
});

export default function ShippingReturnsPage() {
  return (
    <LegalLayout
      title="İade ve Teslimat Koşulları"
      intro="Siparişlerinizin teslimatı ve iade süreçleri hakkında bilmeniz gerekenler."
      isLegalPlaceholder
    >
      <h2>Teslimat</h2>
      <p>
        Siparişleriniz genellikle 1-3 iş günü içinde hazırlanıp kargoya teslim edilir. Standart kargo
        ücreti {formatPrice(commerceConfig.shippingFee)}&apos;dir.{" "}
        {formatPrice(commerceConfig.freeShippingThreshold)} ve üzeri siparişlerde kargo ücretsizdir.
      </p>
      <ul>
        <li>Soğuk zincir ürünleri, uygunluk için haftanın belirli günlerinde gönderilebilir.</li>
        <li>Kırılabilir ürünler ekstra koruyucu ambalaj ile paketlenir.</li>
        <li>Teslimat süreleri kargo firması ve bölgeye göre değişiklik gösterebilir.</li>
      </ul>

      <h2>Cayma Hakkı ve İade</h2>
      <p>
        Mesafeli satış mevzuatı kapsamında, niteliği uygun ürünlerde yasal süre içinde cayma hakkınız
        bulunmaktadır. Ancak gıda ürünlerinin doğası gereği; ambalajı açılmış, bozulabilir veya son
        kullanma tarihi kısa olan ürünlerde iade kabul edilemeyebilir.
      </p>
      <ul>
        <li>Ambalajı açılmamış ve bozulmamış ürünler iade için değerlendirilir.</li>
        <li>Hasarlı veya hatalı ürün teslim alındığında, lütfen teslimat günü bizimle iletişime geçin.</li>
        <li>İade onaylanan ürünlerin bedeli, ödeme yönteminize göre iade edilir.</li>
      </ul>

      <h2>İade Süreci</h2>
      <p>
        İade talebiniz için iletişim kanallarımızdan bize ulaşın. Talebiniz değerlendirildikten sonra
        iade/değişim yönlendirmesi yapılır.
      </p>
    </LegalLayout>
  );
}
