import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProjects } from '../../hooks';
import { projectCategories } from '../../data';
import type { Project } from '../../data/types';

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((project: Project, i: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProject(project.slug)}
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
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-bg-control)]/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <>
                <div className="aspect-[16/9] relative">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-bg-control)]/80 text-[var(--color-text-primary)] hover:bg-[var(--color-bg-control)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono px-2 py-1 rounded-full bg-[var(--color-warn-orange)]/20 text-[var(--color-warn-orange)]">
                      {selected.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">{selected.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-family-display)' }}>
                    {selected.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">{selected.description}</p>

                  {selected.technicalDescription && (
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 p-4 bg-[var(--color-bg-control)] rounded-lg">
                      {selected.technicalDescription}
                    </p>
                  )}

                  {selected.results.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Resultados</h4>
                      <ul className="space-y-1">
                        {selected.results.map((r: string, i: number) => (
                          <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                            <span className="text-[var(--color-insul-green)] mt-1">✓</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selected.gallery && selected.gallery.length > 1 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {selected.gallery.map((img: string, i: number) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
