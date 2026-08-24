import { motion } from 'motion/react';
import { SingleLineDiagram, DEFAULT_SUBSTATION_LAYOUT } from '../ui';
import { Button } from '../ui';
import { useCompany } from '../../hooks';

interface HeroProps {
  onSectionNavigate: (section: string) => void;
}

export function Hero({ onSectionNavigate }: HeroProps) {
  const { heroTitle, heroSubtitle, stats } = useCompany();

  const handleNodeClick = (section: string) => {
    onSectionNavigate(section);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-control"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 scanlines pointer-events-none" aria-hidden="true" />

      <div className="container-main relative z-10 px-4 py-20 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center min-h-[600px]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 radius-panel bg-panel/50 border border-panel/50"
            >
              <div className="flex items-center gap-1.5 text-insul-green">
                <span className="w-2 h-2 rounded-full bg-insul-green-glow animate-pulse" aria-hidden="true" />
                <span className="label-tag">SISTEMA OPERATIVO</span>
              </div>
              <span className="text-micro text-muted font-mono">Subestación Principal • 34.5/13.8 kV • 25 MVA</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h1 id="hero-title" className="text-display text-primary leading-none tracking-tight">
                {heroTitle}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-body-lg text-secondary max-w-xl leading-relaxed"
            >
              {heroSubtitle}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={() => onSectionNavigate('capabilities')}
                aria-label="Navegar a capacidades técnicas"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                INICIAR INSPECCIÓN TÉCNICA
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onSectionNavigate('contact')}
                aria-label="Generar orden de trabajo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                GENERAR ORDEN DE TRABAJO
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-panel/50"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gauge/50 radius-panel border border-panel/50">
                  <div className="text-mono-lg text-primary font-mono font-bold">{stat.value}</div>
                  <div className="text-micro text-muted font-mono uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            <div className="bg-gauge/30 border border-panel/50 radius-card p-4 lg:p-6 min-h-[500px]">
              <SingleLineDiagram
                nodes={DEFAULT_SUBSTATION_LAYOUT as any}
                onNodeClick={handleNodeClick}
                className="w-full h-full"
                showGrid={false}
              />

              <div className="mt-6 p-4 bg-panel/50 radius-panel border border-panel/50">
                <div className="flex flex-wrap items-center gap-4 text-micro text-muted font-mono">
                  <div className="flex items-center gap-2">
                    <kbd className="bg-gauge border border-panel/50 radius-panel px-2 py-1">Click</kbd>
                    <span>Navegar a sección</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="bg-gauge border border-panel/50 radius-panel px-2 py-1">Hover</kbd>
                    <span>Lecturas en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2 text-warn-orange">
                    <span className="w-2 h-2 rounded-full bg-warn-orange animate-pulse" aria-hidden="true" />
                    <span>Mantenimiento programado</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-micro text-muted font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="uppercase tracking-wider">DESCENDER PARA INSPECCIONAR</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}