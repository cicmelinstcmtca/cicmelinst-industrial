import { lazy, Suspense, type ComponentType } from 'react';
import { motion } from 'motion/react';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback || (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[300px] gap-4"
        role="status"
        aria-label="Cargando componente..."
      >
        <svg
          className="animate-spin text-warn-orange"
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
        <span className="text-micro text-muted font-mono">CARGANDO MÓDULO...</span>
      </motion.div>
    )}>
      {children}
    </Suspense>
  );
}

function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  _displayName?: string
) {
  const LazyComponent = lazy(importFn);
  return LazyComponent;
}

export const LazyFleet = createLazyComponent(
  () => import('../components/layout/Fleet').then(m => ({ default: m.Fleet }))
);

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