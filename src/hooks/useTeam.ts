import { useMemo } from 'react';
import { teamMembers, getTeamByLocation, getTeamByRole, teamLocations, type TeamLocation } from '../data';

export function useTeam() {
  return useMemo(() => teamMembers, []);
}

export function useTeamByLocation(location: TeamLocation) {
  return useMemo(() => getTeamByLocation(location), [location]);
}

export function useTeamByRole(role: string) {
  return useMemo(() => getTeamByRole(role), [role]);
}

export function useTeamLocations() {
  return useMemo(() => teamLocations, []);
}