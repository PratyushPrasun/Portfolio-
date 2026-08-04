"use client";

import {
  User,
  FileText,
  Briefcase,
  Code2,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar({
  activeSection,
  onNavigate,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Sidebar rail — desktop only */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-full z-50 w-[90px] flex-col items-center bg-bg-dark py-6 lg:relative lg:z-auto"
      >
        {/* Inner container with green border */}
        <div className="sidebar-inner">

          <div className="flex flex-col items-center gap-[5px] mb-10 mt-2">
            <span className="sidebar-line w-[28px]" />
            <span className="sidebar-line w-[22px]" />
            <span className="sidebar-line w-[16px]" />
          </div>

          {/* Nav items */}
          <nav className="flex-1 flex flex-col items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-item relative ${isActive ? "active" : ""}`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <motion.span
                    whileHover={{ scale: 1.15, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="nav-icon-wrapper"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.span>
                  <span>{item.label}</span>

                  {/* Gliding active underline / pill indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-xl bg-neon/10 border border-neon/30 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Settings/Theme Toggle icon at bottom */}
          <div className="mt-auto mb-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="nav-item"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <motion.span
                whileHover={{ scale: 1.15, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                className="nav-icon-wrapper"
              >
                {theme === "dark" ? (
                  <Sun size={20} strokeWidth={1.5} />
                ) : (
                  <Moon size={20} strokeWidth={1.5} />
                )}
              </motion.span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

