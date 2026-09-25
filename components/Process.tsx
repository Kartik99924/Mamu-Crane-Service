import { PROCESS_STEPS } from '@/lib/content';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Eyebrow } from '@/components/ui/Section';

export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-hidden border-y border-steel/60 bg-ink py-20 sm:py-24"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal distance={16}>
            <Eyebrow>How It Works</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="process-heading"
              className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] text-bone sm:text-4xl"
            >
              From enquiry to lift, in four steps
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-steel-light/60 bg-steel-light/50 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <RevealItem
              key={step.step}
              className="group relative bg-ink p-6 transition-colors duration-500 hover:bg-graphite/70 sm:p-7"
            >
              <span className="font-display text-[2.4rem] font-bold leading-none text-steel-light transition-colors duration-500 group-hover:text-crane/70">
                {step.step}
              </span>
              <h3 className="mt-5 font-display text-[1.05rem] font-semibold text-bone">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.85rem] leading-relaxed text-bone-dim">{step.body}</p>
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-crane transition-transform duration-500 group-hover:scale-y-100"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
