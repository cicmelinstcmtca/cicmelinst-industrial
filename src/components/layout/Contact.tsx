import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCompany } from '../../hooks';

interface FormData {
  name: string;
  company: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', company: '', service: '', message: '' };

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

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const serviceLabel = SERVICES.find(s => s.id === form.service)?.label || form.service;
    const subject = encodeURIComponent(`Cotización: ${serviceLabel}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmpresa: ${form.company || 'N/A'}\nServicio: ${serviceLabel}\n\n${form.message}`
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
            <div key={i} className="relative flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)]">
              <span className="text-2xl font-bold text-[var(--color-warn-orange)]/20" style={{ fontFamily: 'var(--font-family-display)' }}>
                {step.num}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{step.title}</h4>
                <p className="text-xs text-[var(--color-text-muted)]">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden sm:block absolute top-1/2 -right-4 w-4 h-px bg-[var(--color-border-panel)]" />
              )}
            </div>
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
                      <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Empresa</label>
                      <input
                        type="text"
                        placeholder="Nombre de la empresa"
                        value={form.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        className={inputClass}
                      />
                    </div>
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
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${company.whatsapp}?text=Hola,%20me%20interesa%20una%20cotizaci%C3%B3n%20para%20un%20proyecto.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--color-text-primary)]">¿Prefieres WhatsApp?</div>
                <div className="text-xs text-[var(--color-text-muted)]">Respuesta inmediata durante horario laboral</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-[var(--color-text-muted)] group-hover:text-[#25D366] group-hover:translate-x-1 transition-all">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Response Time */}
            <div className="p-5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-insul-green)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase">Tiempo de Respuesta</div>
                  <div className="text-lg font-bold text-[var(--color-insul-green)]">&lt; 24 horas</div>
                </div>
              </div>
              <div className="h-1.5 bg-[var(--color-bg-control)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--color-insul-green)] to-[var(--color-insul-green-glow)] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-2">Promedio de respuesta en días hábiles</p>
            </div>

            {/* What You Get */}
            <div className="p-5 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)]">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-family-display)' }}>
                Nuestra propuesta incluye
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {DELIVERABLES.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs font-medium text-[var(--color-text-primary)]">{item.title}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
