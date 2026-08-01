"use client";

import { ExternalLink, GitFork } from "lucide-react";

const projects = [
  {
    title: "CloudSync Dashboard",
    description:
      "Real-time cloud infrastructure monitoring dashboard with auto-scaling alerts and resource optimization recommendations.",
    tags: ["React", "Node.js", "AWS", "D3.js"],
    github: "#",
    live: "#",
  },
  {
    title: "Neural Commerce",
    description:
      "AI-powered e-commerce platform with personalized product recommendations, dynamic pricing, and predictive inventory management.",
    tags: ["Python", "TensorFlow", "Next.js", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "DevFlow CLI",
    description:
      "Command-line tool for automating development workflows including CI/CD pipeline setup, code generation, and deployment orchestration.",
    tags: ["Go", "Docker", "Kubernetes", "gRPC"],
    github: "#",
    live: "#",
  },
  {
    title: "HealthPulse API",
    description:
      "HIPAA-compliant healthcare API for wearable device data aggregation, patient monitoring, and predictive health analytics.",
    tags: ["Java", "Spring Boot", "MongoDB", "GraphQL"],
    github: "#",
    live: "#",
  },
  {
    title: "QuantumViz",
    description:
      "Interactive 3D visualization platform for quantum computing circuits and state vectors with real-time simulation capabilities.",
    tags: ["TypeScript", "Three.js", "WebGL", "Rust"],
    github: "#",
    live: "#",
  },
  {
    title: "EcoTrack Mobile",
    description:
      "Cross-platform mobile app for tracking personal carbon footprint with gamification elements and community challenges.",
    tags: ["React Native", "Firebase", "Python", "ML Kit"],
    github: "#",
    live: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 green-first-letter">Projects</h2>

      {/* Desktop: 2-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.title} className="card p-5">
            {/* Color bar at top */}
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-neon/60 to-neon/10 mb-4" />

            <h3 className="font-semibold text-text-primary text-[15px] mb-2">
              {project.title}
            </h3>

            <p className="text-text-muted text-[13px] leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/5 text-text-secondary border border-border-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
              <a
                href={project.github}
                className="flex items-center gap-1.5 text-[12px] text-text-muted hover:text-neon transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork size={14} />
                Source
              </a>
              <a
                href={project.live}
                className="flex items-center gap-1.5 text-[12px] text-text-muted hover:text-neon transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Full-width stacked premium cards */}
      <div className="md:hidden space-y-5">
        {projects.map((project) => (
          <div key={project.title} className="card mobile-card overflow-hidden">
            {/* Green gradient bar */}
            <div className="w-full h-1 bg-gradient-to-r from-neon/80 via-neon/40 to-transparent" />

            <div className="p-5">
              <h3 className="font-semibold text-text-primary text-[16px] mb-2">
                {project.title}
              </h3>

              <p className="text-text-muted text-[13px] leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-white/5 text-text-secondary border border-border-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons - full button style for mobile */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-semibold rounded-xl bg-bg-surface border border-border-card text-text-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitFork size={14} />
                  Source
                </a>
                <a
                  href={project.live}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-semibold rounded-xl bg-neon/10 border border-neon/20 text-neon transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
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
