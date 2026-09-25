import Image from 'next/image';

import { IMAGE_ASSETS, type ImageKey } from '@/lib/image-assets';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Eyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Compact hero for inner pages. Shorter than the homepage hero so content
 * starts near the fold, and it carries the breadcrumb trail.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  trail,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image: ImageKey;
  imageAlt: string;
  trail: Crumb[];
}) {
  const asset = IMAGE_ASSETS[image];

  return (
    <section className="relative isolate overflow-hidden bg-ink pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-44">
      <div className="absolute inset-0 -z-20">
        <Image
          src={asset.src}
          alt={imageAlt}
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/82" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="container-page relative">
        <Reveal distance={14} duration={0.5}>
          <Breadcrumbs trail={trail} />
        </Reveal>

        <div className="mt-7 max-w-3xl">
          <Reveal distance={16} delay={0.05}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-[2.3rem] font-bold leading-[1.02] tracking-[-0.03em] text-bone sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-bone-dim sm:text-[1.08rem]">
                {lead}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
