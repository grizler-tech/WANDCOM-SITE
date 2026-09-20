import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Icon, type IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'invert';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 font-medium tracking-tight ' +
  'transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55 ' +
  'rounded-[var(--radius-pill)] whitespace-nowrap';

const variants: Record<Variant, string> = {
  /** Signal lime — the single loudest action on the page. */
  primary: 'bg-accent text-ink hover:bg-accent-deep hover:shadow-[0_0_0_6px_rgba(200,255,77,0.14)]',
  /** Quiet, bordered action on dark surfaces. */
  secondary:
    'border border-line bg-white/[0.02] text-fg hover:border-accent/60 hover:bg-white/[0.05]',
  /** Transparent action on light surfaces. */
  outline:
    'border border-paper-line bg-white text-fg-invert hover:border-fg-invert/50 hover:bg-paper-soft',
  /** Text-only action. */
  ghost: 'text-fg hover:text-accent px-2',
  /** Solid dark action on light surfaces. */
  invert: 'bg-fg-invert text-paper hover:bg-[#1a1c21]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-7 py-3.5 text-base',
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  fullWidth?: boolean;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * One button to rule them all: renders a `next/link`, an external anchor or a
 * real `<button>` depending on the props it receives.
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', icon, className, fullWidth } = props;
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, icon: _i, fullWidth: _f, ...rest } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          {...rest}
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...rest} href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, fullWidth: _f, ...rest } = props;
  return (
    <button {...rest} className={classes}>
      {content}
    </button>
  );
}
