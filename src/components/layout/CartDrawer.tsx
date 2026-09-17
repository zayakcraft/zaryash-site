"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-z-black/60 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[440px] flex-col bg-z-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-z-line px-6 py-5">
          <p className="eyebrow">YOUR BAG ({lines.reduce((n, l) => n + l.quantity, 0)})</p>
          <button className="eyebrow text-z-ivory-dim hover:text-z-ivory" onClick={close} aria-label="Close bag">
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="editorial text-xl">Your bag is empty.</p>
              <ButtonLink href="/shop" variant="outline" className="mt-2">
                SHOP COLLECTION
              </ButtonLink>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-4">
                  <div className="h-28 w-20 shrink-0">
                    <ProductVisual label={line.name} sublabel={line.color} tone="charcoal" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="editorial text-base leading-tight">{line.name}</p>
                      <p className="eyebrow mt-1 text-z-warm-gray">
                        {line.color} / {line.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-z-line-strong px-2 py-1">
                        <button
                          aria-label="Decrease quantity"
                          className="px-1 text-z-ivory-dim hover:text-z-ivory"
                          onClick={() =>
                            setQuantity(line.productId, line.color, line.size, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="eyebrow w-4 text-center">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="px-1 text-z-ivory-dim hover:text-z-ivory"
                          onClick={() =>
                            setQuantity(line.productId, line.color, line.size, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <span className="eyebrow">{formatPrice(line.price * line.quantity, line.currency)}</span>
                    </div>
                    <button
                      className="eyebrow mt-1 self-start text-z-warm-gray hover:text-z-ivory"
                      onClick={() => removeLine(line.productId, line.color, line.size)}
                    >
                      REMOVE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-z-line px-6 py-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow text-z-warm-gray">SUBTOTAL</span>
              <span className="editorial text-lg">{formatPrice(subtotal, lines[0]?.currency ?? "USD")}</span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="eyebrow flex w-full items-center justify-center bg-z-ivory px-6 py-4 text-z-black hover:bg-z-stone"
            >
              CHECKOUT
            </Link>
            <button
              className="eyebrow mt-3 w-full py-2 text-z-ivory-dim hover:text-z-ivory"
              onClick={close}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
