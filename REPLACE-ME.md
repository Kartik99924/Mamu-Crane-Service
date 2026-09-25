# Before this site goes live

Everything below is scaffolding, not real business data. The site is built so
that **all of it lives in one or two files** — you should not need to hunt
through components.

Two things are true of every placeholder here:

1. It renders in the UI so the layout is complete.
2. It is **deliberately excluded from the Schema.org structured data**, so
   search engines are never given invented information. Once you fill in the
   real value and flip its `isPlaceholder` flag to `false`, it starts appearing
   in the structured data automatically.

---

## 1. Contact details — `lib/constants.ts`

| Field | Current placeholder | Where it shows |
|---|---|---|
| `CONTACT.phone` | `+91 00000 00000` | Header, footer, contact page, mobile action bar, every `tel:` link |
| `CONTACT.whatsapp` | `910000000000` | WhatsApp buttons (`wa.me` links) |
| `CONTACT.email` | `contact@example.com` | Footer, contact section, privacy page |
| `CONTACT.mapsUrl` | Generic Maps search for Pipli | "Directions" button |
| `CONTACT.hours` | empty | Not displayed until set |

After editing each one, set `isPlaceholder: false`.

```ts
phone: {
  raw: '+919812345678',      // digits and a leading + only, used in tel: links
  display: '+91 98123 45678',
  isPlaceholder: false,       // ← flip this
},
```

## 2. Address — `lib/constants.ts` → `ADDRESS`

`street` and `postalCode` are intentionally empty so that nothing is invented.
Fill in the real street/landmark line and PIN code, then set
`streetIsPlaceholder` and `postalCodeIsPlaceholder` to `false`.

**The NAP (Name, Address, Phone) must match your Google Business Profile
character for character.** Inconsistent NAP is one of the most common causes of
weak local ranking.

## 3. Domain — `.env.local`

```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

This drives canonical URLs, `sitemap.xml`, `robots.txt` and every absolute URL
in the structured data. Until it is set, the site falls back to
`https://www.mamucraneservice.com`.

## 4. Social profiles — `lib/constants.ts` → `SOCIAL_LINKS`

Currently an empty array, so no social icons render and no `sameAs` property is
emitted. Add real profile URLs only:

```ts
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com/…', icon: 'facebook' },
];
```

## 5. Where enquiries are delivered — `app/api/contact/route.ts`

The form validates and rate-limits correctly, but currently only logs the
enquiry server-side. Connect your preferred channel (email, WhatsApp Business
API, or a CRM webhook) at the marked delivery step, reading credentials from
server-side environment variables. **Never put an API key in a
`NEXT_PUBLIC_*` variable** — those are exposed to the browser.

## 6. Service areas — `lib/constants.ts` → `SERVICE_AREAS`

Currently lists Pipli, Kurukshetra, Thanesar, Shahabad Markanda, Ladwa, Babain,
Pehowa and Ismailabad. Remove any you do not actually cover. Listing areas you
do not serve is a local-SEO liability, not an asset.

---

## Deliberately NOT included

These were left out because no real data was supplied, and fabricating them
would breach Google's spam policies and mislead customers:

- **Customer testimonials and reviews.** The "Trusted by businesses and
  individuals" section describes real categories of work instead. When you have
  genuine, attributable reviews, they can replace that grid — see the comment at
  the top of `components/TrustSection.tsx`.
- **Statistics** (years in business, projects completed, customers served,
  fleet size). The About section uses qualitative capability cards instead.
- **Star ratings / `aggregateRating`.** Never add this to structured data unless
  the reviews genuinely exist and are shown on the page; it is a manual-action
  risk.
- **Certifications, awards, client names, opening hours.**

If you supply any of these, they can be added to the existing UI structure
without redesigning anything.
