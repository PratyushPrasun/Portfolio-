"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  accentLineVariants,
  chipContainerVariants,
  chipItemVariants,
} from "../../animations/variants";

const skillsList = [
  {
    name: "React.js",
    icon: (
      <svg width="20" height="20" viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="0" cy="0" r="2" fill="currentColor" stroke="none" />
        <g>
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.563 17.585-6.223-8.082v8.082H9.722V6.415h1.758l6.104 7.915V6.415h1.618v11.17h-1.639z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5L2.5 7v10L12 22.5 21.5 17V7L12 1.5zm6.5 14.1L12 19.4l-6.5-3.8V8.4L12 4.6l6.5 3.8v7.2zM10.8 9.5v5h2.4v-3.2l2.3 3.2h2V9.5h-2.4v3.1l-2.3-3.1h-2z" />
      </svg>
    ),
  },
  {
    name: "Express.js",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5 6h4.8v2.4H4.9v3.6h2.4v2.4H4.9V18h4.8v2.4H2.5V6zm9.6 0l2.4 4.8L16.9 6h2.8l-3.8 7.2 4 7.2h-2.9l-2.5-4.9-2.5 4.9H9.3l4-7.2-3.8-7.2h2.6z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm15.5 14.5c-.3-1-1.2-1.8-3.1-2.5-.7-.3-1.4-.5-1.6-1-.1-.3-.1-.5 0-.7.2-.4.7-.6 1.2-.5.4.1.7.3 1 .8l1-.7c-.3-.5-.5-.7-.8-.9-.7-.6-1.7-.8-2.6-.5-.8.3-1.4.9-1.5 1.8-.1 1.3.8 2 2.1 2.5 1.2.5 1.7.7 1.8 1.3.1.6-.3 1.2-1.2 1.2-.8 0-1.3-.4-1.7-1.1l-1 .7c.4.7.8 1.1 1.3 1.4.7.4 1.8.5 2.6.2 1-.3 1.7-1 1.7-2.1v-.9zM12 11.5h-1.5v6.5c0 1.2-.4 1.6-1.3 1.6-.4 0-.7-.1-1-.2-.1-.1-.2-.2-.3-.3l-.5.8c.4.3.8.5 1.3.6.6.1 1.3.1 1.9-.2.8-.4 1.4-1.1 1.4-2.7v-6.1z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5s-4.5 4-4.5 9.5c0 4.5 3.5 7.5 4.5 8.5.5-.5 4.5-3.5 4.5-8.5 0-5.5-4.5-9.5-4.5-9.5zm0 15.5c-1-1-3-3.2-3-6 0-3.5 2.5-6.5 3-7.2.5.7 3 3.7 3 7.2 0 2.8-2 5-3 6z" />
      </svg>
    ),
  },
  {
    name: "C++",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.3 10.8v1.4h-1.4v1.4h-1.4v-1.4h-1.4v-1.4h1.4V9.3h1.4v1.5h1.4zm-5.8 0v1.4h-1.4v1.4h-1.4v-1.4h-1.4v-1.4h1.4V9.3h1.4v1.5h1.4zM9.5 3.7C5.2 3.7 1.7 7.2 1.7 11.5s3.5 7.8 7.8 7.8c3.2 0 5.9-1.9 7.2-4.7h-3.2a4.9 4.9 0 0 1-4 2.1c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9c1.6 0 3.1.8 4 2h3.2C15.5 6.3 12.7 3.7 9.5 3.7z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm15.5 6.8h-1.6c-.6 0-1.2.1-1.6.3v2.5c.6-.4 1.3-.6 2.1-.6.7 0 1.1.2 1.1.7 0 .5-.4.8-1.2 1.1l-1.3.5c-1.3.5-1.9 1.3-1.9 2.5 0 1.7 1.3 2.7 3.3 2.7 1 0 1.9-.2 2.6-.7v-2.6c-.7.4-1.5.7-2.3.7-.8 0-1.2-.2-1.2-.7 0-.5.4-.8 1.2-1.1l1.3-.5c1.3-.5 1.9-1.3 1.9-2.5.1-1.7-1.2-2.7-3.2-2.7zM11.5 9.8H4.5v2.3h2.3v7.4h2.7v-7.4h2v-2.3z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-4.8 0-4.5 2.1-4.5 2.1v2.2h4.6v.7H5.2S2 6.6 2 11.5c0 4.9 2.8 4.7 2.8 4.7h1.7v-2.3c0-2.6 2.2-2.5 2.2-2.5h4.5c2.2 0 2.2-2.1 2.2-2.1V4.1s.4-2.1-3.5-2.1zm-2.4 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm2.6 18.5c4.8 0 4.5-2.1 4.5-2.1v-2.2h-4.6v-.7h6.8s3.2.4 3.2-4.5c0-4.9-2.8-4.7-2.8-4.7h-1.7v2.3c0 2.6-2.2 2.5-2.2 2.5h-4.5c-2.2 0-2.2 2.1-2.2 2.1v6.2s-.4 2.1 3.5 2.1zm2.4-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="section-animate in-view"
    >
      <div className="relative mb-6 inline-block">
        <motion.h2 variants={fadeUpVariants} className="text-2xl font-bold flex items-center text-text-primary tracking-wide">
          <span className="text-[#22c55e]">
            A
          </span>
          <span>bout Me</span>
        </motion.h2>
        <motion.div
          variants={accentLineVariants}
          className="h-[2px] bg-gradient-to-r from-[#22c55e] to-transparent mt-1.5 rounded-full"
        />
      </div>

      {/* Desktop layout: side-by-side */}
      <div className="hidden lg:flex flex-col lg:flex-row items-stretch gap-5 border-b border-border-subtle pb-8">
        {/* Intro text */}
        <motion.div variants={fadeUpVariants} className="flex-1 pr-0 lg:pr-5">
          <p className="text-text-secondary leading-relaxed text-[15px]">
            Hey, there 👋 I&apos;m Pratyush, a Full Stack MERN Developer and Computer Science student passionate about building scalable web applications, secure backend systems, and modern interactive user interfaces. I enjoy transforming ideas into high-quality digital products using modern technologies.
          </p>
        </motion.div>

        {/* Right Info Box */}
        <motion.div variants={fadeUpVariants} className="w-full lg:w-[380px] shrink-0 border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-center gap-4">
          {/* Location */}
          <div className="flex items-center justify-between py-2 border-b border-border-subtle/60">
            <span className="px-3 py-1 rounded bg-[#22c55e] text-black text-xs tracking-wide font-medium">
              Location:
            </span>
            <span className="text-text-primary text-sm font-medium">
              Haldia, West Bengal, India.
            </span>
          </div>

          {/* Languages */}
          <div className="flex items-center justify-between py-2 border-b border-border-subtle/60">
            <span className="px-3 py-1 rounded bg-[#22c55e] text-black font-sm text-xs tracking-wide font-medium">
              Languages:
            </span>
            <span className="text-text-primary text-sm font-medium">
              English, Hindi
            </span>
          </div>

          {/* Skills */}
          <div className="flex items-start justify-between pt-2">
            <span className="px-3 py-1 rounded bg-[#22c55e] text-black font-medium text-xs tracking-wide mt-1">
              Skills:
            </span>

            <motion.div variants={chipContainerVariants} className="grid grid-cols-5 gap-2.5">
              {skillsList.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={chipItemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                  title={skill.name}
                  className="w-8 h-8 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center text-neon transition-colors hover:bg-neon/20 cursor-default"
                >
                  {skill.icon}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile layout: stacked vertical */}
      <motion.div variants={staggerContainerVariants} className="lg:hidden space-y-6">
        {/* Intro text */}
        <motion.p variants={fadeUpVariants} className="text-text-secondary leading-relaxed text-[14px]">
          Hey, there 👋 I&apos;m Pratyush, a Full Stack MERN Developer and Computer Science student passionate about building scalable web applications, secure backend systems, and modern interactive user interfaces. I enjoy transforming ideas into high-quality digital products using modern technologies.
        </motion.p>

        {/* Info cards */}
        <div className="space-y-3">
          {/* Location */}
          <motion.div variants={fadeUpVariants} className="card p-4 mobile-card flex items-center justify-between">
            <span className="px-3 py-1 rounded bg-neon text-black text-[11px] tracking-wide font-semibold">
              Location
            </span>
            <span className="text-text-primary text-[13px] font-medium">
              Haldia, West Bengal, India
            </span>
          </motion.div>

          {/* Languages */}
          <motion.div variants={fadeUpVariants} className="card p-4 mobile-card flex items-center justify-between">
            <span className="px-3 py-1 rounded bg-neon text-black text-[11px] tracking-wide font-semibold">
              Languages
            </span>
            <span className="text-text-primary text-[13px] font-medium">
              English, Hindi
            </span>
          </motion.div>

          {/* Skills */}
          <motion.div variants={fadeUpVariants} className="card p-4 mobile-card">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-neon text-black text-[11px] tracking-wide font-semibold">
                Tech Stack
              </span>
            </div>
            <motion.div variants={chipContainerVariants} className="grid grid-cols-5 gap-3">
              {skillsList.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={chipItemVariants}
                  title={skill.name}
                  className="w-10 h-10 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center text-neon"
                >
                  {skill.icon}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
