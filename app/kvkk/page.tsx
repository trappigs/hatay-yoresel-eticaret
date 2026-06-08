import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig, identity } from "@/lib/config/store.config";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
  path: "/kvkk",
});

export default function KvkkPage() {
  return (
    <LegalLayout
      title="KVKK Aydınlatma Metni"
      intro={`${storeConfig.name} olarak kişisel verilerinizin güvenliğine önem veriyoruz.`}
      isLegalPlaceholder
    >
      <h2>1. Veri Sorumlusu</h2>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verileriniz, veri
        sorumlusu sıfatıyla aşağıdaki işletme tarafından, bu metinde açıklanan kapsamda işlenmektedir:
      </p>
      {identity.hasLegalIdentity ? (
        <ul>
          <li>Ünvan: {storeConfig.legal.companyName}</li>
          {storeConfig.legal.address && <li>Adres: {storeConfig.legal.address}</li>}
          {(storeConfig.legal.taxOffice || storeConfig.legal.taxNumber) && (
            <li>Vergi Dairesi / No: {storeConfig.legal.taxOffice} / {storeConfig.legal.taxNumber}</li>
          )}
          {storeConfig.legal.mersis && <li>MERSİS No: {storeConfig.legal.mersis}</li>}
          {identity.hasEmail && <li>E-posta: {storeConfig.contact.email}</li>}
          {identity.hasPhone && <li>Telefon: {storeConfig.contact.phone}</li>}
        </ul>
      ) : (
        <p>İşletmenin yasal kimlik bilgileri (ünvan, adres, vergi, MERSİS) yayın öncesinde eklenecektir.</p>
      )}

      <h2>2. İşlenen Kişisel Veriler</h2>
      <ul>
        <li>Kimlik ve iletişim bilgileri (ad soyad, telefon, e-posta, adres)</li>
        <li>Sipariş ve teslimat bilgileri</li>
        <li>Fatura ve ödeme bilgileri</li>
      </ul>

      <h2>3. İşleme Amaçları</h2>
      <p>
        Kişisel verileriniz; siparişlerin alınması ve teslimi, müşteri ilişkilerinin yürütülmesi,
        yasal yükümlülüklerin yerine getirilmesi ve talep/şikayet yönetimi amaçlarıyla işlenir.
      </p>

      <h2>4. Aktarım</h2>
      <p>
        Verileriniz; kargo, ödeme ve gerekli hizmet sağlayıcılarıyla, yalnızca hizmetin gereği ve
        yasal sınırlar çerçevesinde paylaşılabilir.
      </p>

      <h2>5. Haklarınız (KVKK md. 11)</h2>
      <p>
        Kişisel verilerinize ilişkin bilgi talep etme, düzeltme, silme ve diğer yasal haklarınızı
        kullanmak için{" "}
        {identity.hasEmail
          ? `${storeConfig.contact.email} adresinden`
          : "iletişim sayfamızdaki kanallardan"}{" "}
        bize ulaşabilirsiniz.
      </p>
    </LegalLayout>
  );
}
