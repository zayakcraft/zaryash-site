"use client";

import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Collections", href: "/shop" },
      { label: "Outfit Studio", href: "/outfit-studio" },
      { label: "Showroom", href: "/showroom" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
      { label: "AI Stylist", href: "/ai" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping", href: "/care/shipping" },
      { label: "Returns", href: "/care/returns" },
      { label: "Size Guide", href: "/care/size-guide" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-z-line bg-z-black">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="editorial mb-16 text-4xl tracking-[0.1em] md:text-6xl">ZARYASH</div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow mb-4 text-z-warm-gray">WEAR YOUR PRESENCE.</p>
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="eyebrow text-z-warm-gray">
                NEWSLETTER
              </label>
              <div className="flex border-b border-z-line-strong">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-z-warm-gray"
                />
                <button type="submit" className="eyebrow shrink-0 pl-2 hover:text-z-stone">
                  JOIN
                </button>
              </div>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5 text-z-warm-gray">{col.title.toUpperCase()}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-z-ivory-dim hover:text-z-ivory">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-z-line pt-8 text-xs text-z-warm-gray md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ZARYASH. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-z-ivory">
              Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-z-ivory">
              TikTok
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-z-ivory">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
