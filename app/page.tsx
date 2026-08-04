"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PageLoader from "./components/PageLoader";
import { useMouseParallax } from "./animations/useMouseParallax";

const SECTION_IDS = ["about", "services", "resume", "experience-mobile", "projects", "skills", "contact"];

// Map section IDs to sidebar nav IDs (services doesn't have a nav item)
function mapSectionToNav(sectionId: string): string {
  if (sectionId === "services") return "about";
  return sectionId;
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useMouseParallax(4);
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

  // ── Global smooth scroll for internal anchor links ──
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.substring(1);
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (targetId === "hero" || targetId === "top") {
          e.preventDefault();
          scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // ── Navigate to section ──
  const handleNavigate = useCallback((sectionId: string) => {
    if (sectionId === "hero" || sectionId === "top" || sectionId === "home") {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div ref={parallaxContainerRef} className="flex h-screen overflow-hidden bg-bg-dark">
      {/* ── Page Entrance Loader ── */}
      <PageLoader />

      {/* ── Top Scroll Progress Bar ── */}
      <ScrollProgress targetRef={scrollContainerRef} />

      {/* ── Custom Cursor (Desktop Fine Pointer Only) ── */}
      <CustomCursor />

      {/* ── Back to Top Floating Button ── */}
      <BackToTop scrollContainerRef={scrollContainerRef} />

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
        className="flex-1 overflow-y-auto h-screen custom-scrollbar bg-pattern scroll-smooth"
      >
        {/* Mobile Hero Section */}
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
