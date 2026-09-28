import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { GENERAL_FAQS } from '@/lib/content';
import { SERVICES } from '@/lib/services';
import { faqSchema, itemListSchema, schemaGraph } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { TrustSection } from '@/components/TrustSection';
import { Gallery } from '@/components/Gallery';
import { Faq } from '@/components/Faq';
import { ContactSection } from '@/components/ContactSection';
import { Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={schemaGraph(
          faqSchema(GENERAL_FAQS),
          itemListSchema(
            SERVICES.map((service) => ({
              name: service.heading,
              url: `/services/${service.slug}`,
            })),
          ),
        )}
      />

      <Hero />
      <About />
      <Services />
      {/* <Process /> */}
      {/* <WhyChooseUs /> */}
     

      {/* Gallery preview */}
      <section aria-labelledby="gallery-heading" className="bg-ink py-20 sm:py-24 lg:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Reveal distance={16}>
                <Eyebrow>Our Work</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="gallery-heading"
                  className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl lg:text-[2.9rem]"
                >
                  Cranes, crews and lifts
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-bone-dim">
                  Photographs from our equipment and lifting work around Kurukshetra.
                </p>
              </Reveal>
            </div>
            <Link
              href="/gallery"
              className="group flex shrink-0 items-center gap-2 text-[0.85rem] font-medium text-bone transition-colors hover:text-crane sm:text-[0.95rem]"
            >
              View full gallery
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>

          <div className="mt-12">
            <Gallery limit={6} showFilters={false} />
          </div>
        </div>
      </section>

 <TrustSection />

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-steel/60 bg-charcoal py-20 sm:py-24"
      >
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal distance={16}>
              <Eyebrow>Questions</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="faq-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                Common questions
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-bone-dim">
                If your question is not answered here, call us — most things about a lift are quicker
                to sort out in a two-minute conversation.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-crane transition-colors hover:text-crane-bright"
              >
                Ask us directly
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </Link>
            </Reveal>
          </div>

          <Faq faqs={GENERAL_FAQS} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
