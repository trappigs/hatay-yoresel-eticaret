import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeafIcon, TruckIcon, CheckIcon, SnowflakeIcon } from "@/components/icons";

const items = [
  {
    icon: <LeafIcon />,
    title: "Doğal & katkısız",
    text: "Geleneksel yöntemlerle, gereksiz katkı maddesi kullanmadan hazırlanır.",
  },
  {
    icon: <CheckIcon />,
    title: "Aile üretimi",
    text: "Küçük üreticilerle çalışıyor, her partiyi özenle kontrol ediyoruz.",
  },
  {
    icon: <SnowflakeIcon />,
    title: "Soğuk zincir",
    text: "Peynir ve hassas ürünler soğuk zincir ile güvenle ulaşır.",
  },
  {
    icon: <TruckIcon />,
    title: "Hızlı kargo",
    text: "Siparişleriniz kısa sürede hazırlanır ve özenle paketlenir.",
  },
];

export function WhyUs() {
  return (
    <section className="container-px py-14">
      <SectionHeading eyebrow="Neden biz?" title="Bize güvenmeniz için nedenler" align="center" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="card flex flex-col items-center p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive/12 text-xl text-olive">
              {it.icon}
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
