import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InfoIcon } from "@/components/icons";

/**
 * Shared layout for legal + static content pages: breadcrumb, title, optional
 * "placeholder — review by a lawyer" notice, and a readable text column.
 */
export function LegalLayout({
  title,
  intro,
  breadcrumb,
  isLegalPlaceholder = false,
  updatedAt,
  children,
}: {
  title: string;
  intro?: string;
  breadcrumb?: string;
  isLegalPlaceholder?: boolean;
  updatedAt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-px py-10">
      <Breadcrumbs
        items={[{ name: "Ana Sayfa", href: "/" }, { name: breadcrumb ?? title }]}
      />

      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {updatedAt && <p className="mt-2 text-sm text-ink-muted">Son güncelleme: {updatedAt}</p>}
        {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}

        {isLegalPlaceholder && (
          <div className="mt-6 flex gap-3 rounded-xl border border-olive/25 bg-olive/5 p-4 text-sm text-ink-soft">
            <InfoIcon className="mt-0.5 shrink-0 text-lg text-olive" />
            <p>
              <span className="font-semibold text-ink">Bilgilendirme:</span> Bu metin örnek
              içeriktir ve hukuki tavsiye niteliği taşımaz. Yayına almadan önce bir avukat
              tarafından gözden geçirilmesi ve işletmeye göre düzenlenmesi önerilir.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-5 leading-relaxed text-ink-soft [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </div>
  );
}
