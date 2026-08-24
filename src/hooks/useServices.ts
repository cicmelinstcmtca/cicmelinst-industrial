import { useMemo } from 'react';
import { services, getServiceById, serviceIds } from '../data';

export function useServices() {
  return useMemo(() => services, []);
}

export function useService(id: string) {
  return useMemo(() => getServiceById(id), [id]);
}

export function useServiceIds() {
  return useMemo(() => serviceIds, []);
}