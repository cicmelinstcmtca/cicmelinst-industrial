import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const VARIANT_STYLES = {
  primary: `
    bg-[var(--color-warn-orange)] text-[var(--color-bg-control)]
    hover:bg-[var(--color-warn-orange-glow)] hover:shadow-lg hover:shadow-[var(--color-warn-orange)]/20 hover:-translate-y-0.5
    active:translate-y-0 active:scale-[0.98]
  `,
  secondary: `
    bg-transparent text-[var(--color-pipe-blue-glow)] border border-[var(--color-pipe-blue-glow)]
    hover:bg-[var(--color-pipe-blue-glow)] hover:text-[var(--color-bg-control)] hover:shadow-lg hover:shadow-[var(--color-pipe-blue-glow)]/20 hover:-translate-y-0.5
    active:translate-y-0 active:scale-[0.98]
  `,
  ghost: `
    bg-transparent text-[var(--color-text-secondary)] border-none
    hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)]
    active:scale-[0.98]
  `,
  whatsapp: `
    bg-[#25D366] text-white border-none
    hover:bg-[#20BD5A] hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5
    active:translate-y-0 active:scale-[0.98]
  `,
} as const;

const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-semibold rounded-lg
          transition-all duration-200 ease-out cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pipe-blue-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-control)]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none
          select-none
          ${VARIANT_STYLES[variant]}
          ${SIZE_STYLES[size]}
          ${className}
        `}
        style={{ fontFamily: 'var(--font-family-display)' }}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
        )}
        <span className={loading ? 'opacity-75' : ''}>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
