import { motion } from 'motion/react';
import { Card } from '../ui';
import type { TeamMember } from '../../data/types';
import { useTeam, useTeamLocations } from '../../hooks';

const LOCATION_CONFIG = {
  planta: { color: 'text-insul-green', label: 'EN PLANTA', dot: 'bg-insul-green' },
  oficina: { color: 'text-pipe-blue', label: 'OFICINA', dot: 'bg-pipe-blue' },
  guardia: { color: 'text-warn-orange', label: 'GUARDIA', dot: 'bg-warn-orange' },
};

function mapTeamMember(member: TeamMember) {
  return {
    id: member.name.replace(/\s+/g, '-').toLowerCase(),
    initials: member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    name: member.name,
    role: member.role,
    location: member.location,
    phone: member.phone,
    email: member.email,
    certifications: [], // Se pueden añadir desde data si se tiene
    experience: member.bio,
    photoUrl: member.photo,
  };
}

export function Team() {
  const teamMembers = useTeam();
  const locations = useTeamLocations();

  const mappedMembers = teamMembers.map(mapTeamMember);

  return (
    <section
      id="team"
      className="section-padding bg-control relative"
      aria-labelledby="team-title"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" aria-hidden="true" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-tag text-warn-orange mb-4 block">TURNO DE OPERACIÓN</span>
          <h2 id="team-title" className="text-title text-primary mb-6">
            JUNTA DIRECTIVA Y GERENCIA TÉCNICA
          </h2>
          <p className="text-body-lg text-secondary">
            Profesionales certificados con experiencia comprobada en el sector petrolero venezolano.
            Cada miembro lleva radio operativo para respuesta inmediata.
          </p>
        </motion.div>

        <div className="relative">
          <svg 
            className="absolute inset-0 -z-10 opacity-20 pointer-events-none" 
            viewBox="0 0 1200 800" 
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-pipe-blue-glow)" />
              </marker>
            </defs>
            <path d="M 150 200 L 1050 200" stroke="var(--color-pipe-blue-glow)" strokeWidth="1" fill="none" strokeDasharray="10 5" />
            <path d="M 150 600 L 1050 600" stroke="var(--color-pipe-blue-glow)" strokeWidth="1" fill="none" strokeDasharray="10 5" />
            <path d="M 300 200 L 300 600" stroke="var(--color-pipe-blue-glow)" strokeWidth="1" fill="none" strokeDasharray="10 5" />
            <path d="M 600 200 L 600 600" stroke="var(--color-pipe-blue-glow)" strokeWidth="1" fill="none" strokeDasharray="10 5" />
            <path d="M 900 200 L 900 600" stroke="var(--color-pipe-blue-glow)" strokeWidth="1" fill="none" strokeDasharray="10 5" />
          </svg>

          <div className="grid lg:grid-cols-4 gap-6 relative z-10">
            {mappedMembers.map((member, index) => {
              const locConfig = LOCATION_CONFIG[member.location as keyof typeof LOCATION_CONFIG];
              const row = index < 4 ? 0 : 1;
              const col = index % 4;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative"
                  style={{
                    gridColumn: col + 1,
                    gridRow: row + 1,
                  }}
                >
                  <Card variant="panel" padding="lg" className="h-full relative group">
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full animate-pulse ${locConfig.dot}`} aria-hidden="true" />
                      <span className={`label-tag ${locConfig.color}`}>{locConfig.label}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 radius-panel bg-panel border border-panel flex-shrink-0 overflow-hidden">
                        {member.photoUrl && member.photoUrl !== '/images/team/default.jpg' ? (
                          <img
                            src={member.photoUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-warn-orange/20 text-warn-orange font-display font-bold text-2xl">
                            {member.initials}
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-5 h-5 radius-panel border-2 border-bg-control flex items-center justify-center" style={{ backgroundColor: locConfig.dot.replace('bg-', '') }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-h3 text-primary truncate">{member.name}</h3>
                        <p className="text-small text-secondary truncate">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.certifications.slice(0, 3).map((cert, i) => (
                        <span key={i} className="text-micro text-muted px-2 py-1 bg-gauge/50 radius-panel border border-panel/50 font-mono">
                          {cert}
                        </span>
                      ))}
                      {member.certifications.length > 3 && (
                        <span className="text-micro text-muted px-2 py-1 bg-gauge/50 radius-panel border border-panel/50 font-mono">
                          +{member.certifications.length - 3} más
                        </span>
                      )}
                    </div>

                    <div className="text-micro text-muted font-mono mb-4 flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {member.experience}
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-panel/50">
                      <a
                        href={`tel:${member.phone.replace(/-/g, '').replace(/\s+/g, '')}`}
                        className="flex-1 text-center p-2 radius-panel bg-gauge/50 border border-panel/50 hover:border-warn-orange/50 hover:bg-warn-orange/10 transition-colors text-micro font-mono"
                        aria-label={`Llamar a ${member.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1 text-secondary" aria-hidden="true">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <span className="block">{member.phone}</span>
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex-1 text-center p-2 radius-panel bg-gauge/50 border border-panel/50 hover:border-pipe-blue/50 hover:bg-pipe-blue/10 transition-colors text-micro font-mono"
                        aria-label={`Email a ${member.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-1 text-secondary" aria-hidden="true">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        <span className="block truncate">{member.email}</span>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-4 bg-gauge/30 border border-panel/50 radius-card"
        >
          <h3 className="text-h3 text-primary mb-4 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warn-orange" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
            </svg>
            RADIO CHECK OPERATIVO
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-small">
            {locations.map((loc, i) => {
              const config = LOCATION_CONFIG[loc];
              return (
                <div key={i} className={`flex items-center gap-2 ${config.color} p-3 bg-panel/50 radius-panel border border-panel/50`}>
                  <span className="text-xl">●</span>
                  <span className="font-mono">{config.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}