import type { Metadata } from 'next';

import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, schemaGraph } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { Gallery } from '@/components/Gallery';
import { ContactSection } from '@/components/ContactSection';

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Gallery: Crane Work in Kurukshetra',
  description:
    'Photographs of Mamu Crane Service equipment and lifting work in Pipli, Kurukshetra and nearby areas of Haryana.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={schemaGraph(breadcrumbSchema(TRAIL))} />

      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Our cranes <span className="text-gradient-crane">at work</span>
          </>
        }
        lead="Equipment, crews and lifts from sites around Kurukshetra. Select any image to view it larger."
        image="mobile-crane-boom-against-city-skyline-haryana"
        imageAlt="Mobile crane boom raised against the skyline at a construction site in Haryana"
        trail={TRAIL}
      />

      <section aria-labelledby="gallery-grid-heading" className="bg-charcoal py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <h2 id="gallery-grid-heading" className="sr-only">
            Photo gallery
          </h2>
          <Gallery />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
