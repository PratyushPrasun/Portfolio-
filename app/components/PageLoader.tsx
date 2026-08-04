"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADER_DURATION = 1200; // 1.2s total

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsLoading(false);
      return;
    }

    // Simulate smooth progress
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / LOADER_DURATION, 1);
      // Ease-out curve for progress
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased);

      if (pct >= 1) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 150);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="page-loader"
        >
          {/* Centered Logo Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="page-loader-logo"
          >
            <span className="page-loader-letter">P</span>
          </motion.div>

          {/* Thin Progress Bar */}
          <div className="page-loader-track">
            <motion.div
              className="page-loader-bar"
              style={{ scaleX: progress, transformOrigin: "0%" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
