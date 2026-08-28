import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useClients } from '../../hooks';
import { clientsTagline } from '../../data/clients';
import type { Client } from '../../data/types';

interface MarqueeProps {
  speed?: number;
  className?: string;
  gap?: number;
}

export function Marquee({ speed = 50, className = '', gap = 48 }: MarqueeProps) {
  const clients = useClients();
  const [clonedClients, setClonedClients] = useState<Client[]>([]);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const positionRef = useRef(0);

  useEffect(() => {
    if (clients.length > 0) {
      const cloned = [...clients, ...clients, ...clients];
      setClonedClients(cloned);
    }
  }, [clients]);

  useEffect(() => {
    if (!containerRef.current || clonedClients.length === 0) return;

    const animate = (currentTime: number) => {
      if (!paused) {
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        const contentWidth = clonedClients.length * 200 + (clonedClients.length - 1) * gap;

        positionRef.current -= (speed / 1000) * deltaTime;

        if (Math.abs(positionRef.current) >= contentWidth / 3) {
          positionRef.current = 0;
        }

        if (containerRef.current) {
          containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [paused, speed, clonedClients.length, gap]);

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      aria-label="Clientes y socios estratégicos"
      role="region"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={containerRef}
        className="flex items-center"
        style={{ gap: `${gap}px`, willChange: 'transform' }}
        role="list"
        aria-label="Logos de clientes"
      >
        {clonedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 px-8 py-4 rounded-2xl bg-[var(--color-bg-panel)]/80 backdrop-blur-sm border border-[var(--color-border-panel)]/50 hover:border-[var(--color-warn-orange)]/30 hover:bg-[var(--color-bg-panel)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,102,0,0.05)] transition-all duration-500 ease-out"
            role="listitem"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-12 lg:h-14 w-auto object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-[var(--color-bg-control)] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-[var(--color-bg-control)] to-transparent" />
      </div>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section id="clients" className="py-16 lg:py-20 bg-[var(--color-bg-control)] relative overflow-hidden" aria-labelledby="marquee-title">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, var(--color-text-muted) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-[var(--color-warn-orange)] uppercase tracking-widest mb-4"
            id="marquee-title"
          >
            Confían en Nosotros
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            Clientes que Confían en Nosotros
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto"
          >
            {clientsTagline}
          </motion.p>
        </div>

        {/* Marquee */}
        <Marquee speed={30} gap={24} />

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-[var(--color-border-panel)]/50"
        >
          {[
            { label: 'Certificación SIHO', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
            { label: 'Normativa PDVSA', path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { label: 'Retie / Retilap', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: '+14 Años', path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-insul-green)" strokeWidth="1.5">
                <path d={badge.path} />
              </svg>
              <span className="font-mono uppercase tracking-wider">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
