'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

import { useIsCompact } from '@/lib/use-media-query';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay before the reveal starts. */
  delay?: number;
  direction?: Direction;
  /** Travel distance in pixels. */
  distance?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  /** Fraction of the element that must be visible before animating. */
  amount?: number;
  /**
   * Overrides applied below `lg`. Lets a sideways desktop entrance become a
   * short vertical one on phones, where horizontal travel reads as jitter.
   */
  compact?: { direction?: Direction; distance?: number };
};

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Scroll-triggered entrance. Animates transform and opacity only, so it stays
 * on the compositor. Collapses to a plain render when the visitor has asked
 * for reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.7,
  className,
  as = 'div',
  amount = 0.25,
  compact,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompact();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const dir = isCompact && compact?.direction ? compact.direction : direction;
  const dist = isCompact && compact?.distance !== undefined ? compact.distance : distance;

  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(dir, dist) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children of a container. Pair with <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = 'div',
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  distance = 24,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </MotionTag>
  );
}
