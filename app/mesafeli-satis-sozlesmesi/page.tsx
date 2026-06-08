import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig, identity } from "@/lib/config/store.config";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = buildMetadata({
  title: "Mesafeli Satış Sözleşmesi",
  description: "Mesafeli satış sözleşmesi örnek metni.",
  path: "/mesafeli-satis-sozlesmesi",
});

export default function DistanceSalesPage() {
  return (
    <LegalLayout
      title="Mesafeli Satış Sözleşmesi"
      intro="Aşağıdaki metin örnek niteliğindedir ve yayına alınmadan önce düzenlenmelidir."
      isLegalPlaceholder
    >
      <h2>1. Taraflar</h2>
      <p>İşbu sözleşme, aşağıda bilgileri yer alan Satıcı ile sipariş veren Alıcı arasında elektronik ortamda kurulmuştur.</p>
      <p><strong>Satıcı</strong></p>
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
        <p>Satıcının yasal kimlik ve iletişim bilgileri yayın öncesinde eklenecektir.</p>
      )}

      <h2>2. Konu</h2>
      <p>
        Sözleşmenin konusu, Alıcı&apos;nın elektronik ortamda sipariş verdiği ürünlerin satışı ve
        teslimine ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.
      </p>

      <h2>3. Ürün, Bedel ve Ödeme</h2>
      <p>
        Ürünlerin temel nitelikleri ve satış bedeli, sipariş sayfasında belirtildiği gibidir. Ödeme,
        seçilen yönteme göre tahsil edilir.
      </p>

      <h2>4. Teslimat</h2>
      <p>
        Ürünler, Alıcı tarafından belirtilen adrese kargo aracılığıyla teslim edilir. Teslimat
        süreleri ve kargo koşulları İade ve Teslimat sayfasında belirtilmiştir.
      </p>

      <h2>5. Cayma Hakkı</h2>
      <p>
        Alıcı, mevzuatın öngördüğü koşullar dahilinde cayma hakkına sahiptir. Gıda ürünlerinin
        niteliği gereği bazı istisnalar uygulanabilir.
      </p>

      <h2>6. Yürürlük</h2>
      <p>
        Alıcı, siparişi onayladığında işbu sözleşmenin tüm şartlarını kabul etmiş sayılır.
      </p>
    </LegalLayout>
  );
}
