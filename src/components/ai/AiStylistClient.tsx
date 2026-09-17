"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

type Message = { role: "assistant" | "user"; text: string; products?: Product[] };

export function AiStylistClient() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Meet your ZARYASH stylist. Tell me an occasion, a mood, or a color — I'll pull real pieces from the current catalog.",
    },
  ]);

  async function ask(query: { occasion?: string; mood?: string; color?: string; text?: string }) {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply, products: data.products }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Something went wrong reaching the stylist. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const occasion = searchParams.get("occasion") ?? undefined;
    const mood = searchParams.get("mood") ?? undefined;
    const color = searchParams.get("color") ?? undefined;
    if (occasion || mood || color) {
      const label = [occasion, mood, color].filter(Boolean).join(" · ");
      // Seeding the conversation from URL params the user arrived with is a
      // one-time mount effect, not a render loop — intentional, not a smell.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages((m) => [...m, { role: "user", text: label }]);
      ask({ occasion, mood, color });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    ask({ text: input });
    setInput("");
  }

  return (
    <div className="mx-auto flex min-h-[100svh] max-w-[900px] flex-col px-5 pb-16 pt-28 md:px-10 md:pt-36">
      <p className="eyebrow mb-3 text-z-stone">AI STYLIST</p>
      <h1 className="editorial mb-10 text-4xl md:text-5xl">Meet your ZARYASH stylist.</h1>

      <div className="flex flex-1 flex-col gap-8">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "self-end text-right" : "self-start"}>
            <p
              className={
                m.role === "user"
                  ? "inline-block max-w-md bg-z-charcoal-2 px-4 py-3 text-sm"
                  : "editorial max-w-lg text-lg leading-relaxed"
              }
            >
              {m.text}
            </p>
            {m.products && m.products.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {m.products.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="group text-left">
                    <div className="aspect-[3/4] overflow-hidden">
                      <ProductVisual label={p.name} category={p.category} tone="charcoal" />
                    </div>
                    <p className="editorial mt-2 text-sm">{p.name}</p>
                    <p className="eyebrow text-z-warm-gray">{formatPrice(p.price, p.currency)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <p className="eyebrow text-z-warm-gray">STYLIST IS THINKING…</p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex gap-3 border-t border-z-line pt-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. “I need something for a Dubai dinner.”"
          className="flex-1 border-b border-z-line-strong bg-transparent py-2 text-sm outline-none placeholder:text-z-warm-gray focus:border-z-ivory"
        />
        <Button type="submit" disabled={loading}>
          ASK
        </Button>
      </form>
      <p className="mt-4 text-xs text-z-warm-gray">
        Recommendations are matched directly against the live ZARYASH catalog — never invented.
      </p>
    </div>
  );
}
