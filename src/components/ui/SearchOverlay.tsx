"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products, collections } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], collections: [] };
    return {
      products: products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      ),
      collections: collections.filter((c) => c.name.toLowerCase().includes(q)),
    };
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-z-black/98 backdrop-blur-sm animate-fade-in">
      <div className="mx-auto flex w-full max-w-[900px] flex-1 flex-col px-6 pt-24 md:pt-32">
        <div className="flex items-center justify-between border-b border-z-line pb-4">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            placeholder="SEARCH ZARYASH"
            className="editorial w-full bg-transparent text-2xl tracking-wide outline-none placeholder:text-z-warm-gray md:text-4xl"
          />
          <button className="eyebrow shrink-0 pl-4 text-z-ivory-dim hover:text-z-ivory" onClick={onClose}>
            ESC
          </button>
        </div>

        <div className="mt-10 flex-1 overflow-y-auto pb-16">
          {query.trim() === "" && (
            <p className="eyebrow text-z-warm-gray">Try “jacket”, “essentials”, or a product name.</p>
          )}

          {results.collections.length > 0 && (
            <div className="mb-10">
              <p className="eyebrow mb-4 text-z-warm-gray">Collections</p>
              <div className="flex flex-wrap gap-3">
                {results.collections.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop?collection=${c.slug}`}
                    onClick={onClose}
                    className="border border-z-line-strong px-4 py-2 eyebrow hover:border-z-ivory"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.products.length > 0 && (
            <div>
              <p className="eyebrow mb-4 text-z-warm-gray">Products</p>
              <div className="flex flex-col divide-y divide-z-line">
                {results.products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 hover:opacity-70"
                  >
                    <span className="editorial text-lg">{p.name}</span>
                    <span className="eyebrow text-z-warm-gray">{formatPrice(p.price, p.currency)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query.trim() !== "" && results.products.length === 0 && results.collections.length === 0 && (
            <p className="eyebrow text-z-warm-gray">No results for “{query}”.</p>
          )}
        </div>
      </div>
    </div>
  );
}
