import { Suspense } from "react";
import type { Metadata } from "next";
import { AiStylistClient } from "@/components/ai/AiStylistClient";

export const metadata: Metadata = {
  title: "AI Stylist",
  description: "Meet your ZARYASH stylist — real recommendations from the real catalog.",
};

export default function AiPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh]" />}>
      <AiStylistClient />
    </Suspense>
  );
}
