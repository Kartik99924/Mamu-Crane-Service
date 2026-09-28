import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { IMAGE_ASSETS } from '@/lib/image-assets';
import { SERVICE_AREAS } from '@/lib/constants';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';
import { Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

const PRIMARY = IMAGE_ASSETS['hydra-crane-on-rent-construction-site-kurukshetra'];
const SECONDARY = IMAGE_ASSETS['crane-hook-block-lifting-precast-concrete-slab'];

/** Qualitative capability notes. No invented figures — nothing here is a claim we cannot stand behind. */
const CAPABILITIES = [
  { label: 'Based in', value: 'Pipli', note: 'Kurukshetra, Haryana' },
  { label: 'Hire basis', value: 'Hourly · Daily', note: 'Or across a project' },
  { label: 'Supplied', value: 'Operated', note: 'Operator included' },
];

/**
 * Reads top-to-bottom on phones (intro, image, body) and as two columns from
 * `lg`, where the imagery spans both rows on the left. The three blocks are
 * direct grid children with explicit `lg:` coordinates, so the desktop layout
 * is unchanged and nothing is rendered twice for the two arrangements.
 */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-16 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 -z-0 size-[28rem] rounded-full bg-crane/[0.04] blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-20 lg:gap-y-0">
          {/* Intro */}
          <div className="lg:col-start-2 lg:row-start-1">
            <Reveal distance={18}>
              <Eyebrow>About Mamu Crane Service</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl lg:text-[2.9rem]">
                Your local crane service partner in{' '}
                <span className="text-gradient-crane">Kurukshetra</span>
              </h2>
            </Reveal>
          </div>

          {/* Layered imagery */}
          <div className="relative lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center">
            {/* Vertical section label */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 top-6 hidden select-none font-display text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-bone/12 [writing-mode:vertical-rl] lg:block"
            >
              About Us
            </span>

            <Reveal direction="right" distance={40} compact={{ direction: 'up', distance: 24 }}>
              <div className="relative ml-0 lg:ml-12">
                <Parallax speed={40} className="overflow-hidden rounded-sm">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={PRIMARY.src}
                      alt="Mamu Crane Service hydra crane on rent working at a construction site in Kurukshetra, Haryana"
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      placeholder="blur"
                      blurDataURL={PRIMARY.blurDataURL}
                      className="scale-110 object-cover"
                    />
                  </div>
                </Parallax>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent"
                />
                {/* corner rule */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 h-12 w-12 border-b-2 border-r-2 border-crane/70 sm:-bottom-3 sm:-right-3 sm:h-20 sm:w-20"
                />
              </div>
            </Reveal>

            {/* Offset overlapping card. Smaller on phones so the pair reads as
                one composition rather than two stacked photographs. */}
            <Reveal direction="up" distance={36} delay={0.16} compact={{ distance: 20 }}>
              <div className="relative -mt-14 ml-3 w-[46%] max-w-[17rem] overflow-hidden rounded-sm border border-steel-light/80 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] sm:-mt-20 sm:ml-8 sm:w-[58%] lg:-mt-24 lg:ml-0">
                <div className="relative aspect-[5/6] w-full">
                  <Image
                    src={SECONDARY.src}
                    alt="Crane hook block and slings carrying a precast concrete slab during a lift"
                    fill
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    placeholder="blur"
                    blurDataURL={SECONDARY.blurDataURL}
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Floating capability chip */}
            <Reveal delay={0.3} distance={20}>
              <div className="absolute bottom-6 right-0 hidden max-w-[13rem] border border-steel-light/80 bg-ink/90 p-4 backdrop-blur-sm sm:block lg:right-4">
                <span className="hazard-stripe mb-3 block h-1 w-12" aria-hidden="true" />
                <p className="text-[0.8rem] leading-relaxed text-bone-dim">
                  Cranes and hydra cranes supplied with an experienced operator.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Body */}
          <div className="lg:col-start-2 lg:row-start-2 lg:mt-6">
            <RevealGroup className="space-y-5 text-[1rem] leading-relaxed text-bone-dim" delay={0.1}>
              <RevealItem as="p">
                Mamu Crane Service is a crane service provider based in Pipli, Kurukshetra. We work
                with builders, contractors, factories, workshops and individual customers who need
                something lifted, shifted or placed where it cannot be moved by hand.
              </RevealItem>
              <RevealItem as="p">
                Most of what we do is straightforward and local: a machine arrives with its
                operator, sets up on firm ground, carries out the lift and moves on. What makes that
                simple is the work done beforehand — understanding the weight, the reach and the site
                before anything is booked, so the right crane turns up the first time.
              </RevealItem>
              <RevealItem as="p">
                We serve {SERVICE_AREAS.slice(0, 4).join(', ')} and the surrounding parts of
                Kurukshetra district. If you are unsure which machine a job needs, describe the load
                and we will tell you.
              </RevealItem>
            </RevealGroup>

            {/* Capability cards */}
            <RevealGroup
              className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-steel-light/70 bg-steel-light/60 sm:mt-10"
              delay={0.14}
            >
              {CAPABILITIES.map((item) => (
                <RevealItem key={item.label} className="bg-graphite/80 px-2.5 py-4 xs:px-3 sm:px-5 sm:py-5">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[0.62rem] sm:tracking-[0.18em]">
                    {item.label}
                  </span>
                  <span className="mt-2 block font-display text-[0.9rem] font-bold leading-tight text-crane xs:text-[0.95rem] sm:text-xl">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-[0.7rem] leading-snug text-bone-dim sm:text-[0.72rem]">
                    {item.note}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
                <ButtonLink href="/about" variant="outline">
                  More about us
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  Request a quote
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
