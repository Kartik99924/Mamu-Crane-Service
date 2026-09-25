import type { Metadata } from 'next';
import { BUSINESS, SITE_URL } from './constants';

export const OG_IMAGE = {
  url: '/images/mamu-crane-service-hydra-crane-lifting-concrete-slab-kurukshetra.webp',
  width: 1672,
  height: 941,
  alt: 'Mamu Crane Service hydra crane lifting a concrete slab at a construction site in Kurukshetra',
};

type PageSeoInput = {
  title: string;
  description: string;
  /** Path beginning with a slash, e.g. "/services". */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  /** Set for utility pages that should stay out of the index. */
  noIndex?: boolean;
};

/**
 * Builds route-level metadata with a canonical URL, Open Graph and Twitter cards.
 * The title template in app/layout.tsx appends the business name.
 */
export function pageMetadata({ title, description, path, image, noIndex }: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const img = image ?? OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: BUSINESS.name,
      locale: 'en_IN',
      url,
      title: `${title} | ${BUSINESS.name}`,
      description,
      images: [{ url: img.url, width: img.width, height: img.height, alt: img.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BUSINESS.name}`,
      description,
      images: [img.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
