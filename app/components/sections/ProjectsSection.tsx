"use client";

import { ExternalLink, GitFork } from "lucide-react";
import { projects } from "../../data/projectsData";

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
    <div
      className="relative w-full rounded-lg overflow-hidden border border-border-card bg-bg-surface"
      style={{ background: image ? undefined : gradient, aspectRatio: "16/9" }}
    >
      <div className="flex items-center gap-[4px] px-2.5 py-[5px] bg-black/30 border-b border-white/[0.06] relative z-10">
        <span className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
      </div>
      {image ? (
        <div className="absolute inset-0 top-[22px] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover object-top" />
        </div>
      ) : (
        layouts[variant % layouts.length]
      )}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 green-first-letter">Projects</h2>

      {/* Desktop: 2-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={project.id} className="card p-5">
            {/* Color bar */}
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-neon/60 to-neon/10 mb-4" />

            {/* Project Name */}
            <h3 className="font-semibold text-text-primary text-[15px] mb-3">
              {project.title}
            </h3>

            {/* Mockup Screenshot */}
            <div className="mb-4">
              <BrowserMockup image={project.image} gradient={project.mockupGradient} variant={index} title={project.title} />
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-bg-surface text-text-secondary border border-border-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Key Details (2–4 points) */}
            <ul className="space-y-1.5 mb-4">
              {project.keyFeatures.slice(0, 3).map((feature, i) => (
                <li key={i} className="text-[12px] text-text-muted leading-relaxed flex items-start gap-1.5">
                  <span className="text-neon shrink-0 mt-[1px]">›</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t border-border-subtle">
              <a
                href={project.github}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-white/5 text-text-secondary border border-border-subtle hover:border-neon/40 hover:text-neon transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork size={13} />
                Source
              </a>
              <a
                href={project.liveDemo}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-neon/10 text-neon border border-neon/20 hover:bg-neon/20 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Full-width stacked cards */}
      <div className="md:hidden space-y-5">
        {projects.map((project, index) => (
          <div key={project.id} className="card mobile-card overflow-hidden">
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
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-full bg-bg-surface text-text-secondary border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Details */}
              <ul className="space-y-1.5 mb-5">
                {project.keyFeatures.slice(0, 3).map((feature, i) => (
                  <li key={i} className="text-[12px] text-text-muted leading-relaxed flex items-start gap-1.5">
                    <span className="text-neon shrink-0 mt-[1px]">›</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-border-subtle">
                <a
                  href={project.github}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-lg bg-bg-surface text-text-secondary border border-border-subtle hover:border-neon/40 hover:text-neon transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitFork size={13} />
                  Source
                </a>
                <a
                  href={project.liveDemo}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium rounded-lg bg-neon/10 text-neon border border-neon/20 hover:bg-neon/20 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
