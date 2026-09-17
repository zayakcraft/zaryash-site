"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ui/ProductVisual";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });
  const bgX = useTransform(springX, (v) => v * -14);
  const bgY = useTransform(springY, (v) => v * -10);
  const fgX = useTransform(springX, (v) => v * 10);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-z-black">
      <motion.div style={{ x: bgX, y: bgY, scale: zoom }} className="absolute inset-0">
        <ProductVisual
          label="ZARYASH — Campaign, Fall/Winter"
          sublabel="Asset slot: public/images/campaign/hero.jpg or hero.mp4"
          tone="charcoal"
          className="h-full w-full"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-z-black via-z-black/10 to-z-black/40" />

      <motion.div
        style={{ x: fgX, y: typeY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <p className="eyebrow mb-6 text-z-stone">WEAR YOUR PRESENCE.</p>
        <h1 className="editorial text-6xl leading-[0.95] tracking-tight text-z-ivory sm:text-8xl md:text-[9rem]">
          ZARYASH
        </h1>
        <p className="editorial mt-6 max-w-md text-lg text-z-ivory-dim md:text-xl">
          Modern essentials, defined by precision.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/shop">SHOP COLLECTION</ButtonLink>
          <ButtonLink href="/world" variant="outline">
            ENTER THE WORLD
          </ButtonLink>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-z-warm-gray"
      >
        <span className="eyebrow">SCROLL</span>
      </motion.div>
    </section>
  );
}
