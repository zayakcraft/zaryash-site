import type { Metadata } from "next";
import { OutfitStudioClient } from "@/components/outfit/OutfitStudioClient";

export const metadata: Metadata = {
  title: "Outfit Studio",
  description: "Build a ZARYASH outfit, piece by piece, from the real catalog.",
};

export default function OutfitStudioPage() {
  return <OutfitStudioClient />;
}
