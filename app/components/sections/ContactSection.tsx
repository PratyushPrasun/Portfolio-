"use client";

import { useState, useRef, useCallback } from "react";
import {
  Send,
  MapPin,
  Mail as MailIcon,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  Copy,
  Check,
} from "lucide-react";

/* ── Toast System ── */
interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${
            toast.type === "success" ? "toast-success" : "toast-error"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {toast.message}
        </div>
      ))}
    </div>
  );
}

/* ── Social Links ── */
const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:pratyush@email.com",
    icon: <MailIcon size={16} />,
  },
];

const MAX_MESSAGE_LENGTH = 500;

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [shakeError, setShakeError] = useState(false);

  const addToast = useCallback((type: "success" | "error", message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("pratyush@email.com");
    setCopied(true);
    addToast("success", "Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  }, [addToast]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
        addToast("error", "Please fill in all required fields.");
        return;
      }

      setIsSubmitting(true);
      setSubmitState("idle");

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSubmitting(false);
      setSubmitState("success");
      addToast("success", "Message sent successfully! I'll reply soon.");

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitState("idle");
      }, 2500);
    },
    [formData, addToast]
  );

  const scrollToTop = useCallback(() => {
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <section id="contact" className="contact-grid-bg relative pt-12">
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
          {/* Main Grid: Clean & Simple Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Side: Direct Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                  <span className="text-neon">L</span>et&apos;s Talk
                </h2>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-bg-surface border border-border-card">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                      <MailIcon size={16} className="text-neon" />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Email</p>
                      <p className="text-xs font-medium text-text-primary">pratyush@email.com</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-text-muted hover:text-neon hover:bg-bg-card transition-colors"
                    title="Copy Email"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-bg-surface border border-border-card">
                  <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-neon" />
                  </div>
                  <div>
                    <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Location</p>
                    <p className="text-xs font-medium text-text-primary">Haldia, West Bengal, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-bg-surface border border-border-card">
                  <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-neon animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Status</p>
                    <p className="text-xs font-medium text-neon">Available for Freelance & Full-time</p>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div>
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2.5">
                  Follow Me
                </p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-bg-surface border border-border-card flex items-center justify-center text-text-secondary hover:text-neon hover:border-neon/40 hover:bg-neon/10 transition-all"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Clean Form */}
            <div className="lg:col-span-7">
              <div className="card p-6 md:p-7 border border-border-card bg-bg-card rounded-2xl">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="floating-field">
                      <input
                        type="text"
                        name="name"
                        id="contact-name-simple"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />
                      <label htmlFor="contact-name-simple">Name *</label>
                    </div>

                    <div className="floating-field">
                      <input
                        type="email"
                        name="email"
                        id="contact-email-simple"
                        placeholder=" "
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                      <label htmlFor="contact-email-simple">Email *</label>
                    </div>
                  </div>

                  <div className="floating-field">
                    <input
                      type="text"
                      name="subject"
                      id="contact-subject-simple"
                      placeholder=" "
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    <label htmlFor="contact-subject-simple">Subject</label>
                  </div>

                  <div className="floating-field">
                    <textarea
                      name="message"
                      id="contact-message-simple"
                      rows={5}
                      placeholder=" "
                      value={formData.message}
                      onChange={handleChange}
                      className="resize-none"
                      required
                    />
                    <label htmlFor="contact-message-simple">Message *</label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`submit-btn ${shakeError ? "error-shake" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" />
                        Sending...
                      </>
                    ) : submitState === "success" ? (
                      <>
                        <CheckCircle2 size={16} />
                        Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
             ONE-LINE SIMPLE FOOTER
             ══════════════════════════════════════════════════════ */}
          <footer className="mt-16 pt-6 pb-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <p>© {new Date().getFullYear()} Pratyush. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-neon transition-colors">About</a>
              <a href="#projects" className="hover:text-neon transition-colors">Projects</a>
              <a href="#contact" className="hover:text-neon transition-colors">Contact</a>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 hover:text-neon transition-colors font-medium ml-2"
              >
                <ArrowUp size={13} />
                Top
              </button>
            </div>
          </footer>
        </div>
      </section>

      <ToastContainer toasts={toasts} />
    </>
  );
}
