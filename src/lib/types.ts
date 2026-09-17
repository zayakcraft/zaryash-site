// ZARYASH — Product Data Architecture
// Database-ready shape. UI components should never hard-code product
// facts — everything flows through this type from a single source
// (lib/products.ts today, a real DB/CMS query later).

export type ProductImage = {
  /** e.g. "front" | "back" | "side" | "detail" | "lifestyle" | "campaign" */
  variant: string;
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: ProductImage[];
  /** Path to a .glb/.gltf model, when a real one exists. Never invented. */
  model3D?: string;
  sizes: string[];
  colors: string[];
  sku: string;
  inventory: number;
  collection: string;
  category: string;
  material?: string;
  care?: string;
  featured?: boolean;
  createdAt: string;
  /** True while this entry is placeholder/sample data, not a real listing. */
  isPlaceholder?: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
};
