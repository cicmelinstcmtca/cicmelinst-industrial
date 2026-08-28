import { motion } from 'motion/react';
import { useCompany, useCertifications } from '../../hooks';
import type { Certification } from '../../data/types';

export function Footer() {
  const company = useCompany();
  const certifications = useCertifications();

  return (
    <footer className="relative bg-[var(--color-bg-panel)] border-t border-[var(--color-border-panel)] overflow-hidden">
      {/* Top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-warn-orange)]/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-warn-orange)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        {/* Brand + Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <img src="/logo.png" alt={company.name} className="h-12 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <p className="text-xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
            {company.name}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Soluciones integrales de ingeniería, construcción, montaje y mantenimiento industrial para los sectores petrolero, petroquímico y energético.
          </p>
        </motion.div>

        {/* 3 Columns */}
        <div className="grid sm:grid-cols-3 gap-10 lg:gap-16 mb-14">
          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <h4 className="text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-5">Servicios</h4>
            <ul className="space-y-3">
              {[
                { name: 'Montaje Eléctrico', id: 'capabilities' },
                { name: 'Automatización', id: 'capabilities' },
                { name: 'Construcción Civil', id: 'capabilities' },
                { name: 'Instrumentación', id: 'capabilities' },
                { name: 'Mantenimiento', id: 'capabilities' },
              ].map((s) => (
                <li key={s.name}>
                  <button
                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--color-warn-orange)]/40 group-hover:bg-[var(--color-warn-orange)] transition-colors" />
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
            <h4 className="text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-5">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-warn-orange)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <span>{company.address}</span>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] whitespace-pre-line">{company.schedule}</div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {company.social.linkedin && (
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-pipe-blue-glow)] hover:border-[var(--color-pipe-blue-glow)]/30 hover:bg-[var(--color-pipe-blue-glow)]/5 transition-all duration-300" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              )}
              {company.social.instagram && (
                <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-alarm-red)] hover:border-[var(--color-alarm-red)]/30 hover:bg-[var(--color-alarm-red)]/5 transition-all duration-300" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                  <span className="text-xs font-medium">Instagram</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-5">Certificaciones</h4>
            <ul className="space-y-3">
              {certifications.map((cert: Certification) => (
                <li key={cert.name} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                  <div className="w-6 h-6 rounded-md bg-[var(--color-insul-green)]/10 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  </div>
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
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-insul-green)] animate-pulse" />
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Operando en Venezuela</span>
              </div>
              <span className="text-[10px] text-[var(--color-text-muted)]/40 font-mono">Ingeniería que Energiza</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
