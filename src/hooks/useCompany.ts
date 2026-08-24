import { useMemo } from 'react';
import { companyConfig, companyMetrics, companyValues, companyTimeline, companyStats, companyLogistics } from '../data';

export function useCompany() {
  return useMemo(() => companyConfig, []);
}

export function useCompanyMetrics() {
  return useMemo(() => companyMetrics, []);
}

export function useCompanyValues() {
  return useMemo(() => companyValues, []);
}

export function useCompanyTimeline() {
  return useMemo(() => companyTimeline, []);
}

export function useCompanyStats() {
  return useMemo(() => companyStats, []);
}

export function useCompanyLogistics() {
  return useMemo(() => companyLogistics, []);
}