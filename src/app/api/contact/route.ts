import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

// Architecture only — no email/CRM provider is configured yet.
// Wire this to e.g. Resend, Postmark, or a support inbox by setting
// the relevant API key server-side and replacing the TODO below.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const hasEmailProvider = Boolean(process.env.CONTACT_EMAIL_PROVIDER_API_KEY);
  if (!hasEmailProvider) {
    return NextResponse.json(
      {
        error: "email_provider_not_configured",
        message:
          "This form is fully wired but no email provider is connected yet. Set CONTACT_EMAIL_PROVIDER_API_KEY to enable delivery.",
      },
      { status: 501 }
    );
  }

  // TODO: send via configured provider.
  return NextResponse.json({ ok: true });
}
