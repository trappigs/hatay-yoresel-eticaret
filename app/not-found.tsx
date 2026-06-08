import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-px flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl font-bold text-olive">404</p>
      <h1 className="mt-4 text-2xl font-bold">Sayfa bulunamadı</h1>
      <p className="mt-2 max-w-md text-ink-muted">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ürünlerimize göz atabilirsiniz.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-outline">
          Ana Sayfa
        </Link>
        <Link href="/urunler" className="btn-primary">
          Ürünler
        </Link>
      </div>
    </div>
  );
}
