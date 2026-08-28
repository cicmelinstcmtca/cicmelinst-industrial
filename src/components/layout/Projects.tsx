import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFeaturedProjects, useProjects } from '../../hooks';
import type { Project } from '../../data/types';

const CATEGORY_CONFIG: Record<string, { icon: string; color: string }> = {
  'Eléctrico': { icon: '⚡', color: '#3B82F6' },
  'Automatización': { icon: '🔧', color: '#60A5FA' },
  'Construcción': { icon: '🏗️', color: '#9CA3AF' },
  'Protección': { icon: '🛡️', color: '#009944' },
  'Mantenimiento': { icon: '🔩', color: '#6B7280' },
};

export function Projects() {
  const featured = useFeaturedProjects();
  const allProjects = useProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<string>('Todos');

  const selected = allProjects.find((p: Project) => p.slug === selectedProject) || null;

  const filteredProjects = filter === 'Todos'
    ? allProjects
    : allProjects.filter(p => p.category === filter);

  const categories = ['Todos', ...new Set(allProjects.map(p => p.category))];

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Featured Grid — only 4 with photos */}
        {!showAll && (
          <div className="space-y-4 mb-8">
            {/* Featured: first project */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedProject(featured[0]?.slug)}
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-[var(--color-border-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 transition-all duration-300 bg-[var(--color-bg-panel)]"
            >
              <div className="aspect-[16/7] sm:aspect-[3/1] relative overflow-hidden">
                <img
                  src={featured[0]?.image}
                  alt={featured[0]?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-panel)] via-[var(--color-bg-panel)]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8">
                  <span
                    className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border mb-2"
                    style={{ color: CATEGORY_CONFIG[featured[0]?.category]?.color || '#3B82F6', borderColor: `${CATEGORY_CONFIG[featured[0]?.category]?.color || '#3B82F6'}33`, backgroundColor: `${CATEGORY_CONFIG[featured[0]?.category]?.color || '#3B82F6'}10` }}
                  >
                    {featured[0]?.category}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
                    {featured[0]?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-xl line-clamp-2">{featured[0]?.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-pipe-blue-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* 3 smaller cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {featured.slice(1, 4).map((project: Project, i: number) => (
                <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project.slug)} />
              ))}
            </div>

            {/* Ver todos */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--color-pipe-blue-glow)] border border-[var(--color-pipe-blue-glow)]/30 rounded-lg hover:bg-[var(--color-pipe-blue-glow)]/10 transition-all"
              >
                Ver todos los proyectos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}

        {/* Full list view */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stats row */}
            <div className="flex items-center gap-6 mb-6 pb-4 border-b border-[var(--color-border-panel)]">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--color-pipe-blue-glow)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {allProjects.length}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Proyectos totales</span>
              </div>
              <div className="hidden sm:flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {categories.length - 1}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Categorías</span>
              </div>
              <div className="hidden sm:flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                  {featured.length}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-wider">Con fotografía</span>
              </div>
            </div>

            {/* Back button + Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver a destacados
              </button>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                      filter === cat
                        ? 'bg-[var(--color-pipe-blue-glow)]/10 text-[var(--color-pipe-blue-glow)] border-[var(--color-pipe-blue-glow)]/30'
                        : 'text-[var(--color-text-muted)] border-[var(--color-border-panel)] hover:border-[var(--color-pipe-blue-glow)]/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects list */}
            <div className="space-y-3">
              {filteredProjects.map((project: Project, i: number) => (
                <ProjectRow key={project.id} project={project} index={i} onClick={() => setSelectedProject(project.slug)} />
              ))}
            </div>

            <div className="text-center mt-6 text-xs text-[var(--color-text-muted)] font-mono">
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </motion.div>
        )}
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
  const hasPhoto = project.image && !project.image.includes('placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden cursor-pointer border border-[var(--color-border-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 transition-all duration-300 bg-[var(--color-bg-panel)]"
    >
      {/* Left color strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-pipe-blue-glow)] to-[var(--color-pipe-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="aspect-[16/9] relative overflow-hidden">
        {hasPhoto ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-panel)] via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-bg-control)] to-[var(--color-bg-panel)] flex items-center justify-center relative">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(${config.color} 1px, transparent 1px), linear-gradient(90deg, ${config.color} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
            {/* CMT Logo */}
            <img
              src="/logo.png"
              alt="CICMELINST"
              className="w-16 h-16 object-contain opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-full border"
            style={{ color: config.color, borderColor: `${config.color}33`, backgroundColor: `${config.color}10` }}
          >
            {project.category}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-pipe-blue-glow)] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-family-display)' }}>
          {project.title}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3">{project.description}</p>

        {/* Client + Ver */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-panel)]">
          <span className="text-[10px] text-[var(--color-text-muted)] font-mono">{project.client}</span>
          <span className="text-[10px] text-[var(--color-pipe-blue-glow)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Ver proyecto →
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-pipe-blue-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function ProjectRow({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const config = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG['Eléctrico'];
  const hasPhoto = project.image && !project.image.includes('placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border-panel)] bg-[var(--color-bg-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 cursor-pointer transition-all relative overflow-hidden"
    >
      {/* Left color strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-pipe-blue-glow)] to-[var(--color-pipe-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Thumbnail or CMT logo */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--color-bg-control)] flex items-center justify-center border border-[var(--color-border-panel)]">
        {hasPhoto ? (
          <img src={project.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <img
            src="/logo.png"
            alt="CICMELINST"
            className="w-10 h-10 object-contain opacity-25"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-pipe-blue-glow)] transition-colors" style={{ fontFamily: 'var(--font-family-display)' }}>
          {project.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--color-text-muted)] font-mono">
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.location}</span>
        </div>
      </div>

      {/* Category badge */}
      <span
        className="hidden sm:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0"
        style={{ color: config.color, borderColor: `${config.color}33`, backgroundColor: `${config.color}10` }}
      >
        {project.category}
      </span>

      {/* Arrow */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)] group-hover:text-[var(--color-pipe-blue-glow)] transition-colors flex-shrink-0">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </motion.div>
  );
}

function ProjectModal({ project: slug, onClose, allProjects }: { project: string; onClose: () => void; allProjects: Project[] }) {
  const selected = allProjects.find((p: Project) => p.slug === slug);
  if (!selected) return null;

  const [activeImage, setActiveImage] = useState(0);
  const hasGallery = selected.gallery && selected.gallery.length > 0;

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
        className="bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Logo CMT */}
        <div className="relative p-6 border-b border-[var(--color-border-panel)]">
          <div className="flex items-start gap-4">
            {/* Logo CMT instead of category icon */}
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="CICMELINST"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-lg font-bold text-[var(--color-pipe-blue-glow)]" style={{ fontFamily: 'var(--font-family-display)' }}>CMT</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[var(--color-text-muted)]">{selected.location}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                {selected.title}
              </h3>
              <p className="text-sm text-[var(--color-pipe-blue-glow)] mt-1">{selected.client}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-bg-control)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-control)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Gallery */}
        {hasGallery && (
          <div className="border-b border-[var(--color-border-panel)]">
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={selected.gallery[activeImage]}
                alt={`${selected.title} - ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {selected.gallery.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {selected.gallery.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === activeImage ? 'border-[var(--color-pipe-blue-glow)]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Descripción</h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selected.description}</p>
          </div>

          {selected.technicalDescription && (
            <div className="p-4 bg-[var(--color-bg-control)] rounded-lg">
              <h4 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Detalle Técnico</h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{selected.technicalDescription}</p>
            </div>
          )}

          {selected.services && selected.services.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Servicios</h4>
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
              <h4 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Resultados</h4>
              <ul className="space-y-2">
                {selected.results.map((result: string, i: number) => (
                  <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--color-insul-green)] mt-0.5">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selected.technologies && selected.technologies.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Tecnologías</h4>
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
