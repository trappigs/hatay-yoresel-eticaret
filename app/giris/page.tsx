import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { AuthForm } from "@/components/account/AuthForm";

export const metadata: Metadata = buildMetadata({ title: "Giriş Yap", path: "/giris", noIndex: true });

export default function LoginPage() {
  return (
    <div className="container-px py-12">
      <AuthForm mode="login" />
    </div>
  );
}
