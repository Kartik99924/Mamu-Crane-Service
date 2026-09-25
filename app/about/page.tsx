import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { ADDRESS, SERVICE_AREAS } from '@/lib/constants';
import { PROCESS_STEPS, WHY_US } from '@/lib/content';
import { IMAGE_ASSETS } from '@/lib/image-assets';
import { SERVICES } from '@/lib/services';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, schemaGraph } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ContactSection } from '@/components/ContactSection';
import { Eyebrow } from '@/components/ui/Section';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

const PORTRAIT = IMAGE_ASSETS['hydra-crane-on-hire-vertical-boom-kurukshetra'];
const DETAIL = IMAGE_ASSETS['construction-crew-at-crane-lifting-site-kurukshetra'];

export const metadata: Metadata = pageMetadata({
  title: 'About Mamu Crane Service, Pipli',
  description:
    'Mamu Crane Service is a crane service provider in Pipli, Kurukshetra, supplying cranes and hydra cranes with an operator to builders, industry and individuals.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={schemaGraph(breadcrumbSchema(TRAIL))} />

      <PageHero
        eyebrow="About Us"
        title={
          <>
            A crane service built around <span className="text-gradient-crane">local work</span>
          </>
        }
        lead="Mamu Crane Service is based in Pipli, Kurukshetra. We supply cranes and hydra cranes, with an operator, to the builders, businesses and individuals who need something moved."
        image="hydra-crane-on-rent-construction-site-kurukshetra"
        imageAlt="Hydra crane operated by Mamu Crane Service at a construction site in Kurukshetra"
        trail={TRAIL}
      />

      {/* Story */}
      <section aria-labelledby="story-heading" className="bg-charcoal py-20 sm:py-24 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <Reveal distance={16}>
              <Eyebrow>Who We Are</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="story-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                Straightforward lifting, done properly
              </h2>
            </Reveal>

            <RevealGroup className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-bone-dim">
              <RevealItem as="p">
                Mamu Crane Service provides crane services and crane rental from {ADDRESS.locality},{' '}
                {ADDRESS.city}. Our customers are builders and contractors working on sites around
                the district, factories and workshops moving machinery, transport operators loading
                and unloading vehicles, and individuals with a single heavy item to shift.
              </RevealItem>
              <RevealItem as="p">
                What those jobs have in common is that they are easier to get wrong than they look.
                A machine that cannot reach far enough, ground too soft to set up on, or a power line
                over the intended position will each stop a lift before it starts. So the work begins
                with questions rather than equipment: what is the load, how far does it have to go,
                and what is the site like?
              </RevealItem>
              <RevealItem as="p">
                Answer those properly and the lift itself becomes routine. The right crane arrives,
                sets up on firm ground, does the job and leaves. That is the outcome we aim for on
                every booking, whether it is an hour of work or a machine committed to a site for a
                week.
              </RevealItem>
              <RevealItem as="p">
                We work across {SERVICE_AREAS.slice(0, 5).join(', ')} and the rest of Kurukshetra
                district. Being based locally is a practical advantage rather than a slogan: less
                travel means faster response and less cost added before any lifting has happened.
              </RevealItem>
            </RevealGroup>

            <Reveal delay={0.16}>
              <div className="mt-10 rounded-sm border border-steel-light/70 bg-graphite/60 p-6">
                <h3 className="font-display text-[1.05rem] font-semibold text-bone">
                  What we supply
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {SERVICES.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-center gap-2 text-[0.9rem] text-bone-dim transition-colors hover:text-crane"
                      >
                        <span
                          aria-hidden="true"
                          className="h-px w-4 bg-steel-light transition-all duration-300 group-hover:w-6 group-hover:bg-crane"
                        />
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Imagery */}
          <div className="space-y-5">
            <Reveal direction="left" distance={32}>
              <div className="relative overflow-hidden rounded-sm border border-steel-light/60">
                <Parallax speed={36}>
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={PORTRAIT.src}
                      alt="Hydra crane with boom extended during lifting work in Kurukshetra"
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      placeholder="blur"
                      blurDataURL={PORTRAIT.blurDataURL}
                      className="scale-110 object-cover"
                    />
                  </div>
                </Parallax>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"
                />
              </div>
            </Reveal>

            <Reveal direction="left" distance={26} delay={0.12}>
              <div className="relative overflow-hidden rounded-sm border border-steel-light/60">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={DETAIL.src}
                    alt="Site crew in high-visibility vests standing clear during a crane lift in Kurukshetra"
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    placeholder="blur"
                    blurDataURL={DETAIL.blurDataURL}
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="border-l-2 border-crane bg-graphite/50 p-5">
                <p className="text-[0.92rem] leading-relaxed text-bone-dim">
                  Cranes are supplied operated. You do not need to arrange a driver, hold a licence
                  or provide lifting equipment beyond safe access to the load.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section
        aria-labelledby="how-heading"
        className="border-y border-steel/60 bg-ink py-20 sm:py-24"
      >
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal distance={16}>
              <Eyebrow>How We Work</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="how-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                From first call to finished lift
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-px overflow-hidden border border-steel-light/60 bg-steel-light/50 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <RevealItem key={step.step} className="bg-ink p-6 sm:p-7">
                <span className="font-display text-[2.2rem] font-bold leading-none text-steel-light">
                  {step.step}
                </span>
                <h3 className="mt-5 font-display text-[1.02rem] font-semibold text-bone">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-bone-dim">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-navy py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal distance={16}>
              <Eyebrow>What Matters To Us</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="values-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
              >
                How we try to operate
              </h2>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <RevealItem
                key={item.title}
                className="group rounded-sm border border-steel-light/70 bg-graphite/50 p-6 transition-colors duration-500 hover:border-crane/45"
              >
                <span className="flex size-11 items-center justify-center rounded-sm bg-crane/10 text-crane transition-colors duration-500 group-hover:bg-crane group-hover:text-ink">
                  <Icon name={item.icon as IconName} className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-bone">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.86rem] leading-relaxed text-bone-dim">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.14}>
            <Link
              href="/services"
              className="mt-10 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-crane transition-colors hover:text-crane-bright"
            >
              See the services we provide
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
