import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SERVICES } from '@/lib/services';
import { PLANNING_NOTES } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, itemListSchema, schemaGraph, serviceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ServiceCard } from '@/components/ServiceCard';
import { ContactSection } from '@/components/ContactSection';
import { Eyebrow } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Crane Services & Crane Rental in Kurukshetra',
  description:
    'Crane services, crane rental and hydra cranes on hire in Pipli and Kurukshetra. Hourly, daily and project-length hire with an operator included.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={schemaGraph(
          breadcrumbSchema(TRAIL),
          itemListSchema(
            SERVICES.map((s) => ({ name: s.heading, url: `/services/${s.slug}` })),
          ),
          ...SERVICES.map(serviceSchema),
        )}
      />

      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Crane services across <span className="text-gradient-crane">Kurukshetra</span>
          </>
        }
        lead="Cranes and hydra cranes for construction, industrial and general lifting work. Every machine is supplied with an experienced operator, and hire runs by the hour, the day or across a project."
        image="crane-service-construction-site-pipli-kurukshetra"
        imageAlt="Construction site in Pipli, Kurukshetra served by Mamu Crane Service"
        trail={TRAIL}
      />

      {/* Service list */}
      <section aria-labelledby="services-list-heading" className="bg-charcoal py-18 sm:py-20 lg:py-24">
        <div className="container-page">
          <h2 id="services-list-heading" className="sr-only">
            Services we provide
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {SERVICES.map((service, i) => (
              <li key={service.slug} className="flex">
                <ServiceCard service={service} index={i} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed descriptions — gives the index page substance of its own */}
      <section
        aria-labelledby="services-detail-heading"
        className="border-y border-steel/60 bg-ink py-20 sm:py-24"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal distance={16}>
              <Eyebrow>In Detail</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="services-detail-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                What each service covers
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 space-y-px overflow-hidden border border-steel-light/60 bg-steel-light/50">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i * 0.06, 0.24)} distance={18}>
                <article className="group bg-ink p-6 transition-colors duration-500 hover:bg-graphite/60 sm:p-8">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
                    <div>
                      <span className="font-display text-[0.7rem] font-semibold tracking-[0.2em] text-crane">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-3 font-display text-[1.3rem] font-semibold leading-snug text-bone sm:text-2xl">
                        <Link
                          href={`/services/${service.slug}`}
                          className="transition-colors hover:text-crane"
                        >
                          {service.heading}
                        </Link>
                      </h3>
                    </div>
                    <div>
                      <p className="text-[0.95rem] leading-relaxed text-bone-dim">
                        {service.intro[0]}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {service.applications.slice(0, 3).map((app) => (
                          <li
                            key={app.title}
                            className="rounded-sm border border-steel-light px-3 py-1.5 text-[0.75rem] text-muted"
                          >
                            {app.title}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${service.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-crane transition-colors hover:text-crane-bright"
                      >
                        Read more about {service.title}
                        <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Planning guidance */}
      <section aria-labelledby="planning-heading" className="bg-navy py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal distance={16}>
              <Eyebrow>Before You Book</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="planning-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                Planning a lift: four things worth checking
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-bone-dim">
                These are the details that most often decide whether a job runs smoothly or stalls
                on arrival. None of them take long to check.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
            {PLANNING_NOTES.map((note) => (
              <RevealItem
                key={note.title}
                className="rounded-sm border border-steel-light/70 bg-graphite/60 p-6"
              >
                <h3 className="font-display text-[1.05rem] font-semibold text-bone">{note.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-bone-dim">{note.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
