import { motion } from 'motion/react';
import { useTeam } from '../../hooks';
import type { TeamMember } from '../../data/types';

const ROLE_CATEGORY: Record<string, { label: string; color: string }> = {
  'Director General': { label: 'Dirección', color: 'bg-[var(--color-warn-orange)]' },
  'Gerente': { label: 'Gerencia', color: 'bg-[var(--color-pipe-blue)]' },
  'Supervisor': { label: 'Supervisión', color: 'bg-[var(--color-insul-green)]' },
  'Jefe': { label: 'Jefatura', color: 'bg-[var(--color-insul-green)]' },
  'Coordinadora': { label: 'Coordinación', color: 'bg-[var(--color-pipe-blue)]' },
  'Téc': { label: 'Técnico', color: 'bg-[var(--color-text-muted)]' },
};

function getCategory(role: string) {
  for (const [key, val] of Object.entries(ROLE_CATEGORY)) {
    if (role.includes(key)) return val;
  }
  return { label: 'Equipo', color: 'bg-[var(--color-text-muted)]' };
}

function getInitials(name: string) {
  return name
    .replace(/^(Ing\.|Lic\.|Téc\.|Dr\.)\s*/i, '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function Team() {
  const teamMembers = useTeam();

  const directors = teamMembers.filter((m) =>
    ['Director General', 'Gerente'].some((r) => m.role.includes(r))
  );
  const staff = teamMembers.filter(
    (m) => !['Director General', 'Gerente'].some((r) => m.role.includes(r))
  );

  return (
    <section id="team" className="py-20 lg:py-32 bg-[var(--color-bg-control)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
          >
            Nuestro Equipo
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

        {/* Directors */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-6"
          >
            Dirección General
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directors.map((member: TeamMember, i: number) => (
              <DirectorCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Staff */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-6"
          >
            Equipo Técnico
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member: TeamMember, i: number) => (
              <StaffCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectorCard({ member, index }: { member: TeamMember; index: number }) {
  const initials = getInitials(member.name);
  const cat = getCategory(member.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl overflow-hidden hover:border-[var(--color-warn-orange)]/30 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-bg-control)] to-[var(--color-bg-panel)] flex items-center justify-center relative">
        {member.photo && member.photo !== '/images/team/default.jpg' ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[var(--color-warn-orange)]/10 border-2 border-[var(--color-warn-orange)]/20 flex items-center justify-center">
            <span className="text-3xl font-bold text-[var(--color-warn-orange)]" style={{ fontFamily: 'var(--font-family-display)' }}>
              {initials}
            </span>
          </div>
        )}
        <div className={`absolute top-4 left-4 px-2 py-1 rounded-md ${cat.color} text-white text-[10px] font-mono uppercase tracking-wider`}>
          {cat.label}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-family-display)' }}>
          {member.name}
        </h4>
        <p className="text-sm text-[var(--color-warn-orange)] font-medium mb-3">
          {member.role}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2">
          {member.bio}
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border-panel)]">
          <a
            href={`tel:${member.phone.replace(/[\s-]/g, '')}`}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label={`Llamar a ${member.name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {member.phone}
          </a>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label={`Email a ${member.name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function StaffCard({ member, index }: { member: TeamMember; index: number }) {
  const initials = getInitials(member.name);
  const cat = getCategory(member.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex items-start gap-4 bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-xl p-5 hover:border-[var(--color-pipe-blue-glow)]/30 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="relative w-14 h-14 rounded-xl bg-[var(--color-bg-control)] border border-[var(--color-border-panel)] flex-shrink-0 overflow-hidden">
        {member.photo && member.photo !== '/images/team/default.jpg' ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-pipe-blue)]/10 text-[var(--color-pipe-blue)] font-bold text-lg" style={{ fontFamily: 'var(--font-family-display)' }}>
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] truncate" style={{ fontFamily: 'var(--font-family-display)' }}>
            {member.name}
          </h4>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.color}`} />
        </div>
        <p className="text-xs text-[var(--color-warn-orange)] font-medium mb-1">
          {member.role}
        </p>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}
