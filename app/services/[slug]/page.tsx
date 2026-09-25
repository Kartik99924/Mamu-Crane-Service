import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ClipboardList, Phone } from 'lucide-react';

import { SERVICES, getService } from '@/lib/services';
import { SERVICE_AREAS, phoneHref } from '@/lib/constants';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, schemaGraph, serviceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ServiceCard } from '@/components/ServiceCard';
import { Faq } from '@/components/Faq';
import { ContactSection } from '@/components/ContactSection';
import { Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/** Renders the four service URLs at build time. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: {
      url: `/images/${service.image}.webp`,
      width: 1200,
      height: 800,
      alt: service.imageAlt,
    },
  });
}

export default async function ServiceDetailPage({ params }: PageProps<'/services/[slug]'>) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={schemaGraph(
          breadcrumbSchema(trail),
          serviceSchema(service),
          faqSchema(service.faqs),
        )}
      />

      <PageHero
        eyebrow={service.title}
        title={service.heading}
        lead={service.excerpt}
        image={service.image}
        imageAlt={service.imageAlt}
        trail={trail}
      />

      {/* Overview + quick actions */}
      <section aria-labelledby="overview-heading" className="bg-charcoal py-18 sm:py-20 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <div>
            <h2 id="overview-heading" className="sr-only">
              Service overview
            </h2>
            <RevealGroup className="space-y-5">
              {service.intro.map((paragraph) => (
                <RevealItem
                  key={paragraph.slice(0, 40)}
                  as="p"
                  className="text-[1.02rem] leading-relaxed text-bone-dim"
                >
                  {paragraph}
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Practical detail */}
            <div className="mt-12 space-y-px overflow-hidden border border-steel-light/60 bg-steel-light/50">
              {service.details.map((detail) => (
                <Reveal key={detail.title} distance={16}>
                  <div className="bg-charcoal p-5 sm:p-6">
                    <h3 className="font-display text-[1.02rem] font-semibold text-bone">
                      {detail.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-bone-dim">{detail.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sticky quote panel */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="left" distance={26}>
              <div className="rounded-sm border border-steel-light/70 bg-graphite/80 p-6">
                <span className="hazard-stripe mb-4 block h-1 w-14" aria-hidden="true" />
                <h2 className="font-display text-lg font-semibold text-bone">
                  Check availability
                </h2>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-bone-dim">
                  Tell us the weight, the reach and the date. We will confirm the right machine and
                  what it will cost.
                </p>
                <div className="mt-6 grid gap-3">
                  <ButtonLink href="/contact" className="w-full">
                    Request a Quote
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </ButtonLink>
                  <ButtonLink href={phoneHref} variant="outline" className="w-full">
                    <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
                    Call Now
                  </ButtonLink>
                </div>

                <div className="mt-7 border-t border-steel-light/60 pt-5">
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    Service area
                  </h3>
                  <p className="mt-2.5 text-[0.82rem] leading-relaxed text-bone-dim">
                    {SERVICE_AREAS.join(', ')} and nearby areas of Kurukshetra district, Haryana.
                  </p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Applications */}
      <section
        aria-labelledby="applications-heading"
        className="border-y border-steel/60 bg-ink py-20 sm:py-24"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal distance={16}>
              <Eyebrow>Suitable Applications</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="applications-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                What this service is used for
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.applications.map((app) => (
              <RevealItem
                key={app.title}
                className="group rounded-sm border border-steel-light/70 bg-graphite/50 p-6 transition-colors duration-500 hover:border-crane/45"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-crane/40 text-crane">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.4} />
                </span>
                <h3 className="mt-4 font-display text-[1.05rem] font-semibold text-bone">
                  {app.title}
                </h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-bone-dim">{app.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* What we need from you */}
      <section aria-labelledby="requirements-heading" className="bg-navy py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal distance={16}>
              <Eyebrow>For an Accurate Quote</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="requirements-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                What we need from you
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-[1rem] leading-relaxed text-bone-dim">
                A quotation is only as good as the information behind it. These details let us price
                the job properly and send a machine that can actually do it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ButtonLink href="/contact" className="mt-8">
                Send these details
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal direction="left" distance={26} delay={0.1}>
            <ul className="divide-y divide-steel-light/60 overflow-hidden rounded-sm border border-steel-light/70 bg-graphite/60">
              {service.requirements.map((item, i) => (
                <li key={item} className="flex items-start gap-4 p-4 sm:p-5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm bg-crane/10 text-[0.7rem] font-bold text-crane">
                    {i + 1}
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-bone-dim">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-4 bg-ink/40 p-4 sm:p-5">
                <ClipboardList
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-crane"
                  strokeWidth={1.6}
                />
                <span className="text-[0.85rem] leading-relaxed text-muted">
                  Not sure about the weight? Describe the item and we will estimate it with you.
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section
        aria-labelledby="service-faq-heading"
        className="border-t border-steel/60 bg-charcoal py-20 sm:py-24"
      >
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal distance={16}>
              <Eyebrow>Questions</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="service-faq-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                {service.title} FAQs
              </h2>
            </Reveal>
          </div>
          <Faq faqs={service.faqs} headingId="service-faq-heading" />
        </div>
      </section>

      {/* Related services */}
      <section aria-labelledby="related-heading" className="bg-ink py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal distance={16}>
                <Eyebrow>Related Services</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="related-heading"
                  className="mt-5 font-display text-[1.75rem] font-semibold leading-tight text-bone sm:text-3xl"
                >
                  You may also need
                </h2>
              </Reveal>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-crane transition-colors hover:text-crane-bright"
            >
              All services
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug} className="flex">
                <ServiceCard service={item} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection defaultService={service.slug} />
    </>
  );
}
