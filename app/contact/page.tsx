import type { Metadata } from 'next';

import { GENERAL_FAQS } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, schemaGraph } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ContactSection } from '@/components/ContactSection';
import { Faq } from '@/components/Faq';
import { Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Contact & Crane Hire Quotation',
  description:
    'Contact Mamu Crane Service in Pipli, Kurukshetra for crane hire availability and a quotation. Call, message on WhatsApp or send an enquiry.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schemaGraph(breadcrumbSchema(TRAIL), faqSchema(GENERAL_FAQS))} />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us about <span className="text-gradient-crane">your lift</span>
          </>
        }
        lead="Call for anything urgent. For everything else, send the details and we will come back with availability and a price."
        image="crane-hook-block-lifting-precast-concrete-slab"
        imageAlt="Crane hook block and slings lifting a precast concrete slab"
        trail={TRAIL}
      />

      <ContactSection headingLevel="h2" />

      <section
        aria-labelledby="contact-faq-heading"
        className="border-t border-steel/60 bg-ink py-20 sm:py-24"
      >
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal distance={16}>
              <Eyebrow>Before You Call</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="contact-faq-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                Frequently asked questions
              </h2>
            </Reveal>
          </div>
          <Faq faqs={GENERAL_FAQS} headingId="contact-faq-heading" />
        </div>
      </section>
    </>
  );
}
