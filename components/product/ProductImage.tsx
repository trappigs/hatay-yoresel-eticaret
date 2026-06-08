import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import {
  LeafIcon,
  JarIcon,
  DropletIcon,
  BoxIcon,
  GiftIcon,
  SparklesIcon,
} from "@/components/icons";

/**
 * Renders a product image. The Phase 1 seed catalog ships without photos, so we
 * draw an intentional, branded label tile (category emblem + wordmark) instead
 * of anything that reads as a missing image. When a real `src` is provided
 * (Phase 2 / client photos) it uses next/image.
 */
const CATEGORY_GRADIENT: Record<string, string> = {
  salca: "from-pepper/30 via-pepper/10 to-cream-200",
  zeytinyagi: "from-olive/30 via-olive/10 to-cream-200",
  "nar-eksisi": "from-pepper/25 via-rose-200/30 to-cream-200",
  baharatlar: "from-amber-300/40 via-amber-100/30 to-cream-200",
  zeytin: "from-olive-light/35 via-olive/10 to-cream-200",
  "recel-kahvaltilik": "from-rose-300/35 via-gold/15 to-cream-200",
  "peynir-sut-urunleri": "from-amber-100/50 via-cream-300 to-cream-200",
  "tatli-kunefe": "from-gold/30 via-amber-200/30 to-cream-200",
  "yoresel-paketler": "from-olive/25 via-gold/15 to-cream-200",
  "hediyelik-kutular": "from-pepper/25 via-gold/20 to-cream-200",
};

const CATEGORY_ICON: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  salca: JarIcon,
  zeytinyagi: DropletIcon,
  "nar-eksisi": DropletIcon,
  baharatlar: SparklesIcon,
  zeytin: LeafIcon,
  "recel-kahvaltilik": JarIcon,
  "peynir-sut-urunleri": BoxIcon,
  "tatli-kunefe": SparklesIcon,
  "yoresel-paketler": BoxIcon,
  "hediyelik-kutular": GiftIcon,
};

const DOT_PATTERN: React.CSSProperties = {
  backgroundImage: "radial-gradient(rgba(36,30,22,0.07) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

export function ProductImage({
  src,
  alt,
  title,
  categorySlug,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
  rounded = true,
  compact = false,
}: {
  src?: string;
  alt: string;
  title: string;
  categorySlug: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  /** Hide title/wordmark for tiny thumbnails (cart/gallery). */
  compact?: boolean;
}) {
  const gradient = CATEGORY_GRADIENT[categorySlug] ?? "from-olive/25 via-olive/8 to-cream-200";
  const Emblem = CATEGORY_ICON[categorySlug] ?? LeafIcon;

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden bg-cream-200",
        rounded && "rounded-xl",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          className={cn("relative flex h-full w-full items-center justify-center bg-gradient-to-br", gradient)}
          role="img"
          aria-label={alt}
        >
          <div className="absolute inset-0 opacity-60" style={DOT_PATTERN} />
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            <span
              className={cn(
                "flex items-center justify-center rounded-full border border-white/70 bg-white/70 text-olive shadow-sm backdrop-blur-sm",
                compact ? "h-10 w-10" : "h-16 w-16 sm:h-20 sm:w-20",
              )}
            >
              <Emblem className={compact ? "text-lg" : "text-2xl sm:text-3xl"} />
            </span>
            {!compact && (
              <>
                <span className="mt-3 line-clamp-2 font-serif text-sm font-semibold text-ink/80">
                  {title}
                </span>
                <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-olive/70">
                  Hatay Yöresel
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
