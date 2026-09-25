'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

/**
 * The site's signature interaction.
 *
 * A hoist cable runs down the left edge of the page. Its hook block descends
 * in step with reading progress, so the whole page behaves like one continuous
 * lift. Desktop only, decorative, and driven purely by transforms on two
 * elements — it costs almost nothing to run.
 */
export function CraneLine() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const cableScale = useTransform(progress, [0, 1], [0.04, 1]);
  const hookY = useTransform(progress, [0, 1], ['0vh', '88vh']);
  const hookOpacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-6 z-30 hidden w-8 select-none xl:block"
    >
      {/* Head block the cable pays out from */}
      <div className="absolute left-1/2 top-0 h-6 w-[2px] -translate-x-1/2 bg-crane/50" />
      <div className="absolute left-1/2 top-5 h-2 w-4 -translate-x-1/2 rounded-[1px] bg-crane/70" />

      {/* Cable */}
      <motion.div
        style={{ scaleY: cableScale }}
        className="absolute left-1/2 top-7 h-[88vh] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-crane/60 via-crane/30 to-crane/10 will-change-transform"
      />

      {/* Hook block */}
      <motion.div
        style={{ y: hookY, opacity: hookOpacity }}
        className="absolute left-1/2 top-7 -translate-x-1/2 will-change-transform"
      >
        <svg width="18" height="26" viewBox="0 0 18 26" fill="none" className="drop-shadow-[0_0_8px_rgba(242,176,28,0.35)]">
          {/* sheave block */}
          <rect x="4" y="0" width="10" height="7" rx="1.5" className="fill-crane" opacity="0.9" />
          <line x1="9" y1="7" x2="9" y2="12" className="stroke-crane" strokeWidth="1.5" opacity="0.8" />
          {/* hook */}
          <path
            d="M9 12c0 3.5-4.2 3-4.2 6.4 0 2.2 1.9 3.6 4 3.6s4-1.6 4-3.8"
            className="stroke-crane"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/** Thin reading-progress bar pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-crane via-crane-bright to-ember will-change-transform"
    />
  );
}
