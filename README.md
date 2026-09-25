# Mamu Crane Service

Website for a crane service provider based in Pipli, Kurukshetra, Haryana —
crane hire, hydra cranes on hire and crane rental across Kurukshetra district.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and
Lucide.

> **Before launching, work through [`REPLACE-ME.md`](./REPLACE-ME.md).** Phone
> number, email, address and domain are placeholders.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npx eslint .         # lint
```

Optional environment configuration — create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

## Project structure

```
app/
  layout.tsx              root metadata, fonts, site-wide JSON-LD, chrome
  page.tsx                homepage
  about/ contact/ gallery/
  services/
    page.tsx              services index
    [slug]/page.tsx       4 statically generated service pages
  api/contact/route.ts    enquiry endpoint (validation + rate limiting)
  privacy-policy/ terms/
  sitemap.ts robots.ts    generated from lib/ data
  not-found.tsx error.tsx loading.tsx

components/
  Header Hero About Services Process WhyChooseUs TrustSection
  Gallery ContactSection ContactForm MapEmbed Footer StickyMobileCTA
  motion/                 Reveal, Parallax, CraneLine, ScrollProgress
  ui/                     Button, Section, Logo, Icon, Breadcrumbs

lib/
  constants.ts            business info, NAP, navigation, service areas
  services.ts             service content (drives pages, cards, sitemap, schema)
  content.ts              gallery, FAQs, why-us, process, planning notes
  schema.ts               Schema.org JSON-LD builders
  seo.ts                  route metadata helper
  image-assets.ts         generated — dimensions + blur placeholders

scripts/
  prepare-images.mjs      derives the optimised image set from the originals
```

### Content lives in data, not JSX

Services, gallery items, FAQs, navigation and business details are plain
TypeScript objects in `lib/`. Adding a service means adding one object to
`SERVICES` in `lib/services.ts` — the services index, the detail page, the
footer, the sitemap and the `Service` structured data all pick it up with no
further changes.

## Images

The three original photographs are the site's visual identity. The optimised
set in `public/images/` is generated from them:

```bash
node scripts/prepare-images.mjs
```

This produces WebP derivatives (including authentic crops — no stretching or
distortion of equipment) plus `lib/image-assets.ts`, which carries the intrinsic
dimensions and a base64 blur placeholder for each file. Those dimensions are why
the site measures **CLS 0**: every image reserves its space before it loads.

Source PNGs total ~6 MB; the delivered WebP set is ~685 KB.

To change or add photographs, update the `jobs` array in the script, point
`SRC` at the folder holding the originals, and re-run it.

## SEO

- Per-route `title`, `description`, canonical URL, Open Graph and Twitter cards
  via `pageMetadata()` in `lib/seo.ts`
- `sitemap.xml` and `robots.txt` generated from the same data as the pages
- JSON-LD: `Organization`, `LocalBusiness` and `WebSite` site-wide, plus
  `BreadcrumbList`, `Service`, `FAQPage` and `ItemList` per page
- One `<h1>` per page, no skipped heading levels, descriptive alt text on every
  image, breadcrumbs on every inner page

**Structured data excludes anything flagged as a placeholder** in
`lib/constants.ts`. No invented phone number, email, opening hours, rating or
price ever reaches a search engine. See `lib/schema.ts`.

## Performance

Measured against the production build:

| | Desktop | Mobile |
|---|---|---|
| LCP | ~0.4 s | ~0.15 s |
| CLS | 0 | 0 |
| Transferred | ~449 KB | ~273 KB |

Notes on how that is kept:

- The hero headline animates on **transform only, never opacity** — it is the
  LCP element, and a fade from `opacity: 0` delays LCP by the animation's length.
- All scroll effects animate `transform`/`opacity` so they stay on the
  compositor. No scroll handler writes layout-triggering properties.
- The Google Maps embed is a **click-to-load facade**. The iframe and its
  third-party script only load if a visitor asks for the map.
- Every image is `next/image` with explicit dimensions, responsive `sizes`, a
  blur placeholder, and `priority` only on the hero.

## Accessibility

- `prefers-reduced-motion` is respected in JavaScript (`useReducedMotion` gates
  every parallax and reveal) as well as in CSS. With it enabled, no content is
  left at zero opacity — verified.
- Keyboard: skip link, visible focus rings, Escape closes the mobile drawer and
  the lightbox, arrow keys navigate the lightbox, and focus returns to the
  thumbnail that opened it.
- FAQs use native `<details>`/`<summary>`, so they work without JavaScript and
  their answers are in the initial HTML for crawlers.
- Form fields have associated labels, `aria-invalid`, and errors linked via
  `aria-describedby`.

## Security

- The contact endpoint validates and sanitises **server-side**; client-side
  checks are only a convenience.
- Honeypot field plus a per-IP rate limit (5 requests / 10 minutes). The limiter
  is in-memory — move it to a shared store (Redis/Upstash) if you deploy across
  more than one instance.
- No secrets in client code. Any delivery integration must read its key from a
  server-side environment variable.
