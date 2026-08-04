"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Desktop-only hook for subtle mouse-driven parallax on background elements.
 * Moves target elements by 2-5px based on mouse position.
 * Uses requestAnimationFrame for smooth 60fps performance.
 * Respects prefers-reduced-motion.
 */
export function useMouseParallax(intensity: number = 4) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Smooth lerp toward target
    currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.06;
    currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.06;

    // Apply to parallax children
    const elements = container.querySelectorAll<HTMLElement>("[data-parallax]");
    elements.forEach((el) => {
      const factor = parseFloat(el.dataset.parallax || "1");
      const moveX = (currentRef.current.x - 0.5) * intensity * factor;
      const moveY = (currentRef.current.y - 0.5) * intensity * factor;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [intensity]);

  useEffect(() => {
    // Only run on desktop with fine pointer
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return containerRef;
}
