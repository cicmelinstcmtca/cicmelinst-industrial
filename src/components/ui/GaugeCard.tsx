import { forwardRef, useEffect, useRef, type ForwardedRef } from 'react';
import type { GaugeCardProps } from '../../types';
import { clamp, lerp } from '../../utils/helpers';

interface GaugeCardPropsWithClass extends GaugeCardProps {
  className?: string;
}

export const GaugeCard = forwardRef<HTMLDivElement, GaugeCardPropsWithClass>(
  (
    {
      tag,
      label,
      value,
      unit,
      status = 'normal',
      trend,
      thresholds,
      min = 0,
      max = 100,
      className = '',
      ...props
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const needleRef = useRef<SVGPathElement>(null);
    const valueRef = useRef(typeof value === 'number' ? value : 0);
    const targetValueRef = useRef(typeof value === 'number' ? value : 0);
    const animationId = useRef<number>(0);

    const statusColors: Record<string, string> = {
      normal: 'var(--color-insul-green-glow)',
      warn: 'var(--color-warn-orange)',
      alarm: 'var(--color-alarm-red-glow)',
      trip: 'var(--color-alarm-red)',
    };
    const statusColor = statusColors[status] || statusColors.normal;

    useEffect(() => {
      if (typeof value === 'number') {
        targetValueRef.current = clamp(value, min, max);
      }
    }, [value, min, max]);

    useEffect(() => {
      const animate = () => {
        const current = valueRef.current;
        const target = targetValueRef.current;
        const diff = target - current;

        if (Math.abs(diff) > 0.1) {
          valueRef.current = lerp(current, target, 0.15);
          updateNeedle();
        }
        animationId.current = requestAnimationFrame(animate);
      };

      animate();
      return () => {
        if (animationId.current) cancelAnimationFrame(animationId.current);
      };
    }, []);

    const updateNeedle = () => {
      if (!needleRef.current || !svgRef.current) return;

      const currentVal = valueRef.current;
      const percentage = clamp((currentVal - min) / (max - min), 0, 1);
      const angle = -90 + percentage * 180;

      needleRef.current.setAttribute('transform', `rotate(${angle}, 100, 100)`);

      const arc = svgRef.current.querySelector('.gauge-arc-path');
      if (arc) {
        arc.setAttribute('stroke', statusColor);
      }
    };

    useEffect(() => {
      if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as any).current = { updateValue: () => {} };
      }
    }, [ref]);

    const currentVal = typeof value === 'number' ? value : valueRef.current;
    const percentage = clamp((currentVal - min) / (max - min), 0, 1);
    const isWarn = thresholds && typeof value === 'number' && value >= thresholds.warn && value < (thresholds.alarm || Infinity);
    const isAlarm = thresholds && typeof value === 'number' && value >= (thresholds.alarm || Infinity);

    const displayStatus = isAlarm ? 'alarm' : isWarn ? 'warn' : status;

    return (
      <div
        ref={ref}
        className={`
          gauge-card relative
          bg-gauge border border-panel radius-card p-6
          ${className}
        `}
        {...props}
      >
        {tag && <div className="label-tag mb-3">{tag}</div>}

        <div className="relative w-full aspect-square max-w-[200px] mx-auto">
          <svg
            ref={svgRef}
            viewBox="0 0 200 200"
            className="w-full h-full gauge-arc"
            aria-hidden="true"
          >
            <path
              d="M 100 100 m -80 0 a 80 80 0 1 0 160 0"
              stroke="var(--color-border-panel)"
              strokeWidth="12"
              fill="none"
              opacity="0.3"
            />

            {thresholds && (
              <>
                <path
                  d="M 100 100 m -80 0 a 80 80 0 1 0 160 0"
                  stroke="var(--color-warn-orange)"
                  strokeWidth="12"
                  fill="none"
                  opacity="0.2"
                  strokeDasharray={`${((thresholds.warn - min) / (max - min)) * 100} 100`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                {thresholds.alarm && (
                  <path
                    d="M 100 100 m -80 0 a 80 80 0 1 0 160 0"
                    stroke="var(--color-alarm-red)"
                    strokeWidth="12"
                    fill="none"
                    opacity="0.2"
                    strokeDasharray={`${((thresholds.alarm - min) / (max - min)) * 100} 100`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                )}
              </>
            )}

            <path
              className="gauge-arc-path"
              d="M 100 100 m -80 0 a 80 80 0 1 0 160 0"
              stroke={statusColor}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 100} 100`}
              strokeDashoffset="0"
              filter="url(#glow)"
            />

            <circle cx="100" cy="100" r="12" fill={statusColor} />
            <circle cx="100" cy="100" r="6" fill="var(--color-bg-gauge)" />

            <path
              ref={needleRef}
              d="M 100 100 L 100 25"
              stroke={statusColor}
              strokeWidth="3"
              strokeLinecap="round"
              transform="rotate(-90, 100, 100)"
            />

            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <div className="text-mono-lg text-primary font-mono font-bold">
              {typeof value === 'number' ? value.toFixed(1) : value}
            </div>
            <div className="text-micro text-muted mt-0.5">{unit}</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-body text-primary font-medium">{label}</p>
        </div>

        {trend !== undefined && (
          <div className={`
            mt-3 flex items-center justify-center gap-1.5
            ${trend > 0 ? 'text-insul-green' : trend < 0 ? 'text-alarm-red' : 'text-muted'}
          `}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              {trend > 0 ? (
                <polyline points="18 15 12 9 6 15" />
              ) : trend < 0 ? (
                <polyline points="6 9 12 15 18 9" />
              ) : (
                <line x1="5" y1="12" x2="19" y2="12" />
              )}
            </svg>
            <span className="text-mono-sm font-mono">
              {trend > 0 ? '+' : ''}{trend.toFixed(2)}/h
            </span>
          </div>
        )}

        <div className="mt-3 flex justify-center">
          <span className={`
            badge-energized radius-pill px-3 py-1 text-micro font-mono
            ${displayStatus === 'normal' ? 'bg-insul-green text-bg-control' : ''}
            ${displayStatus === 'warn' ? 'bg-warn-orange text-bg-control' : ''}
            ${displayStatus === 'alarm' ? 'bg-alarm-red text-text-primary animate-pulse' : ''}
            ${displayStatus === 'trip' ? 'bg-alarm-red text-text-primary' : ''}
          `}>
            {displayStatus.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }
);

GaugeCard.displayName = 'GaugeCard';