'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from '@/lib/content';
import { IMAGE_ASSETS } from '@/lib/image-assets';
import { cn } from '@/lib/utils';

/* Applied at every breakpoint so phones keep the same mosaic as the desktop grid. */
const SPAN_CLASSES: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  normal: '',
};

/* Wide tiles occupy two columns, so they need their own sizes hint. */
const SIZES: Record<string, string> = {
  wide: '(min-width: 1280px) 50vw, (min-width: 640px) 90vw, 96vw',
  tall: '(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 48vw',
  normal: '(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 48vw',
};

export function Gallery({
  /** Limits the grid to the first N images, used for the homepage preview. */
  limit,
  showFilters = true,
}: {
  limit?: number;
  showFilters?: boolean;
}) {
  const [category, setCategory] = useState<GalleryCategory>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = useMemo(() => {
    const filtered =
      category === 'All' ? GALLERY : GALLERY.filter((item) => item.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [category, limit]);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      // Return focus to the thumbnail that opened the lightbox.
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) =>
        current === null ? current : (current + delta + items.length) % items.length,
      );
    },
    [items.length],
  );

  // Keyboard controls and background scroll lock while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      {showFilters && (
        <div role="group" aria-label="Filter gallery by category" className="mb-8 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                'rounded-sm border px-4 py-2 text-[0.8rem] font-medium transition-colors duration-300',
                category === cat
                  ? 'border-crane bg-crane text-ink'
                  : 'border-steel-light text-bone-dim hover:border-crane/60 hover:text-bone',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <ul className="grid auto-rows-[7.5rem] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, i) => {
          const asset = IMAGE_ASSETS[item.key];
          return (
            <motion.li
              key={item.key}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn('relative', SPAN_CLASSES[item.span])}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View larger: ${item.caption}`}
                className="group relative h-full w-full overflow-hidden rounded-sm border border-steel-light/60 transition-colors duration-500 hover:border-crane/50"
              >
                <Image
                  src={asset.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes={SIZES[item.span]}
                  placeholder="blur"
                  blurDataURL={asset.blurDataURL}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.07]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left sm:gap-3 sm:p-4">
                  <span className="min-w-0">
                    <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-crane sm:text-[0.6rem] sm:tracking-[0.18em]">
                      {item.category}
                    </span>
                    <span className="mt-1 block truncate text-[0.76rem] font-medium leading-snug text-bone sm:text-[0.85rem]">
                      {item.caption}
                    </span>
                  </span>
                  <span className="hidden size-8 shrink-0 translate-y-1 items-center justify-center rounded-sm border border-bone/25 bg-ink/60 text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
                    <Expand aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                  </span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Lightbox */}
      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${openIndex + 1} of ${items.length}: ${active.caption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink/97 backdrop-blur-md"
            onClick={close}
          >
            {/* Controls */}
            <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
              <span className="text-[0.78rem] tabular-nums text-muted">
                {String(openIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close image viewer"
                className="flex size-11 items-center justify-center rounded-sm border border-steel-light text-bone transition-colors hover:border-crane hover:text-crane"
              >
                <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Image, swipeable on touch */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={active.key}
                drag={reduceMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) step(1);
                  else if (info.offset.x > 70) step(-1);
                }}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full w-full max-w-5xl cursor-grab items-center justify-center active:cursor-grabbing"
              >
                <Image
                  src={IMAGE_ASSETS[active.key].src}
                  alt={active.alt}
                  width={IMAGE_ASSETS[active.key].width}
                  height={IMAGE_ASSETS[active.key].height}
                  quality={85}
                  sizes="(min-width: 640px) 85vw, 100vw"
                  placeholder="blur"
                  blurDataURL={IMAGE_ASSETS[active.key].blurDataURL}
                  className="max-h-full w-auto max-w-full rounded-sm object-contain"
                  draggable={false}
                />
              </motion.div>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-sm border border-steel-light bg-ink/80 text-bone transition-colors hover:border-crane hover:text-crane sm:left-3"
              >
                <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-sm border border-steel-light bg-ink/80 text-bone transition-colors hover:border-crane hover:text-crane sm:right-3"
              >
                <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="shrink-0 px-4 pb-6 text-center sm:px-6">
              <p className="text-[0.9rem] font-medium text-bone">{active.caption}</p>
              <p className="mx-auto mt-1 max-w-2xl text-[0.78rem] text-muted">{active.alt}</p>
              <p className="mt-3 text-[0.7rem] text-muted/70 sm:hidden">Swipe to browse</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
