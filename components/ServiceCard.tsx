import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { IMAGE_ASSETS } from '@/lib/image-assets';
import type { Service } from '@/lib/services';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/**
 * Service card. All hover motion is transform/opacity only and lives behind
 * `group-hover`, so it costs nothing until pointed at.
 */
export function ServiceCard({
  service,
  index,
  className,
}: {
  service: Service;
  index?: number;
  className?: string;
}) {
  const image = IMAGE_ASSETS[service.image];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-sm border border-steel-light/70 bg-graphite/70 backdrop-blur-sm',
        'transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        'hover:-translate-y-1.5 hover:border-crane/50 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.95)]',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 92vw"
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.09]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/35 to-transparent"
        />
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="absolute right-4 top-3.5 font-display text-[0.7rem] font-semibold tracking-[0.2em] text-bone/35"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {/* icon sits across the image edge */}
        <span className="absolute -top-7 left-5 flex size-12 items-center justify-center rounded-sm border border-steel-light bg-ink text-crane transition-[background-color,color,transform] duration-500 group-hover:-translate-y-1 group-hover:bg-crane group-hover:text-ink sm:left-6">
          <Icon name={service.icon} className="size-5" strokeWidth={1.6} />
        </span>

        <h3 className="mt-6 font-display text-[1.12rem] font-semibold leading-snug text-bone transition-colors duration-300 group-hover:text-crane">
          {service.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-bone-dim">
          {service.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-crane">
          View Service
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </span>
      </div>

      {/* Accent line that draws in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-crane to-ember transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
      />
    </Link>
  );
}
