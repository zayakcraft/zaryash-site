"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "@/components/ui/SearchOverlay";

const LEFT_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/shop", label: "COLLECTIONS" },
  { href: "/world", label: "WORLD" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggle);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "bg-z-black/85 backdrop-blur-md border-b border-z-line" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <div className="hidden items-center gap-8 md:flex">
            {LEFT_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="eyebrow text-z-ivory-dim transition-colors hover:text-z-ivory"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="flex items-center gap-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="eyebrow">MENU</span>
          </button>

          <Link
            href="/"
            className="editorial absolute left-1/2 -translate-x-1/2 text-xl tracking-[0.18em] md:text-2xl"
          >
            ZARYASH
          </Link>

          <div className="flex items-center gap-6">
            <button
              aria-label="Search"
              className="eyebrow hidden text-z-ivory-dim transition-colors hover:text-z-ivory md:block"
              onClick={() => setSearchOpen(true)}
            >
              SEARCH
            </button>
            <Link
              href="/account"
              className="eyebrow hidden text-z-ivory-dim transition-colors hover:text-z-ivory md:block"
            >
              ACCOUNT
            </Link>
            <button
              aria-label={`Open bag, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
              className="eyebrow flex items-center gap-1.5 text-z-ivory-dim transition-colors hover:text-z-ivory"
              onClick={toggleCart}
            >
              BAG
              <span className="text-z-ivory">({totalItems})</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-z-black p-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="editorial text-xl tracking-[0.18em]">ZARYASH</span>
            <button aria-label="Close menu" className="eyebrow" onClick={() => setMenuOpen(false)}>
              CLOSE
            </button>
          </div>
          <div className="mt-16 flex flex-col gap-8">
            {[...LEFT_LINKS, { href: "/ai", label: "AI STYLIST" }, { href: "/outfit-studio", label: "OUTFIT STUDIO" }, { href: "/journal", label: "JOURNAL" }, { href: "/about", label: "ABOUT" }, { href: "/contact", label: "CONTACT" }].map(
              (link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="editorial text-3xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
