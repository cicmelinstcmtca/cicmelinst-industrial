import { useMemo } from 'react';
import { projects, featuredProjects, getProjectBySlug, getProjectsByCategory, getProjectsByClient, projectCategories, projectClients } from '../data';

export function useProjects() {
  return useMemo(() => projects, []);
}

export function useFeaturedProjects() {
  return useMemo(() => featuredProjects, []);
}

export function useProject(slug: string) {
  return useMemo(() => getProjectBySlug(slug), [slug]);
}

export function useProjectsByCategory(category: string) {
  return useMemo(() => getProjectsByCategory(category), [category]);
}

export function useProjectsByClient(client: string) {
  return useMemo(() => getProjectsByClient(client), [client]);
}

export function useProjectCategories() {
  return useMemo(() => projectCategories, []);
}

export function useProjectClients() {
  return useMemo(() => projectClients, []);
}