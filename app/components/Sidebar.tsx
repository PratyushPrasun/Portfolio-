"use client";

import {
  User,
  FileText,
  Briefcase,
  BookOpen,
  Mail,
  Menu,
  X,
} from "lucide-react";

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
  { id: "articles", label: "Articles", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar({
  activeSection,
  onNavigate,
  mobileOpen,
  onMobileToggle,
}: SidebarProps) {
  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={onMobileToggle}
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-bg-card border border-border-card text-text-primary"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay md:hidden ${mobileOpen ? "open" : ""}`}
        onClick={onMobileToggle}
      />

      {/* Sidebar rail */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-[90px] flex flex-col items-center
          bg-bg-card/80 backdrop-blur-xl
          border-r border-border-subtle
          py-6 transition-transform duration-300 ease-in-out
          md:translate-x-0 md:relative md:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Menu icon at top */}
        <div className="mb-8">
          <button
            onClick={onMobileToggle}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-text-muted hover:text-text-primary hover:bg-white/5 transition-all"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (mobileOpen) onMobileToggle();
                }}
                className={`nav-item ${isActive ? "active" : ""}`}
                aria-label={`Navigate to ${item.label}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings icon at bottom */}
        <div className="mt-auto">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}
