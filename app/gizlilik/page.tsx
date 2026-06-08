import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig, identity } from "@/lib/config/store.config";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description: "Kişisel verilerinizin ve gizliliğinizin korunmasına ilişkin politikamız.",
  path: "/gizlilik",
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      intro="Bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklıyoruz."
      isLegalPlaceholder
    >
      <h2>Toplanan Bilgiler</h2>
      <p>
        Sipariş ve iletişim süreçlerinde ad soyad, iletişim, adres, sipariş ve ödeme bilgileriniz gibi
        veriler toplanabilir.
      </p>

      <h2>Bilgilerin Kullanımı</h2>
      <ul>
        <li>Siparişlerin işlenmesi ve teslimi</li>
        <li>Müşteri desteği ve bilgilendirme</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
      </ul>

      <h2>Çerezler</h2>
      <p>
        Sitemiz, deneyimi iyileştirmek için çerezler kullanabilir. Ayrıntılar Çerez Politikası
        sayfamızda yer alır.
      </p>

      <h2>Güvenlik</h2>
      <p>
        Verilerinizin güvenliği için makul teknik ve idari tedbirler alınır. Üçüncü taraf hizmet
        sağlayıcılarla paylaşım yalnızca hizmetin gereği kadar yapılır.
      </p>

      <h2>İletişim</h2>
      <p>
        Gizlilik ile ilgili sorularınız için{" "}
        {identity.hasEmail ? `${storeConfig.contact.email} adresine` : "iletişim sayfamızdan bize"}{" "}
        yazabilirsiniz.
      </p>
    </LegalLayout>
  );
}
