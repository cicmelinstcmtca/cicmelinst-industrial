import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Textarea, Select, Badge } from '../ui';
import { generateWorkOrderNumber } from '../../utils/helpers';
import { useCompany } from '../../hooks';

const contactSchema = z.object({
  'CT-01': z.string().min(2, 'Nombre requerido (mín. 2 caracteres)'),
  'CT-02': z.string().optional(),
  'CT-03': z.string().email('Formato de email inválido'),
  'CT-04': z.string().regex(/^[\d\s\-+()]{7,}$/, 'Teléfono inválido'),
  'CT-05': z.enum(['maintenance', 'construction', 'electrical', 'instrumentation', 'logistics', 'consulting']),
  'CT-06': z.string().min(1, 'Seleccione ubicación'),
  'CT-07': z.string().min(20, 'Descripción técnica mínima 20 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const TYPE_OPTIONS = [
  { value: 'maintenance', label: 'MANTENIMIENTO (PM/CM)' },
  { value: 'construction', label: 'CONSTRUCCIÓN OBRAS CIVILES/MECÁNICAS' },
  { value: 'electrical', label: 'ELÉCTRICA E INSTRUMENTACIÓN' },
  { value: 'instrumentation', label: 'AUTOMATIZACIÓN Y CONTROL' },
  { value: 'logistics', label: 'LOGÍSTICA Y SUMINISTROS' },
  { value: 'consulting', label: 'CONSULTORÍA Y ESTUDIOS TÉCNICOS' },
];

const LOCATION_OPTIONS = [
  { value: 'guanipa', label: 'SAN JOSÉ DE GUANIPA — Sede Principal' },
  { value: 'pariaguan', label: 'PARIAGUÁN — Sede Operativa' },
  { value: 'lecheria', label: 'LECHERÍA — Sede Comercial (Próximamente)' },
  { value: 'field', label: 'CAMPO / SITIO DEL CLIENTE' },
];

export function Contact() {
  const { phoneDisplay, email, whatsapp } = useCompany();
  const [submitted, setSubmitted] = useState(false);
  const [workOrder, setWorkOrder] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const woNumber = generateWorkOrderNumber();
    setWorkOrder(woNumber);
    setSubmitted(true);

    console.log('Work Order Generated:', { woNumber, data });
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setWorkOrder(null);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-control relative"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" aria-hidden="true" />

      <div className="container-main relative">
        {/* Success State */}
        {submitted && workOrder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gauge border border-insul-green/50 radius-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 radius-panel bg-insul-green/20 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-insul-green" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>

              <h2 className="text-title text-primary mb-2">ORDEN GENERADA</h2>
              <p className="text-body-lg text-secondary mb-4">
                Su requerimiento ha sido registrado en el sistema SCADA
              </p>

              <div className="bg-panel border border-insul-green/30 radius-panel p-6 mb-6">
                <div className="text-micro text-muted font-mono uppercase tracking-wider mb-1">NÚMERO DE ORDEN</div>
                <div className="text-mono-lg font-mono font-bold text-insul-green font-mono">{workOrder}</div>
                <div className="text-micro text-muted font-mono mt-2">
                  {new Date().toLocaleString('es-VE', { dateStyle: 'full', timeStyle: 'short' })}
                </div>
              </div>

              <div className="space-y-2 text-small text-secondary mb-8">
                <p>Se ha enviado confirmación al correo registrado</p>
                <p>Nuestro despachador le contactará en <strong className="text-primary">menos de 4 horas</strong></p>
                <p>Para emergencias: <a href={`tel:${whatsapp}`} className="text-warn-orange hover:underline">{phoneDisplay}</a></p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="secondary" onClick={handleReset}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 2v6h-6"/>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
                  </svg>
                  NUEVA ORDEN
                </Button>
                <Button onClick={() => window.open(`/reports/${workOrder}.pdf`, '_blank')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  DESCARGAR PDF
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form State */}
        {!submitted && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto mb-12"
            >
              <span className="label-tag text-warn-orange mb-4 block">PANEL DE ENTRADA DE ÓRDENES</span>
              <h2 id="contact-title" className="text-title text-primary mb-4">
                GENERAR ORDEN DE TRABAJO
              </h2>
              <p className="text-body-lg text-secondary">
                Complete el formulario técnico. Cada campo es un punto de control en el sistema.
                Los campos marcados con <span className="text-warn-orange font-mono">REQ*</span> son obligatorios.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-gauge border border-panel/50 radius-card p-6 lg:p-8" noValidate>
                <div className="mb-8 p-4 bg-panel/50 border border-panel radius-panel">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
                    <h3 className="text-h3 text-primary">ORDEN DE TRABAJO</h3>
                    <Badge variant="progress" size="sm" dot>NUEVA OT</Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-small">
                    <div className="flex items-center gap-2">
                      <span className="label-tag">OT-N°</span>
                      <span className="text-mono-sm font-mono text-primary" id="wo-number">{generateWorkOrderNumber()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="label-tag">FECHA</span>
                      <span className="text-mono-sm font-mono text-primary" id="wo-date">{new Date().toLocaleDateString('es-VE')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="label-tag">HORA</span>
                      <span className="text-mono-sm font-mono text-primary" id="wo-time">{new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="label-tag">ESTADO</span>
                      <Badge variant="progress" size="sm">PENDIENTE ASIGNACIÓN</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Input
                    {...register('CT-01')}
                    tag="CT-01"
                    label="SOLICITANTE"
                    placeholder="Nombre completo del solicitante"
                    error={errors['CT-01']?.message}
                    required
                  />

                  <Input
                    {...register('CT-02')}
                    tag="CT-02"
                    label="EMPRESA / CONTRATISTA"
                    placeholder="Nombre de la empresa (opcional)"
                  />

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      {...register('CT-03')}
                      tag="CT-03"
                      label="CORREO ELECTRÓNICO"
                      type="email"
                      placeholder="correo@empresa.com"
                      error={errors['CT-03']?.message}
                      required
                    />
                    <Input
                      {...register('CT-04')}
                      tag="CT-04"
                      label="TELÉFONO DE CONTACTO"
                      type="tel"
                      placeholder={phoneDisplay}
                      error={errors['CT-04']?.message}
                      required
                    />
                  </div>

                  <Select
                    {...register('CT-05')}
                    tag="CT-05"
                    label="TIPO DE REQUERIMIENTO"
                    options={TYPE_OPTIONS}
                    placeholder="Seleccione categoría técnica"
                    error={errors['CT-05']?.message}
                  />

                  <Select
                    {...register('CT-06')}
                    tag="CT-06"
                    label="UBICACIÓN DEL SERVICIO"
                    options={LOCATION_OPTIONS}
                    placeholder="Seleccione sede o sitio"
                    error={errors['CT-06']?.message}
                  />

                  <Textarea
                    {...register('CT-07')}
                    tag="CT-07"
                    label="DESCRIPCIÓN TÉCNICA DETALLADA"
                    placeholder="Describa el alcance, equipos involucrados, condiciones de sitio, normativa aplicable, riesgos identificados, y cualquier especificación técnica relevante. Mínimo 20 caracteres."
                    rows={6}
                    error={errors['CT-07']?.message}
                  />

                  <div className="p-4 bg-warn-orange/10 border border-warn-orange/30 radius-panel">
                    <div className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warn-orange flex-shrink-0 mt-0.5" aria-hidden="true">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                      <div>
                        <p className="text-warn-orange font-medium text-small mb-1">EMERGENCIAS 24/7</p>
                        <p className="text-secondary text-small">
                          Para situaciones de riesgo inmediato, parada de planta o emergencia ambiental:
                          <a href={`tel:${whatsapp}`} className="text-warn-orange font-mono underline">{phoneDisplay}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-panel/50">
                    <Button
                      type="submit"
                      variant="emergency"
                      size="lg"
                      className="w-full"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin mr-2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75" />
                          </svg>
                          PROCESANDO ORDEN...
                        </>
                      ) : (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2" aria-hidden="true">
                            <path d="M5 12h14"/>
                            <path d="m12 5 7 7-7 7"/>
                          </svg>
                          ENVIAR ORDEN DE TRABAJO
                        </>
                      )}
                    </Button>

                    <p className="text-center text-micro text-muted font-mono mt-4">
                      Al enviar, autoriza el procesamiento de datos según nuestra política de privacidad.
                      La OT será registrada en el sistema SCADA y asignada a cuadrilla disponible.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {[
                { tag: 'TEL', label: 'CENTRAL', value: phoneDisplay, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                )},
                { tag: 'EML', label: 'CORREO', value: email, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                )},
                { tag: 'RIF', label: 'RIF', value: 'J-40063361-3', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="18" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                )},
              ].map((item, i) => (
                <motion.div
                  key={item.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="bg-gauge border border-panel/50 radius-card p-5 hover:border-warn-orange/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 radius-panel bg-warn-orange/20 text-warn-orange">{item.icon}</span>
                    <div>
                      <span className="label-tag">{item.tag}</span>
                      <div className="text-micro text-muted font-mono">{item.label}</div>
                    </div>
                  </div>
                  <div className="text-mono-sm font-mono text-primary">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}