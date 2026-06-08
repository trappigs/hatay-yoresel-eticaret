"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";
import { mainNav, accountNav } from "@/components/layout/nav-links";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { SearchBar } from "@/components/layout/SearchBar";
import { Logo } from "@/components/layout/Logo";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + Escape to close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-cream-200 lg:hidden"
        aria-label="Menüyü aç"
        aria-expanded={open}
      >
        <MenuIcon className="text-xl" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menü">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-cream shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Logo compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-cream-200"
                aria-label="Menüyü kapat"
              >
                <CloseIcon className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <SearchBar onSubmitted={() => setOpen(false)} />

              <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-olive">
                Kategoriler
              </p>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className="block rounded-lg px-3 py-2.5 font-medium text-ink hover:bg-cream-200"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-olive">
                Keşfet
              </p>
              <ul className="space-y-1">
                {mainNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block rounded-lg px-3 py-2.5 font-medium text-ink hover:bg-cream-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
                {accountNav.map((l) => (
                  <Link key={l.href} href={l.href} className="btn-outline text-sm">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
