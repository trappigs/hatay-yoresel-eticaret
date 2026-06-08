import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { AuthForm } from "@/components/account/AuthForm";

export const metadata: Metadata = buildMetadata({ title: "Üye Ol", path: "/kayit", noIndex: true });

export default function RegisterPage() {
  return (
    <div className="container-px py-12">
      <AuthForm mode="register" />
    </div>
  );
}
