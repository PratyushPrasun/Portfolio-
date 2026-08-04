"use client";

import { Code2, Layout, Server, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  accentLineVariants,
  chipContainerVariants,
  chipItemVariants,
} from "../../animations/variants";

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
    <motion.section
      id="skills"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="section-animate in-view"
    >
      <div className="relative mb-6 inline-block">
        <motion.h2 variants={fadeUpVariants} className="text-2xl font-bold green-first-letter">
          Skills
        </motion.h2>
        <motion.div
          variants={accentLineVariants}
          className="h-[2px] bg-gradient-to-r from-[#22c55e] to-transparent mt-1.5 rounded-full"
        />
      </div>

      {/* Desktop: 2-column grid */}
      <motion.div variants={staggerContainerVariants} className="hidden md:grid grid-cols-2 gap-4">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              variants={fadeUpVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="card p-5 transition-colors hover:border-neon/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
                  <Icon size={20} className="text-neon" />
                </div>
                <h3 className="font-semibold text-text-primary text-[16px]">
                  {category.title}
                </h3>
              </div>

              <motion.div variants={chipContainerVariants} className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={chipItemVariants}
                    className="info-tag text-[12px]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile: Full-width stacked cards with tap-friendly tags */}
      <motion.div variants={staggerContainerVariants} className="md:hidden space-y-4">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              variants={fadeUpVariants}
              className="card p-5 mobile-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
                  <Icon size={20} className="text-neon" />
                </div>
                <h3 className="font-semibold text-text-primary text-[16px]">
                  {category.title}
                </h3>
              </div>

              <motion.div variants={chipContainerVariants} className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={chipItemVariants}
                    className="inline-block px-3.5 py-2 text-[12px] font-medium rounded-lg text-neon border border-neon/20 bg-neon/5"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
