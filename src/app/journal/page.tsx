import type { Metadata } from "next";
import Link from "next/link";
import { journalEntries } from "@/lib/journal";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { ProductVisual } from "@/components/ui/ProductVisual";

export const metadata: Metadata = {
  title: "Journal",
  description: "Campaigns, craftsmanship, and brand stories from ZARYASH.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <p className="eyebrow mb-3 text-z-stone">JOURNAL</p>
      <h1 className="editorial mb-16 text-4xl md:text-6xl">Field notes.</h1>

      <div className="flex flex-col divide-y divide-z-line">
        {journalEntries.map((entry, i) => (
          <FadeInSection key={entry.slug} delay={i * 80}>
            <Link
              href={`/journal/${entry.slug}`}
              className="group grid grid-cols-1 gap-6 py-12 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                  <ProductVisual label={entry.title} tone="stone" />
                </div>
              </div>
              <div>
                <p className="eyebrow text-z-warm-gray">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h2 className="editorial mt-3 text-3xl md:text-4xl">{entry.title}</h2>
                <p className="mt-3 max-w-md text-sm text-z-warm-gray">{entry.dek}</p>
              </div>
            </Link>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
}
