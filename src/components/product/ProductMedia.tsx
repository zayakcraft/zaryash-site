"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { GarmentViewerLazy } from "@/components/product/GarmentViewerLazy";

export function ProductMedia({ product }: { product: Product }) {
  const [mode, setMode] = useState<"gallery" | "3d">("gallery");

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode("gallery")}
          className={`eyebrow border px-4 py-2 ${
            mode === "gallery" ? "border-z-ivory" : "border-z-line-strong text-z-warm-gray"
          }`}
        >
          GALLERY
        </button>
        <button
          onClick={() => setMode("3d")}
          className={`eyebrow border px-4 py-2 ${
            mode === "3d" ? "border-z-ivory" : "border-z-line-strong text-z-warm-gray"
          }`}
        >
          VIEW IN 3D
        </button>
      </div>

      {mode === "gallery" ? (
        <ProductGallery product={product} />
      ) : (
        <div className="aspect-[3/4] w-full">
          <GarmentViewerLazy
            category={product.category}
            productName={product.name}
            hasRealModel={!!product.model3D}
          />
        </div>
      )}
    </div>
  );
}
