import { cn } from '@/lib/utils';
import { BUSINESS } from '@/lib/constants';

/**
 * Wordmark with a hook-and-cable glyph. Drawn inline so it stays crisp,
 * inherits colour and costs no extra request.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 28 34"
        aria-hidden="true"
        className="h-8 w-auto shrink-0 text-crane"
        fill="none"
      >
        {/* jib */}
        <path d="M2 5h20" className="stroke-current" strokeWidth="2.4" strokeLinecap="square" />
        {/* mast */}
        <path d="M4.6 5v26" className="stroke-current" strokeWidth="2.4" strokeLinecap="square" opacity="0.5" />
        {/* cable */}
        <path d="M18 6v7" className="stroke-current" strokeWidth="1.5" />
        {/* hook block */}
        <rect x="15.4" y="13" width="5.2" height="3.6" rx="0.8" className="fill-current" />
        <path
          d="M18 16.6c0 2.6-3 2.2-3 4.7 0 1.6 1.35 2.7 2.9 2.7s2.9-1.1 2.9-2.8"
          className="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <span className="flex flex-col leading-none">
        {/* Tracking and size step down on narrow screens so the wordmark never
            crowds the menu button. */}
        <span className="font-display text-[0.82rem] font-bold uppercase tracking-[0.08em] text-bone sm:text-[0.97rem] sm:tracking-[0.13em]">
          {BUSINESS.name}
        </span>
        {!compact && (
          <span className="mt-1 hidden text-[0.58rem] font-medium uppercase tracking-[0.34em] text-crane/85 sm:block">
            {BUSINESS.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
