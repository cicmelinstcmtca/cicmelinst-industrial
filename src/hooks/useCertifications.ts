import { useMemo } from 'react';
import { certifications } from '../data';

export function useCertifications() {
  return useMemo(() => certifications, []);
}