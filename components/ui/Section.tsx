import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('eyebrow', className)}>
      <span aria-hidden="true" className="h-px w-7 bg-crane" />
      {children}
    </span>
  );
}

/**
 * Standard section intro: eyebrow, heading and optional lead paragraph.
 * `as` controls the heading level so pages keep a correct outline.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal distance={16} duration={0.55}>
          <Eyebrow className={cn(align === 'center' && 'justify-center')}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Tag
          className={cn(
            'mt-5 font-semibold text-bone',
            Tag === 'h1'
              ? 'text-[2.35rem] leading-[1.06] sm:text-5xl lg:text-[3.85rem]'
              : 'text-[2rem] leading-[1.1] sm:text-4xl lg:text-[2.9rem]',
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-[1.03rem] leading-relaxed text-bone-dim">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  ...rest
}: { children: ReactNode; className?: string; id?: string } & React.ComponentProps<'section'>) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-24 lg:py-32', className)} {...rest}>
      {children}
    </section>
  );
}
