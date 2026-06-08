import Link from "next/link";
import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeafIcon } from "@/components/icons";

const TINTS = [
  "from-pepper/15 to-pepper/5",
  "from-olive/15 to-olive/5",
  "from-gold/15 to-amber-100/30",
  "from-olive-light/20 to-cream-300",
  "from-rose-200/30 to-cream-200",
  "from-sky-100 to-cream-200",
];

export function FeaturedCategories() {
  return (
    <section className="container-px py-14">
      <SectionHeading
        eyebrow="Kategoriler"
        title="Ne arıyorsunuz?"
        description="Hatay mutfağının temel lezzetlerini kategorilere göre keşfedin."
        href="/urunler"
      />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-gradient-to-br ${TINTS[i % TINTS.length]} p-5 text-center transition-shadow hover:shadow-card`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-olive">
              <LeafIcon className="text-xl" />
            </span>
            <span className="text-sm font-semibold text-ink group-hover:text-pepper">{c.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
