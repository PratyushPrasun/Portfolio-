"use client";

import { ExternalLink, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../../data/projectsData";
import {
  fadeUpVariants,
  staggerContainerVariants,
  buttonHoverVariants,
  accentLineVariants,
  scaleRevealVariants,
  chipContainerVariants,
  chipItemVariants,
  sequentialContainer,
  sequentialItem,
} from "../../animations/variants";

/* ── Compact Browser Mockup (single image) ── */
function BrowserMockup({ image, gradient, variant, title }: { image?: string; gradient: string; variant: number; title: string }) {
  const layouts = [
    /* Dashboard */
    <div key="d" className="absolute inset-0 top-[22px] flex p-2 gap-1.5">
      <div className="w-[25%] rounded bg-white/[0.04] border border-white/[0.06]" />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex gap-1.5 h-[40%]">
          <div className="flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
          <div className="flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
        </div>
        <div className="flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
      </div>
    </div>,
    /* Cards grid */
    <div key="c" className="absolute inset-0 top-[22px] flex flex-col p-2 gap-1.5">
      <div className="h-1.5 w-[28%] rounded bg-white/[0.06]" />
      <div className="flex-1 grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map(i => <div key={i} className="rounded bg-white/[0.04] border border-white/[0.06]" />)}
      </div>
    </div>,
    /* List */
    <div key="l" className="absolute inset-0 top-[22px] flex flex-col p-2 gap-1">
      {[38, 55, 42, 60, 35].map((w, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-white/[0.04] border border-white/[0.06] shrink-0" />
          <div className="h-1.5 rounded bg-white/[0.06]" style={{ width: `${w}%` }} />
          <div className="h-1.5 rounded bg-white/[0.04] flex-1" />
        </div>
      ))}
    </div>,
    /* Terminal */
    <div key="t" className="absolute inset-0 top-[22px] p-2 flex flex-col gap-1">
      {[65, 45, 55, 70, 40, 30].map((w, i) => (
        <div key={i} className="h-1.5 rounded bg-white/[0.06]" style={{ width: `${w}%`, opacity: 0.3 + i * 0.12 }} />
      ))}
    </div>,
  ];

  return (
    <motion.div
      variants={scaleRevealVariants}
      className="relative w-full rounded-lg overflow-hidden border border-border-card bg-bg-surface group-hover:border-neon/30 transition-colors"
      style={{ background: image ? undefined : gradient, aspectRatio: "16/9" }}
    >
      <div className="flex items-center gap-[4px] px-2.5 py-[5px] bg-black/30 border-b border-white/[0.06] relative z-10">
        <span className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
      </div>
      {image ? (
        <div className="absolute inset-0 top-[22px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        layouts[variant % layouts.length]
      )}
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="section-animate in-view"
    >
      <div className="relative mb-6 inline-block">
        <motion.h2 variants={fadeUpVariants} className="text-2xl font-bold green-first-letter">
          Projects
        </motion.h2>
        <motion.div
          variants={accentLineVariants}
          className="h-[2px] bg-gradient-to-r from-[#22c55e] to-transparent mt-1.5 rounded-full"
        />
      </div>

      {/* Desktop: 2-column grid */}
      <motion.div variants={staggerContainerVariants} className="hidden md:grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeUpVariants}
            className="card p-5 group transition-all duration-300 hover:border-border-card hover:shadow-lg hover:shadow-neon/5 flex flex-col justify-between"
          >
            <div>
              {/* Color bar */}
              <div className="w-full h-1 rounded-full bg-gradient-to-r from-neon/60 to-neon/10 mb-4" />

              {/* Project Name */}
              <h3 className="font-semibold text-text-primary text-[15px] mb-3 group-hover:text-neon transition-colors">
                {project.title}
              </h3>

              {/* Mockup Screenshot */}
              <div className="mb-4">
                <BrowserMockup image={project.image} gradient={project.mockupGradient} variant={index} title={project.title} />
              </div>

              {/* Tech Stack Chips — Progressive reveal */}
              <motion.div variants={chipContainerVariants} className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 6).map((tech) => (
                  <motion.span
                    key={tech}
                    variants={chipItemVariants}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-bg-surface text-text-secondary border border-border-subtle"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Key Details (2–4 points) */}
              <motion.ul variants={sequentialContainer} className="space-y-1.5 mb-4">
                {project.keyFeatures.slice(0, 3).map((feature, i) => (
                  <motion.li key={i} variants={sequentialItem} className="text-[12px] text-text-muted leading-relaxed flex items-start gap-1.5">
                    <span className="text-neon shrink-0 mt-[1px]">›</span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-border-subtle mt-auto">
              <motion.a
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
                href={project.github}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-white/5 text-text-secondary border border-border-subtle hover:border-neon/40 hover:text-neon transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork size={13} />
                Source
              </motion.a>
              <motion.a
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
                href={project.liveDemo}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-neon/10 text-neon border border-neon/20 hover:bg-neon/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={13} />
                Live Demo
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: Full-width stacked cards */}
      <motion.div variants={staggerContainerVariants} className="md:hidden space-y-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeUpVariants}
            className="card mobile-card overflow-hidden"
          >
            <div className="w-full h-1 bg-gradient-to-r from-neon/80 via-neon/40 to-transparent" />

            <div className="p-5">
              {/* Project Name */}
              <h3 className="font-semibold text-text-primary text-[16px] mb-3">
                {project.title}
              </h3>

              {/* Mockup Screenshot */}
              <div className="mb-4">
                <BrowserMockup image={project.image} gradient={project.mockupGradient} variant={index} title={project.title} />
              </div>

              {/* Tech Stack */}
              <motion.div variants={chipContainerVariants} className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 6).map((tech) => (
                  <motion.span
                    key={tech}
                    variants={chipItemVariants}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-full bg-bg-surface text-text-secondary border border-border-subtle"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Key Details */}
              <motion.ul variants={sequentialContainer} className="space-y-1.5 mb-5">
                {project.keyFeatures.slice(0, 3).map((feature, i) => (
                  <motion.li key={i} variants={sequentialItem} className="text-[12px] text-text-muted leading-relaxed flex items-start gap-1.5">
                    <span className="text-neon shrink-0 mt-[1px]">›</span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-border-subtle">
                <motion.a
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={project.github}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-lg bg-bg-surface text-text-secondary border border-border-subtle hover:border-neon/40 hover:text-neon transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitFork size={13} />
                  Source
                </motion.a>
                <motion.a
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={project.liveDemo}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-lg bg-neon/10 text-neon border border-neon/20 hover:bg-neon/20 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
