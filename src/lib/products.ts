import type { Collection, Product } from "./types";

// ============================================================
// PLACEHOLDER CATALOG
// ------------------------------------------------------------
// No real ZARYASH product photography, 3D models, pricing, or
// inventory has been supplied yet. Everything below is clearly
// marked isPlaceholder: true and exists only so the UI has real
// data to render against during development.
//
// Replace this file with a real data source (DB / CMS / API)
// before launch. See README.md → "Assets & Data" for the exact
// shape expected and where real files should live:
//   public/products/<slug>/front.webp | back.webp | side.webp |
//     detail.webp | lifestyle.webp | model.glb
// ============================================================

export const collections: Collection[] = [
  {
    slug: "essentials",
    name: "ESSENTIALS",
    description: "The permanent core. Precision-cut foundations built to be worn daily.",
    image: "placeholder:essentials",
  },
  {
    slug: "signature",
    name: "SIGNATURE",
    description: "The ZARYASH point of view — considered silhouettes, quiet detail.",
    image: "placeholder:signature",
  },
  {
    slug: "street-luxury",
    name: "STREET LUXURY",
    description: "Architecture meets ease. Off-duty pieces with a formal spine.",
    image: "placeholder:street-luxury",
  },
  {
    slug: "limited-edition",
    name: "LIMITED EDITION",
    description: "Small runs. Numbered pieces. Not restocked.",
    image: "placeholder:limited-edition",
  },
];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "obsidian-overshirt",
    name: "Obsidian Overshirt",
    description:
      "A structured overshirt cut from a heavyweight cotton twill, built to layer over the Signature tee or worn open. Placeholder listing pending final copy.",
    price: 145,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Obsidian Overshirt — front" },
      { variant: "back", src: "placeholder:back", alt: "Obsidian Overshirt — back" },
      { variant: "detail", src: "placeholder:detail", alt: "Obsidian Overshirt — fabric detail" },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Obsidian Black", "Stone"],
    sku: "ZY-OS-001",
    inventory: 24,
    collection: "signature",
    category: "outerwear",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: true,
    createdAt: "2026-08-01",
    isPlaceholder: true,
  },
  {
    id: "p-002",
    slug: "ivory-column-shirt",
    name: "Ivory Column Shirt",
    description:
      "Minimal placket, clean collar stand, cut for a straight vertical line. Placeholder listing.",
    price: 98,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Ivory Column Shirt — front" },
      { variant: "back", src: "placeholder:back", alt: "Ivory Column Shirt — back" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory"],
    sku: "ZY-SH-002",
    inventory: 41,
    collection: "essentials",
    category: "shirt",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: true,
    createdAt: "2026-07-18",
    isPlaceholder: true,
  },
  {
    id: "p-003",
    slug: "architect-trouser",
    name: "Architect Trouser",
    description:
      "Tapered through the leg with a clean waistband, no unnecessary hardware. Placeholder listing.",
    price: 132,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Architect Trouser — front" },
      { variant: "side", src: "placeholder:side", alt: "Architect Trouser — side" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Charcoal", "Obsidian Black"],
    sku: "ZY-TR-003",
    inventory: 33,
    collection: "essentials",
    category: "trousers",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: false,
    createdAt: "2026-07-18",
    isPlaceholder: true,
  },
  {
    id: "p-004",
    slug: "stone-field-jacket",
    name: "Stone Field Jacket",
    description:
      "Utility silhouette reworked in a soft stone twill with internal storm placket. Placeholder listing.",
    price: 268,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Stone Field Jacket — front" },
      { variant: "detail", src: "placeholder:detail", alt: "Stone Field Jacket — hardware detail" },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone"],
    sku: "ZY-JK-004",
    inventory: 12,
    collection: "street-luxury",
    category: "outerwear",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: true,
    createdAt: "2026-06-30",
    isPlaceholder: true,
  },
  {
    id: "p-005",
    slug: "presence-crew",
    name: "Presence Crewneck",
    description:
      "Heavyweight loopback cotton, dropped shoulder, garment-washed. Placeholder listing.",
    price: 88,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Presence Crewneck — front" },
      { variant: "lifestyle", src: "placeholder:lifestyle", alt: "Presence Crewneck — lifestyle" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Obsidian Black", "Warm Gray", "Ivory"],
    sku: "ZY-KN-005",
    inventory: 58,
    collection: "essentials",
    category: "knitwear",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: false,
    createdAt: "2026-05-12",
    isPlaceholder: true,
  },
  {
    id: "p-006",
    slug: "no-07-numbered-jacket",
    name: "No. 07 Numbered Jacket",
    description:
      "Limited run of 50, individually numbered lining. Placeholder listing.",
    price: 420,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "No. 07 Numbered Jacket — front" },
      { variant: "detail", src: "placeholder:detail", alt: "No. 07 Numbered Jacket — numbered lining" },
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Obsidian Black"],
    sku: "ZY-LE-006",
    inventory: 6,
    collection: "limited-edition",
    category: "outerwear",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: true,
    createdAt: "2026-09-01",
    isPlaceholder: true,
  },
  {
    id: "p-007",
    slug: "quiet-confidence-tee",
    name: "Quiet Confidence Tee",
    description:
      "220gsm cotton, boxy fit, single chest seam — no branding. Placeholder listing.",
    price: 58,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Quiet Confidence Tee — front" },
      { variant: "back", src: "placeholder:back", alt: "Quiet Confidence Tee — back" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Obsidian Black", "Ivory", "Stone"],
    sku: "ZY-TS-007",
    inventory: 76,
    collection: "essentials",
    category: "shirt",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: false,
    createdAt: "2026-04-20",
    isPlaceholder: true,
  },
  {
    id: "p-008",
    slug: "metallic-edge-belt",
    name: "Metallic Edge Belt",
    description:
      "Full-grain leather with a brushed metal buckle. Placeholder listing.",
    price: 76,
    currency: "USD",
    images: [
      { variant: "front", src: "placeholder:front", alt: "Metallic Edge Belt — front" },
      { variant: "detail", src: "placeholder:detail", alt: "Metallic Edge Belt — buckle detail" },
    ],
    sizes: ["S/M", "L/XL"],
    colors: ["Obsidian Black", "Metallic"],
    sku: "ZY-AC-008",
    inventory: 19,
    collection: "signature",
    category: "accessory",
    material: "Placeholder — awaiting fabric spec",
    care: "Placeholder — awaiting care instructions",
    featured: false,
    createdAt: "2026-03-02",
    isPlaceholder: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, limit);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
