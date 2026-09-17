import type { Metadata } from "next";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = { title: "Account" };

// Architecture placeholder: no auth provider is configured yet.
// Wire in real authentication (NextAuth, Clerk, custom JWT, etc.)
// and replace this with sign-in / order-history / address-book views.
export default function AccountPage() {
  return (
    <SimplePage eyebrow="ACCOUNT" title="Sign in">
      <p>
        Account architecture is not yet connected to an authentication provider. See README.md →
        &ldquo;Required Environment Variables&rdquo; for what&rsquo;s needed to enable real
        sign-in, order history, and saved addresses.
      </p>
    </SimplePage>
  );
}
