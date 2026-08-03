"use client";

import {
  Globe,
  Palette,
  FolderKanban,
  Lightbulb,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building responsive, performant websites and web applications using modern frameworks like React, Next.js, and Node.js.",
    color: "#22c55e",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive, engaging user interfaces and experiences that drive conversion and delight users through research-driven design.",
    color: "#22c55e",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Leading cross-functional teams, planning agile workflows, and delivering high-quality software projects on time and within scope.",
    color: "#22c55e",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description:
      "Analyzing complex technical challenges, architecting scalable solutions, and optimizing system performance for efficiency.",
    color: "#22c55e",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-text-primary tracking-wide">
        <span className=" text-[#22c55e]">
          M
        </span>
        <span>y Services</span>
      </h2>

      {/* Desktop: 2-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="card p-5">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
                  <Icon size={22} className="text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      {service.title}
                    </h3>
                    
                  </div>
                  <p className="text-text-muted text-[13px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: Full-width stacked cards */}
      <div className="md:hidden space-y-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="card p-5 mobile-card">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
                  <Icon size={22} className="text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary text-[15px] mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-[13px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
