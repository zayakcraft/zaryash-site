"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, collections } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

type Sort = "featured" | "newest" | "price-asc" | "price-desc";

export function ShopClient() {
  const searchParams = useSearchParams();
  const initialCollection = searchParams.get("collection") ?? "all";

  const [collection, setCollection] = useState(initialCollection);
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState("all");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );
  const sizes = useMemo(
    () => ["all", ...Array.from(new Set(products.flatMap((p) => p.sizes)))],
    []
  );
  const colors = useMemo(
    () => ["all", ...Array.from(new Set(products.flatMap((p) => p.colors)))],
    []
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (collection !== "all" && p.collection !== collection) return false;
      if (category !== "all" && p.category !== category) return false;
      if (size !== "all" && !p.sizes.includes(size)) return false;
      if (color !== "all" && !p.colors.includes(color)) return false;
      if (query.trim() && !p.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    return list;
  }, [collection, category, size, color, query, sort]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <div className="mb-10 flex flex-col gap-2 md:mb-14">
        <p className="eyebrow text-z-stone">SHOP</p>
        <h1 className="editorial text-4xl md:text-6xl">All Products</h1>
      </div>

      <div className="mb-10 flex flex-col gap-4 border-y border-z-line py-5 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full max-w-xs border-b border-z-line-strong bg-transparent py-1 text-sm outline-none placeholder:text-z-warm-gray"
        />
        <div className="flex flex-wrap gap-4">
          <Select label="Collection" value={collection} onChange={setCollection} options={["all", ...collections.map((c) => c.slug)]} display={(v) => (v === "all" ? "All Collections" : collections.find((c) => c.slug === v)?.name ?? v)} />
          <Select label="Category" value={category} onChange={setCategory} options={categories} display={(v) => (v === "all" ? "All Categories" : v)} />
          <Select label="Size" value={size} onChange={setSize} options={sizes} display={(v) => (v === "all" ? "All Sizes" : v)} />
          <Select label="Color" value={color} onChange={setColor} options={colors} display={(v) => (v === "all" ? "All Colors" : v)} />
          <Select
            label="Sort"
            value={sort}
            onChange={(v) => setSort(v as Sort)}
            options={["featured", "newest", "price-asc", "price-desc"]}
            display={(v) =>
              ({ featured: "Featured", newest: "Newest", "price-asc": "Price: Low to High", "price-desc": "Price: High to Low" }[v] ?? v)
            }
          />
        </div>
      </div>

      <p className="eyebrow mb-6 text-z-warm-gray">
        {filtered.length} PRODUCT{filtered.length === 1 ? "" : "S"}
      </p>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-z-warm-gray">No products match those filters.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  display,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  display: (v: string) => string;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="eyebrow sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="eyebrow border-b border-z-line-strong bg-transparent py-1 text-z-ivory-dim outline-none hover:text-z-ivory"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-z-charcoal text-z-ivory">
            {display(o)}
          </option>
        ))}
      </select>
    </label>
  );
}
