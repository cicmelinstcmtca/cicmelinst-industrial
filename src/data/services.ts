import type { Service } from './types';

export const services: Service[] = [
  {
    id: "montaje-electrico",
    title: "Montaje y Mantenimiento Eléctrico",
    icon: "Zap",
    description: "Instalación, mantenimiento y reparación de sistemas eléctricos de media y alta tensión en plantas industriales y subestaciones.",
    image: "/images/altura 1.jpg",
    tags: ["Media tensión", "Alta tensión", "Subestaciones", "Tableros eléctricos"]
  },
  {
    id: "automatizacion",
    title: "Automatización y Control",
    icon: "Settings2",
    description: "Diseño e implementación de sistemas SCADA, control de procesos y automatización industrial para optimizar la producción.",
    image: "/images/bajo 1.jpg",
    tags: ["SCADA", "PLC", "Control de procesos", "Instrumentación"]
  },
  {
    id: "construccion-civil",
    title: "Construcción Civil Industrial",
    icon: "Building2",
    description: "Ejecución de obras civiles para instalaciones industriales, plantas de proceso, bases de equipos y estructuras metálicas.",
    image: "/images/altura 2.jpg",
    tags: ["Obras civiles", "Estructuras metálicas", "Plantas de proceso", "Cimentaciones"]
  },
  {
    id: "instrumentacion",
    title: "Instrumentación Industrial",
    icon: "Gauge",
    description: "Calibración, instalación y mantenimiento de instrumentos de medición y control para procesos industriales y refinerías.",
    image: "/images/altura 3.jpg",
    tags: ["Calibración", "Medición", "Refinerías", "Laboratorio certificado"]
  }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export const serviceIds = services.map(s => s.id);