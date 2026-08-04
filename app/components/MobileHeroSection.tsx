"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Phone, ChevronDown } from "lucide-react";
import {
  heroStaggerContainer,
  heroLineReveal,
  buttonHoverVariants,
  socialIconVariants,
  PREMIUM_EASE,
} from "../animations/variants";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "UI/UX Enthusiast",
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pratyush-38b705351/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/PratyushPrasun",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/PratyushPrasun/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.17 6.01a1.377 1.377 0 0 0-.419.98c0 .371.144.718.419.98l5.352 5.572c.264.264.61.408.961.408a1.37 1.37 0 0 0 .961-.408l5.352-5.572a1.38 1.38 0 0 0 0-1.96L14.444.438A1.374 1.374 0 0 0 13.483 0zm0 3.013l3.522 3.666-3.522 3.667-3.522-3.667 3.522-3.666zM9.832 6.471a1.25 1.25 0 0 0-.884.366l-4.319 4.38c-1.163 1.163-1.163 3.054 0 4.217l4.332 4.363c1.163 1.163 3.054 1.163 4.217 0l2.609-2.636a1.25 1.25 0 0 0-1.768-1.768l-2.609 2.636c-.187.187-.525.187-.712 0l-4.332-4.363c-.187-.187-.187-.525 0-.712l4.319-4.38c.187-.187.525-.187.712 0l2.609 2.636a1.25 1.25 0 1 0 1.768-1.768l-2.609-2.636a1.25 1.25 0 0 0-.884-.366zM20.811 13.01H10.666a1.25 1.25 0 0 0 0 2.5h10.145a1.25 1.25 0 0 0 0-2.5z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/pprasun1203",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function MobileHeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="lg:hidden relative min-h-[100svh] flex flex-col items-center justify-between pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-8 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background glow subtle enhancement for mobile hero */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-neon/5 rounded-full blur-3xl pointer-events-none -z-10"
        data-parallax="1.5"
      />

      <motion.div
        variants={heroStaggerContainer}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto my-auto"
      >
        {/* 1. Welcome Text */}
        <motion.span
          variants={heroLineReveal}
          className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-text-muted uppercase tracking-[0.2em] mb-2 sm:mb-3"
        >
          WELCOME TO MY WORLD
        </motion.span>

        {/* 2. Name */}
        <motion.h1
          variants={heroLineReveal}
          className="glitch-text text-[36px] sm:text-[42px] md:text-[48px] font-bold text-text-primary tracking-tight mb-2 leading-none"
          data-text="Hi, I'm Pratyush"
        >
          Hi, I&apos;m Pratyush
        </motion.h1>

        {/* 3. Typing Animation */}
        <motion.div
          variants={heroLineReveal}
          className="flex items-center justify-center gap-0.5 mb-5 sm:mb-6"
        >
          <span className="text-neon text-[20px] sm:text-[24px] md:text-[28px] font-medium tracking-tight">
            {displayText}
          </span>
          <span className="animate-blink text-neon text-[20px] sm:text-[24px] md:text-[28px] font-bold ml-0.5">
            _
          </span>
        </motion.div>

        {/* 4. Short Introduction */}
        <motion.p
          variants={heroLineReveal}
          className="text-text-secondary text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-[90%] sm:max-w-xl md:max-w-2xl mb-8 mx-auto"
        >
          A passionate Full Stack MERN Developer building scalable web
          applications and modern interactive user interfaces.
        </motion.p>

        {/* 5. CTA Buttons — staggered */}
        <motion.div
          variants={heroLineReveal}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5 w-full max-w-[90%] sm:max-w-md md:max-w-lg mb-8 mx-auto"
        >
          {/* Secondary CTA: Download CV */}
          <motion.a
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            href="/Pratyush.pdf"
            download="Pratyush.pdf"
            className="flex-1 flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 text-[13px] font-semibold uppercase tracking-wider rounded-xl bg-bg-card border border-border-card text-text-primary hover:border-neon hover:text-neon transition-colors shadow-sm"
          >
            <Download size={16} />
            <span>Download CV</span>
          </motion.a>

          {/* Primary CTA: Contact Me */}
          <motion.a
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3.5 text-[13px] font-semibold uppercase tracking-wider rounded-xl bg-neon text-black font-semibold shadow-lg shadow-neon/20 hover:shadow-neon/40 hover:bg-neon-dim transition-colors"
          >
            <Phone size={16} />
            <span>Contact Me</span>
          </motion.a>
        </motion.div>

        {/* 6. Social Icons — sequential entrance */}
        <motion.div
          variants={heroLineReveal}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-6"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              custom={i}
              variants={socialIconVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -2, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href={link.href}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-bg-card/70 border border-border-card text-text-secondary hover:text-neon hover:border-neon/40 transition-colors"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* 7. Scroll Indicator */}
        <motion.div variants={heroLineReveal} className="pt-2">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-text-muted hover:text-neon transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="text-[11px] uppercase tracking-widest font-medium">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-border-card group-hover:border-neon"
            >
              <ChevronDown size={14} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
