"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Download, Send } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import ResumeSection from "./components/sections/ResumeSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ArticlesSection from "./components/sections/ArticlesSection";
import ContactSection from "./components/sections/ContactSection";

const SECTION_IDS = ["about", "services", "resume", "projects", "articles", "contact"];

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
      {/* ── Left: Icon Rail Sidebar ── */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        mobileOpen={mobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />

      {/* ── Center: Fixed Profile Card ── */}
      <ProfileCard />

      {/* ── Mobile Profile Card (shown only on small screens) ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30">
        <div className="relative h-[280px] w-full overflow-hidden bg-bg-card">
          <Image
            src="/profile.png"
            alt="Benjamin Ryan"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h1 className="text-xl font-bold text-white">Benjamin Ryan</h1>
            <p className="text-text-secondary text-sm flex items-center gap-0.5">
              Software Developer
              <span className="animate-blink text-neon font-bold ml-0.5">_</span>
            </p>
            <div className="flex items-center gap-2 mt-3">
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="#" className="social-icon" aria-label="X">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
            <div className="flex gap-2 mt-3">
              <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg bg-bg-card/80 border border-border-card text-text-secondary hover:text-neon transition-all">
                <Download size={12} /> CV
              </a>
              <a href="#contact" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg bg-neon text-black transition-all">
                Contact <Send size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Scrollable Content Panel ── */}
      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto h-screen custom-scrollbar bg-pattern"
      >
        {/* Mobile spacer for the fixed mobile profile card */}
        <div className="md:hidden h-[280px]" />

        <div className="relative z-10 p-6 lg:p-8 xl:p-10 space-y-12 max-w-[900px]">
          <AboutSection />
          <ServicesSection />
          <ResumeSection />
          <ProjectsSection />
          <ArticlesSection />
          <ContactSection />

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border-subtle">
            <p className="text-text-muted text-[13px]">
              © 2024 Benjamin Ryan. Crafted with passion and code.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
