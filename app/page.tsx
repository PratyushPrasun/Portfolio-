"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Download, Phone } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import MobileNavbar from "./components/MobileNavbar";
import MobileHeroSection from "./components/MobileHeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import ResumeSection from "./components/sections/ResumeSection";
import MobileExperienceSection from "./components/sections/MobileExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import ContactSection from "./components/sections/ContactSection";

const SECTION_IDS = ["about", "services", "resume", "experience-mobile", "projects", "skills", "contact"];

// Map section IDs to sidebar nav IDs (services doesn't have a nav item)
function mapSectionToNav(sectionId: string): string {
  if (sectionId === "services") return "about";
  return sectionId;
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Intersection Observer (scrollspy) ──
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxRatio = 0;
        let visibleId = activeSection;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleId = entry.target.id;
          }
        });

        if (maxRatio > 0) {
          setActiveSection(mapSectionToNav(visibleId));
        }
      },
      {
        root: container,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
        rootMargin: "-10% 0px -60% 0px",
      }
    );

    // Observe all sections
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  // ── Section fade-in animation ──
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        root: container,
        threshold: 0.1,
      }
    );

    container.querySelectorAll(".section-animate").forEach((el) => {
      fadeObserver.observe(el);
    });

    return () => fadeObserver.disconnect();
  }, []);

  // ── Navigate to section ──
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-dark">
      {/* ── Left: Icon Rail Sidebar (desktop only) ── */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        mobileOpen={mobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />

      {/* ── Center: Fixed Profile Card (desktop only) ── */}
      <ProfileCard />

      {/* ── Mobile Navigation ── */}
      <MobileNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        scrollContainerRef={scrollContainerRef}
      />

      {/* ── Right: Scrollable Content Panel ── */}
      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto h-screen custom-scrollbar bg-pattern"
      >
        {/* Mobile Hero Section (replaces old fixed mobile profile card) */}
        <MobileHeroSection />

        <div className="relative z-10 p-6 lg:p-8 xl:p-10 space-y-12 max-w-[900px]">
          <AboutSection />
          <ServicesSection />
          <ResumeSection />
          <MobileExperienceSection />
          <ProjectsSection />
          <SkillsSection />
        </div>

        {/* Contact section (full-width for split layout) */}
        <ContactSection />
      </main>
    </div>
  );
}
