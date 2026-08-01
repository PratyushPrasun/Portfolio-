"use client";

import { GraduationCap, Building2 } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Science",
    institution: "Stanford University",
    period: "2014 — 2016",
    description:
      "Specialized in Machine Learning and Distributed Systems. Published research on scalable data processing pipelines.",
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "University of California, LA",
    period: "2010 — 2014",
    description:
      "Dean's List honors. Focused on software engineering fundamentals, algorithms, and data structures.",
  },
  {
    degree: "Data Science Certification",
    institution: "MIT Professional Education",
    period: "2017",
    description:
      "Advanced certification in statistical modeling, deep learning, and big data analytics.",
  },
];

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

export default function ResumeSection() {
  return (
    <section id="resume" className="section-animate">
      {/* Desktop: "Resume" heading showing both Education + Experience */}
      <h2 className="text-2xl font-bold mb-6 green-first-letter hidden md:block">Resume</h2>

      {/* Mobile: "Education" heading showing only Education */}
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white tracking-wide md:hidden">
        <span className="text-[#22c55e]">E</span>
        <span>ducation</span>
      </h2>

      {/* Desktop: Two-column grid with Education + Experience */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {/* Education */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
              <GraduationCap size={20} className="text-neon" />
            </div>
            <h3 className="font-semibold text-text-primary text-lg">
              Education
            </h3>
          </div>

          <div className="space-y-0">
            {education.map((item, index) => (
              <div key={index} className="timeline-item">
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider">
                  {item.period}
                </span>
                <h4 className="font-semibold text-text-primary text-[14px] mt-1">
                  {item.degree}
                </h4>
                <p className="text-text-muted text-[12px] mt-0.5">
                  {item.institution}
                </p>
                <p className="text-text-secondary text-[13px] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
              <Building2 size={20} className="text-neon" />
            </div>
            <h3 className="font-semibold text-text-primary text-lg">
              Experience
            </h3>
          </div>

          <div className="space-y-0">
            {experience.map((item, index) => (
              <div key={index} className="timeline-item">
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider">
                  {item.period}
                </span>
                <h4 className="font-semibold text-text-primary text-[14px] mt-1">
                  {item.role}
                </h4>
                <p className="text-text-muted text-[12px] mt-0.5">
                  {item.company}
                </p>
                <p className="text-text-secondary text-[13px] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Education only as stacked cards */}
      <div className="md:hidden space-y-4">
        {education.map((item, index) => (
          <div
            key={index}
            className="card p-5 mobile-card"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0 mt-0.5">
                <GraduationCap size={18} className="text-neon" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider">
                  {item.period}
                </span>
                <h4 className="font-semibold text-text-primary text-[15px] mt-1">
                  {item.degree}
                </h4>
                <p className="text-text-muted text-[13px] mt-0.5">
                  {item.institution}
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
