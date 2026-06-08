import { whatsappLink } from "@/lib/config/store.config";
import { WhatsAppIcon } from "@/components/icons";

/** Floating WhatsApp button — only renders when a number is configured. */
export function WhatsAppFloat() {
  const href = whatsappLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.");
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#25D366] py-2 pl-2 pr-2 text-white shadow-card-hover transition-all hover:pr-4 sm:hover:scale-[1.02]"
    >
      <span className="flex h-10 w-10 items-center justify-center">
        <WhatsAppIcon className="text-2xl" />
      </span>
      <span className="hidden whitespace-nowrap pr-1 text-sm font-semibold sm:group-hover:inline">
        WhatsApp&apos;tan yazın
      </span>
    </a>
  );
}
