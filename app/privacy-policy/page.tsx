import type { Metadata } from 'next';

import { ADDRESS, BUSINESS, CONTACT } from '@/lib/constants';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, schemaGraph } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Mamu Crane Service collects and uses the information you provide through this website.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={schemaGraph(breadcrumbSchema(TRAIL))} />

      <article className="bg-charcoal pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="container-page max-w-3xl">
          <Breadcrumbs trail={TRAIL} />

          <h1 className="mt-7 font-display text-[2.2rem] font-bold leading-tight text-bone sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[0.85rem] text-muted">
            This policy explains what this website collects and why.
          </p>

          <div className="mt-10 space-y-10 text-[0.95rem] leading-relaxed text-bone-dim">
            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                Information we collect
              </h2>
              <p className="mt-3">
                When you submit the enquiry form on this website, we receive the details you enter:
                your name, phone number, the service you are interested in, the location of the site
                and any message you write. We ask for these because they are what we need to quote
                for a crane hire.
              </p>
              <p className="mt-3">
                We do not ask for payment details through this website, and you should never send
                card or banking information through the enquiry form.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                How we use your information
              </h2>
              <p className="mt-3">
                We use the details you send only to respond to your enquiry: to check availability,
                prepare a quotation and arrange the work if you go ahead. We do not sell your
                information, and we do not pass it to third parties for marketing.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                Calls and messages
              </h2>
              <p className="mt-3">
                If you contact us by phone or WhatsApp, your phone number will be visible to us
                through those services. Those conversations are handled by your network or messaging
                provider under their own terms, not ours.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                Cookies and analytics
              </h2>
              <p className="mt-3">
                This website does not set advertising or tracking cookies. If website analytics are
                added in future, this page will be updated to say what is collected before that
                happens.
              </p>
              <p className="mt-3">
                The map on our contact page is provided by Google and only loads when you choose to
                open it. When you do, Google may receive information about your visit under its own
                privacy policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">
                How long we keep it
              </h2>
              <p className="mt-3">
                Enquiry details are kept for as long as they are useful for the job in question and
                our normal business records. If you would like your details removed, contact us and
                we will do so.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-bone">Contact us</h2>
              <p className="mt-3">
                For any question about this policy or about information you have sent us, contact{' '}
                {BUSINESS.name} at {CONTACT.phone.display} or {CONTACT.email.value}. Our base is{' '}
                {ADDRESS.display}.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
