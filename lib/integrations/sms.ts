/**
 * SMS integration placeholder (Phase 2). TODO: implement Netgsm.
 * Used for order/status notifications. Credentials come from env on the server.
 */
export interface SmsMessage {
  to: string; // E.164 or local TR format
  text: string;
}

export interface SmsResult {
  status: "sent" | "error";
  message: string;
}

export async function sendSms(_msg: SmsMessage): Promise<SmsResult> {
  // TODO(Phase 2): POST to Netgsm with NETGSM_USERCODE / NETGSM_PASSWORD / NETGSM_HEADER.
  return {
    status: "error",
    message: "SMS sağlayıcısı (Netgsm) henüz yapılandırılmadı. (Phase 2)",
  };
}
