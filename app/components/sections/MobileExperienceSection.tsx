"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { fadeUpVariants, staggerContainerVariants } from "../../animations/variants";
import { experienceData as experience } from "../../data/experienceData";

export default function MobileExperienceSection() {
  return (
    <motion.section
      id="experience-mobile"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="section-animate lg:hidden"
    >
      <motion.h2
        variants={fadeUpVariants}
        className="text-2xl font-bold mb-6 flex items-center text-text-primary tracking-wide"
      >
        <span className="text-[#22c55e]">E</span>
        <span>xperience</span>
      </motion.h2>

      <motion.div variants={fadeUpVariants} className="card p-6 relative overflow-hidden">
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
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className="timeline-item"
            >
              <span className="text-[11px] text-neon font-medium uppercase tracking-wider">
                {item.period}
              </span>
              <h4 className="font-semibold text-text-primary text-[14px] sm:text-[15px] mt-1">
                {item.role}
              </h4>
              <p className="text-text-muted text-[12px] sm:text-[13px] mt-0.5">
                {item.company}
              </p>
              <p className="text-text-secondary text-[13px] mt-2 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
