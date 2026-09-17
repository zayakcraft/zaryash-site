import type { Metadata } from "next";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { ProductVisual } from "@/components/ui/ProductVisual";

export const metadata: Metadata = {
  title: "About",
  description: "The ZARYASH philosophy — clothing as how you enter a room.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="flex h-[70svh] items-center justify-center px-6 text-center">
        <FadeInSection>
          <p className="editorial max-w-3xl text-4xl leading-tight md:text-6xl">
            We believe clothing is not simply what you wear.
            <br />
            It is how you enter a room.
          </p>
        </FadeInSection>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-5 pb-28 md:grid-cols-2 md:px-10">
        <FadeInSection>
          <div className="aspect-[4/5] overflow-hidden">
            <ProductVisual label="ZARYASH — Studio" tone="stone" />
          </div>
        </FadeInSection>
        <FadeInSection delay={120} className="flex flex-col justify-center gap-6">
          <p className="eyebrow text-z-stone">PHILOSOPHY</p>
          <p className="text-lg leading-relaxed text-z-ivory-dim">
            ZARYASH is built on restraint. Every silhouette starts from what it doesn&rsquo;t need —
            fewer seams, fewer statements, more intention. We design for a straight vertical line,
            for fabric that behaves the same in a boardroom and on a night flight.
          </p>
          <p className="text-lg leading-relaxed text-z-ivory-dim">
            Placeholder copy — replace with the real ZARYASH brand story, founding narrative, and
            design principles before launch.
          </p>
        </FadeInSection>
      </div>

      <div className="border-t border-z-line px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-3">
          {[
            { title: "Material", body: "Placeholder — describe fabric sourcing and construction standards." },
            { title: "Craft", body: "Placeholder — describe manufacturing partners and process." },
            { title: "Presence", body: "Placeholder — describe the brand's intended feeling and audience." },
          ].map((item, i) => (
            <FadeInSection key={item.title} delay={i * 100}>
              <p className="eyebrow mb-3 text-z-warm-gray">{item.title.toUpperCase()}</p>
              <p className="text-sm leading-relaxed text-z-ivory-dim">{item.body}</p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
}
