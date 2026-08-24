import { forwardRef, type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'panel' | 'gauge' | 'spec' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  bordered?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'panel',
    padding = 'md',
    hover = false,
    bordered = true,
    className = '',
    children,
    ...props
  }, ref) => {
    const variantClasses = {
      panel: 'bg-panel border-panel',
      gauge: 'bg-gauge border-panel',
      spec: 'bg-panel border-panel',
      flat: 'bg-transparent border-transparent',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverClasses = hover
      ? 'transition-all duration-150 hover:border-pipe-blue-glow hover:shadow-glow-blue'
      : '';

    return (
      <div
        ref={ref}
        className={`
          radius-card
          ${bordered ? 'border' : 'border-0'}
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${hoverClasses}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ tag, title, subtitle, action, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex items-start justify-between gap-4 mb-4
          ${className}
        `}
        {...props}
      >
        <div>
          {tag && <span className="label-tag mb-1.5 block">{tag}</span>}
          <h3 className="text-h3 text-primary">{title}</h3>
          {subtitle && <p className="text-small text-secondary mt-1">{subtitle}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`
        flex items-center justify-end gap-3 mt-6 pt-4 border-t border-panel
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';