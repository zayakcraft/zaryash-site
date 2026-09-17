export type JournalEntry = {
  slug: string;
  title: string;
  dek: string;
  body: string[];
  date: string;
};

// Placeholder editorial content — replace with real brand storytelling.
export const journalEntries: JournalEntry[] = [
  {
    slug: "on-quiet-confidence",
    title: "On Quiet Confidence",
    dek: "Why ZARYASH builds toward restraint, not volume.",
    date: "2026-08-15",
    body: [
      "Placeholder editorial copy. This entry should be replaced with real brand storytelling before launch.",
      "The ZARYASH point of view starts from subtraction — what a garment doesn't need, rather than what it could have.",
    ],
  },
  {
    slug: "the-fabric-behind-the-overshirt",
    title: "The Fabric Behind the Overshirt",
    dek: "A short note on the cotton twill used across Signature.",
    date: "2026-07-22",
    body: [
      "Placeholder editorial copy pending real fabric sourcing details and photography.",
    ],
  },
  {
    slug: "no-07-a-numbered-run",
    title: "No. 07 — A Numbered Run",
    dek: "Inside the thinking behind ZARYASH's first Limited Edition drop.",
    date: "2026-09-02",
    body: [
      "Placeholder editorial copy pending real campaign material for the Limited Edition line.",
    ],
  },
];

export function getJournalEntry(slug: string) {
  return journalEntries.find((e) => e.slug === slug);
}
