"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";

const Showroom3D = dynamic(
  () => import("@/components/showroom/Showroom3D").then((m) => m.Showroom3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <p className="eyebrow text-z-warm-gray">LOADING SHOWROOM…</p>
      </div>
    ),
  }
);

export default function ShowroomPage() {
  const [selected, setSelected] = useState<Product | null>(null);
  const addLine = useCartStore((s) => s.addLine);

  return (
    <div className="relative h-[100svh] bg-z-black pt-16 md:pt-20">
      <div className="absolute left-5 top-20 z-10 max-w-xs md:left-10 md:top-28">
        <p className="eyebrow text-z-stone">THE ZARYASH SHOWROOM</p>
        <p className="mt-2 text-sm text-z-warm-gray">
          Click a garment to approach it. Drag to look around.
        </p>
      </div>

      <div className="h-full w-full">
        <Showroom3D onSelect={setSelected} />
      </div>

      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-4 bg-gradient-to-t from-z-black via-z-black/95 to-transparent px-6 pb-8 pt-16 text-center md:pb-12">
          <p className="eyebrow text-z-stone">{selected.collection.toUpperCase().replace("-", " ")}</p>
          <h2 className="editorial text-3xl md:text-4xl">{selected.name}</h2>
          <p className="eyebrow text-z-ivory-dim">{formatPrice(selected.price, selected.currency)}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/product/${selected.slug}`}
              className="eyebrow border border-z-line-strong px-5 py-3 hover:border-z-ivory"
            >
              VIEW PRODUCT
            </Link>
            <button
              onClick={() =>
                addLine({
                  productId: selected.id,
                  slug: selected.slug,
                  name: selected.name,
                  price: selected.price,
                  currency: selected.currency,
                  color: selected.colors[0],
                  size: selected.sizes[Math.floor(selected.sizes.length / 2)] ?? selected.sizes[0],
                  quantity: 1,
                  image: selected.images[0]?.src ?? "",
                })
              }
              className="eyebrow bg-z-ivory px-5 py-3 text-z-black hover:bg-z-stone"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
