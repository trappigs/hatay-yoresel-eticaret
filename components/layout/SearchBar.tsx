"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/components/icons";

export function SearchBar({
  className,
  onSubmitted,
  autoFocus = false,
}: {
  className?: string;
  onSubmitted?: () => void;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/urunler?q=${encodeURIComponent(q)}` : "/urunler");
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={cn("relative w-full", className)}>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ürün ara: salça, zeytinyağı, zahter…"
        aria-label="Ürün ara"
        className="w-full rounded-xl border border-line bg-white py-2.5 pl-4 pr-11 text-sm outline-none placeholder:text-ink-muted/70 focus:border-olive"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-soft hover:text-pepper"
        aria-label="Ara"
      >
        <SearchIcon className="text-lg" />
      </button>
    </form>
  );
}
