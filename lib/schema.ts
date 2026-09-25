/**
 * Schema.org JSON-LD builders.
 *
 * Rule enforced throughout this file: a value flagged as a placeholder in
 * lib/constants.ts is NEVER emitted into structured data. Search engines must
 * not be handed invented contact details, ratings, hours or prices. When the
 * real values are filled in and the flags removed, the fields appear
 * automatically with no further changes here.
 */
import { ADDRESS, BUSINESS, CONTACT, SERVICE_AREAS, SITE_URL, SOCIAL_LINKS } from './constants';
import type { Service, ServiceFaq } from './services';

const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Verified-only postal address. Empty parts are omitted entirely. */
function postalAddress() {
  return {
    '@type': 'PostalAddress',
    ...(ADDRESS.street && !ADDRESS.streetIsPlaceholder ? { streetAddress: ADDRESS.street } : {}),
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    ...(ADDRESS.postalCode && !ADDRESS.postalCodeIsPlaceholder
      ? { postalCode: ADDRESS.postalCode }
      : {}),
    addressCountry: ADDRESS.countryCode,
  };
}

function verifiedContactFields() {
  return {
    ...(CONTACT.phone.isPlaceholder ? {} : { telephone: CONTACT.phone.raw }),
    ...(CONTACT.email.isPlaceholder ? {} : { email: CONTACT.email.value }),
    ...(CONTACT.hours.isPlaceholder || !CONTACT.hours.value
      ? {}
      : { openingHours: CONTACT.hours.value }),
    ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS.map((s) => s.href) } : {}),
  };
}

/**
 * LocalBusiness describing the crane hire operation.
 * No aggregateRating, review, priceRange or opening hours are emitted, because
 * none have been supplied.
 */
export function localBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: BUSINESS.name,
    description: BUSINESS.shortDescription,
    url: SITE_URL,
    image: abs(
      '/images/mamu-crane-service-hydra-crane-lifting-concrete-slab-kurukshetra.webp',
    ),
    address: postalAddress(),
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'Place',
      name: `${area}, ${ADDRESS.region}`,
    })),
    knowsAbout: [
      'Crane service',
      'Crane rental',
      'Hydra crane hire',
      'Heavy lifting',
      'Construction equipment lifting',
    ],
    ...verifiedContactFields(),
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    slogan: BUSINESS.tagline,
    logo: {
      '@type': 'ImageObject',
      url: abs('/icon.svg'),
    },
    ...verifiedContactFields(),
  };
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: 'en-IN',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    '@type': 'Service',
    '@id': abs(`/services/${service.slug}#service`),
    name: service.heading,
    serviceType: service.title,
    description: service.metaDescription,
    url: abs(`/services/${service.slug}`),
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'Place',
      name: `${area}, ${ADDRESS.region}`,
    })),
    audience: {
      '@type': 'Audience',
      audienceType: 'Builders, contractors, industrial sites and individual customers',
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function faqSchema(faqs: readonly ServiceFaq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: abs(item.url),
    })),
  };
}

/** Wraps any number of schema nodes into a single @graph document. */
export function schemaGraph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
