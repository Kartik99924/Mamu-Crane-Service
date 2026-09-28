'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FileText, MessageCircle, Phone } from 'lucide-react';

import { phoneHref, whatsappHref } from '@/lib/constants';

/**
 * Mobile action bar. Appears once the visitor has scrolled past the hero so it
 * never covers the first impression, and is hidden on desktop where the header
 * already carries a call button.
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={
        reduceMotion
          ? { opacity: visible ? 1 : 0 }
          : { y: visible ? 0 : 90, opacity: visible ? 1 : 0 }
      }
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Floating panel rather than a full-bleed bar, so the page edge stays visible. */}
      <div className="m-3 flex items-stretch gap-2 rounded-sm border border-steel-light/70 bg-ink/95 p-2 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.95)] backdrop-blur-lg">
        <a
          href={phoneHref}
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-steel-light/70 py-3 text-[0.76rem] font-medium text-bone transition-colors active:bg-graphite"
        >
          <Phone aria-hidden="true" className="size-4 shrink-0 text-crane" strokeWidth={1.9} />
          Call Now
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-steel-light/70 py-3 text-[0.76rem] font-medium text-bone transition-colors active:bg-graphite"
        >
          <MessageCircle
            aria-hidden="true"
            className="size-4 shrink-0 text-[#25d366]"
            strokeWidth={1.9}
          />
          WhatsApp
        </a>
        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-crane py-3 text-[0.76rem] font-semibold text-ink transition-colors active:bg-crane-deep"
        >
          <FileText aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.9} />
          Get Quote
        </Link>
      </div>
    </motion.div>
  );
}
