import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { FleetViewer } from '../three';
import { Button } from '../ui';
import type { FleetVehicle } from '../../types';


const LOGISTICS_TO_FLEET = (): FleetVehicle[] => [
  {
    id: 'PKP-01',
    type: 'pickup',
    count: 24,
    model: 'Ford Ranger 4x4 2022',
    specs: {
      engine: '2.0L Bi-Turbo Diesel',
      capacity: '1.000 kg carga',
      year: 2022,
      lastMaintenance: '2026-03-01',
      nextInspection: '2026-09-01',
      operator: 'Cuadrillas campo',
    },
    image: '/images/altura 1.jpg',
  },
  {
    id: 'SED-01',
    type: 'sedan',
    count: 4,
    model: 'Toyota Corolla 2023',
    specs: {
      engine: '1.8L Hybrid',
      capacity: '5 pasajeros',
      year: 2023,
      lastMaintenance: '2026-02-15',
      nextInspection: '2026-08-15',
      operator: 'Pool administrativo',
    },
    image: '/images/altura 2.jpg',
  },
  {
    id: 'BKT-01',
    type: 'bucket',
    count: 6,
    model: 'Altec AA755MH Doble Cesta 2021',
    specs: {
      engine: 'Cummins ISB 6.7L',
      capacity: '2 operadores + 200 kg herramientas',
      year: 2021,
      lastMaintenance: '2026-02-28',
      nextInspection: '2026-05-28',
      operator: 'Líneas eléctricas',
    },
    image: '/images/altura 3.jpg',
  },
  {
    id: 'CRN-01',
    type: 'crane',
    count: 1,
    model: 'Terex BT-3470 Pick-Man 18 Ton 2020',
    specs: {
      engine: 'Cummins QSB 6.7L',
      capacity: '18.000 kg máx. (pluma 21m)',
      year: 2020,
      lastMaintenance: '2026-01-15',
      nextInspection: '2026-07-15',
      operator: 'Izaje pesado',
    },
    image: '/images/altura 4.jpg',
  },
  {
    id: 'LDR-01',
    type: 'loader',
    count: 1,
    model: 'Caterpillar 950M Payloader 2022',
    specs: {
      engine: 'Cat C7.1 ACERT',
      capacity: '3.5 m³ cucharón',
      year: 2022,
      lastMaintenance: '2026-03-10',
      nextInspection: '2026-09-10',
      operator: 'Movimiento tierras',
    },
    image: '/images/bajo 1.jpg',
  },
  {
    id: 'EXC-01',
    type: 'excavator',
    count: 1,
    model: 'Caterpillar 320D Retroexcavadora 2021',
    specs: {
      engine: 'Cat C4.4 ACERT',
      capacity: 'Prof. excavación 4.6m / Carga 0.3 m³',
      year: 2021,
      lastMaintenance: '2026-02-05',
      nextInspection: '2026-08-05',
      operator: 'Obras civiles',
    },
    image: '/images/altura 1.jpg',
  },
  {
    id: 'TRK-01',
    type: 'truck',
    count: 3,
    model: 'International 350 2020',
    specs: {
      engine: 'Cummins 6.7L Diesel',
      capacity: '6.000 kg carga',
      year: 2020,
      lastMaintenance: '2026-02-10',
      nextInspection: '2026-08-10',
      operator: 'Logística materiales',
    },
    image: '/images/altura 2.jpg',
  },
  {
    id: 'AMB-01',
    type: 'ambulance',
    count: 2,
    model: 'Ford E-350 Ambulancia 2022',
    specs: {
      engine: '7.3L V8 Gas',
      capacity: '2 pacientes + equipo médico',
      year: 2022,
      lastMaintenance: '2026-03-15',
      nextInspection: '2026-06-15',
      operator: 'SIHO - Emergencias',
    },
    image: '/images/altura 3.jpg',
  },
  {
    id: 'VAN-01',
    type: 'van',
    count: 1,
    model: 'Ford Transit 12P 2021',
    specs: {
      engine: '2.0L EcoBlue Diesel',
      capacity: '12 pasajeros',
      year: 2021,
      lastMaintenance: '2026-01-20',
      nextInspection: '2026-07-20',
      operator: 'Transporte personal',
    },
    image: '/images/altura 4.jpg',
  },
  {
    id: 'TRL-01',
    type: 'trailer',
    count: 3,
    model: 'Trailers / Comedores / Baños Móviles',
    specs: {
      engine: 'N/A (remolques)',
      capacity: 'Oficina 20ft / Comedor 40ft / Sanitario 20ft',
      year: 2020,
      lastMaintenance: '2026-01-01',
      nextInspection: '2026-12-31',
      operator: 'Campamentos obra',
    },
    image: '/images/bajo 1.jpg',
  },
];

export function Fleet() {
  const [filter, setFilter] = useState<'all' | 'light' | 'heavy' | 'special' | 'maintenance'>('all');
  const fleetData = useMemo(() => LOGISTICS_TO_FLEET(), []);

  const filteredVehicles = useMemo(() => fleetData.filter(v => {
    if (filter === 'all') return true;
    if (filter === 'light') return ['sedan', 'pickup', 'van'].includes(v.type);
    if (filter === 'heavy') return ['truck', 'ambulance'].includes(v.type);
    if (filter === 'special') return ['bucket', 'crane', 'loader', 'excavator'].includes(v.type);
    if (filter === 'maintenance') {
      const nextInsp = v.specs.nextInspection ? new Date(v.specs.nextInspection) : null;
      return nextInsp && nextInsp < new Date('2026-06-01');
    }
    return true;
  }), [fleetData, filter]);

  const totalUnits = fleetData.reduce((a, b) => a + b.count, 0);
  const lightCount = fleetData.filter(v => ['sedan', 'pickup', 'van'].includes(v.type)).reduce((a, b) => a + b.count, 0);
  const heavyCount = fleetData.filter(v => ['truck', 'ambulance'].includes(v.type)).reduce((a, b) => a + b.count, 0);
  const specialCount = fleetData.filter(v => ['bucket', 'crane', 'loader', 'excavator'].includes(v.type)).reduce((a, b) => a + b.count, 0);
  const maintenanceCount = fleetData.filter(v => v.specs.nextInspection && new Date(v.specs.nextInspection!) < new Date('2026-06-01')).length;

  return (
    <section
      id="fleet"
      className="section-padding bg-control relative"
      aria-labelledby="fleet-title"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" aria-hidden="true" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="label-tag text-warn-orange mb-4 block">INFRAESTRUCTURA MÓVIL</span>
              <h2 id="fleet-title" className="text-title text-primary">
                INVENTARIO TÉCNICO 3D — FLOTA OPERATIVA
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setFilter('all')}>TODOS</Button>
              <Button variant="secondary" size="sm" onClick={() => setFilter('light')}>LIVIANOS</Button>
              <Button variant="secondary" size="sm" onClick={() => setFilter('heavy')}>PESADOS</Button>
              <Button variant="secondary" size="sm" onClick={() => setFilter('special')}>ESPECIALES</Button>
              <Button variant="secondary" size="sm" onClick={() => setFilter('maintenance')}>⚠ MANTENIMIENTO</Button>
            </div>
          </div>

          <p className="text-body-lg text-secondary max-w-3xl">
            Explore la flota en 3D. Arrastre para rotar, rueda del ratón para zoom, click en cualquier unidad
            para ver su ficha técnica completa: motor, capacidad, historial de mantenimiento y operador asignado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <FleetViewer
            vehicles={filteredVehicles}
            onSelectVehicle={v => console.log('Selected:', v)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {[
            { label: 'TOTAL UNIDADES', value: totalUnits, color: 'text-primary' },
            { label: 'LIVIANOS', value: lightCount, color: 'text-pipe-blue' },
            { label: 'PESADOS', value: heavyCount, color: 'text-insul-green' },
            { label: 'ESPECIALES', value: specialCount, color: 'text-warn-orange' },
            { label: 'EN MANT.', value: maintenanceCount, color: 'text-alarm-red' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-5 bg-gauge/30 border border-panel/50 radius-card hover:border-warn-orange/50 transition-colors"
            >
              <div className={`text-mono-lg font-mono font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-micro text-muted font-mono uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 p-6 bg-gauge/30 border border-warn-orange/30 radius-card"
        >
          <h3 className="text-h3 text-warn-orange mb-4 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            ALERTAS DE MANTENIMIENTO PRÓXIMO
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-small">
            {fleetData.filter(v => v.specs.nextInspection && new Date(v.specs.nextInspection!) < new Date('2026-06-01'))
              .map(v => (
                <div key={v.id} className="p-3 bg-panel radius-panel border border-panel/50 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-warn-orange animate-pulse" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="text-primary font-medium truncate">{v.id} - {v.model}</div>
                    <div className="text-muted font-mono text-micro">Próxima inspección: {v.specs.nextInspection}</div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}