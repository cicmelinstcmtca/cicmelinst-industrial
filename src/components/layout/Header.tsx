import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight - winH;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
      let current = 'hero';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) current = section.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = useCallback((id: string) => {
    onSectionNavigate?.(id);
    setMobileOpen(false);
  }, [onSectionNavigate]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const themeLabel = isDark ? 'Modo claro' : isLight ? 'Modo terminal' : 'Modo oscuro';

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--color-warn-orange)] to-[var(--color-warn-orange-glow)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg-control)]/95 backdrop-blur-md shadow-lg border-b border-[var(--color-border-panel)]/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo */}
            <button
              onClick={() => handleNav('hero')}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <img
                src={logo || '/logo.png'}
                alt={name}
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10 lg:h-12'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="hidden sm:block">
                <div className="text-sm lg:text-base font-bold text-[var(--color-text-primary)] tracking-tight" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {name}
                </div>
                <div className="text-[10px] lg:text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-widest">
                  Ingeniería Industrial
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-1 relative">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeSection === link.id
                      ? 'text-[var(--color-warn-orange)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)]'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--color-warn-orange)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
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
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] rounded-lg hover:bg-[var(--color-warn-orange-glow)] hover:shadow-lg hover:shadow-[var(--color-warn-orange)]/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
              >
                Cotizar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-panel)]"
                aria-label="Menú"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-[1.5px]' : ''}`} />
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-[1.5px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[var(--color-bg-control)]/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--color-bg-panel)] border-l border-[var(--color-border-panel)] shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Menú</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-control)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNav(link.id)}
                      className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === link.id
                          ? 'text-[var(--color-warn-orange)] bg-[var(--color-warn-orange)]/10'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-control)]'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-[var(--color-border-panel)]"
                >
                  <button
                    onClick={() => handleNav('contact')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] rounded-lg hover:bg-[var(--color-warn-orange-glow)] transition-all"
                  >
                    Solicitar Cotización
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
