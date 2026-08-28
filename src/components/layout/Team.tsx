import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

function getRoleLabel(role: string): string {
  if (role.includes('Director General')) return 'Director General';
  if (role.includes('Director de Producción')) return 'Director de Producción';
  if (role.includes('Director de Operaciones')) return 'Director de Operaciones';
  if (role.includes('Directora Administrativa')) return 'Directora Administrativa';
  if (role.includes('Gerente de Proyecto')) return 'Gerente de Proyecto';
  if (role.includes('Gerente PYA')) return 'Gerente PYA';
  if (role.includes('Gerente Técnico')) return 'Gerente Técnico';
  if (role.includes('Gerente de Administración')) return 'Gerente de Administración';
  if (role.includes('Coord')) return 'Coord. SIHO-A';
  return role;
}

export function Team() {
  const teamMembers = useTeam();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // ── Nivel 1: Directores (fila 1) ──
  const directors = teamMembers.filter(m =>
    m.name === 'Juan Amaya' || m.name === 'Juan A. Gomez' || m.name === 'Aurelio Amaya'
  );

  // ── Nivel 2: Directora Admin + Gerentes (fila 2) ──
  const level2 = teamMembers.filter(m =>
    m.name === 'Marlene Mejia' ||
    m.name === 'Ing. Rosanny Ortiz' ||
    m.name === 'Ing. Editza Ibarra' ||
    m.name === 'Ing. Victor Vargas'
  );

  // ── Nivel 3: Gerente Admin + Coordinadora (fila 3) ──
  const level3 = teamMembers.filter(m =>
    m.name === 'Lic. Ana Salazar' || m.name === 'TSU. Ligia Regis'
  );

  return (
    <section id="team" className="py-20 lg:py-32 bg-[var(--color-bg-control)] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
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

        {/* ═══════════════════════════════════════════════════════════════
            ORG CHART
            ═══════════════════════════════════════════════════════════════ */}
        <div className="relative max-w-5xl mx-auto">
          {/* ── Fila 1: Directores ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-2">
            {directors.map((member: TeamMember, i: number) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <DirectorCard member={member} onClick={() => setSelectedMember(member)} />
              </motion.div>
            ))}
          </div>

          {/* ── Líneas verticales de Fila 1 ── */}
          <div className="hidden sm:flex justify-center gap-[calc(33.33%-40px)] sm:gap-[calc(33.33%-50px)] mb-2 px-8">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="w-px h-6 bg-[var(--color-pipe-blue)]/20" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }} style={{ transformOrigin: 'top' }} />
            ))}
          </div>

          {/* ── Línea horizontal conectora ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden sm:block relative h-px mx-auto max-w-3xl mb-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-pipe-blue)]/25 to-transparent" />
          </motion.div>

          {/* ── Líneas verticales a Fila 2 ── */}
          <div className="hidden sm:flex justify-center gap-[calc(25%-30px)] sm:gap-[calc(25%-40px)] mb-2 px-4">
            {[0, 1, 2, 3].map(i => (
              <motion.div key={i} className="w-px h-6 bg-[var(--color-pipe-blue)]/20" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }} style={{ transformOrigin: 'top' }} />
            ))}
          </div>

          {/* ── Fila 2: Directora Admin + Gerentes ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-2">
            {level2.map((member: TeamMember, i: number) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              >
                <ManagerCard member={member} onClick={() => setSelectedMember(member)} />
              </motion.div>
            ))}
          </div>

          {/* ── Líneas verticales de Fila 2 ── */}
          <div className="hidden sm:flex justify-center gap-[calc(25%-30px)] sm:gap-[calc(25%-40px)] mb-2 px-4">
            {[0, 1, 2, 3].map(i => (
              <motion.div key={i} className="w-px h-6 bg-[var(--color-pipe-blue)]/20" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 + i * 0.08, duration: 0.3 }} style={{ transformOrigin: 'top' }} />
            ))}
          </div>

          {/* ── Línea horizontal conectora 2 ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden sm:block relative h-px mx-auto max-w-3xl mb-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-pipe-blue)]/20 to-transparent" />
          </motion.div>

          {/* ── Líneas verticales a Fila 3 ── */}
          <div className="hidden sm:flex justify-center gap-[calc(50%-40px)] mb-2">
            {[0, 1].map(i => (
              <motion.div key={i} className="w-px h-6 bg-[var(--color-pipe-blue)]/20" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }} style={{ transformOrigin: 'top' }} />
            ))}
          </div>

          {/* ── Fila 3: Gerente Admin + Coordinadora ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {level3.map((member: TeamMember, i: number) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              >
                <StaffCard member={member} onClick={() => setSelectedMember(member)} />
              </motion.div>
            ))}
          </div>

          {/* Blueprint footer */}
          <div className="hidden lg:flex justify-between mt-10 text-[9px] font-mono text-[var(--color-text-muted)]/30 uppercase tracking-[0.2em]">
            <span>Rev. 05 — {new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'short' })}</span>
            <span>CICMELINST C.A. — Diagrama Organizacional</span>
            <span>Dibujo No. CIC-ORG-001</span>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TARJETAS POR NIVEL
   ═══════════════════════════════════════════════════════════════════════════ */

function DirectorCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
  const initials = getInitials(member.name);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-pipe-blue-glow)]/30 bg-[var(--color-bg-panel)] transition-all duration-300 hover:border-[var(--color-pipe-blue-glow)]/60 hover:shadow-[0_12px_40px_rgba(0,102,204,0.2)] hover:shadow-[0_0_0_1px_rgba(0,153,255,0.15)]">
        {/* Inner glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(0,153,255,0.05)]" />
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-[var(--color-pipe-blue-glow)] via-[var(--color-pipe-blue)] to-[var(--color-pipe-blue-glow)]" />

        <div className="p-5">
          {/* Initials + Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <span
                className="text-5xl lg:text-6xl font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: 'var(--color-pipe-blue)',
                  opacity: 0.08,
                  position: 'absolute',
                  top: '-10px',
                  left: '-6px',
                }}
              >
                {initials}
              </span>
              <span
                className="text-5xl lg:text-6xl font-bold leading-none relative z-10"
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: 'var(--color-pipe-blue-glow)',
                }}
              >
                {initials}
              </span>
            </div>
            <span className="text-[8px] font-mono px-2 py-0.5 rounded border border-[var(--color-pipe-blue-glow)]/25 text-[var(--color-pipe-blue-glow)] uppercase tracking-widest">
              Director
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1 leading-tight" style={{ fontFamily: 'var(--font-family-display)' }}>
            {member.name}
          </h3>

          {/* Role */}
          <p className="text-sm text-[var(--color-pipe-blue-glow)] font-medium mb-2">
            {getRoleLabel(member.role)}
          </p>

          {/* Bio */}
          <p className="text-xs text-[var(--color-text-secondary)]/60 leading-relaxed line-clamp-2">
            {member.bio}
          </p>
        </div>

        {/* Hover bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-pipe-blue-glow)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}

function ManagerCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
  const initials = getInitials(member.name);
  const isDirectora = member.role.includes('Directora');

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
        isDirectora
          ? 'border-[var(--color-pipe-blue)]/20 bg-[var(--color-bg-panel)] hover:border-[var(--color-pipe-blue-glow)]/40 hover:shadow-lg'
          : 'border-[var(--color-border-panel)] bg-[var(--color-bg-panel)] hover:border-[var(--color-pipe-blue-glow)]/30 hover:shadow-lg'
      }`}>
        {/* Top accent */}
        <div className={`h-1 ${isDirectora ? 'bg-[var(--color-pipe-blue-glow)]/60' : 'bg-[var(--color-border-panel)] group-hover:bg-[var(--color-pipe-blue-glow)]/40'} transition-colors duration-300`} />

        <div className="p-4">
          {/* Initials + Badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="relative">
              <span
                className="text-4xl font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: 'var(--color-pipe-blue)',
                  opacity: 0.08,
                  position: 'absolute',
                  top: '-6px',
                  left: '-4px',
                }}
              >
                {initials}
              </span>
              <span
                className="text-4xl font-bold leading-none relative z-10"
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: isDirectora ? 'var(--color-pipe-blue-glow)' : 'var(--color-text-primary)',
                }}
              >
                {initials}
              </span>
            </div>
            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-widest ${
              isDirectora
                ? 'border-[var(--color-pipe-blue-glow)]/25 text-[var(--color-pipe-blue-glow)]'
                : 'border-[var(--color-border-panel)] text-[var(--color-text-muted)]'
            }`}>
              {isDirectora ? 'Directora' : 'Gerente'}
            </span>
          </div>

          {/* Name */}
          <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5 leading-tight group-hover:text-[var(--color-pipe-blue-glow)] transition-colors" style={{ fontFamily: 'var(--font-family-display)' }}>
            {member.name}
          </h4>

          {/* Role */}
          <p className={`text-xs font-medium ${isDirectora ? 'text-[var(--color-pipe-blue-glow)]' : 'text-[var(--color-text-muted)]'}`}>
            {getRoleLabel(member.role)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StaffCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
  const initials = getInitials(member.name);

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-border-panel)] bg-[var(--color-bg-panel)] transition-all duration-300 hover:border-[var(--color-pipe-blue-glow)]/30 hover:shadow-lg">
        {/* Top accent */}
        <div className="h-1 bg-[var(--color-border-panel)] group-hover:bg-[var(--color-pipe-blue-glow)]/40 transition-colors duration-300" />

        <div className="p-4">
          {/* Initials + Badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="relative">
              <span
                className="text-4xl font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-family-display)',
                  color: 'var(--color-pipe-blue)',
                  opacity: 0.08,
                  position: 'absolute',
                  top: '-6px',
                  left: '-4px',
                }}
              >
                {initials}
              </span>
              <span
                className="text-4xl font-bold leading-none relative z-10 text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-family-display)' }}
              >
                {initials}
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-[var(--color-border-panel)] text-[var(--color-text-muted)] uppercase tracking-widest">
              Gerente
            </span>
          </div>

          {/* Name */}
          <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5 leading-tight group-hover:text-[var(--color-pipe-blue-glow)] transition-colors" style={{ fontFamily: 'var(--font-family-display)' }}>
            {member.name}
          </h4>

          {/* Role */}
          <p className="text-xs font-medium text-[var(--color-text-muted)]">
            {getRoleLabel(member.role)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODAL DE DETALLE
   ═══════════════════════════════════════════════════════════════════════════ */

function MemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const initials = getInitials(member.name);
  const isDirector = member.role.includes('Director') || member.role.includes('Directora');

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
        className="bg-[var(--color-bg-panel)] border border-[var(--color-border-panel)] rounded-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative p-6 ${isDirector ? 'bg-gradient-to-b from-[var(--color-pipe-blue)]/8 to-transparent' : 'bg-gradient-to-b from-[var(--color-bg-control)]/50 to-transparent'}`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-bg-control)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-control)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isDirector ? 'bg-[var(--color-pipe-blue)]/10 border border-[var(--color-pipe-blue)]/20' : 'bg-[var(--color-bg-control)] border border-[var(--color-border-panel)]'}`}>
              <span className={`text-2xl font-bold ${isDirector ? 'text-[var(--color-pipe-blue-glow)]' : 'text-[var(--color-text-muted)]'}`} style={{ fontFamily: 'var(--font-family-display)' }}>
                {initials}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-family-display)' }}>
                {member.name}
              </h3>
              <p className={`text-sm ${isDirector ? 'text-[var(--color-pipe-blue-glow)]' : 'text-[var(--color-text-muted)]'}`}>
                {getRoleLabel(member.role)}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Biografía</h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {member.bio}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border-panel)]">
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>El Tigre, Venezuela</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>CICMELINST C.A.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
