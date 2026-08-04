"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for GSAP scroll reveals
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  y?: number;
  duration?: number;
  stagger?: number;
  triggerHook?: string;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const scroller = document.querySelector("main") || window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: options?.y ?? 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: options?.triggerHook ?? "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options?.y, options?.duration, options?.triggerHook]);

  return ref;
}

/**
 * Custom hook for Experience / Education vertical line growth
 */
export function useGsapTimelineLine(containerRef: React.RefObject<HTMLElement | null>, lineRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const scroller = document.querySelector("main") || window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scroller: scroller,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.5,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, lineRef]);
}

/**
 * Custom hook for Project Screenshot subtle parallax (moves slightly slower than text)
 */
export function useGsapParallax(targetRef: React.RefObject<HTMLElement | null>, intensity: number = 15) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const scroller = document.querySelector("main") || window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y: -intensity },
        {
          y: intensity,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            scroller: scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, target);

    return () => ctx.revert();
  }, [targetRef, intensity]);
}

// ══════════════════════════════════════════════════════
// NEW GSAP HOOKS
// ══════════════════════════════════════════════════════

/**
 * Accent line width animation — grows from 0 to full width on scroll
 */
export function useGsapAccentLine(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    const scroller = document.querySelector("main") || window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

/**
 * Stagger-reveal children elements when container enters viewport
 */
export function useGsapStaggerReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  childSelector: string,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
  }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    if (prefersReduced) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    const scroller = document.querySelector("main") || window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: options?.y ?? 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.5,
          stagger: options?.stagger ?? 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            scroller: scroller,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, childSelector, options?.y, options?.stagger, options?.duration]);
}

/**
 * Subtle depth effect — cards gain slight shadow/elevation while in viewport center
 */
export function useGsapSectionDepth(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const scroller = document.querySelector("main") || window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0.4, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.3,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
