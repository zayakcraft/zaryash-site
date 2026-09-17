import type { Metadata } from "next";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <SimplePage eyebrow="CUSTOMER CARE" title="Shipping">
      <p>
        Placeholder shipping policy. Replace with real carrier, rate, and delivery-window
        information before launch — this content is currently illustrative only.
      </p>
      <p>Domestic orders: placeholder timeframe. International orders: placeholder timeframe.</p>
    </SimplePage>
  );
}
