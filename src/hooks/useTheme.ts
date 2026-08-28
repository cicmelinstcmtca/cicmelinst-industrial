import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';

const THEME_KEY = 'cicmelinst-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(THEME_KEY) as Theme | null;
        if (stored) return stored;
      } catch { /* localStorage unavailable */ }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(THEME_KEY) as Theme | null;
      if (stored) {
        setTheme(stored);
      }
    } catch { /* localStorage unavailable */ }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch { /* localStorage unavailable */ }

    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(`${theme}-mode`);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setThemeMode = useCallback((mode: Theme) => {
    setTheme(mode);
  }, []);

  const setDark = useCallback(() => setTheme('dark'), []);
  const setLight = useCallback(() => setTheme('light'), []);

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    setDark,
    setLight,
    isDark,
    isLight,
    mounted,
  };
}