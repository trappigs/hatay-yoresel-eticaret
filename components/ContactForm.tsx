"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-olive";

/**
 * Contact form UI. Phase 1 is client-side only (no email backend).
 * TODO(Phase 2): POST to an API route that uses lib/integrations/email.ts.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card flex items-center gap-3 p-6 text-sm">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-olive text-cream-50">
          <CheckIcon className="text-lg" />
        </span>
        <p>
          Mesajınız alındı, teşekkürler! En kısa sürede dönüş yapacağız.
          <br />
          <span className="text-ink-muted">(E-posta entegrasyonu Phase 2&apos;de eklenecektir.)</span>
        </p>
      </div>
    );
  }

  return (
    <form
      className="card space-y-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-ink-soft">
            Ad Soyad
          </label>
          <input id="c-name" className={inputClass} required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-ink-soft">
            E-posta
          </label>
          <input id="c-email" type="email" className={inputClass} required autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className="mb-1 block text-sm font-medium text-ink-soft">
          Konu
        </label>
        <input id="c-subject" className={inputClass} required />
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-ink-soft">
          Mesajınız
        </label>
        <textarea id="c-message" rows={5} className={inputClass} required />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Gönder
      </button>
    </form>
  );
}
