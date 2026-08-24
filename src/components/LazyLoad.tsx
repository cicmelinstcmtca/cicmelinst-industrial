import { lazy, Suspense, Component, type ReactNode, type ComponentType } from 'react';
import { motion } from 'motion/react';

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
        <div className="flex items-center justify-center min-h-[200px] bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-lg m-4 p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-2">
              Error de carga
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              No se pudo cargar este módulo. Verifique su conexión.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-4 py-2 bg-[var(--color-pipe-blue)] text-[var(--color-bg-control)] rounded hover:opacity-80 transition-opacity text-sm font-mono"
            >
              RECARGAR
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <LazyErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-[300px] gap-4"
          role="status"
          aria-label="Cargando componente..."
        >
          <svg
            className="animate-spin text-[var(--color-warn-orange)]"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75" />
          </svg>
          <span className="text-[10px] text-[var(--color-text-muted)] font-mono">CARGANDO MÓDULO...</span>
        </motion.div>
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
