import { useState } from 'react';
import { motion } from 'motion/react';
import { useCompany } from '../../hooks';

export function Contact() {
  const company = useCompany();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                  onClick={() => setSubmitted(false)}
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
                      className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Empresa</label>
                    <input
                      type="text"
                      placeholder="Nombre de la empresa"
                      className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="correo@empresa.com"
                      className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+58 412 000 0000"
                      className="w-full px-4 py-3 bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-warn-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">Tipo de Servicio *</label>
                  <select
                    required
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
                <div className="w-10 h-10 rounded-lg bg-[var(--color-warn-orange)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warn-orange)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase">Teléfono</div>
                  <a href={`tel:${company.phone.replace(/[\s-]/g, '')}`} className="text-sm text-[var(--color-text-primary)] font-medium hover:text-[var(--color-warn-orange)] transition-colors">
                    {company.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-pipe-blue)]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-pipe-blue)" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase">Correo</div>
                  <a href={`mailto:${company.email}`} className="text-sm text-[var(--color-text-primary)] font-medium hover:text-[var(--color-pipe-blue)] transition-colors">
                    {company.email}
                  </a>
                </div>
              </div>
            </div>

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

            {/* Emergency */}
            <div className="bg-[var(--color-warn-orange)]/5 border border-[var(--color-warn-orange)]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warn-orange)" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-[var(--color-warn-orange)] mb-1">Emergencias 24/7</div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Para situaciones de riesgo inmediato o parada de planta:
                  </p>
                  <a href={`tel:${company.whatsapp}`} className="text-sm font-mono font-bold text-[var(--color-warn-orange)] hover:underline">
                    {company.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
