import { products } from "./products";
import type { Product } from "./types";

// ============================================================
// ZARYASH Stylist — catalog-grounded matching.
// ------------------------------------------------------------
// This is deliberately NOT a call to a hosted LLM: no AI provider
// credentials have been configured (see README → Environment
// Variables). Instead it's a transparent keyword/attribute matcher
// against the real product catalog, which guarantees section 23's
// rule holds by construction: it can literally only ever return
// products, prices, sizes, and colors that exist in lib/products.ts.
//
// To upgrade this to a real LLM-backed stylist later (e.g. with
// ANTHROPIC_API_KEY set server-side), keep this file as the
// *retrieval* step — feed its candidate products to the model as
// grounding context and have it choose/explain among them, rather
// than letting it free-generate. Never let the model invent a
// product, price, or attribute that isn't in this list.
// ============================================================

const OCCASION_KEYWORDS: Record<string, string[]> = {
  dinner: ["shirt", "outerwear", "jacket"],
  work: ["shirt", "trousers"],
  travel: ["knitwear", "outerwear"],
  "off-duty": ["shirt", "knitwear", "accessory"],
};

export type StylistQuery = {
  occasion?: string;
  mood?: string;
  color?: string;
  text?: string;
};

export function matchProducts(query: StylistQuery, limit = 4): Product[] {
  const scored = products.map((p) => {
    let score = 0;

    if (query.occasion) {
      const cats = OCCASION_KEYWORDS[query.occasion.toLowerCase()] ?? [];
      if (cats.includes(p.category)) score += 3;
    }

    if (query.color) {
      if (p.colors.some((c) => c.toLowerCase().includes(query.color!.toLowerCase()))) score += 3;
    }

    if (query.mood) {
      const moodText = query.mood.toLowerCase();
      const haystack = `${p.name} ${p.description} ${p.collection}`.toLowerCase();
      if (moodText.includes("bold") && p.collection === "limited-edition") score += 2;
      if (moodText.includes("quiet") && (p.collection === "essentials" || p.collection === "signature"))
        score += 2;
      if (moodText.includes("relaxed") && p.collection === "street-luxury") score += 2;
      if (moodText.includes("sharp") && p.collection === "signature") score += 2;
      if (haystack.includes(moodText)) score += 1;
    }

    if (query.text) {
      const words = query.text.toLowerCase().split(/\s+/).filter(Boolean);
      const haystack = `${p.name} ${p.description} ${p.category} ${p.collection} ${p.colors.join(" ")}`.toLowerCase();
      for (const w of words) {
        if (haystack.includes(w)) score += 1;
      }
    }

    if (p.featured) score += 0.5;

    return { product: p, score };
  });

  const ranked = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  const picks = (ranked.length > 0 ? ranked : scored.filter((s) => s.product.featured)).slice(0, limit);
  return picks.map((s) => s.product);
}

export function describeMatches(query: StylistQuery, matches: Product[]): string {
  if (matches.length === 0) {
    return "I couldn't find anything in the current catalog that fits — try a different color or occasion.";
  }
  const parts: string[] = [];
  if (query.occasion) parts.push(`for ${query.occasion.toLowerCase()}`);
  if (query.mood) parts.push(`with a ${query.mood.toLowerCase()} feel`);
  if (query.color) parts.push(`in ${query.color.toLowerCase()}`);

  const context = parts.length ? ` ${parts.join(", ")}` : "";
  const names = matches.map((m) => m.name).join(", ");
  return `Here's what I'd pull${context}: ${names}. Every piece links straight to full sizing, color, and price.`;
}
