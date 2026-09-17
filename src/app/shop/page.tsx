import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop the full ZARYASH catalog — essentials, signature, street luxury, and limited edition.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh]" />}>
      <ShopClient />
    </Suspense>
  );
}
