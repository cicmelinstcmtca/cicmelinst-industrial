import { motion } from 'motion/react';
import { useClients } from '../../hooks';

const CERTIFICATIONS = [
  { label: 'Certificación SIHO', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { label: 'Normativa PDVSA', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Retie / Retilap', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: '+14 Años', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export function ClientesPremium() {
  const clients = useClients();

  return (
    <section className="py-20 lg:py-32 bg-[var(--color-bg-panel)] relative overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, var(--color-text-muted) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Nuestros Clientes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            La confianza de quienes nos eligen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto"
          >
            Empresas que han confiado en nuestra capacidad técnica para sus proyectos industriales.
          </motion.p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] hover:border-[var(--color-warn-orange)]/30 hover:shadow-[0_0_30px_rgba(255,102,0,0.08)] transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-[var(--color-warn-orange)]/5 to-transparent" />

              <div className="relative flex items-center justify-center h-16 lg:h-20">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain opacity-30 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Client name on hover */}
              <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">{client.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 lg:gap-10 pt-8 border-t border-[var(--color-border-panel)]/50"
        >
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.label} className="flex items-center gap-2.5 text-xs text-[var(--color-text-muted)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-insul-green)]/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="1.5">
                  <path d={cert.icon} />
                </svg>
              </div>
              <span className="font-mono uppercase tracking-wider">{cert.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
