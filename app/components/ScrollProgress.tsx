"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress({
  targetRef,
}: {
  targetRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth spring physics for non-linear, momentum-filled progress bar motion
  const scaleX = useSpring(scrollProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const container = targetRef?.current || document.querySelector("main");

    const updateScrollProgress = () => {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const totalScroll = scrollHeight - clientHeight;
        if (totalScroll > 0) {
          setScrollProgress(scrollTop / totalScroll);
        }
      } else {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          setScrollProgress(window.scrollY / totalScroll);
        }
      }
    };

    if (container) {
      container.addEventListener("scroll", updateScrollProgress, { passive: true });
    } else {
      window.addEventListener("scroll", updateScrollProgress, { passive: true });
    }

    updateScrollProgress();

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollProgress);
      } else {
        window.removeEventListener("scroll", updateScrollProgress);
      }
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-neon shadow-[0_0_10px_rgba(34,197,94,0.5)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
