# ZARYASH — Wear Your Presence.

An immersive Next.js e-commerce build for the ZARYASH menswear house: a cinematic brand layer
(intro, parallax hero, scroll-choreographed "Beyond the Garment" moment, a real interactive 3D
showroom) sitting on top of an honest, fully-usable store (shop with filters/search/sort, product
pages, cart, checkout architecture, outfit studio, catalog-grounded AI stylist).

No real ZARYASH photography, 3D models, pricing, or business credentials were supplied, so
**every product fact in this build is clearly marked as placeholder data** — see "What remains"
below. Nothing pretends to be real: there's no fake checkout success, no invented AI answers, no
fabricated product photography.

---

## 1. What was built

**Foundation** — Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, design tokens (palette,
type scale, motion easing) in `src/app/globals.css`, editorial serif (Cormorant Garamond) + clean
sans (Manrope) type system, global navigation, footer, responsive layout, accessibility basics
(skip link, focus states, `prefers-reduced-motion` support throughout).

**Brand experience** — cinematic wordmark intro (skippable, once per session, respects reduced
motion), a cursor-parallax cinematic hero, an "Enter the World" section, a collection showcase,
a scroll-pinned "Beyond the Garment" signature moment, and a "Build Your Presence" occasion/mood
picker that routes into the AI stylist.

**Real shopping** — product data model (`src/lib/types.ts`), a shop page with live search,
collection/category/size/color filters, and sort; product detail pages with a color/size
selector, add-to-bag, "Complete the Look," and full metadata (material/care/SKU/shipping/returns
copy); a slide-in bag (Zustand + localStorage persistence); a checkout page and `/api/checkout`
route with real Zod-validated request handling.

**3D** — `GarmentViewer` (React Three Fiber + drei): rotate/zoom/reset, WebGL-capability
detection, and a real fallback for browsers/devices that can't render it. `/showroom`: an
interactive 3D gallery you walk through, click a garment to approach it, and add it to the bag —
built on the same primitives, dynamically imported (`ssr:false`) so the 3D stack never ships to
users who don't open it.

**AI Stylist** (`/ai`) — a real, working recommender, but deliberately **not** wired to a hosted
LLM (none was authorized). It matches occasion/mood/color/free text against the live catalog in
`src/lib/stylist.ts`, so by construction it can never invent a price, size, or product — see that
file's comments for how to layer a real LLM on top later without breaking that guarantee.

**Outfit Studio** (`/outfit-studio`) — an editorial outfit board (top/bottom/outerwear/
accessories) built from real catalog products, with a running total and "add complete look to
bag." No virtual try-on/body-fitting is faked, per the brief — that's noted on the page itself.

**Editorial** — `/journal` (index + individual entries), `/about`, `/contact` (validated form +
`/api/contact` route), plus `/care/*` and `/legal/*` stub pages so no nav link 404s.

**Production groundwork** — per-page `<title>`/OpenGraph/Twitter metadata, semantic HTML,
keyboard-navigable filters/menus/search, `prefers-reduced-motion` handling, WebGL fallback, a
Zod-validated checkout and contact API, and dynamic imports for the entire 3D stack.

## 2. What works right now

Run it locally (see §7) and every page above is real and clickable: you can filter and search the
shop, add real items to a persistent bag, walk the 3D showroom and add a garment to the bag from
there, build an outfit and add the whole look, ask the AI stylist a question and get real catalog
matches, and submit the checkout and contact forms (they correctly report that no payment/email
provider is connected yet, rather than faking success). `npm run build` and `npm run lint` are
both clean.

## 3. What remains

- **Real product data.** `src/lib/products.ts` has 8 placeholder products, each with
  `isPlaceholder: true`. Replace with real names, prices, materials, care copy, inventory, and
  imagery — see §4/§5.
- **Real photography / 3D models.** Every image you see is a generated placeholder panel
  (`src/components/ui/ProductVisual.tsx`), not a fake photo — intentional, since no real assets
  exist. Once you add real files, swap `ProductVisual` usage for `next/image` (add remote/host
  config in `next.config.ts` if hosting off-domain).
- **Payment provider.** `/api/checkout` is fully built but returns HTTP 501 until
  `STRIPE_SECRET_KEY` (or your provider of choice) is set — see §6.
- **Email provider** for the contact form (`/api/contact`) — same pattern, same reason.
- **Auth / accounts.** `/account` is a placeholder; no auth provider is wired in.
- **Database.** The catalog is static TypeScript data. `getProductBySlug` etc. in
  `src/lib/products.ts` are the seam to swap for real DB/CMS queries — component code doesn't
  hard-code product facts anywhere, so this should be a contained change.
- **Real brand copy.** About/Journal/care/legal pages are explicitly marked as placeholder copy.
- **SEO extras**: sitemap.xml, robots.txt, and JSON-LD product structured data aren't generated
  yet — straightforward to add once real URLs/products are final.
- **Analytics**: no analytics provider is wired in; event names to instrument are listed in the
  original brief (product viewed, add to bag, checkout started, etc.) but none are fired yet.

## 4. Exact assets to provide

For each real product, per the shape in `src/lib/types.ts`:

- Photography: front / back / side / detail / lifestyle (WebP or AVIF preferred)
- Optional: a `.glb`/`.gltf` 3D model (compressed — Draco/Meshopt) for `GarmentViewer`
- Copy: name, description, material, care instructions
- Commerce facts: price, currency, SKU, sizes, colors, inventory count, collection, category

Plus, site-wide:

- Campaign hero image or video for the homepage hero
- Brand/world imagery for "Enter the World," collection cards, and the About page
- A real wordmark/logo file if you want one beyond the type-based "ZARYASH" mark
- A favicon (`src/app/favicon.ico` currently has the Next.js default)

## 5. Exact asset locations

```text
public/
  products/
    <product-slug>/
      front.webp
      back.webp
      side.webp
      detail.webp
      lifestyle.webp
      model.glb
  images/
    campaign/        (hero image/video)
    world/            (Enter the World, collection imagery)
  models/             (any 3D models not tied to a single product)
  fonts/              (only if self-hosting fonts locally — see note below)
```

Then update `src/lib/products.ts`: change each `images` entry's `src` from `"placeholder:*"` to
the real path (e.g. `/products/obsidian-overshirt/front.webp`), and set `model3D` to the `.glb`
path where you have one. `ProductVisual` and `GarmentViewer` already check for real data and will
render it automatically — no other code changes needed.

## 6. Required environment variables

See `.env.example` (copy to `.env.local`). Nothing is required to run the site locally; each
variable unlocks one integration:

| Variable | Unlocks |
|---|---|
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Real checkout/payments |
| `CONTACT_EMAIL_PROVIDER_API_KEY` | Contact form delivery |
| `DATABASE_URL` | Real product/order/inventory storage |
| `AUTH_SECRET` | Real accounts / order history |
| `ANTHROPIC_API_KEY` | Optional LLM layer on top of the catalog-grounded AI stylist |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs / OpenGraph |

## 7. Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## 8. Deploy

This is a standard Next.js App Router project — it deploys to Vercel with zero config
(`vercel deploy`), or to any Node host / Docker image that runs `npm run build && npm run start`.
Set the environment variables from §6 in whatever hosting dashboard or secrets manager you use;
never commit `.env.local`.

## 9. External services required for full production readiness

- A payment provider (Stripe is assumed in the code's shape; swappable)
- A transactional email provider (Resend/Postmark/SES/etc.)
- A database (Postgres recommended) once you're off static catalog data
- An auth provider if you want real customer accounts
- Optionally, an LLM provider if you want the AI stylist to handle richer free-text queries (see
  `src/lib/stylist.ts` for how to add this without breaking the "never invent a product fact"
  guarantee)

## 10. Recommended next step

Replace `src/lib/products.ts` with real product data and photography for a handful of hero
SKUs first (the featured products already drive the homepage's "Beyond the Garment" moment and
the showroom's pedestals), then connect Stripe for checkout. Those two changes alone take the
site from "convincing demo" to "sellable." Real 3D models and a DB-backed catalog are the natural
follow-ups after that.

---

## Notes on font loading

`next/font/google` needs build-time network access to fetch font files at build time; this
development environment's egress policy blocks `fonts.googleapis.com`, so fonts are loaded via a
standard `<link>` tag in `src/app/layout.tsx` instead (see the comment in `globals.css`). If
you're building somewhere with normal internet access and want next/font's zero-layout-shift
self-hosting, swapping back is a small, isolated change.

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Three.js +
@react-three/fiber + @react-three/drei · Framer Motion · Zustand (cart state, persisted) · Zod
(API validation).
