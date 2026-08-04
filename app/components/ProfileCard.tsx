"use client";

import Image from "next/image";
import { Download, Phone } from "lucide-react";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  fadeUpVariants,
  fadeInVariants,
  buttonHoverVariants,
  accentLineVariants,
  socialIconVariants,
  PREMIUM_EASE,
} from "../animations/variants";

export default function ProfileCard() {
  return (
    <div className="hidden lg:flex flex-col xl:h-[580px] xl:w-[380px] shrink-0 p-4 pt-12 pb-10">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        custom={{ delay: 0.15, stagger: 0.09 }}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden bg-bg-card border border-border-card"
      >
        {/* Profile Photo */}
        <motion.div variants={fadeUpVariants} className="relative flex-1 min-h-0 overflow-hidden">
          {/* Glitch image wrapper */}
          <div className="glitch-image">
            <Image
              src="/profileu.jpeg"
              alt="Pratyush — Software Developer"
              fill
              className="object-cover object-top grayscale transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 1024px) 280px, 400px"
            />
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Name & Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center z-10">
            <motion.h1
              variants={fadeUpVariants}
              className="glitch-text text-3xl lg:text-4xl font-semibold text-white tracking-tight"
              data-text="Pratyush"
            >
              Pratyush
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-neon text-lg mt-1 flex items-center gap-0.5 font-medium">
              Full Stack Developer
              <span className="animate-blink font-bold ml-0.5">_</span>
            </motion.p>

            {/* Accent line under title */}
            <motion.div
              variants={accentLineVariants}
              className="w-12 h-[2px] bg-neon/40 rounded-full mt-3"
            />

            {/* Social Icons — sequential entrance */}
            <motion.div variants={fadeInVariants} className="flex items-center gap-3 mt-4">
              {/* LinkedIn */}
              <motion.a
                custom={0}
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/pratyush-38b705351/"
                className="social-icon-minimal"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              {/* GitHub */}
              <motion.a
                custom={1}
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/PratyushPrasun"
                className="social-icon-minimal"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </motion.a>
              {/* LeetCode */}
              <motion.a
                custom={2}
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://leetcode.com/u/Pratyush1203/"
                className="social-icon-minimal"
                aria-label="LeetCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.17 6.01a1.377 1.377 0 0 0-.419.98c0 .371.144.718.419.98l5.352 5.572c.264.264.61.408.961.408a1.37 1.37 0 0 0 .961-.408l5.352-5.572a1.38 1.38 0 0 0 0-1.96L14.444.438A1.374 1.374 0 0 0 13.483 0zm0 3.013l3.522 3.666-3.522 3.667-3.522-3.667 3.522-3.666zM9.832 6.471a1.25 1.25 0 0 0-.884.366l-4.319 4.38c-1.163 1.163-1.163 3.054 0 4.217l4.332 4.363c1.163 1.163 3.054 1.163 4.217 0l2.609-2.636a1.25 1.25 0 0 0-1.768-1.768l-2.609 2.636c-.187.187-.525.187-.712 0l-4.332-4.363c-.187-.187-.187-.525 0-.712l4.319-4.38c.187-.187.525-.187.712 0l2.609 2.636a1.25 1.25 0 1 0 1.768-1.768l-2.609-2.636a1.25 1.25 0 0 0-.884-.366zM20.811 13.01H10.666a1.25 1.25 0 0 0 0 2.5h10.145a1.25 1.25 0 0 0 0-2.5z" />
                </svg>
              </motion.a>
              {/* X (Twitter) */}
              <motion.a
                custom={3}
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com/pprasun1203"
                className="social-icon-minimal"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom action buttons — staggered */}
        <motion.div variants={fadeUpVariants} className="flex border-t border-border-subtle">
          <motion.a
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            href="/Pratyush.pdf"
            download="Pratyush.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-neon hover:bg-white/5 transition-all border-r border-border-subtle"
          >
            Download CV
            <Download size={14} />
          </motion.a>
          <motion.a
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-neon hover:bg-white/5 transition-all"
          >
            Contact Me
            <Phone size={14} />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
