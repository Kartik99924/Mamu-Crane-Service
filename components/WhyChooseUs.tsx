import Image from 'next/image';

import { WHY_US } from '@/lib/content';
import { IMAGE_ASSETS } from '@/lib/image-assets';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

const IMAGE = IMAGE_ASSETS['hydra-crane-boom-and-hook-close-up-kurukshetra'];
const DETAIL = IMAGE_ASSETS['hydra-crane-operator-cabin-haryana'];

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="relative overflow-hidden bg-navy py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-50" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Sticky visual column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="right" distance={36}>
              <div className="relative overflow-hidden rounded-sm">
                <div className="relative aspect-[4/3] w-full lg:aspect-[3/4]">
                  <Image
                    src={IMAGE.src}
                    alt="Hydra crane boom and hook block ready for a lift at a site in Kurukshetra"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    placeholder="blur"
                    blurDataURL={IMAGE.blurDataURL}
                    className="object-cover"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent"
                />

                {/* Floating panel over the image */}
                <div className="absolute inset-x-4 bottom-4 border border-steel-light/70 bg-ink/88 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                  <span className="hazard-stripe mb-3 block h-1 w-14" aria-hidden="true" />
                  <p className="font-display text-[0.95rem] font-semibold text-bone">
                    Every lift is planned before it starts
                  </p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-bone-dim">
                    Weight, radius, ground conditions and overhead clearance are confirmed first.
                    That is what keeps a lift routine.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Small offset detail image */}
            <Reveal delay={0.2} distance={26}>
              <div className="relative mt-4 hidden overflow-hidden rounded-sm border border-steel-light/70 lg:block">
                <div className="relative aspect-[16/7] w-full">
                  <Image
                    src={DETAIL.src}
                    alt="Operator at the controls inside the cabin of a hydra crane in Haryana"
                    fill
                    sizes="42vw"
                    placeholder="blur"
                    blurDataURL={DETAIL.blurDataURL}
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Reasons */}
          <div>
            <Reveal distance={18}>
              <Eyebrow>Why Choose Us</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="why-us-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl lg:text-[2.9rem]"
              >
                We make lifting look <span className="text-gradient-crane">straightforward</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-bone-dim">
                A lift that goes smoothly rarely looks dramatic. It looks like the right machine
                arriving on time, setting up without fuss and doing the job. These are the things we
                focus on to make that the normal outcome.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-sm border border-steel-light/60 bg-steel-light/50 sm:grid-cols-2">
              {WHY_US.map((item) => (
                <RevealItem
                  key={item.title}
                  className="group bg-navy/90 p-5 transition-colors duration-500 hover:bg-graphite/80 sm:p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-sm bg-crane/10 text-crane transition-[background-color,color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:bg-crane group-hover:text-ink">
                    <Icon name={item.icon as IconName} className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-bone-dim">{item.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/services">Explore our services</ButtonLink>
                <ButtonLink href="/contact" variant="outline">
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
