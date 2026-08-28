import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCompany } from '../../hooks';

interface FormData {
  name: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', phone: '', company: '', service: '', message: '' };

const SERVICES = [
  { id: 'electrical', label: 'Montaje Eléctrico', icon: '⚡', desc: 'Subestaciones, distribución, líneas de transmisión' },
  { id: 'automation', label: 'Automatización', icon: '⚙️', desc: 'SCADA, PLC, sistemas de control' },
  { id: 'civil', label: 'Construcción Civil', icon: '🏗️', desc: 'Obras civiles, cimentaciones, estructuras' },
  { id: 'instrumentation', label: 'Instrumentación', icon: '📊', desc: 'Calibración, medición, transmisores' },
  { id: 'maintenance', label: 'Mantenimiento', icon: '🔧', desc: 'Preventivo, correctivo, predictivo' },
  { id: 'consulting', label: 'Consultoría', icon: '📋', desc: 'Estudios, diseños, supervisión' },
];

const DELIVERABLES = [
  { icon: '📐', title: 'Propuesta Técnica', desc: 'Alcance, metodología y cronograma detallado' },
  { icon: '💰', title: 'Presupuesto', desc: 'Costos transparentes por partida y fase' },
  { icon: '📅', title: 'Cronograma', desc: 'Plan de ejecución con hitos y entregables' },
  { icon: '🛡️', title: 'Plan SIHO', desc: 'Procedimientos de seguridad y control' },
];

const STEPS = [
  { num: '01', title: 'Cuéntanos', desc: 'Describe tu proyecto en el formulario' },
  { num: '02', title: 'Analizamos', desc: 'Nuestro equipo evalúa el alcance técnico' },
  { num: '03', title: 'Propuesta', desc: 'Recibe propuesta técnica y comercial' },
];

export function Contact() {
  const company = useCompany();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [hoveredDeliverable, setHoveredDeliverable] = useState<number | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const serviceLabel = SERVICES.find(s => s.id === form.service)?.label || form.service;
    const subject = encodeURIComponent(`Cotización: ${serviceLabel}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nTeléfono: ${form.phone}\nEmpresa: ${form.company || 'N/A'}\nServicio: ${serviceLabel}\n\n${form.message}`
    );
    window.open(`mailto:${company.email}?subject=${subject}&body=${body}`);
    setTimeout(() => { setSubmitted(true); setSending(false); }, 500);
  };

  const inputClass = "w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all duration-300";

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[var(--color-bg-panel)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Contáctenos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Solicite una Cotización
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto"
          >
            Cuéntenos sobre su proyecto y le responderemos con una propuesta técnica
            y comercial personalizada.
          </motion.p>
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="relative flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] hover:border-[var(--color-warn-orange)]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all duration-300 group"
            >
              <span className="text-2xl font-bold text-[var(--color-warn-orange)]/30 group-hover:text-[var(--color-warn-orange)]/60 transition-colors" style={{ fontFamily: 'var(--font-family-display)' }}>
                {step.num}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{step.title}</h4>
                <p className="text-xs text-[var(--color-text-muted)]">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-4 w-4 h-px bg-[var(--color-border-panel)] group-hover:bg-[var(--color-warn-orange)]/30 transition-colors" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[var(--color-bg-control)] border border-[var(--color-insul-green)]/30 rounded-2xl p-8 text-center"
                >
                  <motion.svg
                    width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="1.5"
                    className="mx-auto mb-4"
                  >
                    <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
                    <motion.path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                    <motion.polyline points="22 4 12 14.01 9 11.01" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.8 }} />
                  </motion.svg>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                    Mensaje Enviado
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    Nos pondremos en contacto con usted en las próximas horas.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
                    className="px-6 py-3 border border-[var(--color-pipe-blue-glow)] text-[var(--color-pipe-blue-glow)] rounded-xl hover:bg-[var(--color-pipe-blue-glow)] hover:text-[var(--color-bg-control)] transition-all font-medium active:scale-[0.98]"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Interactive Service Selector */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">Tipo de Servicio *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => updateField('service', service.id)}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                            form.service === service.id
                              ? 'border-[var(--color-warn-orange)] bg-[var(--color-warn-orange)]/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                              : 'border-[var(--color-border-panel)] bg-[var(--color-bg-control)] hover:border-[var(--color-warn-orange)]/30 hover:bg-[var(--color-bg-control)]'
                          }`}
                        >
                          <span className="text-lg mb-1 block">{service.icon}</span>
                          <span className="text-xs font-medium text-[var(--color-text-primary)] block">{service.label}</span>
                          <span className="text-[10px] text-[var(--color-text-muted)] block mt-0.5">{service.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Nombre *</label>
                      <input
                        type="text"
                        required
                        placeholder="Su nombre completo"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Teléfono *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+58 424 123 4567"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Empresa</label>
                    <input
                      type="text"
                      placeholder="Nombre de la empresa"
                      value={form.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Descripción del Proyecto *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describa el alcance del proyecto, ubicación, y cualquier requerimiento técnico especial..."
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !form.service}
                    className="w-full px-6 py-3.5 bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] font-semibold rounded-xl hover:bg-[var(--color-warn-orange-glow)] transition-all hover:shadow-lg hover:shadow-[var(--color-warn-orange)]/20 active:scale-[0.98] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75" />
                        </svg>
                        Enviando...
                      </span>
                    ) : 'Enviar Solicitud'}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  </button>

                  <p className="text-xs text-[var(--color-text-muted)] text-center">
                    Le responderemos en menos de 24 horas hábiles.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Response Time - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] hover:border-[var(--color-insul-green)]/30 hover:shadow-[0_0_25px_rgba(0,255,136,0.08)] transition-all duration-500 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-insul-green)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Tiempo de Respuesta</div>
                  <motion.div
                    className="text-2xl font-bold text-[var(--color-insul-green)]"
                    style={{ fontFamily: 'var(--font-family-display)' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  >
                    &lt; 24h
                  </motion.div>
                </div>
              </div>
              <div className="h-2 bg-[var(--color-bg-panel)] rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--color-insul-green)] to-[var(--color-insul-green-glow)] rounded-full relative"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-[var(--color-text-muted)]">Promedio en días hábiles</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-insul-green)] animate-pulse" />
                  <span className="text-[10px] text-[var(--color-insul-green)] font-mono">Activo</span>
                </div>
              </div>
            </motion.div>

            {/* What You Get - Interactive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)]"
            >
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-family-display)' }}>
                Nuestra propuesta incluye
              </h4>
              <div className="space-y-2">
                {DELIVERABLES.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 p-2.5 rounded-lg cursor-default transition-all duration-200 hover:bg-[var(--color-bg-panel)] group/item"
                    onMouseEnter={() => setHoveredDeliverable(i)}
                    onMouseLeave={() => setHoveredDeliverable(null)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      hoveredDeliverable === i
                        ? 'bg-[var(--color-warn-orange)]/15 scale-110'
                        : 'bg-[var(--color-bg-panel)]'
                    }`}>
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[var(--color-text-primary)] group-hover/item:text-[var(--color-warn-orange)] transition-colors">{item.title}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">{item.desc}</div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`mt-1 flex-shrink-0 transition-all duration-200 ${
                      hoveredDeliverable === i
                        ? 'text-[var(--color-warn-orange)] opacity-100 translate-x-0'
                        : 'text-[var(--color-text-muted)] opacity-0 -translate-x-2'
                    }`}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-3">
              {company.social.linkedin && (
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-pipe-blue-glow)] hover:border-[var(--color-pipe-blue-glow)]/30 hover:bg-[var(--color-pipe-blue-glow)]/10 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              )}
              {company.social.instagram && (
                <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-alarm-red)] hover:border-[var(--color-alarm-red)]/30 hover:bg-[var(--color-alarm-red)]/10 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                  <span className="text-xs font-medium">Instagram</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
