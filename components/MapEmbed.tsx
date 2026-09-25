'use client';

import { useState } from 'react';
import { MapPin, Play } from 'lucide-react';
import { ADDRESS } from '@/lib/constants';

const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  'Pipli, Kurukshetra, Haryana',
)}&output=embed`;

/**
 * Click-to-load map.
 *
 * A Google Maps iframe pulls in a substantial amount of third-party script and
 * would hurt Core Web Vitals on every page load. This renders a lightweight
 * facade instead and only mounts the iframe when the visitor asks for it.
 */
export function MapEmbed({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={
        className ??
        'relative overflow-hidden rounded-sm border border-steel-light/70 bg-graphite min-h-[18rem]'
      }
    >
      {loaded ? (
        <iframe
          src={EMBED_SRC}
          title={`Map showing ${ADDRESS.display}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] contrast-[1.05]"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center transition-colors duration-500 hover:bg-graphite/70"
          aria-label="Load the interactive map"
        >
          {/* Abstract map motif — no third-party request */}
          <span aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-70" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(242,176,28,0.09),transparent_62%)]"
          />

          <span className="relative flex size-14 items-center justify-center rounded-full border border-crane/40 bg-ink/80 text-crane transition-transform duration-500 group-hover:scale-105">
            <MapPin aria-hidden="true" className="size-6" strokeWidth={1.6} />
            <span className="absolute inset-0 animate-ping rounded-full border border-crane/30 [animation-duration:2.6s]" />
          </span>

          <span className="relative">
            <span className="block font-display text-[1.05rem] font-semibold text-bone">
              {ADDRESS.locality}, {ADDRESS.city}
            </span>
            <span className="mt-1 block text-[0.82rem] text-bone-dim">
              {ADDRESS.region}, {ADDRESS.country}
            </span>
          </span>

          <span className="relative inline-flex items-center gap-2 rounded-sm border border-steel-light px-4 py-2 text-[0.78rem] font-medium text-bone-dim transition-colors duration-300 group-hover:border-crane group-hover:text-crane">
            <Play aria-hidden="true" className="size-3.5" strokeWidth={2} />
            Load interactive map
          </span>
        </button>
      )}
    </div>
  );
}
