import type { CompanyConfig } from './types';

export const companyConfig: CompanyConfig = {
  name: "CICMELINST, C.A.",
  tagline: "Ingeniería que Energiza Venezuela",
  description: "Empresa venezolana de ingeniería, construcción, montaje y mantenimiento industrial con más de 14 años de experiencia en los sectores petrolero, petroquímico y energético.",
  heroTitle: "Construimos la infraestructura que mantiene en operación la industria energética venezolana",
  heroSubtitle: "Soluciones integrales de ingeniería, construcción, montaje y mantenimiento industrial para los sectores petrolero, petroquímico y energético.",
  aboutTitle: "Somos una empresa venezolana que construye el presente energético del país",
  aboutText: [
    "Con más de 14 años de trayectoria, CICMELINST, C.A. se ha consolidado como un socio estratégico en el sector industrial, ofreciendo soluciones de ingeniería, construcción, montaje y mantenimiento con los más altos estándares de calidad y seguridad.",
    "Nuestra experiencia abarca proyectos en los sectores petrolero, petroquímico y energético, donde hemos demostrado capacidad técnica, logística y operativa para ejecutar desde trabajos de electrificación hasta complejos sistemas de automatización y control industrial."
  ],
  address: "El Tigre, Estado Anzoátegui, Venezuela",
  email: "CICMELINST.EPS@GMAIL.COM",
  phone: "+58 424 883 8856",
  phoneDisplay: "+58 424 883 8856",
  whatsapp: "584248838856",
  schedule: "Lun - Vie: 7:00 AM - 5:00 PM\nSáb: 7:00 AM - 12:00 PM",
  social: {
    linkedin: "https://www.linkedin.com/company/cicmelinst/home/",
    instagram: "https://www.instagram.com/cicmelinst/",
    youtube: "#"
  },
  foundationYear: 2012,
  values: [
    {
      icon: "CheckCircle",
      title: "Compromiso",
      text: "Cumplimos cada proyecto con responsabilidad y dedicación total."
    },
    {
      icon: "CheckCircle",
      title: "Calidad",
      text: "Estándares internacionales en cada etapa de ejecución."
    },
    {
      icon: "Shield",
      title: "Seguridad",
      text: "SIHO como cultura, no como requisito."
    }
  ],
  timeline: [
    { year: 2012, title: "Fundación", text: "Iniciamos operaciones con la visión de ofrecer servicios de ingeniería eléctrica e instrumentación con estándares de calidad internacional." },
    { year: 2015, title: "Primeros contratos industriales", text: "Aseguramos nuestros primeros contratos de gran escala en el sector petrolero nacional, consolidando nuestra presencia en el mercado." },
    { year: 2018, title: "Expansión logística", text: "Ampliamos nuestra flota de vehículos y equipos, incorporando maquinaria pesada y vehículos especializados para operaciones complejas." },
    { year: 2022, title: "Nuevas bases operativas", text: "Abrimos nuevas bases estratégicas para mejorar nuestra capacidad de respuesta y cobertura a nivel nacional." },
    { year: 2026, title: "14 años consolidando infraestructura energética", text: "Hoy somos referentes en ingeniería industrial venezolana, con presencia en los proyectos más relevantes del país." }
  ],
  metrics: [
    { value: 14, suffix: "+", label: "Años de experiencia", icon: "Clock" },
    { value: 100, suffix: "+", label: "Proyectos ejecutados", icon: "Building2" },
    { value: 24, suffix: "", label: "Vehículos operativos", icon: "Truck" },
    { value: 3, suffix: "", label: "Bases operativas", icon: "MapPin" }
  ],
  stats: [
    { value: "14+", label: "Años" },
    { value: "+100", label: "Proyectos" },
    { value: "24", label: "Vehículos" },
    { value: "100%", label: "Compromiso SIHO" }
  ],
  logistics: [
    "Camiones doble cesta",
    "Retroexcavadoras",
    "Payloaders",
    "Camionetas",
    "Ambulancias",
    "Trailers",
    "Comedores móviles",
    "Grúas y equipos de izaje"
  ],
  logisticsQuote: "La capacidad logística adecuada reduce tiempos de respuesta y garantiza continuidad operativa.",
  clientsTagline: "Empresas que han confiado en nuestra capacidad técnica."
};

export const companyMetrics = companyConfig.metrics;
export const companyValues = companyConfig.values;
export const companyTimeline = companyConfig.timeline;
export const companyStats = companyConfig.stats;
export const companyLogistics = companyConfig.logistics;