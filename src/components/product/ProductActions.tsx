"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function ProductActions({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addLine = useCartStore((s) => s.addLine);

  const outOfStock = product.inventory <= 0;

  function handleAdd() {
    if (!size) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      color,
      size,
      quantity: 1,
      image: product.images[0]?.src ?? "",
    });
  }

  return (
    <div>
      <p className="eyebrow text-z-stone">{product.collection.toUpperCase().replace("-", " ")}</p>
      <h1 className="editorial mt-3 text-4xl leading-tight md:text-5xl">{product.name}</h1>
      <p className="editorial mt-3 text-2xl text-z-ivory-dim">
        {formatPrice(product.price, product.currency)}
      </p>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-z-ivory-dim">{product.description}</p>

      <div className="mt-8">
        <p className="eyebrow mb-3 text-z-warm-gray">COLOR — {color}</p>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`eyebrow border px-3 py-2 ${
                c === color ? "border-z-ivory" : "border-z-line-strong text-z-ivory-dim hover:border-z-ivory"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="eyebrow text-z-warm-gray">SIZE {size ? `— ${size}` : ""}</p>
          <button className="eyebrow text-z-ivory-dim underline-offset-2 hover:underline">
            SIZE GUIDE
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSize(s);
                setError(null);
              }}
              className={`eyebrow min-w-12 border px-3 py-2 ${
                s === size ? "border-z-ivory" : "border-z-line-strong text-z-ivory-dim hover:border-z-ivory"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 text-xs text-red-400">{error}</p>}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleAdd} disabled={outOfStock} className="flex-1">
          {outOfStock ? "OUT OF STOCK" : "ADD TO BAG"}
        </Button>
        <Button onClick={handleAdd} disabled={outOfStock} variant="outline" className="flex-1">
          BUY NOW
        </Button>
      </div>

      <dl className="mt-10 flex flex-col gap-3 border-t border-z-line pt-6 text-sm">
        <Row term="Material" detail={product.material ?? "Not yet provided"} />
        <Row term="Care" detail={product.care ?? "Not yet provided"} />
        <Row term="SKU" detail={product.sku} />
        <Row term="Shipping" detail="Calculated at checkout" />
        <Row term="Returns" detail="30-day returns on unworn items" />
      </dl>

      {product.isPlaceholder && (
        <p className="mt-8 border border-z-line-strong px-4 py-3 text-xs text-z-warm-gray">
          This is placeholder catalog data for development. Real pricing, materials, and imagery
          should replace it before launch — see README.md.
        </p>
      )}
    </div>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="eyebrow text-z-warm-gray">{term}</dt>
      <dd className="text-right text-z-ivory-dim">{detail}</dd>
    </div>
  );
}
