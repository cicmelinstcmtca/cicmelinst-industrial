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

function getRoleShort(role: string): string {
  if (role.includes('Director')) return 'DIRECTION';
  if (role.includes('Gerente')) return 'MANAGEMENT';
  if (role.includes('Coord')) return 'COORDINATION';
  return 'STAFF';
}

function getCoordIndex(i: number): string {
  const col = String.fromCharCode(65 + (i % 4));
  const row = Math.floor(i / 4) + 1;
  return `${col}${row}`;
}

export function Team() {
  const teamMembers = useTeam();
  const director = teamMembers.find((m) => m.role.includes('Director General'));
  const rest = teamMembers.filter((m) => m !== director);

  return (
    <section id="team" className="py-20 lg:py-32 bg-[var(--color-bg-control)] relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(var(--color-pipe-blue) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-pipe-blue) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Major grid lines */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `
          linear-gradient(var(--color-pipe-blue) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-pipe-blue) 1px, transparent 1px)
        `,
        backgroundSize: '200px 200px'
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

        {/* Blueprint Diagram */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection lines — SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" style={{ zIndex: 0 }}>
            {/* Director to rest horizontal line */}
            {director && rest.length > 0 && (
              <>
                <line
                  x1="50%" y1="160" x2="50%" y2="220"
                  stroke="var(--color-pipe-blue)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"
                />
                <line
                  x1="12.5%" y1="220" x2="87.5%" y2="220"
                  stroke="var(--color-pipe-blue)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"
                />
                {/* Vertical drops to each staff member */}
                {rest.map((_, i) => (
                  <line
                    key={i}
                    x1={`${12.5 + i * 25}%`} y1="220" x2={`${12.5 + i * 25}%`} y2="240"
                    stroke="var(--color-pipe-blue)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"
                  />
                ))}
              </>
            )}
          </svg>

          {/* Director Node */}
          {director && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-md mx-auto mb-16"
            >
              <BlueprintNode member={director} index={0} isDirector />
            </motion.div>
          )}

          {/* Staff Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {rest.map((member: TeamMember, i: number) => (
              <BlueprintNode key={member.name} member={member} index={i + 1} />
            ))}
          </div>

          {/* Blueprint annotations */}
          <div className="hidden lg:flex justify-between mt-8 text-[9px] font-mono text-[var(--color-text-muted)]/40 uppercase tracking-[0.2em]">
            <span>Rev. 03 — {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'short' })}</span>
            <span>CICMELINST C.A. — Org. Chart</span>
            <span>Dwg. No. CIC-ORG-001</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintNode({ member, index, isDirector = false }: { member: TeamMember; index: number; isDirector?: boolean }) {
  const initials = getInitials(member.name);
  const roleTag = getRoleShort(member.role);
  const coord = getCoordIndex(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`group relative ${isDirector ? '' : ''}`}
    >
      {/* Coordinate marker */}
      <div className="absolute -top-3 -left-2 text-[9px] font-mono text-[var(--color-text-muted)]/40 z-20">
        [{coord}]
      </div>

      {/* Node card */}
      <div className={`
        relative overflow-hidden rounded-lg border transition-all duration-300
        ${isDirector
          ? 'border-[var(--color-pipe-blue-glow)]/40 bg-[var(--color-bg-panel)]'
          : 'border-[var(--color-border-panel)] bg-[var(--color-bg-panel)] hover:border-[var(--color-pipe-blue-glow)]/30'
        }
      `}>
        {/* Top accent line */}
        <div className={`h-[2px] ${isDirector ? 'bg-[var(--color-pipe-blue-glow)]' : 'bg-[var(--color-border-panel)] group-hover:bg-[var(--color-pipe-blue-glow)]'} transition-colors duration-300`} />

        <div className="p-5">
          {/* Initials + Role tag row */}
          <div className="flex items-start justify-between mb-4">
            {/* Large initials */}
            <div className="relative">
              <span
                className={`
                  font-bold leading-none tracking-tight
                  ${isDirector ? 'text-5xl lg:text-6xl' : 'text-4xl'}
                `}
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: 'var(--color-pipe-blue)',
                  opacity: 0.15,
                  position: 'absolute',
                  top: '-8px',
                  left: '-4px'
                }}
              >
                {initials}
              </span>
              <span
                className={`
                  font-bold leading-none tracking-tight relative z-10
                  ${isDirector ? 'text-5xl lg:text-6xl' : 'text-4xl'}
                `}
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: isDirector ? 'var(--color-pipe-blue-glow)' : 'var(--color-text-primary)',
                }}
              >
                {initials}
              </span>
            </div>

            {/* Role category badge */}
            <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-[var(--color-border-panel)] text-[var(--color-text-muted)] uppercase tracking-widest">
              {roleTag}
            </span>
          </div>

          {/* Name */}
          <h4
            className={`
              font-semibold text-[var(--color-text-primary)] mb-1 leading-tight
              ${isDirector ? 'text-lg' : 'text-base'}
            `}
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {member.name}
          </h4>

          {/* Role */}
          <p className={`text-sm font-medium mb-3 ${isDirector ? 'text-[var(--color-pipe-blue-glow)]' : 'text-[var(--color-text-muted)]'}`}>
            {member.role}
          </p>

          {/* Bio */}
          {member.bio && (
            <p className="text-xs text-[var(--color-text-secondary)]/70 leading-relaxed line-clamp-2">
              {member.bio}
            </p>
          )}
        </div>

        {/* Bottom connection point */}
        {!isDirector && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-pipe-blue)]/40 hidden sm:block" />
        )}
      </div>
    </motion.div>
  );
}
