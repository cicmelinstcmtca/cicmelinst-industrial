import type { TeamMember } from './types';

export const teamMembers: TeamMember[] = [
  {
    name: "Ing. Rafael Martínez",
    role: "Director General",
    photo: "/images/team/default.jpg",
    bio: "Líder con más de 20 años de experiencia en el sector industrial y energético venezolano.",
    location: "oficina",
    phone: "+58 412 000 0001",
    email: "rmartinez@cicmelinst.com"
  },
  {
    name: "Ing. María Rodríguez",
    role: "Gerente de Operaciones",
    photo: "/images/team/default.jpg",
    bio: "Especialista en planificación y ejecución de proyectos de ingeniería industrial.",
    location: "planta",
    phone: "+58 412 000 0002",
    email: "mrodriguez@cicmelinst.com"
  },
  {
    name: "Ing. José López",
    role: "Gerente Técnico",
    photo: "/images/team/default.jpg",
    bio: "Experto en sistemas eléctricos, automatización y control de procesos industriales.",
    location: "planta",
    phone: "+58 412 000 0003",
    email: "jlopez@cicmelinst.com"
  },
  {
    name: "Lic. Ana García",
    role: "Gerente de Seguridad Industrial",
    photo: "/images/team/default.jpg",
    bio: "Responsable de implementar y supervisar los estándares SIHO en cada proyecto.",
    location: "planta",
    phone: "+58 412 000 0004",
    email: "agarcia@cicmelinst.com"
  },
  {
    name: "Ing. Carlos Mendoza",
    role: "Supervisor Eléctrico",
    photo: "/images/team/default.jpg",
    bio: "Especialista en media y alta tensión, subestaciones y sistemas de protección.",
    location: "guardia",
    phone: "+58 412 000 0005",
    email: "cmendoza@cicmelinst.com"
  },
  {
    name: "Ing. Patricia Silva",
    role: "Supervisora de Instrumentación",
    photo: "/images/team/default.jpg",
    bio: "Experta en calibración, instrumentación de proceso y sistemas SCADA.",
    location: "planta",
    phone: "+58 412 000 0006",
    email: "psilva@cicmelinst.com"
  },
  {
    name: "Téc. Luis Herrera",
    role: "Jefe de Logística y Flota",
    photo: "/images/team/default.jpg",
    bio: "Responsable de la operatividad de la flota de 24 vehículos y equipos pesados.",
    location: "oficina",
    phone: "+58 412 000 0007",
    email: "lherrera@cicmelinst.com"
  },
  {
    name: "Ing. Sofía Vargas",
    role: "Coordinadora de Proyectos",
    photo: "/images/team/default.jpg",
    bio: "Gestión integral de proyectos EPC, control de costos y cronogramas.",
    location: "oficina",
    phone: "+58 412 000 0008",
    email: "svargas@cicmelinst.com"
  }
];

export function getTeamByLocation(location: 'planta' | 'oficina' | 'guardia'): TeamMember[] {
  return teamMembers.filter(m => m.location === location);
}

export function getTeamByRole(role: string): TeamMember[] {
  return teamMembers.filter(m => m.role.toLowerCase().includes(role.toLowerCase()));
}

export const teamLocations = ['planta', 'oficina', 'guardia'] as const;