"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Phone } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Engineer",
  "UI/UX Enthusiast",
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "StackOverflow",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.72-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
    <section id="hero" className="md:hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center px-1 pt-20 pb-8"
      >
        {/* Welcome Text */}
        <motion.span
          variants={itemVariants}
          className="text-[12px] text-text-muted uppercase tracking-[0.2em] mb-3"
        >
          Hello, I&apos;m
        </motion.span>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="glitch-text text-4xl font-bold text-text-primary tracking-tight mb-2"
          data-text="Pratyush"
        >
          Pratyush
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-0.5 mb-8"
        >
          <span className="text-neon text-[16px] font-medium">
            {displayText}
          </span>
          <span className="animate-blink text-neon font-bold">_</span>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="relative w-44 h-44 rounded-2xl overflow-hidden mb-8 shadow-xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          <Image
            src="/profileu.jpg"
            alt="Pratyush — Full Stack Developer"
            fill
            className="object-cover object-top grayscale"
            priority
            sizes="176px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-[14px] leading-relaxed max-w-[320px] mb-8"
        >
          A passionate Full Stack MERN Developer building scalable web
          applications and modern interactive user interfaces.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-3 w-full max-w-[320px] mb-8"
        >
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold uppercase tracking-wider rounded-xl bg-bg-card border border-border-card text-text-secondary transition-colors"
          >
            <Download size={14} />
            CV
          </a>
          <a
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold uppercase tracking-wider rounded-xl bg-neon text-black transition-colors"
          >
            <Phone size={14} />
            Contact
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-5"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-text-muted transition-colors"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
