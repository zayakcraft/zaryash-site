import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { ProductMedia } from "@/components/product/ProductMedia";
import { ProductActions } from "@/components/product/ProductActions";
import { CompleteTheLook } from "@/components/product/CompleteTheLook";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-28 md:px-10 md:pt-36">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <ProductMedia product={product} />
          <ProductActions product={product} />
        </div>
      </div>
      <CompleteTheLook current={product} related={related} />
    </div>
  );
}
