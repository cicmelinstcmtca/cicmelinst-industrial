import { useCompany, useCertifications, useClients } from '../../hooks';
import type { Certification, Client } from '../../data/types';

export function Footer() {
  const company = useCompany();
  const certifications = useCertifications();
  const clients = useClients();

  return (
    <footer className="bg-[var(--color-bg-panel)] border-t border-[var(--color-border-panel)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt={company.name} className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>{company.name}</div>
                <div className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase tracking-widest">Ingeniería Industrial</div>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Soluciones integrales de ingeniería, construcción, montaje y mantenimiento industrial.
            </p>
            <div className="flex gap-3">
              {company.social.linkedin && (
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--color-bg-control)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-gauge)] transition-colors" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {company.social.instagram && (
                <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--color-bg-control)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-gauge)] transition-colors" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Servicios</h4>
            <ul className="space-y-2">
              {['Montaje Eléctrico', 'Automatización', 'Construcción Civil', 'Instrumentación'].map((s) => (
                <li key={s}>
                  <span className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {company.address}
              </div>
              <a href={`tel:${company.phone.replace(/[\s-]/g, '')}`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-warn-orange)] transition-colors group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 group-hover:stroke-[var(--color-warn-orange)]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-pipe-blue-glow)] transition-colors group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 group-hover:stroke-[var(--color-pipe-blue-glow)]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                {company.email}
              </a>
              <div className="text-xs text-[var(--color-text-muted)] whitespace-pre-line mt-2">{company.schedule}</div>
              <a
                href={`https://wa.me/${company.whatsapp}?text=Hola%2C%20me%20interesa%20un%20presupuesto%20de%20sus%20servicios.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-2.5 bg-[#25D366]/10 text-[#25D366] text-sm font-medium rounded-lg border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Certificaciones</h4>
            <ul className="space-y-2">
              {certifications.map((cert: Certification) => (
                <li key={cert.name} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  {cert.name}
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 mt-6 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-display)' }}>Clientes</h4>
            <div className="flex flex-wrap gap-2">
              {clients.slice(0, 4).map((c: Client) => (
                <span key={c.name} className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--color-bg-control)] text-[var(--color-text-muted)] border border-[var(--color-border-panel)]">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border-panel)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {company.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]/50 font-mono">
            Ingeniería que Energiza Venezuela
          </p>
        </div>
      </div>
    </footer>
  );
}
