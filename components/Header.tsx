'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';

import { BUSINESS, CONTACT, NAV_LINKS, phoneHref, whatsappHref } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Transparent over the hero, glass once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll and allow Escape to dismiss while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]) && href !== '/#why-us';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-sm focus:bg-crane focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
          scrolled
            ? 'border-b border-steel-light/60 bg-ink/85 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70'
            : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent',
        )}
      >
        <div
          className={cn(
            'container-page flex items-center justify-between transition-[height] duration-500',
            scrolled ? 'h-[68px]' : 'h-[84px]',
          )}
        >
          <Link href="/" aria-label={`${BUSINESS.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'relative px-3.5 py-2 text-[0.87rem] font-medium transition-colors duration-300',
                      isActive(link.href) ? 'text-crane' : 'text-bone-dim hover:text-bone',
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-crane transition-transform duration-300',
                        isActive(link.href) ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Wrapped rather than given a `hidden` class directly: the button's
                own `inline-flex` is the same CSS property and would win. */}
            <span className="hidden sm:block">
              <ButtonLink href={phoneHref} size="md">
                <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
                <span className="hidden md:inline">{CONTACT.phone.display}</span>
                <span className="md:hidden">Call Now</span>
              </ButtonLink>
            </span>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex size-11 items-center justify-center rounded-sm border border-steel-light text-bone transition-colors hover:border-crane hover:text-crane lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[65] flex flex-col bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-page flex h-[84px] shrink-0 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
                className="flex size-11 items-center justify-center rounded-sm border border-steel-light text-bone transition-colors hover:border-crane hover:text-crane"
              >
                <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto py-6">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-steel/70"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-baseline gap-4 py-4 font-display text-2xl font-semibold transition-colors',
                        isActive(link.href) ? 'text-crane' : 'text-bone hover:text-crane',
                      )}
                    >
                      <span className="font-sans text-[0.65rem] font-medium tracking-[0.2em] text-muted">
                        0{i + 1}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3" onClick={() => setOpen(false)}>
                <ButtonLink href={phoneHref} size="lg" className="w-full">
                  <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
                  Call {CONTACT.phone.display}
                </ButtonLink>
                <ButtonLink href={whatsappHref} variant="outline" size="lg" className="w-full">
                  WhatsApp Us
                </ButtonLink>
                <ButtonLink href="/contact" variant="dark" size="lg" className="w-full">
                  Request a Quote
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
