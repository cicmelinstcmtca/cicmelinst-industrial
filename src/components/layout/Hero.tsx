import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCompany } from '../../hooks';

interface HeroProps {
  onSectionNavigate: (section: string) => void;
}

const HERO_IMAGES = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
];

const STATS = [
  { value: '14+', label: 'Años de Experiencia' },
  { value: '100+', label: 'Proyectos Ejecutados' },
  { value: '24', label: 'Vehículos Operativos' },
  { value: '3', label: 'Bases Operativas' },
];

export function Hero({ onSectionNavigate }: HeroProps) {
  const company = useCompany();
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [nextImage, isPaused]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentImage]}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-control)]/95 via-[var(--color-bg-control)]/80 to-[var(--color-bg-control)]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-control)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-warn-orange)]/10 border border-[var(--color-warn-orange)]/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-insul-green)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-wider">
              Operando en Venezuela desde 2012
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--color-text-primary)] leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Ingeniería que{' '}
            <span className="text-[var(--color-warn-orange)]">Energiza</span>{' '}
            Venezuela
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl mb-8 leading-relaxed"
          >
            Soluciones integrales de ingeniería, construcción, montaje y
            mantenimiento industrial para los sectores petrolero, petroquímico
            y energético.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => onSectionNavigate('projects')}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] font-semibold rounded-lg hover:bg-[var(--color-warn-orange-glow)] hover:shadow-xl hover:shadow-[var(--color-warn-orange)]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              Ver Proyectos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => onSectionNavigate('contact')}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[var(--color-pipe-blue-glow)] text-[var(--color-pipe-blue-glow)] font-semibold rounded-lg hover:bg-[var(--color-pipe-blue-glow)] hover:text-[var(--color-bg-control)] hover:shadow-xl hover:shadow-[var(--color-pipe-blue-glow)]/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              Solicitar Cotización
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href={`tel:${company.phone.replace(/[\s-]/g, '')}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[var(--color-border-panel)] text-[var(--color-text-secondary)] font-semibold rounded-lg hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)]/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Llamar Ahora
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 rounded-full bg-[var(--color-bg-control)]/50 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors backdrop-blur-sm"
          aria-label={isPaused ? 'Reproducir carrusel' : 'Pausar carrusel'}
        >
          {isPaused ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
          )}
        </button>
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentImage
                ? 'bg-[var(--color-warn-orange)] w-8'
                : 'bg-[var(--color-text-muted)]/50 hover:bg-[var(--color-text-muted)]'
            }`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-[var(--color-text-muted)]/30"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
