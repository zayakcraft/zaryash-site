"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const secondary = product.images[1] ?? product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-z-charcoal-2">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        >
          <ProductImage
            image={product.images[0]}
            label={product.name}
            category={product.category}
            tone="charcoal"
          />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <ProductImage
            image={secondary}
            label={product.name}
            sublabel={secondary?.variant}
            category={product.category}
            tone="stone"
          />
        </div>
        {product.inventory <= 8 && (
          <span className="eyebrow absolute left-3 top-3 bg-z-black/70 px-2 py-1 text-z-ivory">
            LOW STOCK
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="editorial text-lg leading-tight transition-transform duration-300 group-hover:translate-x-0.5">
            {product.name}
          </p>
          <p className="mt-1 text-xs text-z-warm-gray">{product.colors.join(" / ")}</p>
        </div>
        <p className="eyebrow shrink-0 text-z-ivory-dim">{formatPrice(product.price, product.currency)}</p>
      </div>
    </Link>
  );
}
