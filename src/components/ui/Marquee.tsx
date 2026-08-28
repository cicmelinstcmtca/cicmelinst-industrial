import { useRef, useEffect, useState } from 'react';
import { useClients } from '../../hooks';
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
      setClonedClients([...clients, ...clients, ...clients]);
    }
  }, [clients]);

  useEffect(() => {
    if (!containerRef.current || clonedClients.length === 0) return;

    const animate = (currentTime: number) => {
      if (!paused) {
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        const contentWidth = clonedClients.length * 240 + (clonedClients.length - 1) * gap;
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
            className="flex-shrink-0 flex items-center justify-center px-8 py-6 rounded-2xl bg-[var(--color-bg-control)]/80 backdrop-blur-sm border border-[var(--color-border-panel)]/50 hover:border-[var(--color-warn-orange)]/30 hover:bg-[var(--color-bg-panel)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,102,0,0.05)] transition-all duration-500 ease-out"
            role="listitem"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-20 lg:h-28 w-auto max-w-[200px] object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all duration-500"
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
