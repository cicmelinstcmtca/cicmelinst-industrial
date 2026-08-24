import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, Footer, Hero, About } from './components/layout';
import { useTheme, useCompany } from './hooks';
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
  const company = useCompany();
  const [woNumber] = useState(() => generateWorkOrderNumber());
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleSectionNavigate = useCallback((section: string) => {
    const targetId = section as SectionId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
      <Header onSectionNavigate={handleSectionNavigate} />

      <main>
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

      {/* WhatsApp Floating Button */}
      <motion.a
        href={`https://wa.me/${company.whatsapp}?text=Hola%2C%20me%20interesa%20un%20presupuesto%20de%20sus%20servicios.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" style={{ animationDuration: '3s' }} />
        {/* Button */}
        <div className="relative flex items-center gap-3 pl-4 pr-5 py-3 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-sm font-semibold hidden sm:inline" style={{ fontFamily: 'var(--font-family-display)' }}>Escríbanos</span>
        </div>
      </motion.a>

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
