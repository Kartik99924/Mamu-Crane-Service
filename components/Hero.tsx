'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, MapPin, MouseIcon } from 'lucide-react';

import { IMAGE_ASSETS } from '@/lib/image-assets';
import { HERO_FEATURES } from '@/lib/content';
import { phoneHref } from '@/lib/constants';
import { useIsCompact } from '@/lib/use-media-query';
import { ButtonLink } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';

const HERO_IMAGE = IMAGE_ASSETS['mamu-crane-service-hydra-crane-lifting-concrete-slab-kurukshetra'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Phones get half the drift: the same travel is a far larger share of the screen.
  const compact = useIsCompact();

  // Cinematic drift: the photograph moves and scales slightly slower than the
  // page, and the copy lifts away as the next section arrives.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', compact ? '8%' : '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, compact ? 1.1 : 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const motionStyle = reduceMotion ? undefined : { y: imageY, scale: imageScale };
  const copyStyle = reduceMotion ? undefined : { y: copyY, opacity: copyOpacity };

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-24"
    >
      {/* Photograph */}
      <motion.div style={motionStyle} className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src={HERO_IMAGE.src}
          alt="Mamu Crane Service hydra crane lifting a precast concrete slab at a construction site in Kurukshetra at dusk"
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO_IMAGE.blurDataURL}
          className="object-cover object-[76%_center] sm:object-center"
        />
      </motion.div>

      {/* Depth layers: darken the left for legibility, ground the bottom edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/78 to-ink/20 sm:via-ink/70 sm:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/80 to-transparent" />

      {/* Copy */}
      <div className="container-page relative z-10 flex flex-1 items-center">
        <motion.div style={copyStyle} className="max-w-2xl py-16 will-change-transform">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-crane" />
            <MapPin aria-hidden="true" className="size-3.5" strokeWidth={2} />
            Crane Service in Kurukshetra
          </motion.p>

          <h1
            id="hero-heading"
            className="mt-5 font-display text-[clamp(2rem,8.5vw+0.25rem,2.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-bone sm:mt-6 sm:text-6xl sm:leading-[0.98] lg:text-[4.6rem]"
          >
            {['Safe Lifts.', 'Strong Support.'].map((line, i) => (
              <motion.span
                key={line}
                /* Transform only, never opacity: the headline is the LCP element,
                   and a fade from 0 would delay it by the length of the animation. */
                initial={reduceMotion ? false : { y: 24 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {/* Trailing space keeps the accessible name readable, since the
                    line breaks here are purely visual. */}
                {line}{' '}
              </motion.span>
            ))}
            <motion.span
              initial={reduceMotion ? false : { y: 24 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gradient-crane"
            >
              Every Time.
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-bone-dim sm:mt-7 sm:text-[1.08rem]"
          >
            Mamu Crane Service provides reliable, professional crane services in Pipli, Kurukshetra
            and nearby areas. Your trusted partner for lifting, shifting and heavy equipment
            requirements.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center sm:mt-9"
          >
            <ButtonLink href="/contact" size="lg-compact" className="w-full xs:w-auto">
              Get a Quote
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg-compact" className="w-full xs:w-auto">
              Explore Services
            </ButtonLink>
            {/* The header carries a Call button on small screens, so this
                secondary prompt only earns its place from sm up. */}
            <a
              href={phoneHref}
              className="hidden text-sm text-muted underline-offset-4 transition-colors hover:text-crane hover:underline sm:ml-2 sm:inline"
            >
              or call us directly
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="group absolute bottom-[10.5rem] right-5 z-10 hidden items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-crane sm:flex xl:right-12"
      >
        <MouseIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
        Scroll to explore
        <span aria-hidden="true" className="relative h-px w-10 overflow-hidden bg-steel-light">
          <motion.span
            animate={reduceMotion ? {} : { x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-0 w-1/2 bg-crane"
          />
        </span>
      </motion.a>

      {/* Floating feature strip */}
      <div className="container-page relative z-10 pb-8 pt-4 sm:pb-14 sm:pt-0">
        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-steel-light/70 bg-steel-light/60 backdrop-blur-md lg:grid-cols-4"
        >
          {HERO_FEATURES.map((feature) => (
            <li
              key={feature.title}
              /* Stacked and centred on phones; the icon moves beside the text
                 once there is width for it. */
              className="group flex flex-col items-center gap-2.5 bg-ink/75 px-3 py-4 text-center transition-colors duration-300 hover:bg-graphite/90 sm:flex-row sm:gap-3.5 sm:px-6 sm:py-5 sm:text-left"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-crane/10 text-crane transition-colors duration-300 group-hover:bg-crane group-hover:text-ink">
                <Icon name={feature.icon as IconName} className="size-[1.15rem]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.82rem] font-semibold leading-tight text-bone sm:text-[0.9rem]">
                  {feature.title}
                </span>
                <span className="mt-0.5 block text-[0.72rem] leading-snug text-muted sm:text-[0.78rem]">
                  {feature.body}
                </span>
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
