import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function usePrefersContrast(): 'more' | 'less' | 'no-preference' {
  const [contrast, setContrast] = useState<'more' | 'less' | 'no-preference'>('no-preference');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    if (mediaQuery.matches) {
      setContrast('more');
    } else {
      const lessQuery = window.matchMedia('(prefers-contrast: less)');
      setContrast(lessQuery.matches ? 'less' : 'no-preference');
    }
  }, []);

  return contrast;
}

export function useColorScheme(): 'dark' | 'light' | 'no-preference' {
  const [scheme, setScheme] = useState<'dark' | 'light' | 'no-preference'>('no-preference');

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setScheme(darkQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => setScheme(e.matches ? 'dark' : 'light');
    darkQuery.addEventListener('change', handler);
    return () => darkQuery.removeEventListener('change', handler);
  }, []);

  return scheme;
}