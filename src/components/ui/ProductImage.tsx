"use client";

// ZARYASH — ProductImage
// ------------------------------------------------------------
// Renders a real product photo (next/image) when the image's src is
// a real asset path, and falls back to the honest ProductVisual
// placeholder art when it's still "placeholder:*". This is the one
// place that decision is made — product surfaces should render this
// instead of choosing between <Image> and ProductVisual themselves.

import Image from "next/image";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { cn } from "@/lib/utils";
import type { ProductImage as ProductImageT } from "@/lib/types";

type ProductImageProps = {
  image?: ProductImageT;
  label: string;
  sublabel?: string;
  category?: string;
  tone?: "charcoal" | "stone" | "ivory";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductImage({
  image,
  label,
  sublabel,
  category,
  tone = "charcoal",
  className,
  priority,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: ProductImageProps) {
  const isReal = !!image && !image.src.startsWith("placeholder:");

  if (isReal) {
    return (
      <div className={cn("relative h-full w-full bg-z-charcoal-2", className)}>
        <Image
          src={image.src}
          alt={image.alt || label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <ProductVisual
      label={label}
      sublabel={sublabel}
      category={category}
      tone={tone}
      className={className}
    />
  );
}
