"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";

const SLOTS = [
  { key: "top", label: "TOP", categories: ["shirt", "knitwear"] },
  { key: "bottom", label: "BOTTOM", categories: ["trousers"] },
  { key: "outerwear", label: "OUTERWEAR", categories: ["outerwear"] },
  { key: "accessories", label: "ACCESSORIES", categories: ["accessory"] },
] as const;

type SlotKey = (typeof SLOTS)[number]["key"];

export function OutfitStudioClient() {
  const addLine = useCartStore((s) => s.addLine);
  const [selection, setSelection] = useState<Partial<Record<SlotKey, Product>>>({});

  const optionsBySlot = useMemo(() => {
    const map: Record<SlotKey, Product[]> = { top: [], bottom: [], outerwear: [], accessories: [] };
    for (const slot of SLOTS) {
      const categories: readonly string[] = slot.categories;
      map[slot.key] = products.filter((p) => categories.includes(p.category));
    }
    return map;
  }, []);

  const chosen = Object.values(selection).filter(Boolean) as Product[];
  const total = chosen.reduce((sum, p) => sum + p.price, 0);

  function addOutfitToBag() {
    for (const p of chosen) {
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
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <p className="eyebrow mb-3 text-z-stone">OUTFIT STUDIO</p>
      <h1 className="editorial mb-4 text-4xl md:text-5xl">Build your presence.</h1>
      <p className="mb-14 max-w-lg text-sm text-z-warm-gray">
        An editorial outfit board — every piece is real, pulled from the current ZARYASH catalog.
      </p>

      <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.2fr]">
        <div className="sticky top-24 self-start">
          <div className="grid grid-cols-2 gap-3">
            {SLOTS.map((slot) => {
              const chosenItem = selection[slot.key];
              return (
                <div key={slot.key} className="aspect-[3/4] border border-z-line">
                  {chosenItem ? (
                    <ProductImage
                      image={chosenItem.images[0]}
                      label={chosenItem.name}
                      category={chosenItem.category}
                      tone="charcoal"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-center">
                      <p className="eyebrow text-z-warm-gray">{slot.label}</p>
                      <p className="mt-1 text-xs text-z-warm-gray">Not selected</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-z-line pt-6">
            <p className="eyebrow text-z-warm-gray">TOTAL</p>
            <p className="editorial text-2xl">{formatPrice(total, "USD")}</p>
          </div>
          <Button onClick={addOutfitToBag} disabled={chosen.length === 0} className="mt-4 w-full">
            ADD COMPLETE LOOK TO BAG
          </Button>
        </div>

        <div className="flex flex-col gap-12">
          {SLOTS.map((slot) => (
            <div key={slot.key}>
              <p className="eyebrow mb-5 text-z-warm-gray">{slot.label}</p>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {optionsBySlot[slot.key].map((p) => {
                  const active = selection[slot.key]?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() =>
                        setSelection((s) => ({
                          ...s,
                          [slot.key]: active ? undefined : p,
                        }))
                      }
                      className={`text-left ${active ? "" : "opacity-70 hover:opacity-100"}`}
                    >
                      <div className={`aspect-[3/4] overflow-hidden border ${active ? "border-z-ivory" : "border-transparent"}`}>
                        <ProductImage image={p.images[0]} label={p.name} category={p.category} tone="charcoal" />
                      </div>
                      <p className="mt-2 text-xs leading-tight">{p.name}</p>
                      <p className="eyebrow text-z-warm-gray">{formatPrice(p.price, p.currency)}</p>
                    </button>
                  );
                })}
                {optionsBySlot[slot.key].length === 0 && (
                  <p className="col-span-full text-xs text-z-warm-gray">
                    No products in this category yet.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-16 border-t border-z-line pt-6 text-xs text-z-warm-gray">
        This is an editorial outfit board, not a virtual try-on — no body-fitting technology is
        wired up, since none is authentic yet. See{" "}
        <Link href="/shop" className="underline underline-offset-2">
          the full shop
        </Link>{" "}
        for every product.
      </p>
    </div>
  );
}
