import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from './useAccessibility';

interface ThreePerformanceState {
  fps: number;
  memory: number;
  shouldReduceQuality: boolean;
}

export function useThreePerformance(targetFps = 55): ThreePerformanceState {
  const [state, setState] = useState<ThreePerformanceState>({
    fps: 60,
    memory: 0,
    shouldReduceQuality: false,
  });
  const reducedMotion = useReducedMotion();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef<number | undefined>(undefined);
  const targetFpsRef = useRef<number>(targetFps);

  targetFpsRef.current = targetFps;

  const updateFps = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    const elapsed = now - lastTime.current;

    if (elapsed >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / elapsed);
      let memory = 0;
      if ('memory' in performance) {
        const perfMemory = performance as { memory?: { usedJSHeapSize: number } };
        memory = Math.round((perfMemory.memory?.usedJSHeapSize ?? 0) / 1024 / 1024 || 0);
      }

      const shouldReduce = reducedMotion || fps < targetFpsRef.current || memory > 100;

      setState({ fps, memory, shouldReduceQuality: shouldReduce });
      frameCount.current = 0;
      lastTime.current = now;
    }

    animationId.current = requestAnimationFrame(updateFps);
  }, [reducedMotion]);

  useEffect(() => {
    animationId.current = requestAnimationFrame(updateFps);
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [updateFps]);

  return state;
}

export function useLazyThree(threshold = 0.1) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold, reducedMotion]);

  return { ref: elementRef, shouldLoad };
}

export function useFrameThrottle(maxFps = 30) {
  const [delta, setDelta] = useState(0);
  const lastTime = useRef(performance.now());
  const interval = 1000 / maxFps;

  useEffect(() => {
    let animationId: number;

    const tick = (now: number) => {
      const elapsed = now - lastTime.current;
      if (elapsed >= interval) {
        lastTime.current = now;
        setDelta(elapsed / 1000);
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [maxFps]);

  return delta;
}