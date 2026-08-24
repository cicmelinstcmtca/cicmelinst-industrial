import { motion } from 'motion/react';
import { SpecSheet } from '../ui';
import type { SpecSheetProps } from '../../types';
import { useServices } from '../../hooks';

function mapServiceToSpecSheet(service: { id: string; title: string; icon: string; description: string; image: string; tags: string[] }): SpecSheetProps {
  const specsMap: Record<string, SpecSheetProps> = {
    'montaje-electrico': {
      category: 'electrical',
      title: 'MONTAJE Y MANTENIMIENTO ELÉCTRICO',
      specs: [
        { param: 'Subestaciones 34.5 kV', value: 'Diseño + Montaje', unit: '', standard: 'IEEE C37 / RETIE', note: 'Hasta 25 MVA' },
        { param: 'Transformadores potencia', value: 'Instalación + Pruebas', unit: '', standard: 'IEEE C57.12', note: 'DGA + Relación + Polaridad' },
        { param: 'Celdas media tensión', value: 'Interruptores vacío/SF6', unit: '', standard: 'IEEE C37.20', note: '52-A, 52-B, 52-C' },
        { param: 'Protecciones relés', value: 'Settings + Coordinación', unit: '', standard: 'IEEE C37.112', note: '50/51, 51G, 27, 59, 87T, 25' },
        { param: 'Tableros BT', value: 'Fabricación + Montaje', unit: '', standard: 'IEC 61439', note: 'PCC, MCC, ATS, Distribución' },
        { param: 'Cableado potencia/control', value: 'Tendido + Terminación', unit: '', standard: 'NEC / RETIE', note: 'MT/BT, Instrumentación, Fibra' },
        { param: 'Puesta a tierra', value: 'Malla + Mediciones', unit: '', standard: 'IEEE 80 / RETIE', note: 'R < 1 Ω subestaciones' },
        { param: 'Pararrayos / SEP', value: 'Instalación + Certificación', unit: '', standard: 'NFPA 780 / IEEE 998', note: 'Clase I, II, III' },
      ],
    },
    'automatizacion': {
      category: 'instrumentation',
      title: 'AUTOMATIZACIÓN Y CONTROL',
      specs: [
        { param: 'SCADA Ignition/FT', value: 'Desarrollo + Despliegue', unit: '', standard: 'ISA 101 / ISA 95', note: 'Redundancia + Historiador' },
        { param: 'PLC Allen-Bradley/Siemens', value: 'Programación IEC 61131-3', unit: '', standard: 'IEC 61131-3', note: 'LAD, FBD, ST, SFC' },
        { param: 'HMI/Thin Client', value: 'Diseño + Implementación', unit: '', standard: 'ISA 101', note: 'Alarm management, Trending' },
        { param: 'Red industrial', value: 'Fibra óptica anillo', unit: '', standard: 'IEC 62439', note: 'PRP/HSR, RSTP < 50ms' },
        { param: 'SIS (Safety)', value: 'Triconex / HIMA', unit: '', standard: 'IEC 61511', note: 'SIL 2/3, LoPA, SRS' },
        { param: 'Comunicaciones', value: 'Modbus TCP / OPC-UA', unit: '', standard: 'IEC 62541', note: 'Integración IT/OT' },
        { param: 'Ciberseguridad OT', value: 'Segmentación + Monitoreo', unit: '', standard: 'IEC 62443 / NIST', note: 'Zonas, Conduits, Firewalls' },
        { param: 'Puesta en marcha', value: 'FAT/SAT + Capacitación', unit: '', standard: 'ISA 18.2', note: 'Procedimientos + Checklists' },
      ],
    },
    'construccion-civil': {
      category: 'mechanical',
      title: 'OBRAS CIVILES Y MECÁNICAS INDUSTRIALES',
      specs: [
        { param: 'Tanques API 650/653', value: 'Hasta 50.000 BBL', unit: '', standard: 'API 650 / 653', note: 'Inspección, Reparación, Re-rating' },
        { param: 'Tubería proceso ASME B31.3', value: '2" - 36"', unit: '', standard: 'ASME B31.3 / B31.4', note: 'SMAW/GTAW, PWHT, NDT' },
        { param: 'Válvulas control/bloqueo', value: '150# - 2500#', unit: '', standard: 'API 6D / 600', note: 'Prueba hidrostática, Fuga asiento' },
        { param: 'Intercambiadores calor', value: 'Carcasa tubo / Placas', unit: '', standard: 'ASME Sec VIII / TEMA', note: 'Limpieza mecánica/química' },
        { param: 'Bombas centrífugas API 610', value: 'BB1-BB5', unit: '', standard: 'API 610 / HI 1.3', note: 'Alineación láser, Vibración' },
        { param: 'Compresores API 618/619', value: 'Alternativos / Tornillo', unit: '', standard: 'API 618 / 619', note: 'Monitoreo vibración online' },
        { param: 'Estructuras metálicas', value: 'A36 / A992 Gr50', unit: '', standard: 'AISC 360', note: 'Pintura epóxica 3 capas' },
        { param: 'Obras civiles industriales', value: 'Cimentación / Vialidad', unit: '', standard: 'ACI 318 / RETIE', note: 'Concreto f\'c 210-350 kg/cm²' },
      ],
    },
    'instrumentacion': {
      category: 'logistics',
      title: 'INSTRUMENTACIÓN INDUSTRIAL',
      specs: [
        { param: 'Transmisores presión', value: 'Rosemount 3051 / Yokogawa', unit: '', standard: 'ISA 51.1', note: '4-20 mA + HART, SIL 2' },
        { param: 'Transmisores temperatura', value: 'RTD Pt100 / Termopares', unit: '', standard: 'IEC 60751', note: '3 hilos, Clase A, Cabezal' },
        { param: 'Transmisores flujo', value: 'Magnético / Ultrasónico / Vórtice', unit: '', standard: 'ISO 5167', note: 'Compensación temp/pres' },
        { param: 'Transmisores nivel', value: 'Radar guiado / Libre', unit: '', standard: 'IEC 61298', note: 'Interfaz HART, SIL 2' },
        { param: 'Válvulas de control', value: 'Globo / Ángulo / Mariposa', unit: '', standard: 'ISA 75 / FCI 70-2', note: 'Posicionador smart, Diagnóstico' },
        { param: 'Sistemas analíticos', value: 'Cromatografía / Espectroscopía', unit: '', standard: 'ASTM / ISO', note: 'Shelter + Muestreo' },
        { param: 'Calibración ISO 17025', value: 'Laboratorio acreditado', unit: '', standard: 'ISO/IEC 17025', note: 'Patrones trazables, Certificados' },
        { param: 'Instalación + Puesta en marcha', value: 'Cableado + Configuración', unit: '', standard: 'ISA 5.1 / 5.4', note: 'P&ID, Loop diagrams, Checklists' },
      ],
    },
  };

  return specsMap[service.id] || {
    category: service.id,
    title: service.title,
    specs: service.tags.map((tag, _i) => ({
      param: tag,
      value: 'Disponible',
      unit: '',
      standard: '',
      note: service.description,
    })),
  };
}

export function Capabilities() {
  const services = useServices();

  return (
    <section
      id="capabilities"
      className="section-padding bg-control relative"
      aria-labelledby="capabilities-title"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" aria-hidden="true" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-tag text-warn-orange mb-4 block">CAPACIDADES TÉCNICAS</span>
          <h2 id="capabilities-title" className="text-title text-primary mb-6">
            PANEL DE PROTECCIONES Y ESPECIFICACIONES
          </h2>
          <p className="text-body-lg text-secondary">
            Cada relé de protección representa una capacidad técnica certificada.
            Seleccione un relé para ver sus settings, normas aplicables y alcance de servicio.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            >
              <SpecSheet {...mapServiceToSpecSheet(service)} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-6 bg-gauge/30 border border-panel/50 radius-card"
        >
          <h3 className="text-h3 text-primary mb-4 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warn-orange" aria-hidden="true">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>
            </svg>
            CAPACIDADES ADICIONALES BAJO DEMANDA
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-small">
            {[
              'Estudios de coordinación de protecciones',
              'Análisis de arco eléctrico (IEEE 1584)',
              'Estudios de cortocircuito y flujo de carga',
              'Puesta a tierra y malla de tierra',
              'Protección catódica (impuesta/sacrificial)',
              'Automatización subestaciones IEC 61850',
              'Calibración instrumentos (ISO 17025)',
              'Inspección API 653 / NBIC / ASME',
            ].map((cap, i) => (
              <div key={i} className="flex items-center gap-2 text-secondary p-3 bg-panel/50 radius-panel border border-panel/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-insul-green flex-shrink-0" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {cap}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}