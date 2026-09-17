"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductVisual } from "@/components/ui/ProductVisual";

export function BeyondTheGarment() {
  const ref = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts()[0];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.05, 0.92]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.55, 0.8], [30, 0]);
  const vignette = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.55, 0.2]);

  if (!featured) return null;

  return (
    <section ref={ref} className="relative h-[280vh] bg-z-black">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: vignette }} className="pointer-events-none absolute inset-0 bg-z-black" />

        <motion.p
          style={{ opacity: labelOpacity }}
          className="eyebrow absolute top-24 z-10 text-z-stone"
        >
          03 — BEYOND THE GARMENT.
        </motion.p>

        <motion.div
          style={{ scale, rotate }}
          className="relative z-0 aspect-[3/4] w-[62vw] max-w-[420px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
        >
          <ProductVisual label={featured.name} sublabel={featured.sku} category={featured.category} tone="charcoal" />
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute bottom-24 z-10 flex flex-col items-center gap-4 text-center"
        >
          <p className="editorial max-w-sm text-2xl md:text-3xl">
            One garment. Every detail considered.
          </p>
          <Link
            href={`/product/${featured.slug}`}
            className="eyebrow border border-z-line-strong px-6 py-3 hover:border-z-ivory"
          >
            EXPLORE PRODUCT
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
