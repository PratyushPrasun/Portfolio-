"use client";

import { Code2, Layout, Server, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Language & Core",
    icon: Code2,
    skills: [
      "JavaScript / TypeScript",
      "C / C++",
      "Data Structures & Algorithms",
      "OOPs",
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Shadcn",
      "Material UI",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Auth.js",
      "MySQL",
    ],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    skills: [
      "Git & GitHub",
      "Canva",
      "AWS (Basic)",
      "Docker",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 green-first-letter">Skills</h2>

      {/* Desktop: 2-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
                  <Icon size={20} className="text-neon" />
                </div>
                <h3 className="font-semibold text-text-primary text-[16px]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="info-tag text-[12px]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: Full-width stacked cards with tap-friendly tags */}
      <div className="md:hidden space-y-4">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="card p-5 mobile-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
                  <Icon size={20} className="text-neon" />
                </div>
                <h3 className="font-semibold text-text-primary text-[16px]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-3.5 py-2 text-[12px] font-medium rounded-lg text-neon border border-neon/20 bg-neon/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
