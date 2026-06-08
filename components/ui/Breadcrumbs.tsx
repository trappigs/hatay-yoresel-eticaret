import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

export interface Crumb {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-pepper">
                  {item.name}
                </Link>
              ) : (
                <span className={last ? "font-medium text-ink" : undefined} aria-current={last ? "page" : undefined}>
                  {item.name}
                </span>
              )}
              {!last && <ChevronRightIcon className="text-xs text-line" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
