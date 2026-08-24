import { forwardRef, useState, useRef, useEffect, type ForwardedRef } from 'react';
import { motion } from 'motion/react';
import type { SchematicNode as SchematicNodeData, SchematicNodeType, SectionId } from '../../types';
import { SchematicSymbols, DEFAULT_SUBSTATION_LAYOUT, NODE_SECTION_MAP } from '../../utils/schematicSymbols';

interface SchematicNodeProps extends Omit<SchematicNodeData, 'position'> {
  position?: { x: number; y: number };
  size?: number;
  onNavigate?: (section: SectionId) => void;
  interactive?: boolean;
  showReadings?: boolean;
  className?: string;
}

const NODE_SIZES: Record<SchematicNodeType, { w: number; h: number }> = {
  transformer: { w: 120, h: 80 },
  breaker: { w: 60, h: 50 },
  relay: { w: 50, h: 50 },
  busbar: { w: 100, h: 30 },
  cable: { w: 100, h: 20 },
  load: { w: 60, h: 50 },
  ground: { w: 40, h: 40 },
};

const statusColors: Record<string, string> = {
  energized: 'var(--color-insul-green-glow)',
  deenergized: 'var(--color-steel)',
  maintenance: 'var(--color-warn-orange)',
  fault: 'var(--color-alarm-red-glow)',
};

export const SchematicNode = forwardRef<HTMLDivElement, SchematicNodeProps>(
  (
    {
      id,
      type,
      label,
      position = { x: 0, y: 0 },
      section,
      status = 'energized',
      readings,
      size = 1,
      onNavigate,
      interactive = true,
      showReadings = true,
      className = '',
      ...props
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const nodeSize = NODE_SIZES[type] || { w: 60, h: 50 };
    const width = nodeSize.w * size;
    const height = nodeSize.h * size;
    const color = statusColors[status] || statusColors.energized;

    // Calcular posición del tooltip relativa al viewport para evitar solapamientos
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (showTooltip && tooltipRef.current) {
        const rect = tooltipRef.current.getBoundingClientRect();

        let x = rect.left + width / 2;
        let y = rect.top - 8;

        // Ajustar X si se sale por la derecha
        if (x + 110 > window.innerWidth - 16) {
          x = window.innerWidth - 110 - 16;
        } else if (x - 110 < 16) {
          x = 110 + 16;
        }

        // Ajustar Y si se sale por arriba - mostrar abajo del nodo
        if (y - 200 < 16) {
          y = rect.top + height + 8;
        }

        setTooltipPosition({ x, y });
      }
    }, [showTooltip, width, height]);

    const handleClick = () => {
      if (onNavigate && section) {
        onNavigate(section);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    const SymbolComponent = SchematicSymbols[type];
    const svgContent = SymbolComponent?.(width, height, status, label) || '';

    return (
      <motion.div
        ref={ref}
        className={`
          schematic-node absolute select-none
          ${interactive ? 'cursor-pointer' : ''}
          ${className}
        `}
        style={{
          left: position.x - width / 2,
          top: position.y - height / 2,
          width,
          height,
          filter: isHovered && status === 'energized' ? 'drop-shadow(0 0 8px var(--color-pipe-blue-glow))' : 'none',
        }}
        onMouseEnter={() => { setIsHovered(true); setShowTooltip(true); }}
        onMouseLeave={() => { setIsHovered(false); setShowTooltip(false); }}
        onFocus={() => { setIsHovered(true); setShowTooltip(true); }}
        onBlur={() => { setIsHovered(false); setShowTooltip(false); }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={interactive ? 0 : -1}
        role={interactive ? 'button' : undefined}
        aria-label={interactive ? `${label} - ${status}. Presione para navegar a ${section}` : undefined}
        whileHover={interactive ? { scale: 1.05, transition: { duration: 0.15 } } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        {...props}
      >
        <div
          className="relative w-full h-full"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {interactive && showReadings && showTooltip && (
          <motion.div
            ref={tooltipRef}
            className="schematic-tooltip absolute z-[100] pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: 'translateX(-50%) translateY(-100%)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className={`
              bg-gauge border border-panel radius-panel p-3 min-w-[200px]
              shadow-modal
              relative
            `} style={{ borderLeft: `3px solid ${color}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="label-tag">{id}</span>
                <span className="text-small text-primary font-medium">{label}</span>
                <span className={`ml-auto badge-energized radius-pill px-2 py-0.5 text-micro font-mono ${status === 'energized' ? 'bg-insul-green text-bg-control' : status === 'maintenance' ? 'bg-warn-orange text-bg-control' : status === 'fault' ? 'bg-alarm-red text-text-primary' : 'bg-steel text-text-primary'}`}>
                  {status.toUpperCase()}
                </span>
              </div>

              {readings && (
                <div className="grid grid-cols-2 gap-2 text-mono-sm">
                  {readings.voltage !== undefined && (
                    <div>
                      <span className="text-muted">V:</span>
                      <span className="text-primary ml-1 font-mono">{readings.voltage.toFixed(1)} kV</span>
                    </div>
                  )}
                  {readings.current !== undefined && (
                    <div>
                      <span className="text-muted">I:</span>
                      <span className="text-primary ml-1 font-mono">{readings.current.toFixed(1)} A</span>
                    </div>
                  )}
                  {readings.frequency !== undefined && (
                    <div>
                      <span className="text-muted">Hz:</span>
                      <span className="text-primary ml-1 font-mono">{readings.frequency.toFixed(2)} Hz</span>
                    </div>
                  )}
                  {readings.powerFactor !== undefined && (
                    <div>
                      <span className="text-muted">FP:</span>
                      <span className="text-primary ml-1 font-mono">{readings.powerFactor.toFixed(2)}</span>
                    </div>
                  )}
                  {readings.temperature !== undefined && (
                    <div className="col-span-2">
                      <span className="text-muted">Temp:</span>
                      <span className="text-primary ml-1 font-mono">{readings.temperature.toFixed(1)} °C</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-2 pt-2 border-t border-panel/50 flex items-center gap-2">
                <kbd className="bg-panel border border-panel/50 radius-panel px-2 py-0.5 text-micro text-muted font-mono">
                  Enter
                </kbd>
                <span className="text-micro text-muted">Navegar a {section ?? 'hero'}</span>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-4 border-transparent" style={{ borderTopColor: 'var(--color-bg-gauge)' }} />
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }
);

SchematicNode.displayName = 'SchematicNode';

export const SingleLineDiagram = ({
  nodes = DEFAULT_SUBSTATION_LAYOUT,
  onNodeClick,
  className = '',
  showGrid = true,
}: {
  nodes?: Array<{
    id: string;
    type: 'transformer' | 'breaker' | 'relay' | 'busbar' | 'cable' | 'load' | 'ground';
    x?: number;
    y?: number;
    position?: { x: number; y: number };
    status: 'energized' | 'deenergized' | 'maintenance' | 'fault';
    label?: string;
    section?: SectionId;
    readings?: {
      voltage?: number;
      current?: number;
      frequency?: number;
      powerFactor?: number;
      temperature?: number;
    };
  }>;
  onNodeClick?: (section: SectionId) => void;
  className?: string;
  showGrid?: boolean;
}) => {

  const connections = (
    <g className="schematic-connections" stroke="var(--color-pipe-blue-glow)" strokeWidth="2" fill="none" opacity={0.6}>
      <line x1="200" y1="50" x2="200" y2="100" />
      <line x1="200" y1="100" x2="200" y2="180" />
      <line x1="200" y1="180" x2="380" y2="180" />
      <line x1="380" y1="180" x2="380" y2="250" />
      <line x1="380" y1="250" x2="300" y2="250" />
      <line x1="380" y1="250" x2="460" y2="250" />
      <line x1="300" y1="250" x2="300" y2="320" />
      <line x1="460" y1="250" x2="460" y2="320" />
      <line x1="300" y1="320" x2="220" y2="320" />
      <line x1="300" y1="320" x2="380" y2="320" />
      <line x1="460" y1="320" x2="380" y2="320" />
      <line x1="460" y1="320" x2="540" y2="320" />
      <line x1="380" y1="180" x2="380" y2="120" />
      <line x1="380" y1="120" x2="300" y2="120" />
      <line x1="380" y1="120" x2="460" y2="120" />
    </g>
  );

  const nodeComponents = nodes.map(node => {
    const position = 'position' in node ? node.position : { x: node.x ?? 0, y: node.y ?? 0 };
    const section = ('section' in node ? node.section : (NODE_SECTION_MAP[node.id] ?? 'hero')) as SectionId;
    const label = node.label ?? node.id;
    
    return (
      <SchematicNode
        key={node.id}
        {...node}
        label={label}
        position={position}
        section={section}
        size={1}
        onNavigate={onNodeClick}
        interactive={true}
        showReadings={true}
      />
    );
  });

  return (
    <div className={`relative ${className}`} style={{ width: '100%', aspectRatio: '4/5' }}>
      {showGrid && (
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
      )}
      <svg
        viewBox="0 0 600 450"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full single-line-diagram"
        aria-label="Esquema unifilar de subestación CICMELINST - Navegación principal"
        role="img"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connections}
        <g className="nodes-layer">
          {nodeComponents}
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-4 text-micro text-secondary">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-insul-green-glow" />
          <span>ENERGIZADO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-steel" />
          <span>DESENERGIZADO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-warn-orange" />
          <span>MANTENIMIENTO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-alarm-red" />
          <span>FALLA</span>
        </div>
      </div>
    </div>
  );
};

export { DEFAULT_SUBSTATION_LAYOUT, NODE_SECTION_MAP };