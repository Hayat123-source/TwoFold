import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost-light' | 'outline-light';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-accent-600 text-white shadow-glow hover:bg-accent-700 hover:-translate-y-0.5 focus-visible:ring-accent-300',
  secondary:
    'bg-primary-700 text-white hover:bg-primary-600 hover:-translate-y-0.5 focus-visible:ring-primary-300',
  'ghost-light':
    'bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-white/60',
  'outline-light':
    'border border-white/70 text-white hover:bg-white hover:text-primary-700 focus-visible:ring-white/60',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide transition duration-300 focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

export function buttonClasses(variant: Variant = 'primary', extra = '') {
  return `${BASE} ${VARIANT_CLASSES[variant]} ${extra}`.trim();
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button type="button" className={buttonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({ variant = 'primary', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      {children}
    </a>
  );
}
