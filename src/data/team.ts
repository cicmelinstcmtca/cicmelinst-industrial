import type { TeamMember } from './types';

export const teamMembers: TeamMember[] = [
  // ── Nivel 1: Directores ──
  {
    name: "Juan Amaya",
    role: "Director General",
    photo: "/images/team/default.jpg",
    bio: "Director General con visión estratégica para el crecimiento de la empresa en el sector industrial venezolano.",
    location: "oficina",
    phone: "",
    email: ""
  },
  {
    name: "Juan A. Gomez",
    role: "Director de Producción",
    photo: "/images/team/default.jpg",
    bio: "Responsable de la planificación y ejecución de todos los proyectos de producción de la empresa.",
    location: "oficina",
    phone: "",
    email: ""
  },
  {
    name: "Aurelio Amaya",
    role: "Director de Operaciones",
    photo: "/images/team/default.jpg",
    bio: "Director de operaciones con amplia experiencia en la gestión y supervisión de proyectos industriales.",
    location: "oficina",
    phone: "",
    email: ""
  },
  // ── Nivel 2: Directora + Gerentes ──
  {
    name: "Marlene Mejia",
    role: "Directora Administrativa",
    photo: "/images/team/default.jpg",
    bio: "Gestión administrativa y financiera para el óptimo funcionamiento de la organización.",
    location: "oficina",
    phone: "",
    email: ""
  },
  {
    name: "Ing. Rosanny Ortiz",
    role: "Gerente de Proyecto",
    photo: "/images/team/default.jpg",
    bio: "Especialista en gestión integral de proyectos de ingeniería industrial y energético.",
    location: "oficina",
    phone: "",
    email: ""
  },
  {
    name: "Ing. Editza Ibarra",
    role: "Gerente PYA",
    photo: "/images/team/default.jpg",
    bio: "Responsable de Planeación y Adquisiciones para el desarrollo de proyectos industriales.",
    location: "oficina",
    phone: "",
    email: ""
  },
  {
    name: "Ing. Victor Vargas",
    role: "Gerente Técnico",
    photo: "/images/team/default.jpg",
    bio: "Experto en sistemas eléctricos, automatización y control de procesos industriales.",
    location: "planta",
    phone: "",
    email: ""
  },
  // ── Nivel 3: Gerente + Coordinadora ──
  {
    name: "Lic. Ana Salazar",
    role: "Gerente de Administración",
    photo: "/images/team/default.jpg",
    bio: "Administración integral de recursos humanos y operaciones administrativas.",
    location: "oficina",
    phone: "",
    email: ""
  },
  {
    name: "TSU. Ligia Regis",
    role: "Coord. SIHO-A",
    photo: "/images/team/default.jpg",
    bio: "Coordinadora del Sistema Integrado de Higiene y Seguridad Ocupacional Ambiental.",
    location: "oficina",
    phone: "",
    email: ""
  }
];

export function getTeamByLocation(location: 'planta' | 'oficina' | 'guardia'): TeamMember[] {
  return teamMembers.filter(m => m.location === location);
}

export function getTeamByRole(role: string): TeamMember[] {
  return teamMembers.filter(m => m.role.toLowerCase().includes(role.toLowerCase()));
}

export const teamLocations = ['planta', 'oficina', 'guardia'] as const;
