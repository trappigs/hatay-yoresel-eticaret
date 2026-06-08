import { clsx, type ClassValue } from "clsx";

/** Conditional className join. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Turkish-friendly slugify (best-effort, for internal use). */
export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return input
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (m) => map[m] ?? m)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
