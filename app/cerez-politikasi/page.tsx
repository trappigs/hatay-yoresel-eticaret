import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = buildMetadata({
  title: "Çerez Politikası",
  description: "Sitemizde kullanılan çerezler ve yönetimi hakkında bilgi.",
  path: "/cerez-politikasi",
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      intro="Sitemizde kullanılan çerezler ve bunları nasıl yönetebileceğiniz hakkında bilgi."
      isLegalPlaceholder
    >
      <h2>Çerez Nedir?</h2>
      <p>
        Çerezler, ziyaret ettiğiniz web siteleri tarafından cihazınıza kaydedilen küçük metin
        dosyalarıdır. Deneyiminizi iyileştirmek ve siteyi daha verimli sunmak için kullanılır.
      </p>

      <h2>Kullanılan Çerez Türleri</h2>
      <ul>
        <li>Zorunlu çerezler: Sitenin temel işlevleri için gereklidir (ör. sepet).</li>
        <li>Performans çerezleri: Site kullanımını anlamamıza yardımcı olur.</li>
        <li>Pazarlama çerezleri: İlgi alanlarınıza uygun içerik sunmak için kullanılabilir.</li>
      </ul>

      <h2>Çerezleri Yönetme</h2>
      <p>
        Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Bazı çerezlerin
        engellenmesi, sitenin bazı bölümlerinin düzgün çalışmamasına neden olabilir.
      </p>
    </LegalLayout>
  );
}
