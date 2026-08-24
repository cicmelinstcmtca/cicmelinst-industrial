import { motion } from 'motion/react';
import { MaintenanceLog } from '../ui';
import type { MaintenanceEntry } from '../../types';
import type { Project } from '../../data/types';
import { useProjects, useProjectCategories, useProjectClients } from '../../hooks';

function mapProjectToMaintenanceEntry(project: Project): MaintenanceEntry {
  const statusMap: Record<string, 'completed' | 'in-progress' | 'scheduled'> = {
    'completed': 'completed',
    'in-progress': 'in-progress',
    'scheduled': 'scheduled',
  };

  return {
    date: `${project.year}-01-15`,
    tag: project.id.toUpperCase().replace('-', '-'),
    equipment: project.title,
    action: project.technicalDescription,
    status: statusMap[project.status] || 'completed',
    technician: project.client,
    photos: project.gallery.map((img: string) => img.split('/').pop() || img),
    reportUrl: `/reports/${project.slug}.pdf`,
  };
}

export function Projects() {
  const projects = useProjects();
  const categories = useProjectCategories();
  const clients = useProjectClients();

  const maintenanceEntries = projects.map(mapProjectToMaintenanceEntry);

  const stats = [
    { label: 'PROYECTOS EJECUTADOS', value: projects.length.toString(), color: 'text-primary' },
    { label: 'CLIENTES ACTIVOS', value: clients.length.toString(), color: 'text-pipe-blue' },
    { label: 'CATEGORÍAS', value: categories.length.toString(), color: 'text-insul-green' },
    { label: 'AÑOS EXPERIENCIA', value: '14+', color: 'text-warn-orange' },
  ];

  return (
    <section
      id="projects"
      className="section-padding bg-control relative"
      aria-labelledby="projects-title"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" aria-hidden="true" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-12"
        >
          <span className="label-tag text-warn-orange mb-4 block">BITÁCORA DE MANTENIMIENTO</span>
          <h2 id="projects-title" className="text-title text-primary mb-4">
            HISTORIAL OPERATIVO Y ÓRDENES DE TRABAJO
          </h2>
          <p className="text-body-lg text-secondary">
            Registro completo de proyectos ejecutados: mantenimientos preventivos (PM), correctivos (CM), instrumentales (IN),
            obras civiles y automatización. Cada entrada incluye evidencia fotográfica, reporte técnico y trazabilidad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <MaintenanceLog entries={maintenanceEntries} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-gauge/30 border border-panel/50 radius-card"
            >
              <div className={`text-mono-lg font-mono font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-micro text-muted font-mono uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}