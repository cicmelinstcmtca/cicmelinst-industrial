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
    const subject = encodeURIComponent(`Cotización: ${form.service || 'Servicios'}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmpresa: ${form.company || 'N/A'}\nServicio: ${form.service}\n\n${form.message}`
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
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Tipo de Servicio *</label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => updateField('service', e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Seleccione un servicio</option>
                      <option value="electrical">Montaje Eléctrico</option>
                      <option value="automation">Automatización y Control</option>
                      <option value="civil">Construcción Civil</option>
                      <option value="instrumentation">Instrumentación</option>
                      <option value="maintenance">Mantenimiento Industrial</option>
                      <option value="consulting">Consultoría</option>
                    </select>
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
                    disabled={sending}
                    className="w-full px-6 py-3.5 bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] font-semibold rounded-xl hover:bg-[var(--color-warn-orange-glow)] transition-all hover:shadow-lg hover:shadow-[var(--color-warn-orange)]/20 active:scale-[0.98] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
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

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-xl p-5 hover:border-[var(--color-insul-green)]/20 hover:shadow-[0_0_20px_rgba(0,255,136,0.05)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-insul-green)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase">Dirección</div>
                  <p className="text-sm text-[var(--color-text-primary)] font-medium">{company.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-xl p-5 hover:border-[var(--color-warn-orange)]/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-warn-orange)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warn-orange)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase">Horario</div>
                  <p className="text-sm text-[var(--color-text-primary)] font-medium whitespace-pre-line">{company.schedule}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
