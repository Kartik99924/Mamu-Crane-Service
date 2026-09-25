'use client';

import { useEffect } from 'react';
import { RefreshCw, Phone } from 'lucide-react';

import { CONTACT, phoneHref } from '@/lib/constants';
import { Button, ButtonLink } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces the digest in server logs so a failure can be traced.
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal py-28">
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />

      <div className="container-page relative max-w-2xl">
        <span className="hazard-stripe block h-1 w-20" aria-hidden="true" />
        <h1 className="mt-7 font-display text-[1.9rem] font-semibold leading-tight text-bone sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-5 text-[1rem] leading-relaxed text-bone-dim">
          This page failed to load. Trying again usually resolves it. If you need a crane urgently,
          call us and we will sort it out over the phone.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset}>
            <RefreshCw aria-hidden="true" className="size-4" strokeWidth={2} />
            Try again
          </Button>
          <ButtonLink href={phoneHref} variant="outline">
            <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
            Call {CONTACT.phone.display}
          </ButtonLink>
        </div>

        {error.digest && (
          <p className="mt-8 text-[0.75rem] text-muted">Reference: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
