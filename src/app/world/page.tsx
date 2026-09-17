import type { Metadata } from "next";
import Link from "next/link";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { ProductVisual } from "@/components/ui/ProductVisual";

export const metadata: Metadata = {
  title: "The World",
  description: "Enter the ZARYASH world — the showroom, the outfit studio, and the AI stylist.",
};

const ROOMS = [
  {
    label: "The Showroom",
    href: "/showroom",
    desc: "An interactive gallery. Walk between garments displayed like objects of design.",
  },
  {
    label: "Outfit Studio",
    href: "/outfit-studio",
    desc: "Build a look from the real catalog, piece by piece.",
  },
  {
    label: "AI Stylist",
    href: "/ai",
    desc: "Describe the room you're walking into. Get real recommendations.",
  },
  {
    label: "Journal",
    href: "/journal",
    desc: "Campaigns, craftsmanship, and the thinking behind the collections.",
  },
];

export default function WorldPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <FadeInSection className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5 text-z-stone">THE WORLD</p>
        <h1 className="editorial text-4xl leading-tight md:text-6xl">
          ZARYASH is more than a shop.
        </h1>
        <p className="mt-6 text-z-ivory-dim">
          Four rooms. Each one gets you closer to a decision — or just closer to the work.
        </p>
      </FadeInSection>

      <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2">
        {ROOMS.map((room, i) => (
          <FadeInSection key={room.label} delay={i * 100}>
            <Link href={room.href} className="group block">
              <div className="aspect-[16/10] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                  <ProductVisual label={room.label} tone="charcoal" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="editorial text-2xl">{room.label}</p>
                  <p className="mt-1 text-sm text-z-warm-gray">{room.desc}</p>
                </div>
                <span className="eyebrow transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}
