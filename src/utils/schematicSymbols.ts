/** Schematic Symbols - IEEE/ANSI Standard Symbols for Single Line Diagram */
import type { SchematicNodeType, NodeStatus } from '../types';

export const SchematicSymbols = {
  transformer: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized'
  ) => {
    const colors = {
      energized: 'var(--color-pipe-blue-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Primary winding -->
        <circle cx="35" cy="40" r="25" stroke="${color}" stroke-width="2" fill="none"/>
        <circle cx="35" cy="40" r="18" stroke="${color}" stroke-width="1" fill="none" stroke-dasharray="4 4"/>
        <!-- Secondary winding -->
        <circle cx="85" cy="40" r="25" stroke="${color}" stroke-width="2" fill="none"/>
        <circle cx="85" cy="40" r="18" stroke="${color}" stroke-width="1" fill="none" stroke-dasharray="4 4"/>
        <!-- Core lines -->
        <line x1="10" y1="15" x2="60" y2="15" stroke="${color}" stroke-width="3"/>
        <line x1="10" y1="65" x2="60" y2="65" stroke="${color}" stroke-width="3"/>
        <line x1="60" y1="15" x2="60" y2="65" stroke="${color}" stroke-width="3"/>
        <line x1="60" y1="15" x2="110" y2="15" stroke="${color}" stroke-width="3"/>
        <line x1="60" y1="65" x2="110" y2="65" stroke="${color}" stroke-width="3"/>
        <!-- Dots for polarity -->
        <circle cx="15" cy="25" r="3" fill="${color}"/>
        <circle cx="15" cy="55" r="3" fill="${color}"/>
        <circle cx="95" cy="25" r="3" fill="${color}"/>
        <circle cx="95" cy="55" r="3" fill="${color}"/>
        <!-- Voltage labels -->
        <text x="35" y="85" text-anchor="middle" font-family="JetBrains Mono" font-size="8" fill="${color}">34.5/13.8 kV</text>
        <text x="35" y="95" text-anchor="middle" font-family="JetBrains Mono" font-size="7" fill="${color}">25 MVA</text>
      </svg>
    `;
  },

  breaker: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized',
    label: string = '52'
  ) => {
    const colors = {
      energized: 'var(--color-insul-green-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Contact line -->
        <line x1="10" y1="25" x2="22" y2="25" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <!-- Moving contact -->
        <line x1="38" y1="25" x2="50" y2="25" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <!-- Arc chute symbol -->
        <path d="M25 10 L30 25 L25 40" stroke="${color}" stroke-width="1.5" fill="none"/>
        <path d="M35 10 L30 25 L35 40" stroke="${color}" stroke-width="1.5" fill="none"/>
        <!-- Label -->
        <text x="30" y="4" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="${color}" font-weight="bold">${label}</text>
        <!-- Status indicator -->
        <circle cx="30" cy="25" r="6" fill="none" stroke="${color}" stroke-width="2"/>
        ${status === 'energized' ? '<circle cx="30" cy="25" r="3" fill="${color}"/>' : ''}
      </svg>
    `;
  },

  relay: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized',
    label: string = '51'
  ) => {
    const colors = {
      energized: 'var(--color-pipe-blue-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Relay circle -->
        <circle cx="25" cy="25" r="22" stroke="${color}" stroke-width="2" fill="none"/>
        <!-- Label -->
        <text x="25" y="30" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="${color}" font-weight="bold">${label}</text>
        <!-- Function indicator -->
        <text x="25" y="42" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="${color}">O/C E/F</text>
        <!-- Status LED -->
        <circle cx="42" cy="8" r="4" fill="${status === 'energized' ? color : 'transparent'}" stroke="${color}" stroke-width="1.5"/>
      </svg>
    `;
  },

  busbar: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized'
  ) => {
    const colors = {
      energized: 'var(--color-pipe-blue-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Main bus -->
        <rect x="10" y="10" width="80" height="10" rx="2" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="2"/>
        <!-- Tap-offs -->
        <line x1="25" y1="10" x2="25" y2="0" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="50" y1="10" x2="50" y2="0" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="75" y1="10" x2="75" y2="0" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="25" y1="20" x2="25" y2="30" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="50" y1="20" x2="50" y2="30" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="75" y1="20" x2="75" y2="30" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <!-- Label -->
        <text x="50" y="-2" text-anchor="middle" font-family="JetBrains Mono" font-size="7" fill="${color}">BARRA 13.8 kV</text>
      </svg>
    `;
  },

  cable: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized'
  ) => {
    const colors = {
      energized: 'var(--color-pipe-blue-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="10" x2="100" y2="10" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <!-- Insulation markers -->
        <line x1="25" y1="0" x2="25" y2="20" stroke="${color}" stroke-width="1" stroke-dasharray="2 2"/>
        <line x1="50" y1="0" x2="50" y2="20" stroke="${color}" stroke-width="1" stroke-dasharray="2 2"/>
        <line x1="75" y1="0" x2="75" y2="20" stroke="${color}" stroke-width="1" stroke-dasharray="2 2"/>
      </svg>
    `;
  },

  load: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized',
    label: string = 'CARGA'
  ) => {
    const colors = {
      energized: 'var(--color-insul-green-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Motor/Load symbol -->
        <circle cx="30" cy="25" r="20" stroke="${color}" stroke-width="2" fill="none"/>
        <circle cx="30" cy="25" r="12" stroke="${color}" stroke-width="1" fill="none" stroke-dasharray="3 3"/>
        <!-- Shaft -->
        <line x1="30" y1="5" x2="30" y2="0" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="45" x2="30" y2="50" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <!-- Label -->
        <text x="30" y="65" text-anchor="middle" font-family="JetBrains Mono" font-size="7" fill="${color}">${label}</text>
        <!-- Status -->
        <circle cx="48" cy="8" r="4" fill="${status === 'energized' ? color : 'transparent'}" stroke="${color}" stroke-width="1.5"/>
      </svg>
    `;
  },

  ground: (
    width: number,
    height: number,
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault' = 'energized'
  ) => {
    const colors = {
      energized: 'var(--color-insul-green-glow)',
      deenergized: 'var(--color-steel)',
      maintenance: 'var(--color-warn-orange)',
      fault: 'var(--color-alarm-red-glow)',
    };
    const color = colors[status];

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Ground symbol -->
        <line x1="20" y1="5" x2="20" y2="20" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <line x1="5" y1="20" x2="35" y2="20" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <line x1="10" y1="28" x2="30" y2="28" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <line x1="15" y1="34" x2="25" y2="34" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <!-- Label -->
        <text x="20" y="38" text-anchor="middle" font-family="JetBrains Mono" font-size="6" fill="${color}">TIERRA</text>
      </svg>
    `;
  },
};

/** Generate the complete single line diagram SVG */
export function generateSingleLineDiagram(nodes: Array<{
  id: string;
  type: keyof typeof SchematicSymbols;
  x: number;
  y: number;
  status: 'energized' | 'deenergized' | 'maintenance' | 'fault';
  label?: string;
}>): string {
  const symbols = nodes.map(node => {
    const SymbolFn = SchematicSymbols[node.type];
    const svg = SymbolFn(80, 60, node.status, node.label);
    return `<g transform="translate(${node.x - 40}, ${node.y - 30})" data-node-id="${node.id}" class="schematic-node">${svg}</g>`;
  }).join('');

  // Connections between nodes (simplified)
  const connections = `
    <g class="schematic-connections" stroke="var(--color-pipe-blue-glow)" stroke-width="2" fill="none" opacity="0.6">
      <!-- 34.5kV Incoming -->
      <line x1="50" y1="150" x2="50" y2="200" />
      <!-- Transformer primary -->
      <line x1="50" y1="200" x2="50" y2="280" />
      <!-- Transformer to busbar -->
      <line x1="50" y1="280" x2="200" y2="280" />
      <!-- Busbar to breakers -->
      <line x1="200" y1="280" x2="200" y2="350" />
      <line x1="200" y1="350" x2="120" y2="350" />
      <line x1="200" y1="350" x2="280" y2="350" />
      <line x1="120" y1="350" x2="120" y2="420" />
      <line x1="280" y1="350" x2="280" y2="420" />
      <!-- Loads -->
      <line x1="120" y1="420" x2="60" y2="420" />
      <line x1="120" y1="420" x2="180" y2="420" />
      <line x1="280" y1="420" x2="220" y2="420" />
      <line x1="280" y1="420" x2="340" y2="420" />
      <!-- Protection relays -->
      <line x1="200" y1="280" x2="200" y2="220" />
      <line x1="200" y1="220" x2="140" y2="220" />
      <line x1="200" y1="220" x2="260" y2="220" />
    </g>
  `;

  return `
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" class="single-line-diagram" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      ${connections}
      ${symbols}
    </svg>
  `;
}

/** Default CICMELINST Substation Layout */
export const DEFAULT_SUBSTATION_LAYOUT: Array<{
  id: string;
  type: SchematicNodeType;
  x: number;
  y: number;
  status: NodeStatus;
  label?: string;
}> = [
  // 34.5kV Incoming
  { id: 'incoming-34', type: 'cable', x: 100, y: 80, status: 'energized' as const, label: 'LÍNEA 34.5kV' },
  
  // Main Transformer T-01
  { id: 'T-01', type: 'transformer', x: 100, y: 180, status: 'energized' as const, label: 'T-01' },
  
  // 13.8kV Busbar
  { id: 'bus-13', type: 'busbar', x: 280, y: 180, status: 'energized' as const, label: 'BARRA 13.8' },
  
  // Main Breaker 52-H
  { id: '52-H', type: 'breaker', x: 280, y: 280, status: 'energized' as const, label: '52-H' },
  
  // Protection Relays
  { id: '51-G', type: 'relay', x: 220, y: 100, status: 'energized' as const, label: '51-G' },
  { id: '51-N', type: 'relay', x: 220, y: 140, status: 'energized' as const, label: '51-N' },
  { id: '27', type: 'relay', x: 340, y: 100, status: 'energized' as const, label: '27' },
  { id: '59', type: 'relay', x: 340, y: 140, status: 'energized' as const, label: '59' },
  
  // Feeder Breakers
  { id: '52-A', type: 'breaker', x: 180, y: 360, status: 'energized' as const, label: '52-A' },
  { id: '52-B', type: 'breaker', x: 280, y: 360, status: 'energized' as const, label: '52-B' },
  { id: '52-C', type: 'breaker', x: 380, y: 360, status: 'energized' as const, label: '52-C' },
  { id: '52-D', type: 'breaker', x: 480, y: 360, status: 'energized' as const, label: '52-D' },
  
  // Loads
  { id: 'load-1', type: 'load', x: 180, y: 460, status: 'energized' as const, label: 'PLANTA A' },
  { id: 'load-2', type: 'load', x: 280, y: 460, status: 'energized' as const, label: 'PLANTA B' },
  { id: 'load-3', type: 'load', x: 380, y: 460, status: 'energized' as const, label: 'BOMBEO' },
  { id: 'load-4', type: 'load', x: 480, y: 460, status: 'maintenance' as const, label: 'FUTURO' },
  
  // Ground
  { id: 'ground-1', type: 'ground', x: 100, y: 260, status: 'energized' as const },
  { id: 'ground-2', type: 'ground', x: 280, y: 260, status: 'energized' as const },
];

/** Section mapping for navigation */
export const NODE_SECTION_MAP: Record<string, 'hero' | 'capabilities' | 'projects' | 'fleet' | 'team' | 'contact' | 'clients'> = {
  'T-01': 'capabilities',
  '52-H': 'capabilities',
  '51-G': 'capabilities',
  '51-N': 'capabilities',
  '27': 'capabilities',
  '59': 'capabilities',
  '52-A': 'projects',
  '52-B': 'projects',
  '52-C': 'fleet',
  '52-D': 'team',
  'load-1': 'projects',
  'load-2': 'projects',
  'load-3': 'fleet',
  'load-4': 'contact',
  'incoming-34': 'clients',
};