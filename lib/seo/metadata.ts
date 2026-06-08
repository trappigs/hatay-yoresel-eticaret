import type { Metadata } from "next";
import { storeConfig } from "@/lib/config/store.config";

interface BuildMetaInput {
  title?: string;
  description?: string;
  /** Path beginning with "/", used for canonical + OG url. */
  path?: string;
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}

const DEFAULT_OG = "/og-default.svg";

/** Centralized metadata builder so every page gets consistent canonical + OG tags. */
export function buildMetadata({
  title,
  description = storeConfig.description,
  path = "/",
  images = [DEFAULT_OG],
  type = "website",
  noIndex = false,
}: BuildMetaInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${storeConfig.name}` : storeConfig.name;
  const url = new URL(path, storeConfig.url).toString();

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      siteName: storeConfig.name,
      title: fullTitle,
      description,
      url,
      locale: "tr_TR",
      images: images.map((u) => ({ url: u })),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
