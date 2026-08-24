import { useMemo } from 'react';
import { clientLogos, clientsTagline } from '../data';

export function useClients() {
  return useMemo(() => clientLogos, []);
}

export function useClientsTagline() {
  return useMemo(() => clientsTagline, []);
}