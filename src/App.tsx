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
  const { theme, mounted } = useTheme();
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
        <div className="text-center">
          <div className="animate-pulse flex items-center justify-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-warn-orange)]">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="text-sm font-mono text-[var(--color-text-primary)]">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg-control)]" data-theme={theme}>
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
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Error del Sistema</h1>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
              Ha ocurrido un error inesperado. Por favor, recargue la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] font-semibold rounded-lg hover:bg-[var(--color-warn-orange-glow)] transition-all"
            >
              Recargar
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
