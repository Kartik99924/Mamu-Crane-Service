import type { Metadata } from 'next';

import { BUSINESS, CONTACT } from '@/lib/constants';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, schemaGraph } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Terms of Service', path: '/terms' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'Terms covering the use of the Mamu Crane Service website and enquiries made through it.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={schemaGraph(breadcrumbSchema(TRAIL))} />

      <article className="bg-charcoal pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="container-page max-w-3xl">
          <Breadcrumbs trail={TRAIL} />

          <h1 className="mt-7 font-display text-[2.2rem] font-bold leading-tight text-bone sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-[0.85rem] text-muted">
            These terms cover the use of this website. Hire work is governed by the terms agreed for
            each individual job.
          </p>

          <div className="mt-10 space-y-10 text-[0.95rem] leading-relaxed text-bone-dim">
            <section>
              <h2 className="font-display text-xl font-semibold text-bone">About this website</h2>
              <p className="mt-3">
                This website describes the crane services offered by {BUSINESS.name} and provides a
                way to contact us. The information on it is provided in good faith and for general
                guidance.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                Enquiries and quotations
              </h2>
              <p className="mt-3">
                Submitting the enquiry form does not create a booking. A booking exists only once we
                have confirmed the machine, the date and the price with you directly.
              </p>
              <p className="mt-3">
                Quotations are based on the information you give us about the load, the reach
                required and the site. If conditions on the day differ materially from what was
                described, the time required and the cost may change.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                Guidance on this site
              </h2>
              <p className="mt-3">
                The planning notes and service descriptions here are general information about how
                lifting work is usually organised. They are not a substitute for a site-specific
                assessment, and no lift should be planned on the basis of this website alone.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                Site access and safety
              </h2>
              <p className="mt-3">
                Where we attend a site, safe and lawful access to it, and accurate information about
                ground conditions and overhead services, remain the responsibility of the customer.
                An operator may decline to carry out a lift that cannot be performed safely.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">Availability</h2>
              <p className="mt-3">
                Machine availability changes constantly. Nothing on this website should be taken as
                a guarantee that a particular machine or capacity is free on a given date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">Changes</h2>
              <p className="mt-3">
                We may update these terms or the content of this website at any time. For anything
                you need certainty on, contact us at {CONTACT.phone.display}.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
