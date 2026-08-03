"use client";

import { Building2 } from "lucide-react";

const experience = [
  {
    role: "Senior Software Developer",
    company: "Google",
    period: "2021 — Present",
    description:
      "Leading a team of 8 engineers building cloud-native microservices. Reduced API latency by 40% through architecture optimization.",
  },
  {
    role: "Full Stack Developer",
    company: "Meta",
    period: "2018 — 2021",
    description:
      "Built and maintained React-based frontends serving 50M+ users. Implemented real-time data visualization dashboards.",
  },
  {
    role: "Software Engineer",
    company: "Amazon",
    period: "2016 — 2018",
    description:
      "Developed high-throughput order processing systems handling 10K+ transactions per second using Java and AWS services.",
  },
];

export default function MobileExperienceSection() {
  return (
    <section id="experience-mobile" className="section-animate md:hidden">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-text-primary tracking-wide">
        <span className="text-[#22c55e]">E</span>
        <span>xperience</span>
      </h2>

      <div className="space-y-4">
        {experience.map((item, index) => (
          <div
            key={index}
            className="card p-5 mobile-card"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0 mt-0.5">
                <Building2 size={18} className="text-neon" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider">
                  {item.period}
                </span>
                <h4 className="font-semibold text-text-primary text-[15px] mt-1">
                  {item.role}
                </h4>
                <p className="text-text-muted text-[13px] mt-0.5">
                  {item.company}
                </p>
                <p className="text-text-secondary text-[13px] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
