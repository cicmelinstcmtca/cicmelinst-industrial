import { type HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'energized' | 'deenergized' | 'maintenance' | 'fault' | 'ok' | 'progress' | 'scheduled' | 'default';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, className = '', children, ...props }, ref) => {
    const variantClasses = {
      energized: 'badge-energized',
      deenergized: 'badge-deenergized',
      maintenance: 'badge-maintenance',
      fault: 'badge-fault',
      ok: 'badge-ok',
      progress: 'badge-progress',
      scheduled: 'badge-scheduled',
      default: 'bg-panel text-secondary border border-panel',
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-micro',
      md: 'px-2.5 py-1 text-micro',
      lg: 'px-3 py-1.5 text-small',
    };

    const dotColors = {
      energized: 'bg-insul-green',
      deenergized: 'bg-steel',
      maintenance: 'bg-warn-orange',
      fault: 'bg-alarm-red',
      ok: 'bg-insul-green',
      progress: 'bg-pipe-blue',
      scheduled: 'bg-warn-orange',
      default: 'bg-text-muted',
    };

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1.5
          font-mono font-semibold uppercase tracking-wider
          radius-pill
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {dot && (
          <span
            className={`
              w-1.5 h-1.5 rounded-full flex-shrink-0
              ${dotColors[variant]}
            `}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';