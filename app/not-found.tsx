import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

import { SERVICES } from '@/lib/services';
import { CONTACT, phoneHref } from '@/lib/constants';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal py-28">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />

      <div className="container-page relative max-w-2xl">
        <span className="hazard-stripe block h-1 w-20" aria-hidden="true" />
        <p className="mt-7 font-display text-[4rem] font-bold leading-none text-steel-light sm:text-[5.5rem]">
          404
        </p>
        <h1 className="mt-4 font-display text-[1.9rem] font-semibold leading-tight text-bone sm:text-4xl">
          Nothing to lift here
        </h1>
        <p className="mt-5 text-[1rem] leading-relaxed text-bone-dim">
          The page you were looking for does not exist, or has moved. The links below will get you
          back to what you need.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />
            Back to home
          </ButtonLink>
          <ButtonLink href={phoneHref} variant="outline">
            <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
            Call {CONTACT.phone.display}
          </ButtonLink>
        </div>

        <div className="mt-12 border-t border-steel-light/60 pt-7">
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-crane">
            Our services
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-2 text-[0.9rem] text-bone-dim transition-colors hover:text-crane"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-4 bg-steel-light transition-all duration-300 group-hover:w-6 group-hover:bg-crane"
                  />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
