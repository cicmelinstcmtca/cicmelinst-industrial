import { motion } from 'motion/react';
import { useCompany } from '../../hooks';

export function About() {
  const { aboutTitle, aboutText, values, timeline, metrics } = useCompany();

  return (
    <section id="about" className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Sobre Nosotros
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {aboutTitle}
          </motion.h2>
        </div>

        {/* Description + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {aboutText.map((text, i) => (
              <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed">
                {text}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-border-panel)]">
              <img
                src="/images/about-bg.jpg"
                alt="Instalaciones CICMELINST"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-[var(--color-warn-orange)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                14+
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">
                Años operando
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-xl hover:border-[var(--color-pipe-blue-glow)]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--color-warn-orange)]/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-warn-orange)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                {value.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
              Nuestra Trayectoria
            </h3>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-panel)] sm:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-8 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-[var(--color-warn-orange)] border-4 border-[var(--color-bg-control)] -translate-x-1.5 sm:-translate-x-1.5 z-10" />

                {/* Content */}
                <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                  <div className="text-sm font-mono text-[var(--color-warn-orange)] mb-1">{item.year}</div>
                  <h4 className="text-base font-semibold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-xl"
            >
              <div className="text-3xl lg:text-4xl font-bold text-[var(--color-warn-orange)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                {metric.value}{metric.suffix}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider mt-2">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
