import { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header, Footer, Hero } from './components/layout';
import { MarqueeSection } from './components/ui';
import { useTheme } from './hooks';
import { generateWorkOrderNumber } from './utils/helpers';
import { LazyLoad, LazyFleet, LazyProjects, LazyCapabilities, LazyTeam, LazyContact } from './components/LazyLoad';

const SECTIONS = [
  { id: 'hero', label: 'ESQUEMA' },
  { id: 'capabilities', label: 'CAPACIDADES' },
  { id: 'projects', label: 'BITÁCORA' },
  { id: 'fleet', label: 'FLOTA' },
  { id: 'team', label: 'TURNO' },
  { id: 'contact', label: 'ÓRDENES' },
  { id: 'clients', label: 'SOCIOS' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

function App() {
  const { theme, mounted } = useTheme();
  const [woNumber] = useState(() => generateWorkOrderNumber());

  const handleSectionNavigate = useCallback((section: string) => {
    const targetId = section as SectionId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    SECTIONS.forEach(section => {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= scrollPosition) {
        // newActive logic could be used for future active section tracking
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!mounted) {
    return (
      <div className="min-h-[100dvh] bg-control flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse flex items-center justify-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warn-orange" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="text-mono font-mono text-primary">INICIALIZANDO SISTEMA SCADA...</span>
          </div>
          <div className="text-micro text-muted font-mono">CICMELINST C.A. — v2.6.1</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-control" data-theme={theme}>
      <Header onSectionNavigate={handleSectionNavigate} />

      <main id="main-content" className="pt-20 lg:pt-24" role="main">
        <Hero onSectionNavigate={handleSectionNavigate} />

        <MarqueeSection />

        <LazyLoad>
          <LazyCapabilities />
        </LazyLoad>

        <LazyLoad>
          <LazyProjects />
        </LazyLoad>

        <LazyLoad>
          <LazyFleet />
        </LazyLoad>

        <LazyLoad>
          <LazyTeam />
        </LazyLoad>

        <LazyLoad>
          <LazyContact />
        </LazyLoad>
      </main>

      <Footer />

      <motion.button
        className="fixed bottom-6 right-6 z-[40] p-3 radius-panel bg-panel border border-panel/50 hover:border-warn-orange hover:bg-warn-orange/10 transition-all shadow-modal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-200px' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver al esquema principal"
        style={{ display: window.scrollY > 300 ? 'flex' : 'none' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </motion.button>

      <div className="fixed bottom-2 left-2 z-[10] text-micro text-muted/50 font-mono select-none pointer-events-none">
        WO: {woNumber}
      </div>
    </div>
  );
}

export default App;