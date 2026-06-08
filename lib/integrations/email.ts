/**
 * Email integration placeholder (Phase 2). TODO: implement SMTP / Resend / SendGrid.
 * Used for order confirmations. Credentials come from env on the server.
 */
export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
}

export interface EmailResult {
  status: "sent" | "error";
  message: string;
}

export async function sendEmail(_msg: EmailMessage): Promise<EmailResult> {
  // TODO(Phase 2): use EMAIL_PROVIDER + provider credentials from env.
  return {
    status: "error",
    message: "E-posta sağlayıcısı henüz yapılandırılmadı. (Phase 2)",
  };
}
