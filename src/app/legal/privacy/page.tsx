import type { Metadata } from "next";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <SimplePage eyebrow="LEGAL" title="Privacy Policy">
      <p>
        Placeholder — this page must be replaced with a real, counsel-reviewed privacy policy
        before launch, covering what data is collected, how it&rsquo;s used, and applicable
        regulations (GDPR, CCPA, etc.) for your markets.
      </p>
    </SimplePage>
  );
}
