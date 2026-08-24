import { useRef, useEffect, useState } from 'react';
import { useClients } from '../../hooks';
import { clientsTagline } from '../../data/clients';
import type { Client } from '../../data/types';

interface MarqueeProps {
  speed?: number;
  paused?: boolean;
  className?: string;
  gap?: number;
}

export function Marquee({ speed = 50, paused = false, className = '', gap = 48 }: MarqueeProps) {
  const clients = useClients();
  const [clonedClients, setClonedClients] = useState<Client[]>([]);
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
    >
      <div
        ref={containerRef}
        className="flex items-center gap-12"
        style={{ gap: `${gap}px`, willChange: 'transform' }}
        role="list"
        aria-label="Logos de clientes"
      >
        {clonedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 h-12 lg:h-16 transition-opacity hover:opacity-70"
            role="listitem"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-full w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
              width="120"
              height="60"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-control via-control/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-control via-control/50 to-transparent" />
      </div>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section id="clients" className="bg-control border-y border-panel/50 py-8 lg:py-12" aria-labelledby="marquee-title">
      <div className="container-main">
        <div className="text-center mb-8">
          <span className="label-tag text-warn-orange mb-4 block" id="marquee-title">CLIENTES Y SOCIOS</span>
          <p className="text-micro text-muted font-mono">{clientsTagline}</p>
        </div>
        <Marquee speed={40} gap={64} />
      </div>
    </section>
  );
}