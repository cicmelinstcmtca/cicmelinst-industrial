import { Badge } from '../ui';
import { useCompany, useCertifications } from '../../hooks';

export function Footer() {
  const { name, tagline, phoneDisplay, whatsapp, schedule, social, foundationYear, email } = useCompany();
  const certifications = useCertifications();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-control border-t border-panel/50 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="container-main relative">
        <div className="py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 radius-panel bg-warn-orange flex items-center justify-center font-display font-bold text-2xl text-bg-control">
                C
              </div>
              <div>
                <div className="text-title text-primary font-bold tracking-tight">{name}</div>
                <div className="text-micro text-muted font-mono">{tagline}</div>
                <div className="text-micro text-muted font-mono">RIF: J-40063361-3</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-micro text-muted font-mono">
              {certifications.map((cert, i) => (
                <Badge key={i} variant="default" className="bg-insul-green/20 text-insul-green border-insul-green/30">
                  {cert.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="text-micro text-muted font-mono uppercase tracking-wider mb-3">UBICACIONES</h4>
              <address className="not-italic text-small text-secondary space-y-2 leading-relaxed">
                <div className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-muted" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>San José de Guanipa, Edo. Anzoátegui</span>
                </div>
                <div className="flex items-start gap-2 ml-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-muted" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Pariaguán, Edo. Anzoátegui</span>
                </div>
                <div className="flex items-start gap-2 ml-6 opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-muted" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Lechería (Próximamente)</span>
                </div>
              </address>
            </div>

            <div>
              <h4 className="text-micro text-muted font-mono uppercase tracking-wider mb-3">CONTACTO</h4>
              <div className="space-y-2 text-small text-secondary">
                <a href={`tel:${whatsapp}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{phoneDisplay}</span>
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>{email}</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-micro text-muted font-mono uppercase tracking-wider mb-3">HORARIO DE OPERACIÓN</h4>
              <div className="space-y-2 text-small text-secondary font-mono">
                {schedule.split('\n').map((line, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{line.split(':')[0]}</span>
                    <span className="text-primary">{line.split(':').slice(1).join(':')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-micro text-muted font-mono uppercase tracking-wider mb-3">SISTEMA</h4>
              <div className="space-y-2 text-small text-secondary font-mono">
                <div className="flex justify-between">
                  <span>Versión</span>
                  <span className="text-primary">v2.6.1</span>
                </div>
                <div className="flex justify-between">
                  <span>Fundada</span>
                  <span className="text-primary">{foundationYear}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime</span>
                  <span className="text-insul-green">99.97%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-panel/50 flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-micro text-muted font-mono">
              © {currentYear} {name} — Todos los derechos reservados
            </p>

            <div className="flex items-center gap-6 text-micro text-muted font-mono">
              <a href={social.linkedin} className="hover:text-primary transition-colors" target="_blank" rel="noopener">LinkedIn</a>
              <a href={social.instagram} className="hover:text-primary transition-colors" target="_blank" rel="noopener">Instagram</a>
              <a href={social.youtube} className="hover:text-primary transition-colors" target="_blank" rel="noopener">YouTube</a>
            </div>

            <div className="flex items-center gap-2 text-micro text-muted font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-insul-green animate-pulse" aria-hidden="true" />
                SISTEMA OPERATIVO
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}