import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useCompany, useCountUp } from '../../hooks';

/* ─── Bloque 1: Hero Narrativo ─── */
function AboutHero() {
  const { aboutTitle, aboutText } = useCompany();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src="/images/about-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-control)] via-[var(--color-bg-control)]/70 to-[var(--color-bg-control)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-control)]/90 via-[var(--color-bg-control)]/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-6"
          >
            Nuestra Historia
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {aboutTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl"
          >
            {aboutText[0]}
          </motion.p>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { value: '14+', label: 'Años' },
              { value: '100+', label: 'Proyectos' },
              { value: '3', label: 'Bases' },
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[var(--color-warn-orange)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {stat.value}
                </span>
                <span className="text-sm text-[var(--color-text-muted)] font-mono uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Descubra</span>
        <motion.div
          className="w-px h-6 bg-[var(--color-warn-orange)]"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Bloque 2: Timeline "Línea de Vida" ─── */
function LifeTimeline() {
  const { timeline } = useCompany();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = 320;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, timeline.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [timeline.length]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-32 bg-[var(--color-bg-panel)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
            >
              Línea de Vida
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              Nuestra Trayectoria
            </motion.h2>
          </div>

          {/* Year Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden sm:flex items-baseline gap-2"
          >
            <span className="text-5xl font-bold text-[var(--color-warn-orange)]" style={{ fontFamily: 'var(--font-family-display)' }}>
              {timeline[activeIndex]?.year}
            </span>
            <span className="text-sm text-[var(--color-text-muted)] font-mono">/ {new Date().getFullYear()}</span>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1 bg-[var(--color-bg-control)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-warn-orange)] to-[var(--color-warn-orange-glow)]"
              animate={{ width: `${((activeIndex + 1) / timeline.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {timeline.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`text-xs font-mono transition-colors ${
                  i === activeIndex ? 'text-[var(--color-warn-orange)]' : 'text-[var(--color-text-muted)]'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex-shrink-0 w-[300px] snap-center p-6 rounded-2xl border transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-[var(--color-bg-control)] border-[var(--color-warn-orange)]/50 shadow-lg shadow-[var(--color-warn-orange)]/10'
                  : 'bg-[var(--color-bg-control)]/50 border-[var(--color-border-panel)] hover:border-[var(--color-border-panel)]'
              }`}
            >
              {/* Year */}
              <div className="text-4xl font-bold text-[var(--color-warn-orange)]/20 mb-3" style={{ fontFamily: 'var(--font-family-display)' }}>
                {item.year}
              </div>

              {/* Dot */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-2 h-2 rounded-full ${i === activeIndex ? 'bg-[var(--color-warn-orange)]' : 'bg-[var(--color-text-muted)]'}`} />
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {item.title}
                </h3>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bloque 3: Pilares Industriales ─── */
function IndustrialPillars() {
  const { values } = useCompany();

  const pillarColors = [
    { accent: 'var(--color-warn-orange)', glow: 'rgba(255,102,0,0.15)', bg: 'rgba(255,102,0,0.05)' },
    { accent: 'var(--color-pipe-blue-glow)', glow: 'rgba(0,153,255,0.15)', bg: 'rgba(0,153,255,0.05)' },
    { accent: 'var(--color-insul-green)', glow: 'rgba(0,153,68,0.15)', bg: 'rgba(0,153,68,0.05)' },
  ];

  const pillarIcons = [
    // Compromiso - Mano con checkbox
    <svg key="c" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>,
    // Calidad - Estrella
    <svg key="q" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>,
    // Seguridad - Escudo
    <svg key="s" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
  ];

  const heights = ['min-h-[320px]', 'min-h-[280px]', 'min-h-[300px]'];

  return (
    <section className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Nuestros Pilares
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Los valores que nos definen
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {values.map((value, i) => {
            const color = pillarColors[i % pillarColors.length];
            const icon = pillarIcons[i % pillarIcons.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`group relative rounded-2xl border border-[var(--color-border-panel)] overflow-hidden transition-all duration-500 hover:shadow-2xl ${heights[i % heights.length]}`}
                style={{
                  background: `linear-gradient(180deg, ${color.bg} 0%, var(--color-bg-panel) 100%)`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center bottom, ${color.glow}, transparent 70%)` }}
                />

                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ backgroundColor: color.bg, color: color.accent }}
                  >
                    {icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-family-display)' }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                    {value.text}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 pt-4 border-t border-[var(--color-border-panel)]">
                    <div className="h-1 w-12 rounded-full transition-all duration-300 group-hover:w-full" style={{ backgroundColor: color.accent }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Bloque 4: Métricas con Contador Animado ─── */
function AnimatedMetrics() {
  const { metrics } = useCompany();

  const metricIcons = [
    // Clock
    <svg key="clock" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>,
    // Building
    <svg key="building" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>,
    // Truck
    <svg key="truck" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>,
    // MapPin
    <svg key="map" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>,
  ];

  return (
    <section className="py-16 bg-[var(--color-bg-panel)] border-y border-[var(--color-border-panel)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} icon={metricIcons[i % metricIcons.length]} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric, icon, delay }: { metric: { value: number; suffix: string; label: string }; icon: React.ReactNode; delay: number }) {
  const { count, ref } = useCountUp(metric.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative text-center p-6"
    >
      {/* Icon */}
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[var(--color-warn-orange)]/10 flex items-center justify-center text-[var(--color-warn-orange)]">
        {icon}
      </div>

      {/* Number */}
      <div className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
        {count}{metric.suffix}
      </div>

      {/* Label */}
      <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-widest">
        {metric.label}
      </div>

      {/* Separator (not on last) */}
      {delay < 0.3 && (
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[var(--color-border-panel)]" />
      )}
    </motion.div>
  );
}

/* ─── Bloque 5: Mapa de Capacidades ─── */
function CapabilitiesMap() {
  const sectors = [
    { name: 'Petrolero', image: '/images/hero-1.jpg', detail: '15+ proyectos en refinación y extracción' },
    { name: 'Petroquímico', image: '/images/hero-2.jpg', detail: 'Plantas de procesamiento y almacenamiento' },
    { name: 'Energético', image: '/images/hero-3.jpg', detail: 'Subestaciones y distribución eléctrica' },
    { name: 'Civil Industrial', image: '/images/hero-4.jpg', detail: 'Infraestructura y obras complementarias' },
    { name: 'Instrumentación', image: '/images/hero-5.jpg', detail: 'Calibración y sistemas de control' },
    { name: 'Logística', image: '/images/about-bg.jpg', detail: 'Flota de 24 vehículos operativos' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Sectores
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Dónde operamos
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={sector.image}
                alt={sector.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-control)] via-[var(--color-bg-control)]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {sector.name}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {sector.detail}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[var(--color-warn-orange)]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-warn-orange)" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main About Component ─── */
export function About() {
  return (
    <section id="about">
      <AboutHero />
      <LifeTimeline />
      <IndustrialPillars />
      <AnimatedMetrics />
      <CapabilitiesMap />
    </section>
  );
}
