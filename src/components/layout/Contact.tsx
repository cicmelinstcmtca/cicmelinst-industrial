import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
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
  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Cotización: ${form.service || 'Servicios'}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmpresa: ${form.company || 'N/A'}\nServicio: ${form.service}\n\n${form.message}`
    );
    window.open(`mailto:${company.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

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
            {submitted ? (
              <div className="bg-[var(--color-bg-control)] border border-[var(--color-insul-green)]/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-insul-green)]/10 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                  Mensaje Enviado
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Nos pondremos en contacto con usted en las próximas horas.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
                  className="px-6 py-3 border border-[var(--color-pipe-blue-glow)] text-[var(--color-pipe-blue-glow)] rounded-lg hover:bg-[var(--color-pipe-blue-glow)] hover:text-[var(--color-bg-control)] transition-all font-medium"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Su nombre completo"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Empresa</label>
                    <input
                      type="text"
                      placeholder="Nombre de la empresa"
                      value={form.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Tipo de Servicio *</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => updateField('service', e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors appearance-none"
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
                    className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-[var(--color-warn-orange)] text-[var(--color-bg-control)] font-semibold rounded-lg hover:bg-[var(--color-warn-orange-glow)] transition-all hover:shadow-lg hover:shadow-[var(--color-warn-orange)]/20"
                >
                  Enviar Solicitud
                </button>

                <p className="text-xs text-[var(--color-text-muted)] text-center">
                  Le responderemos en menos de 24 horas hábiles.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-xl p-5">
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

            <div className="bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-xl p-5">
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
