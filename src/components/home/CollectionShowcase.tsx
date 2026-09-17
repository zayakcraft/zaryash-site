import Link from "next/link";
import { collections } from "@/lib/products";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { ProductVisual } from "@/components/ui/ProductVisual";

export function CollectionShowcase() {
  return (
    <section className="bg-z-black px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <FadeInSection className="mb-16 flex items-end justify-between md:mb-24">
          <div>
            <p className="eyebrow mb-5 text-z-stone">02 — COLLECTIONS</p>
            <h2 className="editorial text-4xl leading-tight md:text-6xl">The chapters.</h2>
          </div>
          <Link href="/shop" className="eyebrow hidden text-z-ivory-dim hover:text-z-ivory md:block">
            VIEW ALL →
          </Link>
        </FadeInSection>

        <div className="flex flex-col divide-y divide-z-line">
          {collections.map((c, i) => (
            <FadeInSection key={c.slug} delay={i * 80}>
              <Link
                href={`/shop?collection=${c.slug}`}
                className="group grid grid-cols-1 items-center gap-6 py-10 md:grid-cols-[1fr_2fr_auto] md:gap-10 md:py-14"
              >
                <div className="aspect-[4/5] w-full max-w-[220px] overflow-hidden md:aspect-[3/4]">
                  <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                    <ProductVisual label={c.name} tone="stone" />
                  </div>
                </div>
                <div>
                  <h3 className="editorial text-3xl md:text-5xl">{c.name}</h3>
                  <p className="mt-3 max-w-md text-sm text-z-warm-gray md:text-base">
                    {c.description}
                  </p>
                </div>
                <span className="eyebrow flex items-center gap-2 text-z-ivory-dim transition-transform duration-300 group-hover:translate-x-1 md:justify-self-end">
                  EXPLORE →
                </span>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
