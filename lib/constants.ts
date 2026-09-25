/**
 * Single source of truth for business information, navigation, services and content.
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDER VALUES                                                       │
 * │  Anything marked `isPlaceholder: true` is NOT real business data. It is   │
 * │  scaffolding so the UI is complete. Replace it in this file (and only     │
 * │  this file) before going live. See REPLACE-ME.md.                         │
 * │  Placeholder values are deliberately EXCLUDED from JSON-LD structured     │
 * │  data so search engines are never given invented information.             │
 * └───────────────────────────────────────────────────────────────────────────┘
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://www.mamucraneservice.com';

/** The production domain is a placeholder until the real one is confirmed. */
export const SITE_URL_IS_PLACEHOLDER = !process.env.NEXT_PUBLIC_SITE_URL;

export const BUSINESS = {
  name: 'Mamu Crane Service',
  legalName: 'Mamu Crane Service',
  tagline: 'Lifting Your Needs',
  shortDescription:
    'Crane service provider offering cranes and hydra cranes on rent in Pipli, Kurukshetra and nearby areas of Haryana.',
} as const;

/** Phone / email / maps link are placeholders — replace before launch. */
export const CONTACT = {
  phone: {
    /** Used in tel: links. Digits and a leading + only. */
    raw: '+910000000000',
    display: '+91 00000 00000',
    isPlaceholder: true,
  },
  whatsapp: {
    /** Used in wa.me links. Digits only, country code first, no +. */
    raw: '910000000000',
    display: '+91 00000 00000',
    isPlaceholder: true,
  },
  email: {
    value: 'contact@example.com',
    isPlaceholder: true,
  },
  /** Paste the "Share > Embed a map" or place URL from the Google Business Profile. */
  mapsUrl: {
    value: 'https://www.google.com/maps/search/?api=1&query=Pipli%2C+Kurukshetra%2C+Haryana',
    isPlaceholder: true,
  },
  hours: {
    /** e.g. 'Mo-Su 08:00-20:00'. Left empty so no opening hours are invented. */
    value: '',
    display: 'Please call to confirm availability',
    isPlaceholder: true,
  },
} as const;

export const ADDRESS = {
  /** Street / landmark line — intentionally empty until supplied. */
  street: '',
  streetIsPlaceholder: true,
  locality: 'Pipli',
  city: 'Kurukshetra',
  region: 'Haryana',
  /** PIN code intentionally empty until confirmed. */
  postalCode: '',
  postalCodeIsPlaceholder: true,
  country: 'India',
  countryCode: 'IN',
  /** Display string used across the site. NAP must stay identical everywhere. */
  get display() {
    return 'Pipli, Kurukshetra, Haryana, India';
  },
} as const;

/** Social profiles — add real URLs only. Empty array means no sameAs in schema. */
export const SOCIAL_LINKS: { label: string; href: string; icon: 'facebook' | 'instagram' | 'whatsapp' }[] = [];

export const SERVICE_AREAS = [
  'Pipli',
  'Kurukshetra',
  'Thanesar',
  'Shahabad Markanda',
  'Ladwa',
  'Babain',
  'Pehowa',
  'Ismailabad',
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Contact', href: '/contact' },
] as const;

export const phoneHref = `tel:${CONTACT.phone.raw}`;
export const whatsappHref = `https://wa.me/${CONTACT.whatsapp.raw}?text=${encodeURIComponent(
  'Hello Mamu Crane Service, I would like to enquire about a crane on rent.',
)}`;
