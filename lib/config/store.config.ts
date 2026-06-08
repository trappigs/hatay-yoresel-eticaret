/**
 * Single source of truth for all public-facing store identity.
 * Anything that changes per client/environment lives here (or in env vars),
 * never hardcoded in components.
 *
 * NOTE: values wrapped in [brackets] are PLACEHOLDERS — replace with the real
 * business details before launch (see README "Launch checklist").
 */
export const storeConfig = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Hatay Yöresel Ürünler",
  shortName: "Hatay Yöresel",
  /** Short brand tagline used near the logo. */
  tagline: "Hatay'dan sofranıza",
  /** Marketing slogan used in hero / about. */
  slogan: "Hatay'ın bereketli toprağından, doğal ve taze lezzetler",
  /** Default site meta description (natural keywords, no unsupported claims). */
  description:
    "Hatay yöresel ürünleri: biber salçası, nar ekşisi, soğuk sıkım zeytinyağı, zahter, " +
    "kırma zeytin, reçel ve yöresel kahvaltılıklar. Aile üretimiyle hazırlanan doğal " +
    "Hatay lezzetleri, güvenli paketleme ve hızlı teslimat ile kapınıza kadar.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "halilhasimoglu@gmail.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+90 536 561 96 52",
    // Digits only, international format without "+", e.g. 905555555555
    // (using the same mobile as the phone — change if WhatsApp differs)
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905365619652",
    /** Short address shown in header/footer. */
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "Ataevler / İstanbul",
    /** Full address for contact/legal pages. */
    addressFull:
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS_FULL ||
      "Bahçe mh. Yaprak sk. No: 15 Ataevler/İstanbul",
  },

  /** Working hours shown on contact page + footer. */
  workingHours: {
    weekdays: "Hafta içi: 09:00 – 18:00",
    saturday: "Cumartesi: 09:00 – 14:00",
    sunday: "Pazar: Kapalı",
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  },

  /**
   * Bank transfer (havale/EFT) details — PLACEHOLDER.
   * Shown at checkout/order confirmation when bank transfer is selected.
   * Replace with real account details before enabling bank transfer at launch.
   */
  bankTransfer: {
    bankName: "[Banka Adı]",
    accountName: "[Hesap Sahibi / Ünvan]",
    iban: "TR00 0000 0000 0000 0000 0000 00",
  },

  /**
   * Company legal identity — PLACEHOLDER. Used on legal pages (KVKK, mesafeli
   * satış sözleşmesi) and required for a compliant launch in Turkey.
   */
  legal: {
    companyName: "Halil Şahna",
    address: "Bahçe mh. Yaprak sk. No: 15 Ataevler/İstanbul",
    // Not provided yet — empty fields are hidden on the legal pages until set.
    taxOffice: "",
    taxNumber: "",
    mersis: "",
    tradeRegistryNo: "",
    kep: "",
  },
} as const;

/** Build a wa.me link if a WhatsApp number is configured, else null. */
export function whatsappLink(message?: string): string | null {
  const n = storeConfig.contact.whatsapp.replace(/\D/g, "");
  if (!n) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${n}${q}`;
}

// ─── Placeholder detection (graceful UI hiding until real values are set) ───

/** True when a value is missing or still a [bracket] / *.example placeholder. */
function unset(v?: string): boolean {
  const s = (v ?? "").trim();
  return !s || /[[\]]/.test(s) || s.includes(".example");
}

function phoneConfigured(phone: string): boolean {
  const d = phone.replace(/\D/g, "");
  return d.length >= 10 && !/^0+$/.test(d.replace(/^90/, ""));
}

/**
 * Which public identity values are real vs placeholder. Components use these to
 * hide contact rows, bank details and legal identity until configured, so no
 * "[bracket]" / "000 000" / "@…example" placeholder ever shows to customers.
 */
export const identity = {
  hasPhone: phoneConfigured(storeConfig.contact.phone),
  hasEmail: !unset(storeConfig.contact.email),
  hasWhatsapp: storeConfig.contact.whatsapp.replace(/\D/g, "").length >= 10,
  hasAddressFull: !unset(storeConfig.contact.addressFull),
  hasBankDetails:
    !unset(storeConfig.bankTransfer.bankName) &&
    storeConfig.bankTransfer.iban.replace(/\D/g, "").replace(/^0+/, "").length > 6,
  hasLegalIdentity: !unset(storeConfig.legal.companyName),
} as const;

export interface SocialLink {
  key: string;
  label: string;
  href: string;
}

const SOCIAL_ROOT = /^https?:\/\/(www\.)?(instagram|facebook|youtube)\.com\/?$/i;

/** Only social links that point somewhere real (not the bare root placeholder). */
export function configuredSocials(): SocialLink[] {
  const s = storeConfig.social;
  const real = (u: string) => !!u.trim() && !SOCIAL_ROOT.test(u.trim());
  const out: SocialLink[] = [];
  if (real(s.instagram)) out.push({ key: "instagram", label: "Instagram", href: s.instagram });
  if (real(s.facebook)) out.push({ key: "facebook", label: "Facebook", href: s.facebook });
  if (real(s.youtube)) out.push({ key: "youtube", label: "YouTube", href: s.youtube });
  return out;
}
