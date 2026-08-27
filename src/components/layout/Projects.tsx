import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProjects } from '../../hooks';
import { projectCategories } from '../../data';
import type { Project } from '../../data/types';

const CATEGORY_ICONS: Record<string, string> = {
  'Electricidad': '⚡',
  'Automatización': '🔧',
  'Construcción': '🏗️',
  'Eléctrico': '⚡',
  'Alta Tensión': '🔌',
  'Protección': '🛡️',
  'Tierra': '🌍',
  'Tendido': '🔗',
  'Electrificación': '💡',
  'Recuperación': '🔄',
  'Mantenimiento': '🔩',
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Electricidad': 'from-amber-500/20 via-orange-500/10 to-transparent',
  'Automatización': 'from-blue-500/20 via-cyan-500/10 to-transparent',
  'Construcción': 'from-stone-500/20 via-gray-500/10 to-transparent',
  'Eléctrico': 'from-yellow-500/20 via-amber-500/10 to-transparent',
  'Alta Tensión': 'from-red-500/20 via-orange-500/10 to-transparent',
  'Protección': 'from-emerald-500/20 via-green-500/10 to-transparent',
  'Tierra': 'from-teal-500/20 via-cyan-500/10 to-transparent',
  'Tendido': 'from-indigo-500/20 via-blue-500/10 to-transparent',
  'Electrificación': 'from-yellow-400/20 via-amber-400/10 to-transparent',
  'Recuperación': 'from-green-500/20 via-emerald-500/10 to-transparent',
  'Mantenimiento': 'from-slate-500/20 via-gray-500/10 to-transparent',
};

export function Projects() {
  const allProjects = useProjects();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? allProjects
      : allProjects.filter((p: Project) => p.category === activeCategory),
    [allProjects, activeCategory]
  );

  const selected = useMemo(() =>
    allProjects.find((p: Project) => p.slug === selectedProject) || null,
    [allProjects, selectedProject]
  );

  const hasImage = (project: Project) => {
    return project.image && !project.image.includes('placeholder');
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Nuestros Proyectos
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
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-[var(--color-warn-orange)] text-[var(--color-bg-control)]'
                : 'bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-panel)]'
            }`}
          >
            Todos
          </button>
          {projectCategories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-warn-orange)] text-[var(--color-bg-control)]'
                  : 'bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-panel)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Mixed Grid: Image cards + Industrial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((project: Project, i: number) => (
              hasImage(project) ? (
                <ImageCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project.slug)} />
              ) : (
                <IndustrialCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project.slug)} />
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected.slug} onClose={() => setSelectedProject(null)} allProjects={allProjects} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ImageCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer border border-[var(--color-border-panel)] hover:border-[var(--color-warn-orange)]/30 transition-all"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-control)] via-[var(--color-bg-control)]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[var(--color-warn-orange)]/20 text-[var(--color-warn-orange)] border border-[var(--color-warn-orange)]/30">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
            {project.year}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-[var(--color-text-muted)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {project.location} • {project.client}
        </div>
      </div>
    </motion.div>
  );
}

function IndustrialCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const icon = CATEGORY_ICONS[project.category] || '⚙️';
  const gradient = CATEGORY_GRADIENTS[project.category] || 'from-gray-500/20 via-gray-500/10 to-transparent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer border border-[var(--color-border-panel)] hover:border-[var(--color-warn-orange)]/30 transition-all bg-[var(--color-bg-panel)]"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Top */}
        <div className="flex items-start justify-between">
          <span className="text-4xl">{icon}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[var(--color-warn-orange)]/20 text-[var(--color-warn-orange)] border border-[var(--color-warn-orange)]/30">
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
              {project.year}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-warn-orange)] transition-colors" style={{ fontFamily: 'var(--font-family-display)' }}>
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {project.location}
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              {project.client}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-warn-orange)] to-transparent" />
      </div>
    </motion.div>
  );
}

function ProjectModal({ project: slug, onClose, allProjects }: { project: string; onClose: () => void; allProjects: Project[] }) {
  const selected = allProjects.find((p: Project) => p.slug === slug);
  if (!selected) return null;

  const icon = CATEGORY_ICONS[selected.category] || '⚙️';

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
        {/* Header */}
        <div className="relative p-6 border-b border-[var(--color-border-panel)]">
          <div className="flex items-start gap-4">
            <span className="text-4xl">{icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-[var(--color-warn-orange)]/20 text-[var(--color-warn-orange)]">
                  {selected.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{selected.year}</span>
                <span className="text-xs text-[var(--color-text-muted)]">•</span>
                <span className="text-xs text-[var(--color-text-muted)]">{selected.location}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                {selected.title}
              </h3>
              <p className="text-sm text-[var(--color-warn-orange)] mt-1">{selected.client}</p>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Descripción</h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selected.description}</p>
          </div>

          {/* Technical Description */}
          {selected.technicalDescription && (
            <div className="p-4 bg-[var(--color-bg-control)] rounded-lg">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Detalle Técnico</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selected.technicalDescription}</p>
            </div>
          )}

          {/* Services */}
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

          {/* Results */}
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

          {/* Technologies */}
          {selected.technologies && selected.technologies.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {selected.technologies.map((tech: string, i: number) => (
                  <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-full bg-[var(--color-warn-orange)]/10 text-[var(--color-warn-orange)] border border-[var(--color-warn-orange)]/20">
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
