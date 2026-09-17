import { NextResponse } from "next/server";
import { z } from "zod";

// ============================================================
// Checkout API — architecture only.
// ------------------------------------------------------------
// This route defines the real request/response contract a
// checkout form should call, and validates input with zod, but it
// does NOT process a real payment or create a real order: no
// payment provider credentials have been supplied. Wire in a real
// provider (Stripe, etc.) by:
//   1. npm install stripe (or the provider's SDK)
//   2. Set STRIPE_SECRET_KEY (or equivalent) in .env.local — never
//      hardcode it, never send it to the client.
//   3. Replace the TODO block below with a real
//      PaymentIntent/Checkout Session/order-creation call.
//   4. Persist the order (DB), then trigger a confirmation email.
// Until that's done, this intentionally returns 501 rather than
// pretending to succeed.
// ============================================================

const CheckoutSchema = z.object({
  lines: z
    .array(
      z.object({
        productId: z.string(),
        slug: z.string(),
        quantity: z.number().int().positive(),
        color: z.string(),
        size: z.string(),
      })
    )
    .min(1),
  customer: z.object({
    email: z.string().email(),
    fullName: z.string().min(1),
  }),
  shippingAddress: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    region: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(2),
  }),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = CheckoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid checkout payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const hasPaymentProvider = Boolean(process.env.STRIPE_SECRET_KEY);

  if (!hasPaymentProvider) {
    return NextResponse.json(
      {
        error: "payment_provider_not_configured",
        message:
          "Checkout is architecturally complete but no payment provider is connected. Set STRIPE_SECRET_KEY (or your chosen provider's credential) in the environment to enable real payments.",
      },
      { status: 501 }
    );
  }

  // TODO: replace with a real payment + order-creation flow, e.g.:
  // const session = await stripe.checkout.sessions.create({ ... });
  // await db.order.create({ ... });
  // await sendOrderConfirmationEmail(parsed.data.customer.email, ...);

  return NextResponse.json(
    { error: "not_implemented", message: "Payment provider is configured but the integration is not yet implemented." },
    { status: 501 }
  );
}
