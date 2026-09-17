import type { Metadata } from "next";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <SimplePage eyebrow="CUSTOMER CARE" title="Returns">
      <p>
        Placeholder returns policy. Replace with the real window, condition requirements, and
        refund process before launch.
      </p>
      <p>Unworn items with tags attached may be returned within a placeholder 30-day window.</p>
    </SimplePage>
  );
}
