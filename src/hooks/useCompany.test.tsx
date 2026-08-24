import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCompany, useCompanyMetrics, useCompanyValues, useCompanyTimeline } from '../hooks/useCompany';

describe('useCompany', () => {
  it('returns company config', () => {
    const { result } = renderHook(() => useCompany());
    expect(result.current).toBeDefined();
    expect(result.current.name).toBe('CICMELINST, C.A.');
    expect(result.current.tagline).toBe('Ingeniería que Energiza Venezuela');
    expect(result.current.heroTitle).toContain('infraestructura');
  });

  it('returns metrics', () => {
    const { result } = renderHook(() => useCompanyMetrics());
    expect(result.current).toHaveLength(4);
    expect(result.current[0]).toEqual({ value: 14, suffix: '+', label: 'Años de experiencia', icon: 'Clock' });
  });

  it('returns values', () => {
    const { result } = renderHook(() => useCompanyValues());
    expect(result.current).toHaveLength(3);
    expect(result.current.map(v => v.title)).toEqual(['Compromiso', 'Calidad', 'Seguridad']);
  });

  it('returns timeline', () => {
    const { result } = renderHook(() => useCompanyTimeline());
    expect(result.current).toHaveLength(5);
    expect(result.current[0].year).toBe(2012);
    expect(result.current[4].year).toBe(2026);
  });
});