import { motion } from 'motion/react';
import { useCompany, useCertifications } from '../../hooks';
import type { Certification } from '../../data/types';

export function Footer() {
  const company = useCompany();
  const certifications = useCertifications();

  return (
    <footer className="bg-[var(--color-bg-panel)] border-t border-[var(--color-border-panel)]">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-warn-orange)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <img src="/logo.png" alt={company.name} className="h-14 mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
            {company.name}
          </p>
          <p className="text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest">
            Ingeniería que Energiza Venezuela
          </p>
        </motion.div>

        {/* 3 Columns */}
        <div className="grid sm:grid-cols-3 gap-10 mb-14">
          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Servicios</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Montaje Eléctrico', href: 'capabilities' },
                { name: 'Automatización', href: 'capabilities' },
                { name: 'Construcción Civil', href: 'capabilities' },
                { name: 'Instrumentación', href: 'capabilities' },
                { name: 'Mantenimiento', href: 'capabilities' },
              ].map((s) => (
                <li key={s.name}>
                  <button
                    onClick={() => document.getElementById(s.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-warn-orange)] hover:pl-1 transition-all duration-200 cursor-pointer"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {company.address}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] whitespace-pre-line mt-2">{company.schedule}</div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-5">
              {company.social.linkedin && (
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-pipe-blue-glow)] hover:border-[var(--color-pipe-blue-glow)]/30 hover:bg-[var(--color-pipe-blue-glow)]/10 transition-all duration-300" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {company.social.instagram && (
                <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-alarm-red)] hover:border-[var(--color-alarm-red)]/30 hover:bg-[var(--color-alarm-red)]/10 transition-all duration-300" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                </a>
              )}
            </div>
          </motion.div>

          {/* Legal + Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Certificaciones</h4>
            <ul className="space-y-2">
              {certifications.map((cert: Certification) => (
                <li key={cert.name} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  {cert.name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border-panel)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              &copy; {new Date().getFullYear()} {company.name}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-insul-green)] animate-pulse" />
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono">Operando en Venezuela</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
