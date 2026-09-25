'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Phone,
  ShieldCheck,
} from 'lucide-react';

import { CONTACT, phoneHref } from '@/lib/constants';
import { SERVICES } from '@/lib/services';
import { Button, ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'phone' | 'service' | 'location' | 'form', string>>;

const isValidPhone = (phone: string) =>
  /^(?:\+91|91|0)?[6-9]\d{9}$/.test(phone.replace(/[\s\-()]/g, ''));

/* Shared field chrome: inset highlight for depth, crane ring on focus. */
const fieldBase =
  'w-full rounded-sm border bg-ink/70 px-4 text-[0.92rem] text-bone placeholder:text-muted/60 ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] focus:outline-none focus-visible:outline-none ' +
  'transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]';

const fieldState = (invalid?: boolean) =>
  invalid
    ? 'border-red-500/60 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]'
    : 'border-steel-light/70 hover:border-steel-light focus:border-crane focus:bg-ink/85 focus:shadow-[0_0_0_3px_rgba(242,176,28,0.14)]';

const inputClass = (invalid?: boolean) => cn(fieldBase, fieldState(invalid), 'h-12');

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  // Tracked so the unselected state can be dimmed like a placeholder.
  const [service, setService] = useState(defaultService ?? '');

  const fieldId = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Mirror the server rules so mistakes surface before a round trip.
    const next: Errors = {};
    if (!data.name || data.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!isValidPhone(data.phone ?? '')) next.phone = 'Please enter a valid 10-digit mobile number.';
    if (!data.location || data.location.trim().length < 2) {
      next.location = 'Please tell us where the site is.';
    }

    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? { form: json.error ?? 'Something went wrong. Please call us instead.' });
        setStatus('error');
        return;
      }

      form.reset();
      setService(defaultService ?? '');
      setStatus('success');
    } catch {
      setErrors({ form: 'Could not send your enquiry. Please check your connection or call us.' });
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        aria-live="polite"
        className="relative overflow-hidden rounded-sm border border-crane/35 bg-crane/[0.06] p-7"
      >
        <div aria-hidden="true" className="hazard-stripe absolute inset-x-0 top-0 h-1 opacity-70" />
        <span className="flex size-12 items-center justify-center rounded-sm bg-crane text-ink shadow-[0_8px_28px_-12px_rgba(242,176,28,0.9)]">
          <CheckCircle2 aria-hidden="true" className="size-6" strokeWidth={1.8} />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-bone">Enquiry sent</h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-bone-dim">
          Thank you. We have your details and will get back to you about availability and a
          quotation. If the job is urgent, calling is still the quickest way to reach us.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={phoneHref}>
            <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
            {CONTACT.phone.display}
          </ButtonLink>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Send another enquiry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: visually and semantically hidden from real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId('company')}>Company (leave blank)</label>
        <input id={fieldId('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          required
          id={fieldId('name')}
          error={errors.name}
          errorId={errorId('name')}
        >
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field
          label="Phone number"
          required
          id={fieldId('phone')}
          error={errors.phone}
          errorId={errorId('phone')}
        >
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId('phone') : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Service required"
          optional
          id={fieldId('service')}
          error={errors.service}
          errorId={errorId('service')}
        >
          <div className="relative">
            <select
              id={fieldId('service')}
              name="service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              className={cn(
                inputClass(Boolean(errors.service)),
                'cursor-pointer appearance-none pr-11',
                // Dim the unselected state so it reads as a placeholder.
                service ? 'text-bone' : 'text-muted/70',
              )}
            >
              <option value="" className="bg-graphite text-muted">
                Select a service
              </option>
              {SERVICES.map((item) => (
                <option key={item.slug} value={item.slug} className="bg-graphite text-bone">
                  {item.title}
                </option>
              ))}
              <option value="other" className="bg-graphite text-bone">
                Something else
              </option>
            </select>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.8}
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
          </div>
        </Field>

        <Field
          label="Site location"
          required
          id={fieldId('location')}
          error={errors.location}
          errorId={errorId('location')}
        >
          <input
            id={fieldId('location')}
            name="location"
            type="text"
            placeholder="Area, town or landmark"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? errorId('location') : undefined}
            className={inputClass(Boolean(errors.location))}
          />
        </Field>
      </div>

      <Field
        label="Message"
        optional
        id={fieldId('message')}
        hint="What needs lifting, rough weight, and when you need it."
      >
        <textarea
          id={fieldId('message')}
          name="message"
          rows={4}
          placeholder="Tell us about the lift…"
          className={cn(fieldBase, fieldState(), 'resize-y py-3 leading-relaxed')}
        />
      </Field>

      <AnimatePresence>
        {errors.form && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p
              role="alert"
              className="flex items-start gap-2.5 rounded-sm border border-red-500/30 bg-red-500/[0.07] px-4 py-3 text-[0.85rem] leading-relaxed text-red-300"
            >
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
              {errors.form}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-5 border-t border-steel-light/50 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" strokeWidth={2} />
              Sending…
            </>
          ) : (
            <>
              Request a Quote
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </>
          )}
        </Button>

        <p className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-muted sm:max-w-[15rem] sm:justify-end sm:text-right">
          <ShieldCheck
            aria-hidden="true"
            strokeWidth={1.8}
            className="mt-px size-3.5 shrink-0 sm:order-2"
          />
          <span className="sm:order-1">
            Your details are used only to answer this enquiry. Fields marked{' '}
            <span className="text-crane">*</span> are required.
          </span>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  optional,
  error,
  errorId,
  hint,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  errorId?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-bone-dim"
      >
        {label}
        {required && (
          <span className="text-crane" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
        {optional && (
          <span className="text-[0.68rem] font-medium normal-case tracking-normal text-muted/80">
            optional
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-[0.72rem] leading-relaxed text-muted">{hint}</p>}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-[0.75rem] text-red-400"
        >
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}
