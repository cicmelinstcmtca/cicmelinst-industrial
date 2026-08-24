export interface CompanyConfig {
  name: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string[];
  address: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  schedule: string;
  social: {
    linkedin: string;
    instagram: string;
    youtube: string;
  };
  foundationYear: number;
  values: Value[];
  timeline: TimelineItem[];
  metrics: Metric[];
  stats: Stat[];
  logistics: string[];
  logisticsQuote: string;
  clientsTagline: string;
  logo?: string;
}

export interface Value {
  icon: string;
  title: string;
  text: string;
}

export interface TimelineItem {
  year: number;
  title: string;
  text: string;
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: number;
  location: string;
  category: string;
  objective: string;
  description: string;
  technicalDescription: string;
  services: string[];
  results: string[];
  technologies: string[];
  image: string;
  status: string;
  slug: string;
  gallery: string[];
}

export type TeamLocation = 'planta' | 'oficina' | 'guardia';

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  location: TeamLocation;
  phone: string;
  email: string;
}

export interface Client {
  name: string;
  website: string;
  logo: string;
}

export interface Certification {
  name: string;
  icon: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  image: string;
  tags: string[];
}