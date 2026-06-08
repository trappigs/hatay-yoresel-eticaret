import Link from "next/link";
import { cn } from "@/lib/utils";
import { LeafIcon } from "@/components/icons";
import { storeConfig } from "@/lib/config/store.config";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)} aria-label={storeConfig.name}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-olive text-cream-50">
        <LeafIcon className="text-lg" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-bold text-ink">Hatay Yöresel</span>
        {!compact && (
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-olive">
            {storeConfig.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
