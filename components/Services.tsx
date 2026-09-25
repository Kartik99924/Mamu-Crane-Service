'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

import { SERVICES } from '@/lib/services';
import { IMAGE_ASSETS } from '@/lib/image-assets';
import { ServiceCard } from '@/components/ServiceCard';
import { Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

const BACKDROP = IMAGE_ASSETS['crane-service-construction-site-pipli-kurukshetra'];

/**
 * Signature section. The construction scene behind the cards drifts upward at
 * roughly half the page's scroll speed while the cards rise over it one by one,
 * which separates the two planes and gives the section real depth.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.18, 1.12]);

  return (
    <section
      ref={ref}
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-ink py-20 sm:py-24 lg:py-32"
    >
      {/* Parallax backdrop */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src={BACKDROP.src}
          alt=""
          fill
          quality={70}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BACKDROP.blurDataURL}
          className="object-cover object-center"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/88" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Eyebrow>Our Services</Eyebrow>
            </motion.div>
            <motion.h2
              id="services-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl lg:text-[2.9rem]"
            >
              Crane services we provide
            </motion.h2>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-[1.02rem] leading-relaxed text-bone-dim"
            >
              Cranes and hydra cranes for construction, industrial and general lifting work across
              Pipli and Kurukshetra — hired by the hour, the day or the length of a project, always
              with an operator.
            </motion.p>
          </div>

          <ButtonLink href="/services" variant="ghost" className="shrink-0 px-0">
            View all services
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </ButtonLink>
        </div>

        {/* Cards rise over the moving backdrop, one after another */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5"
        >
          {SERVICES.map((service, i) => (
            <motion.li
              key={service.slug}
              variants={
                reduceMotion
                  ? { hidden: {}, visible: {} }
                  : {
                      hidden: { opacity: 0, y: 44 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className="flex"
            >
              <ServiceCard service={service} index={i} className="w-full" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
