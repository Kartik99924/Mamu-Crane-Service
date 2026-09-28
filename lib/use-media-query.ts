'use client';

import { useSyncExternalStore } from 'react';

/**
 * Reactive `matchMedia`. Reports `false` during server rendering and the first
 * client paint, so it is only suitable for tuning things that may change after
 * mount (animation distances, parallax travel) — never for deciding what to
 * render, which would cause a hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Below Tailwind's `lg` breakpoint: phones and portrait tablets. */
export const useIsCompact = () => useMediaQuery('(max-width: 1023px)');
