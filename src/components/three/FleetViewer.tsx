import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, ContactShadows, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../ui';
import { ErrorBoundary } from '../ErrorBoundary';
import type { FleetVehicle } from '../../types';

interface FleetViewerProps {
  vehicles: FleetVehicle[];
  selectedVehicle?: FleetVehicle | null;
  onSelectVehicle?: (vehicle: FleetVehicle | null) => void;
  className?: string;
}

const defaultOnSelectVehicle = (_vehicle: FleetVehicle | null) => { /* noop */ };

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

const VEHICLE_COLORS: Record<string, string> = {
  truck: '#0D47A1',
  pickup: '#1565C0',
  crane: '#E65100',
  forklift: '#2E7D32',
  trailer: '#4A148C',
  utility: '#00838F',
};

interface VehicleModelProps {
  vehicle: FleetVehicle;
  isSelected: boolean;
  onClick: () => void;
  position: THREE.Vector3;
  rotation: THREE.Euler;
}

const VehicleModel = ({ vehicle, isSelected, onClick, position, rotation }: VehicleModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const color = VEHICLE_COLORS[vehicle.type] || '#0D47A1';

  useFrame(() => {
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = Math.sin(Date.now() * 0.003) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} onClick={onClick}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.2, 4]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.6}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      <mesh position={[0, 1.4, -0.5]} castShadow>
        <boxGeometry args={[2, 0.8, 1.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
      </mesh>
      <Html
        transform
        position={[0, -2.5, 0]}
        occlude
        fullscreen
        wrapperClass="vehicle-label"
        prepend
      >
        <div className="vehicle-label-inner">
          <span className="label-tag">{vehicle.id}</span>
          <div className="text-small text-primary font-medium">{vehicle.model}</div>
          <Badge variant="default" size="sm" dot>{vehicle.count} UNIDADES</Badge>
        </div>
      </Html>
    </group>
  );
};

const GroundPlane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial
      color="#0A0F14"
      metalness={0.1}
      roughness={0.9}
      opacity={0.5}
      transparent
    />
  </mesh>
);

const GridHelper = () => {
  const grid = useRef<THREE.GridHelper>(null);

  useEffect(() => {
    if (grid.current && Array.isArray(grid.current.material)) {
      grid.current.material.forEach((m) => {
        m.opacity = 0.1;
        m.transparent = true;
      });
    } else if (grid.current?.material) {
      (grid.current.material as THREE.Material).opacity = 0.1;
      (grid.current.material as THREE.Material).transparent = true;
    }
  }, []);

  return (
    <gridHelper
      ref={grid}
      args={[200, 20, '#152533', '#0A0F14']}
      position={[0, -0.49, 0]}
    />
  );
};

const SceneContent = ({ vehicles, selectedVehicle, onSelectVehicle, isMobile }: {
  vehicles: FleetVehicle[];
  selectedVehicle: FleetVehicle | null;
  onSelectVehicle: (vehicle: FleetVehicle | null) => void;
  isMobile: boolean;
}) => {
  const positions = vehicles.map((_, index) => {
    const cols = isMobile ? 3 : 5;
    const row = Math.floor(index / cols);
    const col = index % cols;
    const spacing = 8;
    return new THREE.Vector3(
      (col - (cols - 1) / 2) * spacing,
      0,
      (row - (vehicles.length / cols - 1) / 2) * spacing
    );
  });

  return (
    <>
      <color attach="background" args={['#0A0F14']} />
      <fog attach="fog" args={['#0A0F14', 10, 60]} />

      <Environment preset="warehouse" background={false} ground={false} />

      <ambientLight intensity={0.5} color="#4A5568" />
      <directionalLight
        position={[20, 30, 20]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-10, 20, -10]} intensity={0.5} color="#0066CC" />

      <GroundPlane />
      <GridHelper />
      <ContactShadows opacity={0.15} scale={10} blur={2} far={10} />

      {vehicles.map((vehicle, index) => (
        <VehicleModel
          key={vehicle.id}
          vehicle={vehicle}
          isSelected={selectedVehicle?.id === vehicle.id}
          onClick={() => onSelectVehicle(vehicle)}
          position={positions[index]}
          rotation={new THREE.Euler(0, (index * 137.5) * Math.PI / 180, 0)}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={50}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.05}
        target={[0, 0, 0]}
      />
    </>
  );
};

const LoadingOverlay = () => {
  const { progress } = useProgress();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gauge/90 backdrop-blur z-[10]">
      <div className="text-center">
        <div className="animate-spin flex items-center justify-center gap-2 mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warn-orange" aria-hidden="true">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75" />
          </svg>
          <span className="text-micro font-mono text-primary">CARGANDO ESCENA 3D</span>
        </div>
        <div className="w-64 h-2 bg-panel border border-panel radius-pill overflow-hidden">
          <motion.div
            className="h-full bg-warn-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-micro text-muted font-mono mt-2">{Math.round(progress * 100)}%</div>
      </div>
    </div>
  );
};

export function FleetViewer({ vehicles, selectedVehicle, onSelectVehicle, className }: FleetViewerProps) {
  const handleSelect = onSelectVehicle ?? defaultOnSelectVehicle;
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebglAvailable(detectWebGL());
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className={className} style={{ aspectRatio: '16/9', minHeight: '400px' }}>
        <div className="w-full h-full flex items-center justify-center bg-gauge border border-panel radius-card">
          <div className="text-center text-secondary">
            <div className="animate-pulse flex items-center justify-center gap-2 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span className="text-micro font-mono">INICIALIZANDO MOTOR 3D...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!webglAvailable) {
    return <FleetViewerFallback vehicles={vehicles} />;
  }

  return (
    <ErrorBoundary
      fallback={<FleetViewerFallback vehicles={vehicles} />}
      sectionName="Visor 3D"
    >
      <div className={className} style={{ width: '100%', aspectRatio: '16/9', minHeight: '400px' }}>
        <Canvas
          camera={{ position: [0, 15, 25], fov: 50 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          shadows
          className="w-full h-full"
          style={{ touchAction: 'none' }}
        >
          <SceneContent
            vehicles={vehicles}
            selectedVehicle={selectedVehicle ?? null}
            onSelectVehicle={handleSelect}
            isMobile={isMobile}
          />
          <LoadingOverlay />
        </Canvas>

        <AnimatePresence mode="wait">
          {selectedVehicle && (
            <motion.div
              className={`
                absolute z-[100]
                ${isMobile
                  ? 'bottom-4 left-4 right-4 max-w-[calc(100vw-2rem)]'
                  : 'bottom-4 right-4 left-4 lg:right-4 lg:left-auto lg:bottom-4 lg:top-4 lg:w-72'
                }
              `}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="bg-gauge border border-panel radius-card p-4 shadow-modal">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="label-tag">{selectedVehicle.id}</span>
                    <h4 className="text-h3 text-primary mt-1">{selectedVehicle.model}</h4>
                  </div>
                  <button
                    onClick={() => handleSelect(null)}
                    className="p-1 radius-panel hover:bg-panel transition-colors"
                    aria-label="Cerrar ficha técnica"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3 text-small">
                  <div className="grid grid-cols-2 gap-2 text-secondary">
                    <span>CANTIDAD</span>
                    <span className="text-primary font-mono text-right">{selectedVehicle.count} unidades</span>
                    <span>AÑO</span>
                    <span className="text-primary font-mono text-right">{selectedVehicle.specs.year || 'N/A'}</span>
                    <span>MOTOR</span>
                    <span className="text-primary font-mono text-right">{selectedVehicle.specs.engine || 'N/A'}</span>
                    <span>CAPACIDAD</span>
                    <span className="text-primary font-mono text-right">{selectedVehicle.specs.capacity || 'N/A'}</span>
                  </div>

                  <div className="border-t border-panel/50 pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warn-orange" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="text-muted font-mono">MANTENIMIENTO</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-secondary text-xs">
                      <span>ÚLTIMO</span>
                      <span className="text-primary font-mono text-right">{selectedVehicle.specs.lastMaintenance || 'N/A'}</span>
                      <span>PRÓXIMO</span>
                      <span className="text-primary font-mono text-right">{selectedVehicle.specs.nextInspection || 'N/A'}</span>
                    </div>
                  </div>

                  {selectedVehicle.specs.operator && (
                    <div className="border-t border-panel/50 pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pipe-blue" aria-hidden="true">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span className="text-muted font-mono">OPERADOR ASIGNADO</span>
                      </div>
                      <span className="text-primary">{selectedVehicle.specs.operator}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`
          absolute z-[50]
          ${isMobile
            ? 'bottom-20 left-4 right-4 max-w-[calc(100vw-2rem)]'
            : 'bottom-4 left-4 right-4 lg:bottom-4 lg:left-4 lg:right-auto lg:w-64'
          }
        `}>
          <div className="bg-gauge/90 backdrop-blur border border-panel/50 radius-card p-3 text-micro text-secondary font-mono">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              CONTROLES
            </div>
            <div className="space-y-1 text-secondary/80">
              <div className="flex justify-between"><kbd className="bg-panel border border-panel/50 radius-panel px-1.5 py-0.5">Click + Arrastrar</kbd><span>Rotar cámara</span></div>
              <div className="flex justify-between"><kbd className="bg-panel border border-panel/50 radius-panel px-1.5 py-0.5">Scroll</kbd><span>Zoom</span></div>
              <div className="flex justify-between"><kbd className="bg-panel border border-panel/50 radius-panel px-1.5 py-0.5">Shift + Click</kbd><span>Pan</span></div>
              <div className="flex justify-between"><kbd className="bg-panel border border-panel/50 radius-panel px-1.5 py-0.5">Click Vehículo</kbd><span>Ficha técnica</span></div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export function FleetViewerFallback({ vehicles }: { vehicles: FleetVehicle[] }) {
  return (
    <div className="bg-gauge border border-panel radius-card overflow-hidden">
      <div className="p-4 border-b border-panel/50 flex items-center justify-between">
        <h3 className="text-h3 text-primary">INVENTARIO TÉCNICO 3D</h3>
        <Badge variant="default" size="sm">MODO TABLA</Badge>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-small">
          <thead>
            <tr className="text-left text-muted font-mono text-micro uppercase tracking-wider border-b border-panel/50">
              <th className="pb-2">ID</th>
              <th className="pb-2">MODELO</th>
              <th className="pb-2">TIPO</th>
              <th className="pb-2">CANT.</th>
              <th className="pb-2">MOTOR</th>
              <th className="pb-2">ÚLT. MANT.</th>
              <th className="pb-2">PRÓX. INSPI.</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} className="border-b border-panel/30 hover:bg-panel/30">
                <td className="py-3 text-mono-sm font-mono text-primary">{vehicle.id}</td>
                <td className="py-3 text-primary font-medium">{vehicle.model}</td>
                <td className="py-3 text-secondary capitalize">{vehicle.type}</td>
                <td className="py-3 text-primary font-mono">{vehicle.count}</td>
                <td className="py-3 text-secondary">{vehicle.specs.engine || 'N/A'}</td>
                <td className="py-3 text-secondary">{vehicle.specs.lastMaintenance || 'N/A'}</td>
                <td className="py-3 text-secondary">{vehicle.specs.nextInspection || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
