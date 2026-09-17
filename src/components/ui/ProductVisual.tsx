"use client";

// ZARYASH — ProductVisual
// ------------------------------------------------------------
// No real product photography exists yet. Rather than fabricate
// fake "realistic" garment photos, this renders an honest,
// premium placeholder: architectural line-art + the real product
// name/SKU. The moment a real image path (not "placeholder:*")
// is set on a Product, this renders it as an actual photo instead.

import { cn } from "@/lib/utils";

const SILHOUETTES: Record<string, string> = {
  shirt: "M32 18 L44 10 L56 18 L52 30 L52 88 L28 88 L28 30 Z M40 10 L44 22 L48 10",
  outerwear: "M28 20 L44 8 L60 20 L64 34 L54 34 L54 90 L34 90 L34 34 L24 34 Z",
  trousers: "M32 10 L56 10 L58 90 L46 90 L44 40 L42 90 L30 90 Z",
  knitwear: "M30 20 L44 12 L58 20 L58 32 L50 32 L50 88 L38 88 L38 32 L30 32 Z",
  accessory: "M20 44 L68 44 L68 54 L20 54 Z M38 44 L38 30 L50 30 L50 44",
};

function silhouetteFor(category?: string) {
  if (!category) return SILHOUETTES.shirt;
  return SILHOUETTES[category] ?? SILHOUETTES.shirt;
}

type ProductVisualProps = {
  label: string;
  sublabel?: string;
  category?: string;
  className?: string;
  tone?: "charcoal" | "stone" | "ivory";
};

export function ProductVisual({
  label,
  sublabel,
  category,
  className,
  tone = "charcoal",
}: ProductVisualProps) {
  const bg =
    tone === "ivory"
      ? "bg-z-ivory-dim text-z-black"
      : tone === "stone"
      ? "bg-z-stone-dim text-z-black"
      : "bg-z-charcoal-2 text-z-ivory";

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden",
        bg,
        className
      )}
      role="img"
      aria-label={`${label}${sublabel ? ` — ${sublabel}` : ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="flex items-center justify-between p-4">
        <span className="eyebrow opacity-60">ZARYASH</span>
        <span className="eyebrow opacity-40">SAMPLE</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <svg
          viewBox="0 0 96 100"
          className="h-2/5 w-2/5 opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d={silhouetteFor(category)} />
        </svg>
      </div>

      <div className="p-4">
        <p className="editorial text-sm leading-tight">{label}</p>
        {sublabel && <p className="eyebrow mt-1 opacity-50">{sublabel}</p>}
      </div>
    </div>
  );
}
