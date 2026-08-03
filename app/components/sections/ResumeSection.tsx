"use client";

import { GraduationCap, Building2 } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Haldia Institute of Technology",
    period: "2024 — 2028 (Pursuing)",
    description:
      "Focusing on Full-Stack Development, Data Structures, and Artificial Intelligence. Maintaining a strong academic record while participating in tech communities.",
  },
  {
    degree: "Higher Secondary (12th Grade)",
    institution: "Annie Besant International School",
    period: "2021 — 2023",
    description:
      "Specialized in Physics, Chemistry, and Mathematics (PCM). Developed a strong foundation in analytical thinking and problem-solving.",
  },
  {
    degree: "Secondary School (10th Grade)",
    institution: "Destiny International School",
    period: "2019 – 2021",
    description:
      "Completed general secondary education with a focus on science and mathematics.",
  },
];

const experience = [
  {
    role: "Freelancer Web Developer",
    company: "GS3 Solution LLC",
    period: "May 2025 – June 2025",
    description:
      "Developed responsive and user-friendly web interfaces. Worked directly with clients to deliver feature-based solutions. Enhanced UI performance and design consistency.",
  },
  {
    role: "Web & Tech Team Member",
    company: "The HIT Times (College Club)",
    period: "Nov 2024 – Present",
    description:
      "Building and maintaining the club’s web presence. Collaborating with writers and designers. Implementing modern UI components and layouts.",
  }
];

export default function ResumeSection() {
  return (
    <section id="resume" className="section-animate">
      {/* Desktop: "Resume" heading showing both Education + Experience */}
      <h2 className="text-2xl font-bold mb-6 green-first-letter hidden md:block">Resume</h2>

      {/* Mobile: "Education" heading showing only Education */}
      <h2 className="text-2xl font-bold mb-6 flex items-center text-text-primary tracking-wide md:hidden">
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
