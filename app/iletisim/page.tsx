import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig, whatsappLink, identity } from "@/lib/config/store.config";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, PhoneIcon, MapPinIcon, WhatsAppIcon, ClockIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "İletişim",
  description: "Sorularınız ve siparişleriniz için bizimle iletişime geçin.",
  path: "/iletisim",
});

export default function ContactPage() {
  const wa = whatsappLink("Merhaba, bir sorum var.");

  return (
    <div className="container-px py-10">
      <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "İletişim" }]} />
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">İletişim</h1>
      <p className="mt-2 max-w-xl text-ink-muted">
        Ürünlerimiz, siparişleriniz veya iş birlikleri için bize yazın. Genellikle 1 iş günü
        içinde dönüş yapıyoruz.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ContactForm />

        <aside className="space-y-4">
          <div className="card space-y-3 p-5 text-sm">
            <h2 className="font-serif text-lg font-semibold">İletişim Bilgileri</h2>
            <p className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 shrink-0 text-olive" />{" "}
              {identity.hasAddressFull ? storeConfig.contact.addressFull : storeConfig.contact.address}
            </p>
            {identity.hasPhone && (
              <p className="flex items-center gap-2">
                <PhoneIcon className="shrink-0 text-olive" />
                <a href={`tel:${storeConfig.contact.phone}`} className="hover:text-pepper">
                  {storeConfig.contact.phone}
                </a>
              </p>
            )}
            {identity.hasEmail && (
              <p className="flex items-center gap-2">
                <MailIcon className="shrink-0 text-olive" />
                <a href={`mailto:${storeConfig.contact.email}`} className="hover:text-pepper">
                  {storeConfig.contact.email}
                </a>
              </p>
            )}
            {!identity.hasPhone && !identity.hasEmail && (
              <p className="text-ink-muted">Aşağıdaki formu doldurarak bize ulaşabilirsiniz.</p>
            )}
          </div>

          <div className="card space-y-2 p-5 text-sm">
            <h2 className="flex items-center gap-2 font-serif text-lg font-semibold">
              <ClockIcon className="text-olive" /> Çalışma Saatleri
            </h2>
            <p>{storeConfig.workingHours.weekdays}</p>
            <p>{storeConfig.workingHours.saturday}</p>
            <p>{storeConfig.workingHours.sunday}</p>
          </div>

          {wa && (
            <a href={wa} target="_blank" rel="noreferrer" className="btn-olive w-full">
              <WhatsAppIcon /> WhatsApp ile yazın
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}
