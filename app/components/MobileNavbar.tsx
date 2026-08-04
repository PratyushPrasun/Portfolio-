"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface MobileNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Education" },
  { id: "experience-mobile", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function MobileNavbar({
  activeSection,
  onNavigate,
  scrollContainerRef,
}: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Track scroll for navbar blur effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 20);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (sectionId: string) => {
      setIsOpen(false);
      // Small delay so drawer closes smoothly before scroll
      setTimeout(() => {
        onNavigate(sectionId);
      }, 300);
    },
    [onNavigate]
  );

  const mapActiveToNav = (section: string) => {
    if (section === "services") return "about";
    return section;
  };

  return (
    <div className="lg:hidden">
      {/* Fixed Navbar */}
      <header
        className={`mobile-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "mobile-navbar-scrolled"
            : "bg-transparent"
          }`}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="flex items-center justify-between px-5 h-16">
          {/* Left: Logo + Name + Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-neon/30 bg-[#0d0d0d] flex items-center justify-center">
              <img src="/icon.svg" alt="P Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[17px] font-bold text-text-primary leading-tight tracking-tight">
                Pratyush
              </h1>
              <span className="text-[10px] tracking-[0.12em] uppercase leading-tight text-neon">
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Right: Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-12 h-12 rounded-full text-text-primary"
            aria-label="Open menu"
          >
            <div className="flex flex-col items-end gap-[5px]">
              <span className="block h-[2px] w-[22px] rounded-full bg-current transition-all" />
              <span className="block h-[2px] w-[17px] rounded-full bg-current transition-all" />
              <span className="block h-[2px] w-[12px] rounded-full bg-current transition-all" />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-[340px] mobile-drawer overflow-y-auto shadow-2xl"
              style={{
                paddingTop: "env(safe-area-inset-top, 0px)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full text-text-muted hover:text-text-primary z-10 transition-colors"
                style={{
                  marginTop: "env(safe-area-inset-top, 0px)",
                }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

              <div className="flex flex-col h-full px-8 pt-8 pb-10">
                {/* Profile Section */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                  className="flex flex-col items-center mb-8"
                >
                  <div
                    className="relative w-20 h-20 rounded-full overflow-hidden mb-3 shadow-md border border-border-card"
                    style={{ transform: "rotate(-2deg)" }}
                  >
                    <Image
                      src="/profileu.jpg"
                      alt="Pratyush"
                      fill
                      className="object-cover object-top grayscale"
                      sizes="80px"
                    />
                  </div>
                  <h2 className="text-base font-bold text-text-primary">Pratyush</h2>
                  <p className="text-[11px] text-text-muted tracking-[0.1em] uppercase mt-0.5">
                    Full Stack Developer
                  </p>
                </motion.div>

                {/* Navigation Links */}
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => {
                      const isActive = mapActiveToNav(activeSection) === item.id;
                      return (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: 25 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + index * 0.04,
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1.0],
                          }}
                        >
                          <button
                            onClick={() => handleNavClick(item.id)}
                            className={`mobile-drawer-link w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${isActive
                                ? "text-neon bg-neon/10 font-semibold"
                                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                              }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="activeMobileNavDot"
                                className="w-1.5 h-1.5 rounded-full bg-neon shrink-0"
                              />
                            )}
                            {item.label}
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.35 }}
                  className="mt-6 space-y-4 pt-4 border-t border-border-subtle"
                >
                  {/* Resume Button */}
                  <a
                    href="/Pratyush.pdf"
                    download="Pratyush.pdf"
                    className="flex items-center justify-center gap-2 w-full py-3 text-[12px] font-semibold uppercase tracking-wider rounded-xl bg-neon text-black transition-all shadow-md active:scale-[0.98]"
                  >
                    <Download size={15} />
                    Download Resume
                  </a>

                  {/* Theme Toggle + Social */}
                  <div className="flex items-center justify-between pt-2">
                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 text-[12px] text-text-muted hover:text-neon transition-colors"
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? (
                        <Sun size={17} />
                      ) : (
                        <Moon size={17} />
                      )}
                      <span className="uppercase tracking-wider font-medium">
                        {theme === "dark" ? "Light" : "Dark"}
                      </span>
                    </button>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="text-text-muted hover:text-neon transition-colors"
                          aria-label={link.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
