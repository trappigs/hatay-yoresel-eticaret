import Link from "next/link";
import { storeConfig, identity } from "@/lib/config/store.config";
import { commerceConfig } from "@/lib/config/commerce.config";
import { formatPrice } from "@/lib/money";
import { Logo } from "@/components/layout/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { CartButton } from "@/components/layout/CartButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { UserIcon, PhoneIcon } from "@/components/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      {/* Promo / contact strip */}
      <div className="bg-olive text-cream-50">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <p className="font-medium">
            {formatPrice(commerceConfig.freeShippingThreshold)} ve üzeri siparişlerde kargo bedava 🚚
          </p>
          {identity.hasPhone && (
            <a href={`tel:${storeConfig.contact.phone}`} className="hidden items-center gap-1 hover:underline sm:inline-flex">
              <PhoneIcon /> {storeConfig.contact.phone}
            </a>
          )}
        </div>
      </div>

      {/* Main row */}
      <div className="container-px flex h-16 items-center gap-3">
        <MobileMenu />
        <Logo className="shrink-0" />
        <div className="mx-auto hidden w-full max-w-xl lg:block">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/hesabim"
            className="hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink hover:bg-cream-200 sm:inline-flex"
          >
            <UserIcon className="text-xl" /> Hesabım
          </Link>
          <Link
            href="/hesabim"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-cream-200 sm:hidden"
            aria-label="Hesabım"
          >
            <UserIcon className="text-xl" />
          </Link>
          <CartButton />
        </div>
      </div>

      {/* Category strip (desktop) */}
      <div className="hidden border-t border-line lg:block">
        <div className="container-px">
          <CategoryNav className="py-1" />
        </div>
      </div>
    </header>
  );
}
