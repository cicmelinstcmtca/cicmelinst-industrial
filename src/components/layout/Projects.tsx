import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProjects } from '../../hooks';
import type { Project } from '../../data/types';

const CATEGORY_CONFIG: Record<string, { icon: string; gradient: string; color: string }> = {
  'Eléctrico': { icon: '⚡', gradient: 'from-amber-500/15 via-orange-500/8 to-transparent', color: '#3B82F6' },
  'Automatización': { icon: '🔧', gradient: 'from-blue-500/15 via-cyan-500/8 to-transparent', color: '#60A5FA' },
  'Construcción': { icon: '🏗️', gradient: 'from-stone-500/15 via-gray-500/8 to-transparent', color: '#9CA3AF' },
  'Protección': { icon: '🛡️', gradient: 'from-emerald-500/15 via-green-500/8 to-transparent', color: '#009944' },
  'Mantenimiento': { icon: '🔩', gradient: 'from-slate-500/15 via-gray-500/8 to-transparent', color: '#6B7280' },
};

export function Projects() {
  const allProjects = useProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const selected = allProjects.find((p: Project) => p.slug === selectedProject) || null;
  const featured = allProjects[0];
  const rest = allProjects.slice(1);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-pipe-blue-glow)] uppercase tracking-widest mb-4"
          >
            Portafolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Proyectos Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto"
          >
            Más de 30 proyectos ejecutados en los sectores petrolero, petroquímico y energético venezolano.
          </motion.p>
        </div>

        {/* Asymmetric Grid */}
        <div className="space-y-5">
          {/* Featured: first project large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedProject(featured.slug)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[var(--color-border-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 transition-all duration-300 bg-[var(--color-bg-panel)]"
          >
            <div className="aspect-[21/9] sm:aspect-[3/1] relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-panel)] via-[var(--color-bg-panel)]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <span
                  className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border mb-3"
                  style={{ color: CATEGORY_CONFIG[featured.category]?.color || '#3B82F6', borderColor: `${CATEGORY_CONFIG[featured.category]?.color || '#3B82F6'}33`, backgroundColor: `${CATEGORY_CONFIG[featured.category]?.color || '#3B82F6'}10` }}
                >
                  {featured.category}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {featured.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] max-w-xl">{featured.description}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-pipe-blue-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* 2x2 grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {rest.map((project: Project, i: number) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project.slug)} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected.slug} onClose={() => setSelectedProject(null)} allProjects={allProjects} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const config = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG['Eléctrico'];
  const hasImage = project.image && !project.image.includes('placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[var(--color-border-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 transition-all duration-300 bg-[var(--color-bg-panel)]"
    >
      {hasImage ? (
        <div className="aspect-[16/10] relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-panel)] via-transparent to-transparent" />
        </div>
      ) : (
        <div className={`aspect-[16/10] relative bg-gradient-to-br ${config.gradient} overflow-hidden`}>
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(${config.color} 1px, transparent 1px), linear-gradient(90deg, ${config.color} 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">{config.icon}</span>
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{ color: config.color, borderColor: `${config.color}33`, backgroundColor: `${config.color}10` }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-pipe-blue-glow)] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-family-display)' }}>
          {project.title}
        </h3>

        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-panel)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {project.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            {project.client}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-pipe-blue-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function ProjectModal({ project: slug, onClose, allProjects }: { project: string; onClose: () => void; allProjects: Project[] }) {
  const selected = allProjects.find((p: Project) => p.slug === slug);
  if (!selected) return null;

  const config = CATEGORY_CONFIG[selected.category] || CATEGORY_CONFIG['Eléctrico'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-bg-control)]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 border-b border-[var(--color-border-panel)]">
          <div className="flex items-start gap-4">
            <span className="text-4xl">{config.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: config.color, borderColor: `${config.color}33`, backgroundColor: `${config.color}10` }}
                >
                  {selected.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">•</span>
                <span className="text-xs text-[var(--color-text-muted)]">{selected.location}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                {selected.title}
              </h3>
              <p className="text-sm text-[var(--color-pipe-blue-glow)] mt-1">{selected.client}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-bg-control)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-control)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Descripción</h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selected.description}</p>
          </div>

          {selected.technicalDescription && (
            <div className="p-4 bg-[var(--color-bg-control)] rounded-lg">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Detalle Técnico</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selected.technicalDescription}</p>
            </div>
          )}

          {selected.services && selected.services.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Servicios</h4>
              <div className="flex flex-wrap gap-2">
                {selected.services.map((service: string, i: number) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-bg-control)] text-[var(--color-text-secondary)] border border-[var(--color-border-panel)]">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.results && selected.results.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Resultados</h4>
              <ul className="space-y-2">
                {selected.results.map((result: string, i: number) => (
                  <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--color-insul-green)] mt-1">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selected.technologies && selected.technologies.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {selected.technologies.map((tech: string, i: number) => (
                  <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-full bg-[var(--color-pipe-blue-glow)]/10 text-[var(--color-pipe-blue-glow)] border border-[var(--color-pipe-blue-glow)]/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
