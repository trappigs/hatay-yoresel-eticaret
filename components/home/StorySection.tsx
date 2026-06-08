import Link from "next/link";
import { LeafIcon } from "@/components/icons";

export function StorySection() {
  return (
    <section className="bg-pepper/5">
      <div className="container-px grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
          <div className="flex aspect-[4/5] flex-col justify-end rounded-2xl bg-gradient-to-br from-olive/25 to-olive/5 p-5">
            <LeafIcon className="mb-2 text-3xl text-olive/60" />
            <span className="font-serif font-semibold">Toprağından</span>
          </div>
          <div className="mt-8 flex aspect-[4/5] flex-col justify-end rounded-2xl bg-gradient-to-br from-pepper/20 to-pepper/5 p-5">
            <LeafIcon className="mb-2 text-3xl text-pepper/50" />
            <span className="font-serif font-semibold">Sofranıza</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="badge bg-pepper/12 text-pepper">Hikâyemiz</span>
          <h2 className="mt-4 text-3xl font-bold">Hatay&apos;dan sofranıza</h2>
          <p className="mt-4 text-ink-soft">
            Antakya, Samandağ ve Altınözü&apos;nün bereketli topraklarında, mevsiminde toplanan
            ürünleri geleneksel yöntemlerle işliyoruz. Amacımız; nesilden nesile aktarılan Hatay
            mutfağının lezzetlerini, doğallığını koruyarak sofranıza ulaştırmak.
          </p>
          <p className="mt-3 text-ink-soft">
            Küçük üreticilerle çalışıyor, her ürünü özenle paketliyor ve hızlıca kargoluyoruz.
          </p>
          <Link href="/hakkimizda" className="btn-olive mt-6">
            Hakkımızda
          </Link>
        </div>
      </div>
    </section>
  );
}
