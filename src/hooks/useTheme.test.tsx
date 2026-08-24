import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock localStorage before importing the hook
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

vi.stubGlobal('localStorage', localStorageMock);

import { useTheme } from '../hooks/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark-mode', 'light-mode', 'scada-mode');
  });

  it('returns dark theme by default', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('toggles theme from dark to light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    expect(result.current.isLight).toBe(true);
  });

  it('toggles theme from light to scada', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme()); // dark -> light
    act(() => result.current.toggleTheme()); // light -> scada
    expect(result.current.theme).toBe('scada');
    expect(result.current.isScada).toBe(true);
  });

  it('toggles theme from scada to dark', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme()); // dark -> light
    act(() => result.current.toggleTheme()); // light -> scada
    act(() => result.current.toggleTheme()); // scada -> dark
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('sets specific theme modes', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setDark());
    expect(result.current.theme).toBe('dark');
    act(() => result.current.setLight());
    expect(result.current.theme).toBe('light');
    act(() => result.current.setScada());
    expect(result.current.theme).toBe('scada');
  });

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setLight());
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cicmelinst-theme', 'light');
  });

  it('applies theme to document element', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setScada());
    expect(document.documentElement.getAttribute('data-theme')).toBe('scada');
    expect(document.documentElement.classList.contains('scada-mode')).toBe(true);
  });
});