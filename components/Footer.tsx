import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import {
  ADDRESS,
  BUSINESS,
  CONTACT,
  NAV_LINKS,
  SERVICE_AREAS,
  SOCIAL_LINKS,
  phoneHref,
  whatsappHref,
} from '@/lib/constants';
import { SERVICES } from '@/lib/services';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-steel-light/60 bg-ink">
      <div aria-hidden="true" className="hazard-stripe h-1 w-full opacity-70" />

      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Identity */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-bone-dim">
              Crane services and crane rental in Pipli, Kurukshetra and the surrounding areas of
              Haryana. Machines supplied with an experienced operator.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 rounded-sm bg-crane px-4 py-2.5 text-[0.82rem] font-semibold text-ink transition-colors hover:bg-crane-bright"
              >
                <Phone aria-hidden="true" className="size-3.5" strokeWidth={2.2} />
                Call Now
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-steel-light px-4 py-2.5 text-[0.82rem] font-medium text-bone-dim transition-colors hover:border-crane hover:text-crane"
              >
                <MessageCircle aria-hidden="true" className="size-3.5" strokeWidth={2} />
                WhatsApp
              </a>
            </div>

            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-6 flex gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-9 items-center justify-center rounded-sm border border-steel-light text-bone-dim transition-colors hover:border-crane hover:text-crane"
                      aria-label={social.label}
                    >
                      <span className="text-[0.7rem] font-semibold uppercase">
                        {social.label.slice(0, 2)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-crane"
            >
              Navigation
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.87rem] text-bone-dim transition-colors hover:text-crane"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-crane"
            >
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[0.87rem] text-bone-dim transition-colors hover:text-crane"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-crane">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-[0.87rem]">
              <li>
                <a
                  href={phoneHref}
                  className="group flex items-start gap-3 text-bone-dim transition-colors hover:text-crane"
                >
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-crane" strokeWidth={1.7} />
                  {CONTACT.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email.value}`}
                  className="group flex items-start gap-3 break-all text-bone-dim transition-colors hover:text-crane"
                >
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-crane" strokeWidth={1.7} />
                  {CONTACT.email.value}
                </a>
              </li>
              <li>
                <address className="flex items-start gap-3 not-italic text-bone-dim">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-crane" strokeWidth={1.7} />
                  {ADDRESS.display}
                </address>
              </li>
            </ul>

            <h3 className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Service Area
            </h3>
            <p className="mt-2.5 text-[0.8rem] leading-relaxed text-muted">
              {SERVICE_AREAS.join(' · ')}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-steel/70 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-muted">
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem]">
            <li>
              <Link href="/privacy-policy" className="text-muted transition-colors hover:text-crane">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted transition-colors hover:text-crane">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="text-muted transition-colors hover:text-crane">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
