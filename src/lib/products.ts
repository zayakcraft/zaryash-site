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
    slug: "traverse-trouser-black",
    name: "Traverse Wide-Leg Trouser",
    description:
      "A relaxed, wide-leg trouser in a premium twill/drill cotton blend — clean front pleats, deep side pockets, YKK zip fly. Everyday comfort with a modern silhouette.",
    price: 128,
    currency: "USD",
    images: [
      {
        variant: "front",
        src: "/products/traverse-trouser-black/front.webp",
        alt: "Traverse Wide-Leg Trouser, Jet Black — front, worn",
      },
      {
        variant: "back",
        src: "/products/traverse-trouser-black/back.webp",
        alt: "Traverse Wide-Leg Trouser, Jet Black — back, worn",
      },
      {
        variant: "lifestyle",
        src: "/products/traverse-trouser-black/lifestyle.webp",
        alt: "Traverse Wide-Leg Trouser, Jet Black — flat lay",
      },
      {
        variant: "detail",
        src: "/products/traverse-trouser-black/detail.webp",
        alt: "Traverse Wide-Leg Trouser — fabric close-up",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Jet Black"],
    sku: "ZY-TR-003",
    inventory: 33,
    collection: "essentials",
    category: "trousers",
    material:
      "Twill / drill, 98% cotton / 2% elastane (CVC preferred), 280–320 GSM, twill/diagonal weave, soft hand feel, pre-shrunk, slight stretch.",
    care: "Wash cold (30°C/86°F). Do not bleach. Tumble dry low. Cool iron — do not iron on logo. Do not dry clean unless required.",
    featured: false,
    createdAt: "2026-07-18",
    isPlaceholder: false,
  },
  {
    id: "p-010",
    slug: "traverse-trouser-mocha",
    name: "Traverse Wide-Leg Trouser — Mocha",
    description:
      "The same relaxed wide-leg silhouette as the Traverse Trouser, in a brushed mocha/taupe cotton twill with a soft, brushed-inside hand feel — deep side pockets, square back pocket, clean wide hem.",
    price: 128,
    currency: "USD",
    images: [
      {
        variant: "front",
        src: "/products/traverse-trouser-mocha/front.webp",
        alt: "Traverse Wide-Leg Trouser, Mocha — front, worn",
      },
      {
        variant: "back",
        src: "/products/traverse-trouser-mocha/back.webp",
        alt: "Traverse Wide-Leg Trouser, Mocha — back, worn",
      },
      {
        variant: "lifestyle",
        src: "/products/traverse-trouser-mocha/lifestyle.webp",
        alt: "Traverse Wide-Leg Trouser, Mocha — flat lay",
      },
      {
        variant: "detail",
        src: "/products/traverse-trouser-mocha/detail.webp",
        alt: "Traverse Wide-Leg Trouser, Mocha — fabric texture close-up",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Mocha / Taupe Brown"],
    sku: "ZY-TR-010",
    inventory: 28,
    collection: "signature",
    category: "trousers",
    material:
      "3-end brushed cotton twill, 98% cotton / 2% elastane (CVC preferred), 350 GSM, bio-polished + pre-shrunk, soft dense hand feel, medium–heavy warmth.",
    care: "Wash cold (30°C/86°F). Do not bleach. Tumble dry low. Cool iron — do not iron on logo. Do not dry clean unless required.",
    featured: false,
    createdAt: "2026-09-17",
    isPlaceholder: false,
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
      "A heavyweight brushed cotton fleece crewneck with a raglan sleeve and clean ribbed hem — garment-dyed in a warm mocha brown. Built for everyday wear.",
    price: 88,
    currency: "USD",
    images: [
      {
        variant: "front",
        src: "/products/presence-crew/front.webp",
        alt: "Presence Crewneck, Mocha Brown — front, worn",
      },
      {
        variant: "back",
        src: "/products/presence-crew/back.webp",
        alt: "Presence Crewneck, Mocha Brown — back, worn",
      },
      {
        variant: "lifestyle",
        src: "/products/presence-crew/lifestyle.webp",
        alt: "Presence Crewneck, Mocha Brown — flat lay",
      },
      {
        variant: "detail",
        src: "/products/presence-crew/detail.webp",
        alt: "Presence Crewneck — brushed fleece fabric texture",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Mocha Brown"],
    sku: "ZY-KN-005",
    inventory: 58,
    collection: "essentials",
    category: "knitwear",
    material: "Brushed cotton fleece, 100% cotton, raglan sleeve construction, ribbed cuff and hem.",
    care: "Machine wash cold. Do not bleach. Tumble dry low. Cool iron.",
    featured: false,
    createdAt: "2026-05-12",
    isPlaceholder: false,
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
  {
    id: "p-011",
    slug: "zenith-quarter-zip",
    name: "Zenith Quarter-Zip Sweatshirt",
    description:
      "A premium quarter-zip sweatshirt in brushed cotton fleece with a collared neck, YKK zip, and tonal embroidered crest. Simple, clean, timeless.",
    price: 98,
    currency: "USD",
    images: [
      {
        variant: "front",
        src: "/products/zenith-quarter-zip/front.webp",
        alt: "Zenith Quarter-Zip Sweatshirt, Off White — front, worn",
      },
      {
        variant: "back",
        src: "/products/zenith-quarter-zip/back.webp",
        alt: "Zenith Quarter-Zip Sweatshirt, Off White — back, flat lay",
      },
      {
        variant: "side",
        src: "/products/zenith-quarter-zip/side.webp",
        alt: "Zenith Quarter-Zip Sweatshirt, Off White — side, flat lay",
      },
      {
        variant: "lifestyle",
        src: "/products/zenith-quarter-zip/lifestyle.webp",
        alt: "Zenith Quarter-Zip Sweatshirt, Off White — front flat lay",
      },
      {
        variant: "detail",
        src: "/products/zenith-quarter-zip/detail.webp",
        alt: "Zenith Quarter-Zip Sweatshirt — brushed fleece fabric swatch",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Off White / Cream"],
    sku: "ZY-KN-011",
    inventory: 40,
    collection: "essentials",
    category: "knitwear",
    material:
      "3-end brushed cotton fleece, 80% cotton / 20% polyester (CVC preferred), 330 GSM, combed/ring-spun yarn, bio-polished + compacted (pre-shrunk), premium YKK/SBS zipper.",
    care: "Wash cold (30°C/86°F). Do not bleach — mild detergent only. Tumble dry low, preferably air dry. Cool iron, do not iron on logo. Do not dry clean unless required.",
    featured: true,
    createdAt: "2026-09-17",
    isPlaceholder: false,
  },
  {
    id: "p-012",
    slug: "shadow-hoodie",
    name: "Shadow Hoodie",
    description:
      "An oversized, drop-shoulder hoodie in heavyweight brushed fleece — double-layer hood with drawcord, kangaroo pocket, tonal embroidered crest at the chest. Built for real ones.",
    price: 112,
    currency: "USD",
    images: [
      {
        variant: "front",
        src: "/products/shadow-hoodie/front.webp",
        alt: "Shadow Hoodie, Black — front, worn",
      },
      {
        variant: "back",
        src: "/products/shadow-hoodie/back.webp",
        alt: "Shadow Hoodie, Black — back, worn",
      },
      {
        variant: "lifestyle",
        src: "/products/shadow-hoodie/lifestyle.webp",
        alt: "Shadow Hoodie, Black — front flat lay",
      },
      {
        variant: "detail",
        src: "/products/shadow-hoodie/detail.webp",
        alt: "Shadow Hoodie — brushed fleece fabric texture",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Obsidian Black"],
    sku: "ZY-HD-012",
    inventory: 45,
    collection: "street-luxury",
    category: "knitwear",
    material: "Heavyweight brushed cotton fleece, 100% cotton, double-layer hood, tonal embroidered crest.",
    care: "Machine wash cold. Do not bleach. Tumble dry low. Cool iron.",
    featured: true,
    createdAt: "2026-09-17",
    isPlaceholder: false,
  },
  {
    id: "p-013",
    slug: "mercury-hoodie",
    name: "Mercury Hoodie",
    description:
      "A relaxed, slightly oversized hoodie in soft brushed cotton fleece with a double-layer hood, metal-aglet drawcord, and reinforced kangaroo pocket — jet grey / light grey.",
    price: 112,
    currency: "USD",
    images: [
      {
        variant: "front",
        src: "/products/mercury-hoodie/front.webp",
        alt: "Mercury Hoodie, Grey — front, worn",
      },
      {
        variant: "back",
        src: "/products/mercury-hoodie/back.webp",
        alt: "Mercury Hoodie, Grey — back, worn",
      },
      {
        variant: "side",
        src: "/products/mercury-hoodie/side.webp",
        alt: "Mercury Hoodie, Grey — side, worn",
      },
      {
        variant: "detail",
        src: "/products/mercury-hoodie/detail.webp",
        alt: "Mercury Hoodie — brushed fleece fabric close-up",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Jet Grey / Light Grey"],
    sku: "ZY-HD-013",
    inventory: 37,
    collection: "street-luxury",
    category: "knitwear",
    material:
      "3-end brushed cotton fleece, 80% cotton / 20% polyester (CVC preferred), 330 GSM, combed/ring-spun yarn, bio-polished + compacted (pre-shrunk), double-layer hood with metal aglet drawcord, reinforced kangaroo pocket.",
    care: "Wash cold (30°C/86°F). Do not bleach. Tumble dry low. Cool iron.",
    featured: false,
    createdAt: "2026-09-17",
    isPlaceholder: false,
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
