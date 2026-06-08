"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/config/store.config";
import { WhatsAppIcon, CheckIcon } from "@/components/icons";

/**
 * Newsletter + WhatsApp call-to-action. The email form is UI-only in Phase 1
 * (no provider wired). TODO(Phase 2): POST to the email provider / list.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const wa = whatsappLink("Merhaba, kampanyalardan haberdar olmak istiyorum.");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className="bg-olive text-cream-50">
      <div className="container-px grid gap-6 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Fırsatlardan ilk siz haberdar olun</h2>
          <p className="mt-2 max-w-md text-cream-50/80">
            Yeni ürünler, mevsim hasadı ve özel indirimler için bültenimize katılın veya WhatsApp&apos;tan yazın.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {done ? (
            <div className="flex items-center gap-2 rounded-xl bg-cream-50/15 px-4 py-3 text-sm font-medium">
              <CheckIcon className="text-lg" /> Teşekkürler! Kaydınız alındı.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                aria-label="E-posta adresiniz"
                className="w-full rounded-xl border-0 px-4 py-3 text-ink outline-none ring-1 ring-cream-50/30 focus:ring-2 focus:ring-cream-50"
              />
              <button type="submit" className="btn bg-pepper text-cream-50 hover:bg-pepper-dark sm:shrink-0">
                Abone Ol
              </button>
            </form>
          )}

          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cream-50/10 px-4 py-3 text-sm font-semibold ring-1 ring-cream-50/30 hover:bg-cream-50/20"
            >
              <WhatsAppIcon className="text-lg" /> WhatsApp ile yazın
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
