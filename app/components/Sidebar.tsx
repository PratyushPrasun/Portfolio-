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
        className="hidden md:flex fixed top-0 left-0 h-full z-50 w-[90px] flex-col items-center bg-bg-dark py-6 md:relative md:z-auto"
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
                  className={`nav-item ${isActive ? "active" : ""}`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <span className="nav-icon-wrapper">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span>{item.label}</span>
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
              <span className="nav-icon-wrapper">
                {theme === "dark" ? (
                  <Sun size={20} strokeWidth={1.5} />
                ) : (
                  <Moon size={20} strokeWidth={1.5} />
                )}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
