import { ButtonLink } from "@/components/ui/Button";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { ProductVisual } from "@/components/ui/ProductVisual";

export function EnterTheWorld() {
  return (
    <section className="relative bg-z-charcoal px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <FadeInSection className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 text-z-stone">01 — THE WORLD</p>
          <h2 className="editorial text-4xl leading-tight md:text-6xl">
            Enter the world of ZARYASH.
          </h2>
          <p className="mt-6 text-z-ivory-dim">
            A minimal architectural gallery, built to hold a garment the way a museum holds an
            object — concrete surfaces, controlled light, room to look.
          </p>
        </FadeInSection>

        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-3 md:gap-6">
          {[
            { label: "The Showroom", href: "/showroom", desc: "Walk the interactive gallery." },
            { label: "Outfit Studio", href: "/outfit-studio", desc: "Build a look, piece by piece." },
            { label: "AI Stylist", href: "/ai", desc: "Ask for a recommendation." },
          ].map((item, i) => (
            <FadeInSection key={item.label} delay={i * 120}>
              <a href={item.href} className="group block">
                <div className="aspect-[3/4] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <ProductVisual label={item.label} sublabel="Asset slot: public/images/world/*" tone="charcoal" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="editorial text-xl">{item.label}</p>
                    <p className="mt-1 text-sm text-z-warm-gray">{item.desc}</p>
                  </div>
                  <span className="eyebrow text-z-ivory-dim transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="mt-16 flex justify-center md:mt-20">
          <ButtonLink href="/showroom" variant="outline">
            ENTER THE SHOWROOM
          </ButtonLink>
        </FadeInSection>
      </div>
    </section>
  );
}
