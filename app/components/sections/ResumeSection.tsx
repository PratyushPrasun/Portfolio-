"use client";

import { useRef } from "react";
import { GraduationCap, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  accentLineVariants,
  sequentialContainer,
  sequentialItem,
} from "../../animations/variants";
import { experienceData as experience } from "../../data/experienceData";

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

export default function ResumeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      id="resume"
      ref={containerRef}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="section-animate in-view"
    >
      {/* Desktop: "Resume" heading showing both Education + Experience */}
      <div className="hidden md:inline-block relative mb-6">
        <motion.h2 variants={fadeUpVariants} className="text-2xl font-bold green-first-letter">
          Resume
        </motion.h2>
        <motion.div
          variants={accentLineVariants}
          className="h-[2px] bg-gradient-to-r from-[#22c55e] to-transparent mt-1.5 rounded-full"
        />
      </div>

      {/* Mobile: "Education" heading showing only Education */}
      <div className="md:hidden relative mb-6 inline-block">
        <motion.h2 variants={fadeUpVariants} className="text-2xl font-bold flex items-center text-text-primary tracking-wide">
          <span className="text-[#22c55e]">E</span>
          <span>ducation</span>
        </motion.h2>
        <motion.div
          variants={accentLineVariants}
          className="h-[2px] bg-gradient-to-r from-[#22c55e] to-transparent mt-1.5 rounded-full"
        />
      </div>

      {/* Desktop: Two-column grid with Education + Experience */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {/* Education */}
        <motion.div variants={fadeUpVariants} className="card p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
              <GraduationCap size={20} className="text-neon" />
            </div>
            <h3 className="font-semibold text-text-primary text-lg">
              Education
            </h3>
          </div>

          <motion.div variants={sequentialContainer} className="space-y-0 relative">
            {education.map((item, index) => (
              <motion.div
                key={index}
                variants={sequentialItem}
                className="timeline-item"
              >
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider flex items-center gap-1.5">
                  {index === 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse inline-block" />
                  )}
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience */}
        <motion.div variants={fadeUpVariants} className="card p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
              <Building2 size={20} className="text-neon" />
            </div>
            <h3 className="font-semibold text-text-primary text-lg">
              Experience
            </h3>
          </div>

          <motion.div variants={sequentialContainer} className="space-y-0 relative">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                variants={sequentialItem}
                className="timeline-item"
              >
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider flex items-center gap-1.5">
                  {index === 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse inline-block" />
                  )}
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: Education only as stacked cards */}
      <motion.div variants={staggerContainerVariants} className="md:hidden space-y-4">
        {education.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariants}
            className="card p-5 mobile-card"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0 mt-0.5">
                <GraduationCap size={18} className="text-neon" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-neon font-medium uppercase tracking-wider flex items-center gap-1.5">
                  {index === 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse inline-block" />
                  )}
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
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
