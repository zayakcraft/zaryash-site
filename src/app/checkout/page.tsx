"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      lines: lines.map((l) => ({
        productId: l.productId,
        slug: l.slug,
        quantity: l.quantity,
        color: l.color,
        size: l.size,
      })),
      customer: {
        email: String(form.get("email") ?? ""),
        fullName: String(form.get("fullName") ?? ""),
      },
      shippingAddress: {
        line1: String(form.get("line1") ?? ""),
        line2: String(form.get("line2") ?? ""),
        city: String(form.get("city") ?? ""),
        region: String(form.get("region") ?? ""),
        postalCode: String(form.get("postalCode") ?? ""),
        country: String(form.get("country") ?? ""),
      },
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setStatus("error");
      setMessage(
        data.message ??
          "Checkout could not be completed — the payment provider isn't connected yet."
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong reaching the checkout service. Please try again.");
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-5 py-40 text-center">
        <p className="editorial text-2xl">Your bag is empty.</p>
        <ButtonLink href="/shop">SHOP COLLECTION</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <p className="eyebrow mb-3 text-z-stone">CHECKOUT</p>
      <h1 className="editorial mb-12 text-4xl md:text-5xl">Complete your order.</h1>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.3fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <Fieldset legend="Contact">
            <Input name="email" label="Email" type="email" required />
          </Fieldset>

          <Fieldset legend="Shipping Address">
            <Input name="fullName" label="Full Name" required />
            <Input name="line1" label="Address Line 1" required />
            <Input name="line2" label="Address Line 2 (optional)" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="city" label="City" required />
              <Input name="region" label="State / Province" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input name="postalCode" label="Postal Code" required />
              <Input name="country" label="Country" required />
            </div>
          </Fieldset>

          <Fieldset legend="Payment">
            <p className="text-sm text-z-warm-gray">
              Payment provider not yet connected. This checkout is fully wired end-to-end and
              will accept real payment details the moment a provider (e.g. Stripe) is configured
              server-side — see README.md → &ldquo;Required Environment Variables&rdquo;.
            </p>
          </Fieldset>

          {message && (
            <p className="border border-z-line-strong px-4 py-3 text-sm text-z-ivory-dim" role="alert">
              {message}
            </p>
          )}

          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "PROCESSING…" : "PLACE ORDER"}
          </Button>
        </form>

        <aside className="border-t border-z-line pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="eyebrow mb-6 text-z-warm-gray">ORDER SUMMARY</p>
          <ul className="flex flex-col gap-4">
            {lines.map((l) => (
              <li key={`${l.productId}-${l.color}-${l.size}`} className="flex justify-between text-sm">
                <span>
                  {l.name}{" "}
                  <span className="text-z-warm-gray">
                    ({l.color}/{l.size}) × {l.quantity}
                  </span>
                </span>
                <span>{formatPrice(l.price * l.quantity, l.currency)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-z-line pt-4">
            <span className="eyebrow">SUBTOTAL</span>
            <span className="editorial text-lg">{formatPrice(subtotal, lines[0]?.currency ?? "USD")}</span>
          </div>
          <p className="mt-3 text-xs text-z-warm-gray">Shipping and taxes calculated at payment step.</p>
          <Link href="/shop" className="eyebrow mt-6 inline-block text-z-ivory-dim hover:text-z-ivory">
            ← CONTINUE SHOPPING
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="eyebrow mb-2 text-z-warm-gray">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs text-z-warm-gray">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="border-b border-z-line-strong bg-transparent py-2 text-sm outline-none focus:border-z-ivory"
      />
    </label>
  );
}
