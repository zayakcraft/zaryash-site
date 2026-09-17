"use client";

import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { Button } from "@/components/ui/Button";
import { useMemo, useState } from "react";
import Link from "next/link";

export function CompleteTheLook({
  current,
  related,
}: {
  current: Product;
  related: Product[];
}) {
  const addLine = useCartStore((s) => s.addLine);
  const [selected, setSelected] = useState<Set<string>>(new Set(related.map((p) => p.id)));

  const items = useMemo(() => [current, ...related], [current, related]);
  const total = items
    .filter((p) => p.id === current.id || selected.has(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  if (related.length === 0) return null;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addAll() {
    for (const p of items) {
      if (p.id !== current.id && !selected.has(p.id)) continue;
      addLine({
        productId: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        currency: p.currency,
        color: p.colors[0],
        size: p.sizes[Math.floor(p.sizes.length / 2)] ?? p.sizes[0],
        quantity: 1,
        image: p.images[0]?.src ?? "",
      });
    }
  }

  return (
    <section className="border-t border-z-line px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow mb-3 text-z-stone">COMPLETE THE LOOK</p>
        <h2 className="editorial mb-10 text-3xl md:text-4xl">Wears well together.</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((p) => {
            const isCurrent = p.id === current.id;
            const active = isCurrent || selected.has(p.id);
            return (
              <div key={p.id} className={cn("relative", !active && "opacity-40")}>
                <Link href={`/product/${p.slug}`} className="block aspect-[3/4] overflow-hidden">
                  <ProductVisual label={p.name} category={p.category} tone="charcoal" />
                </Link>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="editorial text-sm leading-tight">{p.name}</p>
                    <p className="eyebrow mt-1 text-z-warm-gray">{formatPrice(p.price, p.currency)}</p>
                  </div>
                  {!isCurrent && (
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggle(p.id)}
                      aria-label={`Include ${p.name} in the look`}
                      className="mt-1 h-4 w-4 shrink-0 accent-z-ivory"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-z-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="editorial text-xl">
            Total: <span className="text-z-ivory">{formatPrice(total, current.currency)}</span>
          </p>
          <Button onClick={addAll}>ADD COMPLETE LOOK TO BAG</Button>
        </div>
      </div>
    </section>
  );
}
