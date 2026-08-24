import { useState, useEffect } from 'react';
import { useTheme } from '../../hooks';
import { useCompany } from '../../hooks';

interface HeaderProps {
  onSectionNavigate?: (section: string) => void;
}

export function Header({ onSectionNavigate }: HeaderProps) {
  const { toggleTheme, isDark, isLight } = useTheme();
  const { name, tagline, logo } = useCompany();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'ESQUEMA', section: 'hero' },
    { id: 'capabilities', label: 'CAPACIDADES', section: 'capabilities' },
    { id: 'projects', label: 'BITÁCORA', section: 'projects' },
    { id: 'fleet', label: 'FLOTA', section: 'fleet' },
    { id: 'team', label: 'TURNO', section: 'team' },
    { id: 'contact', label: 'ÓRDENES', section: 'contact' },
    { id: 'clients', label: 'SOCIOS', section: 'clients' },
  ];

  const getThemeIcon = () => {
    if (isDark) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="5" stroke="var(--color-warn-orange)" strokeWidth="2" fill="var(--color-warn-orange)" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="var(--color-warn-orange)" strokeWidth="2" />
        </svg>
      );
    }
    if (isLight) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="var(--color-pipe-blue-glow)" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="var(--color-pipe-blue-glow)" strokeWidth="2" fill="none" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--color-insul-green-glow)" strokeWidth="2" />
        <path d="M8 21h8M12 17v4" stroke="var(--color-insul-green-glow)" strokeWidth="2" />
        <line x1="8" y1="21" x2="8" y2="17" stroke="var(--color-insul-green-glow)" strokeWidth="2" />
        <line x1="16" y1="21" x2="16" y2="17" stroke="var(--color-insul-green-glow)" strokeWidth="2" />
      </svg>
    );
  };

  const getThemeLabel = () => {
    if (isDark) return 'Cambiar a modo día';
    if (isLight) return 'Cambiar a modo SCADA (terminal verde)';
    return 'Cambiar a modo noche (SCADA dark)';
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[50]
        bg-control/80 backdrop-blur-xl border-b border-panel/50
        transition-all duration-300
        ${scrolled ? 'shadow-glow-blue border-panel' : ''}
      `}
      role="banner"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20 lg:h-24 gap-4">
          <div className="flex items-center gap-3 flex-shrink-0" aria-label={name}>
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <div className="w-10 h-10 radius-panel bg-warn-orange flex items-center justify-center font-display font-bold text-lg text-bg-control">
                C
              </div>
            )}
            <div className="hidden lg:block">
              <div className="text-title text-primary font-bold tracking-tight">{name}</div>
              <div className="text-micro text-muted font-mono">{tagline}</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Navegación principal">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onSectionNavigate?.(item.section)}
                className={`
                  px-4 py-2 radius-panel text-small font-medium font-mono uppercase tracking-wider
                  transition-all duration-150
                  hover:bg-panel hover:text-primary
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warn-orange
                `}
                aria-current="false"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-4 text-micro font-mono">
              <div className="flex items-center gap-1.5 text-insul-green">
                <span className="w-2 h-2 rounded-full bg-insul-green-glow animate-pulse" aria-hidden="true" />
                <span>CONECTADO</span>
              </div>
              <div className="flex items-center gap-1.5 text-pipe-blue px-3 py-1 radius-panel bg-panel/50 border border-panel">
                34.5 kV
              </div>
              <div className="flex items-center gap-1.5 text-muted px-3 py-1 radius-panel bg-panel/50 border border-panel">
                23.4 °C
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 radius-panel bg-panel border border-panel hover:border-warn-orange hover:bg-panel/80 transition-all"
              aria-label={getThemeLabel()}
              aria-pressed={!isLight}
            >
              {getThemeIcon()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 radius-panel bg-panel border border-panel hover:border-warn-orange"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className="lg:hidden overflow-hidden border-t border-panel/50 bg-control/95 backdrop-blur-xl z-[50]"
          style={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'height 0.3s ease, opacity 0.3s ease'
          }}
          role="navigation"
          aria-label="Menú móvil"
        >
          <div className="py-4 space-y-1 px-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onSectionNavigate?.(item.section); setMobileMenuOpen(false); }}
                className="w-full px-4 py-3 radius-panel text-left text-body font-medium hover:bg-panel transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}