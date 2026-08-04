import { Variants } from "framer-motion";

// Custom smooth easing curve (Linear/Apple/Vercel style)
export const SMOOTH_EASE = [0.25, 0.1, 0.25, 1.0] as const;

// Premium ease — slightly more dramatic for hero-level reveals
export const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

// ── Global Page Load / Stagger Container ──
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay?: number; stagger?: number } = {}) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delay ?? 0.1,
      staggerChildren: custom.stagger ?? 0.08,
      ease: SMOOTH_EASE,
    },
  }),
};

// ── Fade Up (20-30px translateY) ──
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: SMOOTH_EASE,
    },
  }),
};

// ── Fade In (opacity only) ──
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.5,
      delay: custom.delay ?? 0,
      ease: SMOOTH_EASE,
    },
  }),
};

// ── Slide In (horizontal) ──
export const slideInVariants = (direction: "left" | "right" = "left"): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -30 : 30,
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration ?? 0.5,
      delay: custom.delay ?? 0,
      ease: SMOOTH_EASE,
    },
  }),
});

// ── Button Interactions (Subtle 1-2px lift, max 1.02 scale) ──
export const buttonHoverVariants: Variants = {
  hover: {
    y: -2,
    scale: 1.015,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

// ── Mobile Drawer Transition ──
export const drawerVariants: Variants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const drawerItemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: SMOOTH_EASE,
    },
  },
};

// ── Reduced Motion Fallback ──
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

// ══════════════════════════════════════════════════════
// NEW PREMIUM VARIANTS
// ══════════════════════════════════════════════════════

// ── Hero Line-by-Line Reveal ──
// Each element overlaps the previous by ~0.15s for a cascading feel
export const heroStaggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const heroLineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: PREMIUM_EASE,
    },
  },
};

// ── Scale Reveal (for images: 0.97 → 1 + fade) ──
export const scaleRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 12,
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
      ease: PREMIUM_EASE,
    },
  }),
};

// ── Accent Line (width 0% → 100%) ──
export const accentLineVariants: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: (custom: { delay?: number } = {}) => ({
    scaleX: 1,
    transition: {
      duration: 0.8,
      delay: custom.delay ?? 0.3,
      ease: PREMIUM_EASE,
    },
  }),
};

// ── Chip / Tag Stagger (for tech stack pills, skill tags) ──
export const chipContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

export const chipItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: SMOOTH_EASE,
    },
  },
};

// ── Sequential Reveal (for ordered content like project info) ──
export const sequentialContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

export const sequentialItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: SMOOTH_EASE,
    },
  },
};

// ── Footer Reveal ──
export const footerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const footerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: SMOOTH_EASE,
    },
  },
};

// ── Social Icon Sequential (individual delay per icon) ──
export const socialIconVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: SMOOTH_EASE,
    },
  }),
};
