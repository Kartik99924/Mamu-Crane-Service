import { Plus } from 'lucide-react';
import type { ServiceFaq } from '@/lib/services';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

/**
 * Built on native <details>/<summary>: keyboard accessible, works without
 * JavaScript, and the answers are in the initial HTML for crawlers.
 */
export function Faq({
  faqs,
  className,
  headingId,
}: {
  faqs: readonly ServiceFaq[];
  className?: string;
  headingId?: string;
}) {
  return (
    <div className={cn('divide-y divide-steel-light/60 border-y border-steel-light/60', className)} aria-labelledby={headingId}>
      {faqs.map((faq, i) => (
        <Reveal key={faq.question} delay={Math.min(i * 0.05, 0.25)} distance={14} duration={0.5}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-left [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-[1rem] font-medium leading-snug text-bone transition-colors duration-300 group-hover:text-crane sm:text-[1.05rem]">
                {faq.question}
              </h3>
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm border border-steel-light text-crane transition-transform duration-300 group-open:rotate-45"
              >
                <Plus className="size-3.5" strokeWidth={2} />
              </span>
            </summary>
            <p className="pb-6 pr-10 text-[0.9rem] leading-relaxed text-bone-dim">{faq.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
