import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeafIcon, CheckIcon, TruckIcon } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımızda",
  description: "Hatay'ın yöresel lezzetlerini aile üretimiyle, doğal ve taze olarak sofranıza ulaştırıyoruz.",
  path: "/hakkimizda",
});

const values = [
  { icon: <LeafIcon />, title: "Doğallık", text: "Geleneksel yöntemler, gereksiz katkı olmadan üretim." },
  { icon: <CheckIcon />, title: "Güven", text: "Şeffaf içerik bilgisi ve özenli üretim süreçleri." },
  { icon: <TruckIcon />, title: "Tazelik", text: "Hızlı hazırlık ve özenli, gerektiğinde soğuk zincir kargo." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line bg-gradient-to-br from-cream-200 to-cream">
        <div className="container-px py-12">
          <Breadcrumbs items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hakkımızda" }]} />
          <div className="mt-6 max-w-2xl">
            <span className="badge bg-olive/12 text-olive-dark">Hikâyemiz</span>
            <h1 className="mt-4 text-4xl font-bold">Hatay&apos;dan sofranıza</h1>
            <p className="mt-4 text-lg text-ink-soft">
              Antakya, Samandağ ve Altınözü&apos;nün bereketli topraklarında yetişen ürünleri,
              nesilden nesile aktarılan yöntemlerle işliyor ve sofranıza ulaştırıyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-ink-soft">
            <p>
              Hatay mutfağı; biber salçasından zahtere, nar ekşisinden zeytinyağına uzanan zengin bir
              lezzet kültürüne sahiptir. Biz bu kültürü, küçük üreticilerle birlikte çalışarak
              yaşatmayı amaçlıyoruz.
            </p>
            <p>
              Her ürünü mevsiminde, özenle hazırlıyor; doğallığını koruyarak paketliyoruz. Amacımız,
              Hatay&apos;ın gerçek tadını her eve taşımak.
            </p>
            <p>
              Aile işletmesi anlayışıyla, kalite ve güveni ön planda tutuyoruz. Sorularınız için her
              zaman bize ulaşabilirsiniz.
            </p>
            <Link href="/iletisim" className="btn-olive mt-2 inline-flex">
              Bize Ulaşın
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {values.map((v) => (
              <div key={v.title} className="card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-olive/12 text-olive">
                  {v.icon}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold">{v.title}</h3>
                  <p className="text-sm text-ink-muted">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-200/60">
        <div className="container-px py-12">
          <SectionHeading title="Sorularınız mı var?" description="Ürünlerimiz ve siparişleriniz hakkında bize yazın." align="center" />
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/sss" className="btn-outline">Sık Sorulan Sorular</Link>
            <Link href="/iletisim" className="btn-primary">İletişim</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
