/**
 * Cargo/shipping integration placeholder (Phase 2). Swappable per provider.
 * TODO(Phase 2): implement Yurtiçi / MNG / Aras / Sürat / PTT adapters.
 */
export type CargoProvider = "yurtici" | "mng" | "aras" | "surat" | "ptt";

export interface ShipmentRequest {
  orderId: string;
  recipientName: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  /** True when any line is cold-chain — provider must support it. */
  coldChain: boolean;
}

export interface ShipmentResult {
  status: "created" | "error";
  trackingNumber?: string;
  trackingUrl?: string;
  message: string;
}

export async function createShipment(
  _req: ShipmentRequest,
): Promise<ShipmentResult> {
  // const provider = process.env.CARGO_PROVIDER as CargoProvider | undefined;
  // TODO(Phase 2): call the selected provider's API with env credentials.
  return {
    status: "error",
    message: "Kargo entegrasyonu henüz yapılandırılmadı. (Phase 2)",
  };
}
