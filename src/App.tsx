import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, Footer, Hero, About } from './components/layout';
import { useTheme } from './hooks';
import { generateWorkOrderNumber } from './utils/helpers';
import { LazyLoad, LazyProjects, LazyCapabilities, LazyTeam, LazyContact } from './components/LazyLoad';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MarqueeSection } from './components/ui';

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'capabilities', label: 'Servicios' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'about', label: 'Nosotros' },
  { id: 'clients', label: 'Clientes' },
  { id: 'contact', label: 'Contacto' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

function AppContent() {
  const { mounted } = useTheme();
  const [woNumber] = useState(() => generateWorkOrderNumber());
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleSectionNavigate = useCallback((section: string) => {
    const targetId = section as SectionId;
    const attempt = (retries = 0) => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (retries < 10) {
        setTimeout(() => attempt(retries + 1), 200);
      }
    };
    attempt();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[100dvh] bg-[var(--color-bg-control)] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.img
            src="/logo.png"
            alt="CICMELINST"
            className="h-16 mx-auto mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-48 h-1 bg-[var(--color-border-panel)] rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-warn-orange)] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
          <p className="mt-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
            Iniciando sistema...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg-control)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-warn-orange)] focus:text-[var(--color-bg-control)] focus:rounded-lg focus:font-semibold">
        Saltar al contenido
      </a>
      <Header onSectionNavigate={handleSectionNavigate} />

      <main id="main">
        <ErrorBoundary sectionName="Hero">
          <Hero onSectionNavigate={handleSectionNavigate} />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Servicios">
          <LazyLoad>
            <LazyCapabilities />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary sectionName="Proyectos">
          <LazyLoad>
            <LazyProjects />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary sectionName="Nosotros">
          <About />
        </ErrorBoundary>

        <div>
          <MarqueeSection />
        </div>

        <ErrorBoundary sectionName="Equipo">
          <LazyLoad>
            <LazyTeam />
          </LazyLoad>
        </ErrorBoundary>

        <ErrorBoundary sectionName="Contacto">
          <LazyLoad>
            <LazyContact />
          </LazyLoad>
        </ErrorBoundary>
      </main>

      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-warn-orange)] hover:bg-[var(--color-warn-orange)]/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed bottom-2 left-2 z-10 text-[10px] text-[var(--color-text-muted)]/30 font-mono select-none pointer-events-none">
        WO: {woNumber}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-[100dvh] bg-[var(--color-bg-control)] flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--color-alarm-red)]/5 border border-[var(--color-alarm-red)]/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-alarm-red)" strokeWidth="1.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>Error del Sistema</h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              Ha ocurrido un error inesperado. Por favor, intente de nuevo.
            </p>
            <button
              onClick={() => window.location.reload()}
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
      }
    >
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
