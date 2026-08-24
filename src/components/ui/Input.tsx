import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tag?: string;
  unit?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, tag, unit, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || tag?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full" {...props}>
        {(label || tag) && (
          <div className="flex items-center gap-2 mb-1">
            {tag && <span className="label-tag">{tag}</span>}
            {label && <label htmlFor={inputId} className="text-small text-secondary">{label}</label>}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`
              input-field w-full
              ${unit ? 'pr-16' : ''}
              ${error ? 'error' : ''}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-mono-sm text-muted pointer-events-none">
              {unit}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-micro text-alarm-red flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-micro text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  tag?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, tag, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || tag?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {(label || tag) && (
          <div className="flex items-center gap-2 mb-1">
            {tag && <span className="label-tag">{tag}</span>}
            {label && <label htmlFor={textareaId} className="text-small text-secondary">{label}</label>}
          </div>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            input-field w-full min-h-[100px] resize-y
            ${error ? 'error' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-micro text-alarm-red flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-micro text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  tag?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, tag, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || tag?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {(label || tag) && (
          <div className="flex items-center gap-2 mb-1">
            {tag && <span className="label-tag">{tag}</span>}
            {label && <label htmlFor={selectId} className="text-small text-secondary">{label}</label>}
          </div>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            input-field w-full appearance-none
            bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239AA3AC' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")] bg-no-repeat bg-right-3 bg-center pr-10
            ${error ? 'error' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-micro text-alarm-red flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';