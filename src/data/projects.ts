import type { Project } from './types';

export const projects: Project[] = [
  {
    id: "electrificacion-planta",
    title: "Electrificación Planta Industrial",
    client: "PDVSA",
    year: 2024,
    location: "Anzoátegui",
    category: "Electricidad",
    objective: "Instalar una subestación eléctrica de 34.5 kV y la red de distribución interna para garantizar el suministro energético de una planta de procesamiento.",
    description: "Instalación de subestación eléctrica de 34.5 kV y red de distribución interna para planta de procesamiento.",
    technicalDescription: "Se ejecutó el diseño, montaje y puesta en servicio de una subestación eléctrica compacta de 34.5 kV, incluyendo transformadores de potencia, tableros de media tensión, sistemas de protección y control, y la red de distribución interna en baja tensión para alimentar todos los equipos de la planta.",
    services: [
      "Ingeniería de detalle eléctrica",
      "Montaje de subestación 34.5 kV",
      "Instalación de transformadores de potencia",
      "Red de distribución interna",
      "Sistemas de protección y control",
      "Puesta en servicio y pruebas"
    ],
    results: [
      "Suministro energético estable para toda la planta",
      "Sistema de protecciones coordinado",
      "Reducción de paradas no planificadas",
      "Documentación técnica completa"
    ],
    technologies: ["34.5 kV", "Subestación", "Distribución", "Protecciones", "Transformadores"],
    image: "/images/altura 1.jpg",
    status: "completed",
    slug: "electrificacion-planta-industrial",
    gallery: [
      "/images/altura 1.jpg",
      "/images/altura 2.jpg",
      "/images/altura 3.jpg"
    ]
  },
  {
    id: "scada-refineria",
    title: "Sistema SCADA para Refinería",
    client: "Refinería El Palito",
    year: 2023,
    location: "Carabobo",
    category: "Automatización",
    objective: "Implementar un sistema de control y monitoreo integral para optimizar la operación de una planta de refinación con más de 500 puntos de instrumentación.",
    description: "Implementación de sistema de control y monitoreo para planta de refinación con más de 500 puntos de instrumentación.",
    technicalDescription: "Desarrollo e implementación de sistema SCADA para supervisión y control de procesos de refinación. Se integraron más de 500 puntos de instrumentación entre variables de proceso, actuadores y equipos de campo, con comunicación redundante y servidores en alta disponibilidad.",
    services: [
      "Ingeniería de automatización",
      "Programación PLC y SCADA",
      "Integración de instrumentación",
      "Red industrial redundante",
      "HMI y visualización",
      "Puesta en marcha y capacitación"
    ],
    results: [
      "Monitoreo en tiempo real de toda la planta",
      "Optimización de procesos de refinación",
      "Reducción de intervenciones manuales",
      "Reportes automatizados de producción"
    ],
    technologies: ["SCADA", "PLC", "HMI", "Red industrial", "Instrumentación"],
    image: "/images/altura 3.jpg",
    status: "completed",
    slug: "scada-refineria",
    gallery: [
      "/images/altura 3.jpg",
      "/images/altura 4.jpg",
      "/images/bajo 1.jpg"
    ]
  },
  {
    id: "obras-civiles-petroquimica",
    title: "Obras Civiles en Planta Petroquímica",
    client: "Petroquímica de Venezuela",
    year: 2022,
    location: "Zulia",
    category: "Construcción",
    objective: "Construir las bases de equipos, estructuras metálicas y obras civiles complementarias para la expansión de una planta petroquímica.",
    description: "Construcción de bases de equipos, estructuras metálicas y obras civiles complementarias para planta petroquímica.",
    technicalDescription: "Ejecución de obras civiles industriales incluyendo cimentaciones profundas para equipos de proceso, estructuras metálicas para soporte de tuberías y equipos, losas de concreto de alta resistencia, y obras complementarias como drenajes industriales y canalizaciones eléctricas.",
    services: [
      "Ingeniería civil estructural",
      "Cimentaciones profundas",
      "Estructuras metálicas",
      "Losas de concreto industrial",
      "Drenajes y canalizaciones",
      "Supervisión de obra"
    ],
    results: [
      "Estructuras conforme a normas COVENIN e ISO",
      "Cumplimiento del cronograma de obra",
      "Cero incidentes de seguridad",
      "Entrega de documentación as-built"
    ],
    technologies: ["Estructuras", "Concreto", "Montaje", "Ingeniería", "Suelos"],
    image: "/images/altura 4.jpg",
    status: "completed",
    slug: "obras-civiles-petroquimica",
    gallery: [
      "/images/altura 4.jpg",
      "/images/altura 1.jpg",
      "/images/altura 2.jpg"
    ]
  },
  {
    id: "mantenimiento-lineas",
    title: "Mantenimiento de Líneas de Transmisión",
    client: "CORPOELEC",
    year: 2024,
    location: "Monagas",
    category: "Electricidad",
    objective: "Ejecutar el mantenimiento preventivo y correctivo de 228 km de líneas de transmisión de 115 kV y 230 kV para garantizar la continuidad del servicio eléctrico.",
    description: "Mantenimiento preventivo y correctivo de 228 km de líneas de transmisión de 115 kV y 230 kV.",
    technicalDescription: "Se realizaron labores de mantenimiento preventivo y correctivo en líneas de transmisión de 115 kV y 230 kV, incluyendo cambio de aisladores, reparación de conductores, poda de vegetación en franjas de servidumbre, medición de resistencia de puesta a tierra, y termografía de conexiones.",
    services: [
      "Inspección termográfica",
      "Cambio de aisladores",
      "Reparación de conductores",
      "Poda de vegetación",
      "Medición de puesta a tierra",
      "Mantenimiento de estructuras"
    ],
    results: [
      "228 km de líneas mantenidas",
      "Reducción de fallas por vegetación",
      "Mejora en indicadores de calidad de servicio",
      "Extensión de vida útil de activos"
    ],
    technologies: ["115 kV", "230 kV", "Líneas vivas", "Mantenimiento", "Termografía"],
    image: "/images/altura 2.jpg",
    status: "completed",
    slug: "mantenimiento-lineas-transmision",
    gallery: [
      "/images/altura 2.jpg",
      "/images/altura 3.jpg",
      "/images/bajo 1.jpg"
    ]
  },
  {
    id: "lineas-energizadas-junin",
    title: "Reparación de Líneas Energizadas en Áreas Operacionales de Junín Sur",
    client: "PDVSA",
    year: 2024,
    location: "Junín Sur",
    category: "Eléctrico",
    objective: "Ejecutar la reparación de líneas eléctricas energizadas en áreas operacionales críticas sin interrumpir la producción de hidrocarburos.",
    description: "Reparación de líneas energizadas en áreas operacionales de Junín Sur para garantizar la continuidad del suministro eléctrico en zonas de producción activa.",
    technicalDescription: "Trabajos en caliente sobre líneas de distribución y transmisión energizadas, incluyendo cambio de conductores, reparación de terminales, tensado y reconductoring bajo normas de seguridad electrical Safety y procedimientos de trabajo en vivo.",
    services: [
      "Trabajo en líneas energizadas",
      "Cambio de conductores bajo tensión",
      "Reparación de terminales",
      "Tensado y reconductoring",
      "Procedimientos de seguridad eléctrica",
      "Supervisión de operaciones en vivo"
    ],
    results: [
      "Cero interrupciones en producción",
      "Líneas restauradas a capacidad nominal",
      "Cumplimiento de normas de seguridad",
      "Documentación técnica de ejecución"
    ],
    technologies: ["Líneas energizadas", "Trabajo en vivo", "Seguridad eléctrica", "Reconductoring", "Tensado"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "lineas-energizadas-junin-sur",
    gallery: []
  },
  {
    id: "lineas-energizadas-petrocedeno",
    title: "Reparación de Líneas Energizadas en Áreas Operacionales de Petrocedeño",
    client: "Petrocedeño",
    year: 2024,
    location: "Anzoátegui",
    category: "Eléctrico",
    objective: "Restablecer la integridad de líneas eléctricas energizadas en las instalaciones operacionales de Petrocedeño, asegurando la continuidad del servicio.",
    description: "Reparación de líneas energizadas en áreas operacionales de Petrocedeño para mantener la confiabilidad del suministro eléctrico.",
    technicalDescription: "Intervención técnica en líneas de distribución y transmisión energizadas, con enfoque en reparación de aisladores, cambio de conductores, y restablecimiento de conexiones bajo procedimientos de trabajo en caliente certificados.",
    services: [
      "Diagnóstico de fallas en líneas energizadas",
      "Reparación de aisladores",
      "Cambio de conductores",
      "Restablecimiento de conexiones",
      "Pruebas de megger y tensión",
      "Documentación de trabajos"
    ],
    results: [
      "Líneas operativas al 100%",
      "Sin paradas de producción",
      "Reducción de pérdidas técnicas",
      "Certificación de seguridad eléctrica"
    ],
    technologies: ["Líneas energizadas", "Aisladores", "Megger", "Seguridad", "Trabajo en vivo"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "lineas-energizadas-petrocedeno",
    gallery: []
  },
  {
    id: "alta-tension-fpo",
    title: "Suministro e Instalación de Equipamientos de Alta Tensión para el Apalancamiento de la Producción FPO",
    client: "PDVSA",
    year: 2023,
    location: "FPO",
    category: "Alta Tensión",
    objective: "Suministrar e instalar equipos de alta tensión para fortalecer la infraestructura eléctrica y apalancar la producción de crudo en el FPO.",
    description: "Suministro e instalación de equipamiento de alta tensión para el apalancamiento de la producción en el FPO.",
    technicalDescription: "Provisión, montaje y puesta en servicio de equipamiento de alta tensión incluyendo transformadores de potencia,interruptores de potencia, seccionadores,protectores de sobretensión, y sistemas de protección y control para subestaciones de distribución de alta tensión.",
    services: [
      "Suministro de equipamiento de alta tensión",
      "Montaje de transformadores de potencia",
      "Instalación de interruptores y seccionadores",
      "Sistemas de protección y control",
      "Puesta en servicio y pruebas de rutina",
      "Capacitación operativa"
    ],
    results: [
      "Infraestructura eléctrica fortalecida",
      "Aumento de disponibilidad de producción",
      "Equipamiento certificado y garantizado",
      "Operación segura y confiable"
    ],
    technologies: ["Alta tensión", "Transformadores", "Interruptores", "Protecciones", "Subestaciones"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "alta-tension-fpo",
    gallery: []
  },
  {
    id: "proteccion-catomica-tanque",
    title: "Sistema Protección Catódica en Tanque de Almacenamiento de 20 MBLS",
    client: "PDVSA",
    year: 2023,
    location: "Anzoátegui",
    category: "Protección",
    objective: "Diseñar e instalar un sistema de protección catódica para prevenir la corrosión en un tanque de almacenamiento de 20 millones de barriles.",
    description: "Instalación de sistema de protección catódica en tanque de almacenamiento de 20 MBLS para prevenir corrosión.",
    technicalDescription: "Diseño e implementación de sistema de protección catódica por corriente impuesta, incluyendo el suministro e instalación de rectificadores,anodos de referencia, sistema de monitoreo continuo, y cableado de distribución para proteger la estructura del tanque contra corrosión uniforme y localizada.",
    services: [
      "Diseño de protección catódica",
      "Suministro de rectificadores",
      "Instalación de anodos de referencia",
      "Sistema de monitoreo continuo",
      "Medición de potencial de corrosión",
      "Documentación y puesta en servicio"
    ],
    results: [
      "Protección contra corrosión garantizada",
      "Extensión de vida útil del tanque",
      "Monitoreo continuo de potencial",
      "Cumplimiento de normas API 650"
    ],
    technologies: ["Protección catódica", "Corriente impuesta", "Rectificadores", "Monitoreo", "API 650"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "proteccion-catomica-tanque",
    gallery: []
  },
  {
    id: "puesta-tierra-tanque",
    title: "Sistema Puesta a Tierra en Tanque de Almacenamiento de 20 MBLS",
    client: "PDVSA",
    year: 2023,
    location: "Anzoátegui",
    category: "Tierra",
    objective: "Diseñar e instalar un sistema de puesta a tierra para garantizar la seguridad eléctrica y la protección contra descargas atmosféricas en un tanque de almacenamiento.",
    description: "Instalación de sistema de puesta a tierra en tanque de almacenamiento de 20 MBLS para protección eléctrica y contra rayos.",
    technicalDescription: "Diseño e implementación de sistema de puesta a tierra tipo malla, incluyendo electrodos de tierra,conexiones equipotenciales, medición de resistividad de suelo, y pruebas de continuidad para garantizar la protección contra descargas atmosféricas y fallas eléctricas.",
    services: [
      "Estudio de resistividad de suelo",
      "Diseño de malla de tierra",
      "Instalación de electrodos",
      "Conexiones equipotenciales",
      "Pruebas de continuidad",
      "Certificación de puesta a tierra"
    ],
    results: [
      "Sistema de puesta a tierra certificado",
      "Protección contra rayos garantizada",
      "Resistencia de tierra < 5 ohmios",
      "Cumplimiento de normas IEEE 80"
    ],
    technologies: ["Puesta a tierra", "Malla de tierra", "Resistividad", "IEEE 80", "Protección contra rayos"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "puesta-tierra-tanque",
    gallery: []
  },
  {
    id: "recuperacion-conductores-roraima",
    title: "Recuperación y Tendido de Conductores Eléctricos de Baja y Media Tensión en el Mejorador Petrolera Roraima, S.A",
    client: "Mejorador Petrolera Roraima",
    year: 2023,
    location: "Anzoátegui",
    category: "Tendido",
    objective: "Recuperar y tender conductores eléctricos de baja y media tensión para restablecer el suministro eléctrico en las instalaciones del mejorador petrolero.",
    description: "Recuperación y tendido de conductores eléctricos de baja y media tensión en el Mejorador Petrolera Roraima, S.A.",
    technicalDescription: "Retiro de conductores dañados, tendido de nuevos conductores de cobre y aluminio en circuitos de baja y media tensión, instalación de estructuras de soporte, tendido aéreo y subterráneo, y pruebas de continuidad y resistencia de aislamiento.",
    services: [
      "Retiro de conductores dañados",
      "Tendido de nuevos conductores",
      "Instalación de estructuras de soporte",
      "Tendido aéreo y subterráneo",
      "Pruebas de megger y continuidad",
      "Certificación de instalación"
    ],
    results: [
      "Suministro eléctrico restablecido",
      "Conductores certificados y garantizados",
      "Reducción de pérdidas en distribución",
      "Documentación técnica completa"
    ],
    technologies: ["Baja tensión", "Media tensión", "Tendido aéreo", "Megger", "Conductores"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "recuperacion-conductores-roraima",
    gallery: []
  },
  {
    id: "electrificacion-bloque-ayacucho",
    title: "Adecuación de Electrificación del Bloque Ayacucho 6 - Fase Inmediata",
    client: "PDVSA",
    year: 2024,
    location: "Ayacucho",
    category: "Electrificación",
    objective: "Adecuar la infraestructura de electrificación del Bloque Ayacucho 6 para soportar las operaciones de producción de hidrocarburos.",
    description: "Adecuación de electrificación del Bloque Ayacucho 6 - Fase inmediata para soportar operaciones de producción.",
    technicalDescription: "Diseño, suministro e instalación de infraestructura eléctrica incluyendo subestaciones, tableros de distribución, tendido de cables de potencia, sistemas de protección y control, y puesta en servicio para alimentar equipos de producción y auxiliary en el Bloque Ayacucho 6.",
    services: [
      "Diseño eléctrico de detalle",
      "Suministro de equipamiento",
      "Montaje de subestaciones",
      "Tendido de cables de potencia",
      "Sistemas de protección",
      "Puesta en servicio"
    ],
    results: [
      "Electrificación completa del bloque",
      "Equipos de producción operativos",
      "Sistema de protecciones coordinado",
      "Cumplimiento de cronograma"
    ],
    technologies: ["Subestaciones", "Tendido de cables", "Protecciones", "Control", "Potencia"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "electrificacion-bloque-ayacucho-6",
    gallery: []
  },
  {
    id: "recuperacion-linea-macolla",
    title: "Recuperación de Línea de Alimentación Eléctrica Macolla GA",
    client: "PDVSA",
    year: 2024,
    location: "Macolla GA",
    category: "Recuperación",
    objective: "Recuperar la línea de alimentación eléctrica para restablecer el suministro de energía a las instalaciones de la Macolla GA.",
    description: "Recuperación de línea de alimentación eléctrica Macolla GA para restablecer suministro energético.",
    technicalDescription: "Intervención técnica para recuperación de línea de alimentación, incluyendo diagnóstico de fallas, reparación o reemplazo de conductores, reparación de estructuras de soporte, tensado y reconectado, y pruebas de funcionamiento para garantizar la calidad del suministro.",
    services: [
      "Diagnóstico de fallas",
      "Reparación de conductores",
      "Reemplazo de estructuras",
      "Tensado y reconectado",
      "Pruebas de calidad de energía",
      "Certificación de suministro"
    ],
    results: [
      "Suministro eléctrico restablecido",
      "Calidad de energía verificada",
      "Reducción de pérdidas técnicas",
      "Documentación as-built"
    ],
    technologies: ["Alimentación eléctrica", "Diagnóstico", "Reparación", "Tensado", "Calidad de energía"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "recuperacion-linea-macolla-ga",
    gallery: []
  },
  {
    id: "mantenimiento-linea-patio-roraima",
    title: "Mantenimiento de Línea y Patio 115kV del Mejorador Petrolera Roraima, SA",
    client: "Mejorador Petrolera Roraima",
    year: 2024,
    location: "Anzoátegui",
    category: "Mantenimiento",
    objective: "Ejecutar el mantenimiento preventivo y correctivo de la línea de transmisión de 115kV y patio de principios del Mejorador Petrolera Roraima, SA.",
    description: "Mantenimiento de línea de transmisión 115kV y patio de principios del Mejorador Petrolera Roraima, SA.",
    technicalDescription: "Labores de mantenimiento preventivo y correctivo en línea de transmisión de 115kV y patio de principios, incluyendo inspección visual, termografía, cambio de aisladores, reparación de estructuras, limpieza de subestación, y pruebas de protecciones y medición.",
    services: [
      "Inspección visual y termográfica",
      "Cambio de aisladores",
      "Reparación de estructuras",
      "Limpieza de subestación",
      "Pruebas de protecciones",
      "Medición de parámetros eléctricos"
    ],
    results: [
      "Línea y patio en óptimas condiciones",
      "Detección de puntos críticos",
      "Extensión de vida útil de activos",
      "Certificación de operación segura"
    ],
    technologies: ["115kV", "Termografía", "Aisladores", "Protecciones", "Subestaciones"],
    image: "/images/placeholder-industrial.svg",
    status: "completed",
    slug: "mantenimiento-linea-patio-roraima",
    gallery: []
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}

export function getProjectsByClient(client: string): Project[] {
  return projects.filter(p => p.client === client);
}

export const projectCategories = [...new Set(projects.map(p => p.category))];
export const projectClients = [...new Set(projects.map(p => p.client))];
