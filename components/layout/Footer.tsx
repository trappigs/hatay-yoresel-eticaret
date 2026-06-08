import Link from "next/link";
import { categories } from "@/data/categories";
import { storeConfig, whatsappLink, identity, configuredSocials } from "@/lib/config/store.config";
import { mainNav, legalNav } from "@/components/layout/nav-links";
import { Logo } from "@/components/layout/Logo";
import { TrustBadges } from "@/components/TrustBadges";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon, InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/icons";

export function Footer() {
  const wa = whatsappLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.");
  const socials = configuredSocials();

  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="border-b border-line bg-cream-100">
        <div className="container-px py-6">
          <TrustBadges variant="bar" />
        </div>
      </div>

      <div className="container-px grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            Hatay&apos;ın yöresel lezzetlerini aile üretimiyle, doğal ve taze olarak sofranıza ulaştırıyoruz.
          </p>
          {(socials.length > 0 || wa) && (
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a key={s.key} href={s.href} className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 text-ink hover:bg-cream-300" aria-label={s.label} target="_blank" rel="noreferrer">
                  {s.key === "instagram" ? <InstagramIcon /> : s.key === "facebook" ? <FacebookIcon /> : <span className="text-xs font-semibold">YT</span>}
                </a>
              ))}
              {wa && (
                <a href={wa} className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 text-ink hover:bg-cream-300" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                  <WhatsAppIcon />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Kategoriler</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="hover:text-pepper">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Kurumsal</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-pepper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Yasal</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-pepper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">İletişim</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 shrink-0 text-olive" /> {storeConfig.contact.address}
            </li>
            {identity.hasPhone && (
              <li className="flex items-center gap-2">
                <PhoneIcon className="shrink-0 text-olive" />
                <a href={`tel:${storeConfig.contact.phone}`} className="hover:text-pepper">
                  {storeConfig.contact.phone}
                </a>
              </li>
            )}
            {identity.hasEmail && (
              <li className="flex items-center gap-2">
                <MailIcon className="shrink-0 text-olive" />
                <a href={`mailto:${storeConfig.contact.email}`} className="hover:text-pepper">
                  {storeConfig.contact.email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2">
              <ClockIcon className="mt-0.5 shrink-0 text-olive" />
              <span>
                {storeConfig.workingHours.weekdays}
                <br />
                {storeConfig.workingHours.saturday}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {storeConfig.name}. Tüm hakları saklıdır.
          </p>
          <p>Ödeme ve kargo entegrasyonları kurulum aşamasındadır.</p>
        </div>
      </div>
    </footer>
  );
}
