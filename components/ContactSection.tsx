import { Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';

import { ADDRESS, CONTACT, SERVICE_AREAS, phoneHref, whatsappHref } from '@/lib/constants';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';

export function ContactSection({
  defaultService,
  headingLevel: Heading = 'h2',
}: {
  defaultService?: string;
  headingLevel?: 'h1' | 'h2';
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-charcoal py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-0 size-[30rem] rounded-full bg-crane/[0.05] blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-0">
          {/* Details */}
          <div className="lg:col-start-1 lg:row-start-1">
            <Reveal distance={16}>
              <Eyebrow>Get in Touch</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading
                id="contact-heading"
                className="mt-5 font-display text-[2rem] font-semibold leading-[1.06] text-bone sm:text-4xl lg:text-[2.9rem]"
              >
                Need a crane service?{' '}
                <span className="block text-gradient-crane">Let&rsquo;s talk.</span>
              </Heading>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-bone-dim">
                Call us, send a WhatsApp message or fill in the form. Tell us what needs lifting,
                roughly how heavy it is and where the site is, and we will come back with
                availability and a price.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-9 space-y-1">
                <ContactRow
                  icon={<Phone className="size-[1.1rem]" strokeWidth={1.7} />}
                  label="Call or WhatsApp"
                  value={CONTACT.phone.display}
                  href={phoneHref}
                  note="Call for urgent or same-day requirements"
                />
                <ContactRow
                  icon={<Mail className="size-[1.1rem]" strokeWidth={1.7} />}
                  label="Email"
                  value={CONTACT.email.value}
                  href={`mailto:${CONTACT.email.value}`}
                />
                <ContactRow
                  icon={<MapPin className="size-[1.1rem]" strokeWidth={1.7} />}
                  label="Based in"
                  value={ADDRESS.display}
                  note={`Serving ${SERVICE_AREAS.slice(0, 5).join(', ')} and nearby areas`}
                />
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={phoneHref}>
                  <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
                  Call Now
                </ButtonLink>
                <ButtonLink href={whatsappHref} variant="outline">
                  <MessageCircle aria-hidden="true" className="size-4" strokeWidth={2} />
                  WhatsApp Us
                </ButtonLink>
                <ButtonLink href={CONTACT.mapsUrl.value} variant="ghost">
                  <Navigation aria-hidden="true" className="size-4" strokeWidth={2} />
                  Directions
                </ButtonLink>
              </div>
            </Reveal>

          </div>

          {/* Form */}
          <Reveal
            direction="left"
            distance={30}
            delay={0.1}
            compact={{ direction: 'up', distance: 24 }}
            className="lg:col-start-2 lg:row-start-1 lg:row-span-2"
          >
            <div className="relative overflow-hidden rounded-sm border border-steel-light/70 bg-gradient-to-b from-graphite/95 to-graphite/70 p-5 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.95)] backdrop-blur-sm sm:p-8">
              {/* Crane hairline along the top edge, echoing the section rules. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crane/70 to-transparent"
              />

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-bone">
                    Request a quotation
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-bone-dim">
                    The more detail you give, the more accurate the price.
                  </p>
                </div>
                <span className="shrink-0 rounded-sm border border-crane/30 bg-crane/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-crane">
                  Free &amp; no obligation
                </span>
              </div>

              <div className="mt-7 border-t border-steel-light/40 pt-7">
                <ContactForm defaultService={defaultService} />
              </div>
            </div>
          </Reveal>

          {/* Map — last on phones, beneath the details on desktop */}
          <Reveal delay={0.3} className="lg:col-start-1 lg:row-start-2 lg:mt-9">
            <MapEmbed className="relative h-64 overflow-hidden rounded-sm border border-steel-light/70 bg-graphite sm:h-72" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  const content = (
    <>
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-sm bg-crane/10 text-crane transition-colors duration-300 group-hover:bg-crane group-hover:text-ink">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-muted">
          {label}
        </span>
        <span className="mt-1 block break-words font-display text-[1.02rem] font-medium text-bone transition-colors duration-300 group-hover:text-crane">
          {value}
        </span>
        {note && <span className="mt-1 block text-[0.78rem] leading-relaxed text-muted">{note}</span>}
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-start gap-4 rounded-sm py-3 transition-colors">
          {content}
        </a>
      ) : (
        <div className="group flex items-start gap-4 py-3">{content}</div>
      )}
    </li>
  );
}
