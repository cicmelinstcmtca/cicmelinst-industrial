import { useState, useEffect } from 'react';
import { useTheme, useCompany } from '../../hooks';

interface HeaderProps {
  onSectionNavigate?: (section: string) => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'capabilities', label: 'Servicios' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'about', label: 'Nosotros' },
  { id: 'clients', label: 'Clientes' },
  { id: 'contact', label: 'Contacto' },
] as const;

export function Header({ onSectionNavigate }: HeaderProps) {
  const { toggleTheme, isDark, isLight } = useTheme();
  const { name, logo } = useCompany();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    onSectionNavigate?.(id);
    setMobileOpen(false);
  };

  const themeLabel = isDark ? 'Modo claro' : isLight ? 'Modo SCADA' : 'Modo oscuro';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg-control)]/95 backdrop-blur-md shadow-lg border-b border-[var(--color-border-panel)]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo || '/logo.png'}
              alt={name}
              className="h-10 lg:h-12 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="hidden sm:block">
              <div className="text-sm lg:text-base font-bold text-[var(--color-text-primary)] font-[var(--font-family-display)] tracking-tight">
                {name}
              </div>
              <div className="text-[10px] lg:text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-widest">
                Ingeniería Industrial
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-[var(--color-bg-panel)]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)] transition-all"
              aria-label={themeLabel}
              title={themeLabel}
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" fill="var(--color-warn-orange)" stroke="var(--color-warn-orange)" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="var(--color-warn-orange)" />
                </svg>
              ) : isLight ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              )}
            </button>

            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] rounded-lg hover:bg-[var(--color-warn-orange-glow)] transition-all"
            >
              Cotizar
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)]"
              aria-label="Menú"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[var(--color-bg-control)]/98 backdrop-blur-md border-t border-[var(--color-border-panel)]">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="block w-full mt-2 px-4 py-3 text-sm font-semibold text-center bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] rounded-lg"
            >
              Solicitar Cotización
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
