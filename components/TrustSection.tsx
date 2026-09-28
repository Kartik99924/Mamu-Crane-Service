'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Check } from 'lucide-react';

import { TRUST_CATEGORIES } from '@/lib/content';
import { IMAGE_ASSETS } from '@/lib/image-assets';
import { useIsCompact } from '@/lib/use-media-query';
import { Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

const BACKDROP = IMAGE_ASSETS['mamu-crane-service-safety-helmet-site-drawings'];

/**
 * No customer testimonials have been supplied, so nothing is quoted here.
 * Instead this section states, factually, the kinds of work we are hired for.
 * Swap in a testimonial grid once real, attributable reviews exist.
 */
export function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const drift = useIsCompact() ? '3%' : '6%';
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}`, drift]);

  return (
    <section
      ref={ref}
      aria-labelledby="trust-heading"
      className="relative isolate overflow-hidden bg-charcoal py-20 sm:py-24 lg:py-32"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y }}
        className="absolute inset-0 -z-20 scale-110 will-change-transform"
      >
        <Image
          src={BACKDROP.src}
          alt=""
          fill
          quality={68}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BACKDROP.blurDataURL}
          className="object-cover object-center"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/78" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/55 to-charcoal/88"
      />

      <div className="container-page relative">
        <div className="max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow>Who We Work With</Eyebrow>
          </motion.div>
          <motion.h2
            id="trust-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl lg:text-[2.9rem]"
          >
            Trusted by businesses <span className="text-gradient-crane">and individuals</span>
          </motion.h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[1.02rem] leading-relaxed text-bone-dim"
          >
            Work comes to us from across Kurukshetra district, and it varies a great deal — a
            contractor needing a machine for a week, or a homeowner with one heavy item to move.
            Both matter, and both get the same planning.
          </motion.p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_CATEGORIES.map((item) => (
            <motion.li
              key={item.title}
              variants={
                reduceMotion
                  ? { hidden: {}, visible: {} }
                  : {
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className="group relative overflow-hidden rounded-sm border border-steel-light/70 bg-ink/75 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-crane/45 sm:p-6"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-crane/40 text-crane">
                <Check aria-hidden="true" className="size-4" strokeWidth={2.4} />
              </span>
              <h3 className="mt-4 font-display text-[1.02rem] font-semibold leading-snug text-bone">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.85rem] leading-relaxed text-bone-dim">{item.body}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-crane transition-transform duration-500 group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-start gap-4 border-t border-steel-light/60 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-lg text-[0.92rem] text-bone-dim">
            Have a lift coming up? Tell us the weight, the reach and the date, and we will confirm
            the right machine.
          </p>
          <ButtonLink href="/contact" className="shrink-0">
            Request a quote
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
