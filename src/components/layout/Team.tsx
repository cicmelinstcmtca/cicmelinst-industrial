import { motion } from 'motion/react';
import { useTeam } from '../../hooks';
import type { TeamMember } from '../../data/types';

function getInitials(name: string) {
  return name
    .replace(/^(Ing\.|Lic\.|Téc\.|Dr\.|TSU\.)\s*/i, '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getRoleTag(role: string): string {
  if (role.includes('Director')) return 'DIRECTION';
  if (role.includes('Gerente')) return 'MGMT';
  if (role.includes('Coord')) return 'COORD';
  return 'STAFF';
}

export function Team() {
  const teamMembers = useTeam();
  const director = teamMembers.find((m) => m.role.includes('Director General'));
  const rest = teamMembers.filter((m) => m !== director);

  return (
    <section id="team" className="py-20 lg:py-32 bg-[var(--color-bg-control)] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `
          linear-gradient(var(--color-pipe-blue) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-pipe-blue) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-pipe-blue-glow)] uppercase tracking-widest mb-4"
          >
            Diagrama Organizacional
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Liderazgo y Experiencia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto"
          >
            Profesionales certificados con décadas de experiencia en el sector
            industrial y energético venezolano.
          </motion.p>
        </div>

        {/* Diagram */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" style={{ zIndex: 0 }}>
            {director && rest.length > 0 && (
              <>
                <line x1="50%" y1="140" x2="50%" y2="200" stroke="var(--color-pipe-blue)" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
                <line x1="12.5%" y1="200" x2="87.5%" y2="200" stroke="var(--color-pipe-blue)" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
                {rest.map((_, i) => (
                  <line key={i} x1={`${12.5 + i * 25}%`} y1="200" x2={`${12.5 + i * 25}%`} y2="218" stroke="var(--color-pipe-blue)" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
                ))}
              </>
            )}
          </svg>

          {/* Director */}
          {director && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-md mx-auto mb-14"
            >
              <NodeCard member={director} isDirector />
            </motion.div>
          )}

          {/* Staff */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {rest.map((member: TeamMember, i: number) => (
              <NodeCard key={member.name} member={member} delay={i * 0.07} />
            ))}
          </div>

          {/* Blueprint footer */}
          <div className="hidden lg:flex justify-between mt-8 text-[9px] font-mono text-[var(--color-text-muted)]/30 uppercase tracking-[0.2em]">
            <span>Rev. 03 — {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'short' })}</span>
            <span>CICMELINST C.A. — Org. Chart</span>
            <span>Dwg. No. CIC-ORG-001</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function NodeCard({ member, isDirector = false, delay = 0 }: { member: TeamMember; isDirector?: boolean; delay?: number }) {
  const initials = getInitials(member.name);
  const roleTag = getRoleTag(member.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      <div className={`
        relative overflow-hidden rounded-lg border transition-all duration-300
        ${isDirector
          ? 'border-[var(--color-pipe-blue-glow)]/40 bg-[var(--color-bg-panel)] shadow-lg shadow-[var(--color-pipe-blue)]/5'
          : 'border-[var(--color-border-panel)] bg-[var(--color-bg-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 hover:shadow-md'
        }
      `}>
        {/* Top accent */}
        <div className={`h-[2px] ${isDirector ? 'bg-gradient-to-r from-[var(--color-pipe-blue-glow)] via-[var(--color-pipe-blue)] to-[var(--color-pipe-blue-glow)]' : 'bg-[var(--color-border-panel)] group-hover:bg-[var(--color-pipe-blue-glow)]'} transition-colors duration-300`} />

        <div className="p-4">
          {/* Initials + Badge row */}
          <div className="flex items-start justify-between mb-3">
            <div className="relative">
              <span
                className={`font-bold leading-none ${isDirector ? 'text-5xl' : 'text-4xl'}`}
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: 'var(--color-pipe-blue)',
                  opacity: 0.12,
                  position: 'absolute',
                  top: '-6px',
                  left: '-2px',
                }}
              >
                {initials}
              </span>
              <span
                className={`font-bold leading-none relative z-10 ${isDirector ? 'text-5xl' : 'text-4xl'}`}
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: isDirector ? 'var(--color-pipe-blue-glow)' : 'var(--color-text-primary)',
                }}
              >
                {initials}
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-[var(--color-border-panel)] text-[var(--color-text-muted)] uppercase tracking-widest">
              {roleTag}
            </span>
          </div>

          {/* Name */}
          <h4 className={`font-semibold text-[var(--color-text-primary)] mb-0.5 leading-tight ${isDirector ? 'text-lg' : 'text-sm'}`} style={{ fontFamily: 'var(--font-family-display)' }}>
            {member.name}
          </h4>

          {/* Role */}
          <p className={`text-xs font-medium mb-2 ${isDirector ? 'text-[var(--color-pipe-blue-glow)]' : 'text-[var(--color-text-muted)]'}`}>
            {member.role}
          </p>

          {/* Bio */}
          {member.bio && (
            <p className="text-[11px] text-[var(--color-text-secondary)]/60 leading-relaxed line-clamp-2">
              {member.bio}
            </p>
          )}
        </div>

        {/* Connection dot */}
        {!isDirector && (
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-pipe-blue)]/30 hidden sm:block" />
        )}
      </div>
    </motion.div>
  );
}
