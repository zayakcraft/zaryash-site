import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalEntry, journalEntries } from "@/lib/journal";
import { ProductVisual } from "@/components/ui/ProductVisual";

export async function generateStaticParams() {
  return journalEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.dek };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-[760px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <p className="eyebrow mb-4 text-z-stone">
        {new Date(entry.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      <h1 className="editorial text-4xl leading-tight md:text-6xl">{entry.title}</h1>
      <p className="editorial mt-4 text-xl text-z-ivory-dim">{entry.dek}</p>

      <div className="my-12 aspect-[16/9] overflow-hidden">
        <ProductVisual label={entry.title} tone="stone" />
      </div>

      <div className="flex flex-col gap-6 text-lg leading-relaxed text-z-ivory-dim">
        {entry.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
