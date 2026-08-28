import { lazy, Suspense, Component, type ReactNode, type ComponentType } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface LazyErrorState {
  hasError: boolean;
}

class LazyErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, LazyErrorState> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): LazyErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[LazyLoad] Chunk load error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-[200px] bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl m-4 p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-alarm-red)]/5 border border-[var(--color-alarm-red)]/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-alarm-red)" strokeWidth="1.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
              Error de carga
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4 max-w-xs mx-auto">
              No se pudo cargar este módulo. Verifique su conexión.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-pipe-blue)] text-white rounded-xl hover:bg-[var(--color-pipe-blue-glow)] transition-all active:scale-[0.98]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4 p-6 bg-[var(--color-bg-panel)] rounded-2xl border border-[var(--color-border-panel)]">
      <div className="h-4 bg-[var(--color-border-panel)] rounded w-1/3" />
      <div className="h-8 bg-[var(--color-border-panel)] rounded w-2/3" />
      <div className="space-y-2">
        <div className="h-3 bg-[var(--color-border-panel)] rounded w-full" />
        <div className="h-3 bg-[var(--color-border-panel)] rounded w-4/5" />
      </div>
    </div>
  );
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <LazyErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || (
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}>
        {children}
      </Suspense>
    </LazyErrorBoundary>
  );
}

function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
) {
  return lazy(importFn);
}

export const LazyProjects = createLazyComponent(
  () => import('../components/layout/Projects').then(m => ({ default: m.Projects }))
);

export const LazyCapabilities = createLazyComponent(
  () => import('../components/layout/Capabilities').then(m => ({ default: m.Capabilities }))
);

export const LazyTeam = createLazyComponent(
  () => import('../components/layout/Team').then(m => ({ default: m.Team }))
);

export const LazyContact = createLazyComponent(
  () => import('../components/layout/Contact').then(m => ({ default: m.Contact }))
);
