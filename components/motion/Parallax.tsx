'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/**
 * Moves its children vertically as the section passes through the viewport.
 * `speed` is the total travel in pixels across the full scroll range;
 * negative values move against the scroll direction.
 */
export function Parallax({
  children,
  speed = 80,
  className,
  /** Adds a slow scale-up, used for full-bleed background photography. */
  scale = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smoothing keeps the movement from tracking the scroll wheel step for step.
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const y = useTransform(eased, [0, 1], [-speed / 2, speed / 2]);
  const s = useTransform(eased, [0, 1], [1.08, 1.18]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, ...(scale ? { scale: s } : {}) }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
