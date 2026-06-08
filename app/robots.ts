import type { MetadataRoute } from "next";
import { storeConfig } from "@/lib/config/store.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sepet", "/odeme", "/hesabim", "/giris", "/kayit"],
    },
    sitemap: new URL("/sitemap.xml", storeConfig.url).toString(),
    host: storeConfig.url,
  };
}
