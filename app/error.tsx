"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-px flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold">Bir şeyler ters gitti</h1>
      <p className="mt-2 max-w-md text-ink-muted">
        Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin; sorun sürerse bizimle iletişime geçin.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-6">
        Tekrar dene
      </button>
    </div>
  );
}
