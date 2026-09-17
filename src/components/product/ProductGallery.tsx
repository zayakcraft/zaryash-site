"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductVisual } from "@/components/ui/ProductVisual";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const image = product.images[active] ?? product.images[0];

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-3 overflow-x-auto md:w-20 md:flex-col md:overflow-visible">
        {product.images.map((img, i) => (
          <button
            key={img.variant + i}
            onClick={() => setActive(i)}
            className={`aspect-[3/4] w-16 shrink-0 border transition-colors md:w-full ${
              i === active ? "border-z-ivory" : "border-transparent opacity-60 hover:opacity-100"
            }`}
            aria-label={`View ${img.variant}`}
          >
            <ProductVisual label={img.variant} category={product.category} tone="charcoal" />
          </button>
        ))}
      </div>
      <div className="aspect-[3/4] flex-1 overflow-hidden">
        <ProductVisual
          label={product.name}
          sublabel={image?.variant}
          category={product.category}
          tone="charcoal"
        />
      </div>
    </div>
  );
}
