import type { SpecSheetProps } from '../../types';
import { Card, CardHeader } from './Card';

const categoryIcons = {
  civil: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  mechanical: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  electrical: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  instrumentation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  logistics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

export function SpecSheet({ category, title, specs }: SpecSheetProps) {
  const categoryColors = {
    civil: 'var(--color-concrete)',
    mechanical: 'var(--color-steel)',
    electrical: 'var(--color-pipe-blue)',
    instrumentation: 'var(--color-insul-green)',
    logistics: 'var(--color-warn-orange)',
  };

  const Icon = categoryIcons[category];
  const color = categoryColors[category];

  return (
    <Card variant="spec" padding="lg" className="h-full">
      <CardHeader
        tag={category.toUpperCase()}
        title={title}
        action={
          <span className="text-micro text-muted font-mono">{specs.length} ESPECIFICACIONES</span>
        }
      >
        <div className="flex items-center gap-2 text-primary">
          <span className="p-2 radius-panel" style={{ background: `${color}20` }}>
            {Icon}
          </span>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {specs.map((spec, index) => (
          <div
            key={`${spec.param}-${index}`}
            className="grid grid-cols-[1fr_auto_auto] gap-4 items-start py-3 border-b border-panel/50 last:border-0"
          >
            <div className="min-w-0">
              <p className="text-small text-primary font-medium">{spec.param}</p>
              {spec.note && <p className="text-micro text-muted mt-0.5">{spec.note}</p>}
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-mono-lg text-primary font-mono font-bold">{spec.value}</span>
              <span className="text-micro text-muted ml-1">{spec.unit}</span>
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-micro text-muted font-mono">{spec.standard}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function SpecGrid({ sheets }: { sheets: SpecSheetProps[] }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sheets.map((sheet) => (
          <SpecSheet key={sheet.category} {...sheet} />
        ))}
      </div>
    </div>
  );
}