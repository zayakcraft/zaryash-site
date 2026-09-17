"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
        setMessage("Thank you — we'll be in touch.");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 px-5 pb-24 pt-28 md:grid-cols-2 md:px-10 md:pt-36">
      <div>
        <p className="eyebrow mb-3 text-z-stone">CONTACT</p>
        <h1 className="editorial mb-8 text-4xl md:text-5xl">Get in touch.</h1>
        <div className="flex flex-col gap-6 text-sm text-z-ivory-dim">
          <div>
            <p className="eyebrow mb-1 text-z-warm-gray">CUSTOMER SUPPORT</p>
            <p>support@zaryash.com</p>
          </div>
          <div>
            <p className="eyebrow mb-1 text-z-warm-gray">BUSINESS INQUIRIES</p>
            <p>partnerships@zaryash.com</p>
          </div>
          <div>
            <p className="eyebrow mb-1 text-z-warm-gray">SOCIAL</p>
            <p>@zaryash</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="text-xs text-z-warm-gray">Name</span>
          <input name="name" required className="border-b border-z-line-strong bg-transparent py-2 text-sm outline-none focus:border-z-ivory" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs text-z-warm-gray">Email</span>
          <input name="email" type="email" required className="border-b border-z-line-strong bg-transparent py-2 text-sm outline-none focus:border-z-ivory" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs text-z-warm-gray">Message</span>
          <textarea name="message" rows={5} required className="border-b border-z-line-strong bg-transparent py-2 text-sm outline-none focus:border-z-ivory" />
        </label>
        {message && (
          <p className="text-sm text-z-ivory-dim" role="status">
            {message}
          </p>
        )}
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "SENDING…" : "SEND MESSAGE"}
        </Button>
      </form>
    </div>
  );
}
