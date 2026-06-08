import { mockAdapter } from "@/lib/commerce/mock-adapter";
import { medusaAdapter } from "@/lib/commerce/medusa-adapter";
import type { CommerceAdapter } from "@/lib/commerce/types";

/**
 * Single entry point for all commerce data. Pages/components import `commerce`
 * and never know which backend serves them.
 *
 * Adapter is chosen by COMMERCE_ADAPTER (server-side env): "mock" (default) | "medusa".
 *
 * No silent fallback: an explicitly set but unknown value throws (misconfig), and
 * in "medusa" mode the medusa-adapter throws on backend errors rather than ever
 * returning mock data — so a down backend surfaces a real error, never fake data.
 */
const activeAdapter = (process.env.COMMERCE_ADAPTER || "mock").trim().toLowerCase();

function selectAdapter(name: string): CommerceAdapter {
  switch (name) {
    case "medusa":
      return medusaAdapter;
    case "mock":
      return mockAdapter;
    default:
      throw new Error(
        `[commerce] Invalid COMMERCE_ADAPTER="${process.env.COMMERCE_ADAPTER}". ` +
          `Use "mock" or "medusa" (unset = mock).`,
      );
  }
}

export const commerce: CommerceAdapter = selectAdapter(activeAdapter);

// Dev-only: confirm at startup which backend is actually active. Kept out of
// production logs. If this prints "mock" while you expect Medusa, COMMERCE_ADAPTER
// was not read (wrong .env / built in mock mode — rebuild in medusa mode).
if (process.env.NODE_ENV !== "production") {
  const target =
    activeAdapter === "medusa"
      ? ` → ${process.env.MEDUSA_BACKEND_URL || "(MEDUSA_BACKEND_URL UNSET!)"}`
      : "";
  console.log(`[commerce] active adapter: ${activeAdapter}${target}`);
}

export { activeAdapter };
export * from "@/lib/commerce/types";
export * from "@/lib/commerce/product-helpers";
