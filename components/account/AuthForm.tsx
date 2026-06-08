"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-olive";

/**
 * Login / Register form UI. Authentication is wired to Medusa customer auth in
 * Phase 2 — here the form validates locally and shows a clear pending notice.
 */
export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6 sm:p-8">
        <h1 className="text-2xl font-bold">{isLogin ? "Giriş Yap" : "Üye Ol"}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {isLogin ? "Hesabınıza erişin." : "Hızlı alışveriş için hesap oluşturun."}
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {!isLogin && (
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink-soft">
                Ad Soyad
              </label>
              <input id="name" className={inputClass} autoComplete="name" required />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-soft">
              E-posta
            </label>
            <input id="email" type="email" className={inputClass} autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink-soft">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className={inputClass}
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {isLogin ? "Giriş Yap" : "Üye Ol"}
          </button>
        </form>

        {submitted && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Üyelik ve giriş sistemi Phase 2&apos;de Medusa müşteri kimlik doğrulaması ile
            etkinleştirilecektir. Şu an sipariş vermek için hesap gerekmez.
          </div>
        )}

        <p className="mt-6 text-center text-sm text-ink-muted">
          {isLogin ? (
            <>
              Hesabınız yok mu?{" "}
              <Link href="/kayit" className="font-semibold text-pepper hover:text-pepper-dark">
                Üye olun
              </Link>
            </>
          ) : (
            <>
              Zaten üye misiniz?{" "}
              <Link href="/giris" className="font-semibold text-pepper hover:text-pepper-dark">
                Giriş yapın
              </Link>
            </>
          )}
        </p>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link href="/urunler" className="text-ink-muted hover:text-pepper">
          Hesapsız alışverişe devam et →
        </Link>
      </p>
    </div>
  );
}
