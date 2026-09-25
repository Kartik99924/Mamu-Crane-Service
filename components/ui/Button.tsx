import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost' | 'dark';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-medium whitespace-nowrap ' +
  'transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-crane text-ink hover:bg-crane-bright shadow-[0_6px_24px_-10px_rgba(242,176,28,0.9)] hover:shadow-[0_10px_34px_-10px_rgba(242,176,28,0.95)]',
  outline:
    'border border-bone/25 text-bone hover:border-crane hover:text-crane bg-transparent',
  ghost: 'text-bone hover:text-crane bg-transparent',
  dark: 'bg-graphite text-bone border border-steel-light hover:border-crane/60 hover:text-crane',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm rounded-sm',
  lg: 'h-13 px-7 text-[0.95rem] rounded-sm',
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonBaseProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'>) {
  const external = typeof href === 'string' && /^(https?:|tel:|mailto:)/.test(href);

  if (external) {
    return (
      <a
        href={href as string}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(href.toString().startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonBaseProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
