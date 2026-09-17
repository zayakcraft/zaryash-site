import type { Metadata } from "next";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <SimplePage eyebrow="LEGAL" title="Terms of Service">
      <p>
        Placeholder — this page must be replaced with real, counsel-reviewed terms of service
        before launch.
      </p>
    </SimplePage>
  );
}
