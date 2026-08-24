import { describe, it, expect } from 'vitest';
import {
  clamp,
  lerp,
  mapRange,
  formatNumber,
  formatEngineering,
  generateWorkOrderNumber,
  debounce,
  throttle,
  getInitials,
  slugify,
  parseCSV,
} from './helpers';

describe('helpers', () => {
  describe('clamp', () => {
    it('clamps value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('lerp', () => {
    it('interpolates between a and b', () => {
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 1)).toBe(10);
    });
  });

  describe('mapRange', () => {
    it('maps value from one range to another', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
      expect(mapRange(0, -10, 10, 0, 1)).toBe(0.5);
    });
  });

  describe('formatNumber', () => {
    it('formats number with locale', () => {
      expect(formatNumber(1000)).toBe('1.000');
      expect(formatNumber(1234.56, 2)).toBe('1.234,56');
    });
  });

  describe('formatEngineering', () => {
    it('formats engineering notation', () => {
      expect(formatEngineering(1500, 'V')).toBe('1.5 kV');
      expect(formatEngineering(2500000, 'W')).toBe('2.5 MW');
      expect(formatEngineering(500, 'A')).toBe('500.0 A');
    });
  });

  describe('generateWorkOrderNumber', () => {
    it('generates valid work order format', () => {
      const wo = generateWorkOrderNumber();
      expect(wo).toMatch(/^OT-\d{8}-\d{4}$/);
    });
  });

  describe('debounce', () => {
    it('delays function execution', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);
      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();
      await new Promise(r => setTimeout(r, 100));
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits function execution rate', async () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 50);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
      await new Promise(r => setTimeout(r, 100));
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('getInitials', () => {
    it('extracts initials from name', () => {
      expect(getInitials('Juan Amaya')).toBe('JA');
      expect(getInitials('María José Rodríguez')).toBe('MJ');
      expect(getInitials('A')).toBe('A');
    });
  });

  describe('slugify', () => {
    it('creates URL-friendly slug', () => {
      expect(slugify('CICMELINST C.A.')).toBe('cicmelinst-c-a');
      expect(slugify('Ingeniería Eléctrica')).toBe('ingenieria-electrica');
      expect(slugify('  Test  Case  ')).toBe('test-case');
    });
  });

  describe('parseCSV', () => {
    it('parses CSV string', () => {
      const csv = 'a,b,c\n1,2,3\n4,5,6';
      expect(parseCSV(csv)).toEqual([
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['4', '5', '6'],
      ]);
    });
  });
});