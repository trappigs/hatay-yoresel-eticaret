import Link from "next/link";
import { categories } from "@/data/categories";
import { ShieldCheckIcon, TruckIcon, SnowflakeIcon, LeafIcon } from "@/components/icons";

const trust = [
  { icon: <LeafIcon />, label: "Aile üretimi" },
  { icon: <ShieldCheckIcon />, label: "Güvenli paketleme" },
  { icon: <TruckIcon />, label: "Hızlı teslimat" },
  { icon: <SnowflakeIcon />, label: "Soğuk zincir kargo" },
];

export function Hero() {
  const tiles = categories.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-cream-200 via-cream to-cream-100">
      <div className="container-px grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="badge bg-olive/12 text-olive-dark">
            <LeafIcon /> Hatay&apos;dan sofranıza
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl">
            Hatay&apos;ın gerçek lezzetleri,{" "}
            <span className="text-pepper">özenle sofranızda</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Biber salçasından soğuk sıkım zeytinyağına, nar ekşisinden zahtere… Antakya, Samandağ ve
            Altınözü&apos;nün bereketli topraklarından, aile üretimiyle hazırlanan doğal ürünler.
            Güvenli paketleme ve hızlı teslimat ile kapınıza kadar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/urunler" className="btn-primary px-6 py-3 text-base">
              Ürünleri Keşfet
            </Link>
            <Link href="/yoresel-paketler" className="btn-outline px-6 py-3 text-base">
              Yöresel Paketler
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium text-ink-soft sm:flex sm:flex-wrap">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                <span className="text-olive">{t.icon}</span>
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tiles.map((c, i) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className={`group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl border border-line bg-gradient-to-br p-4 shadow-card transition-transform hover:-translate-y-1 ${
                ["from-pepper/20 to-pepper/5", "from-olive/20 to-olive/5", "from-gold/20 to-amber-100/30", "from-olive-light/25 to-cream-300"][i % 4]
              } ${i % 2 === 1 ? "translate-y-4 hover:translate-y-3" : ""}`}
            >
              <LeafIcon className="absolute right-3 top-3 text-2xl text-ink/10" />
              <span className="font-serif text-lg font-semibold text-ink group-hover:text-pepper">
                {c.title}
              </span>
              <span className="text-xs font-medium text-ink-muted">Keşfet →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
