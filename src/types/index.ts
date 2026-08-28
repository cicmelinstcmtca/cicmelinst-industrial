/** CICMELINST Industrial - Type Definitions */

export type Theme = 'dark' | 'light';

export type NodeStatus = 'energized' | 'deenergized' | 'maintenance' | 'fault';

export type SchematicNodeType =
  | 'transformer'
  | 'breaker'
  | 'relay'
  | 'busbar'
  | 'cable'
  | 'load'
  | 'ground';

export type SectionId =
  | 'hero'
  | 'capabilities'
  | 'projects'
  | 'fleet'
  | 'team'
  | 'contact'
  | 'clients';

export interface SchematicNode {
  id: string;
  type: SchematicNodeType;
  label: string;
  position: { x: number; y: number };
  section: SectionId;
  status: NodeStatus;
  readings?: {
    voltage?: number;
    current?: number;
    frequency?: number;
    powerFactor?: number;
    temperature?: number;
  };
  metadata?: Record<string, unknown>;
}

export interface GaugeCardProps {
  tag: string;
  label: string;
  value: number | string;
  unit: string;
  status: 'normal' | 'warn' | 'alarm' | 'trip';
  trend?: number;
  thresholds?: { warn: number; alarm: number };
  min?: number;
  max?: number;
}

export interface SpecItem {
  param: string;
  value: string;
  unit: string;
  standard: string;
  note?: string;
}

export interface SpecSheetProps {
  category: 'civil' | 'mechanical' | 'electrical' | 'instrumentation' | 'logistics';
  title: string;
  specs: SpecItem[];
}

export interface MaintenanceEntry {
  date: string;
  tag: string;
  equipment: string;
  action: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  technician: string;
  photos?: string[];
  reportUrl?: string;
}

export interface MaintenanceLogProps {
  entries: MaintenanceEntry[];
  filters?: {
    types: ('PM' | 'CM')[];
    equipment: string[];
    dateRange: [string, string];
  };
}

export interface FleetVehicle {
  id: string;
  type: 'sedan' | 'pickup' | 'van' | 'truck' | 'ambulance' | 'bucket' | 'crane' | 'loader' | 'excavator' | 'trailer';
  count: number;
  model: string;
  specs: {
    engine?: string;
    capacity?: string;
    year?: number;
    lastMaintenance?: string;
    nextInspection?: string;
    operator?: string;
  };
  modelUrl?: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  location: 'plant' | 'office' | 'guard';
  phone: string;
  email: string;
  certifications: string[];
  experience: string;
  photoUrl?: string;
}

export interface ContactFormData {
  'CT-01': string;
  'CT-02': string;
  'CT-03': string;
  'CT-04': string;
  'CT-05': 'maintenance' | 'construction' | 'electrical' | 'instrumentation' | 'logistics' | 'consulting';
  'CT-06': string;
  'CT-07': string;
}

export interface WorkOrder {
  number: string;
  date: string;
  data: ContactFormData;
  pdfBlob?: Blob;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface ScrollPosition {
  x: number;
  y: number;
  progress: number;
}