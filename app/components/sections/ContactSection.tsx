"use client";

import { Send, MapPin, Mail as MailIcon, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 green-first-letter">
        Contact Me
      </h2>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {/* Contact Form */}
        <div className="md:col-span-2 card p-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name-desktop"
                  className="block text-[13px] font-medium text-text-secondary mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name-desktop"
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email-desktop"
                  className="block text-[13px] font-medium text-text-secondary mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email-desktop"
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject-desktop"
                className="block text-[13px] font-medium text-text-secondary mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject-desktop"
                className="form-input"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message-desktop"
                className="block text-[13px] font-medium text-text-secondary mb-2"
              >
                Message
              </label>
              <textarea
                id="message-desktop"
                rows={5}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button type="submit" className="btn-primary">
              <Send size={14} />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
                <MapPin size={18} className="text-neon" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary text-[13px]">
                  Location
                </h4>
                <p className="text-text-muted text-[12px]">
                  Los Angeles, CA, USA
                </p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
                <MailIcon size={18} className="text-neon" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary text-[13px]">
                  Email
                </h4>
                <p className="text-text-muted text-[12px]">
                  benjamin@devmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon/10 border border-neon/20">
                <Phone size={18} className="text-neon" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary text-[13px]">
                  Phone
                </h4>
                <p className="text-text-muted text-[12px]">
                  +1 (213) 555-0147
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked full-width layout */}
      <div className="md:hidden space-y-5">
        {/* Contact Form */}
        <div className="card p-5 mobile-card">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name-mobile"
                className="block text-[13px] font-medium text-text-secondary mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name-mobile"
                className="form-input mobile-input"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email-mobile"
                className="block text-[13px] font-medium text-text-secondary mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email-mobile"
                className="form-input mobile-input"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject-mobile"
                className="block text-[13px] font-medium text-text-secondary mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject-mobile"
                className="form-input mobile-input"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message-mobile"
                className="block text-[13px] font-medium text-text-secondary mb-2"
              >
                Message
              </label>
              <textarea
                id="message-mobile"
                rows={5}
                className="form-input mobile-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center py-4 text-[14px] rounded-xl"
            >
              <Send size={16} />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 gap-3">
          <div className="card p-4 mobile-card flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
              <MapPin size={18} className="text-neon" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-[13px]">
                Location
              </h4>
              <p className="text-text-muted text-[12px]">
                Los Angeles, CA, USA
              </p>
            </div>
          </div>

          <div className="card p-4 mobile-card flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
              <MailIcon size={18} className="text-neon" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-[13px]">
                Email
              </h4>
              <p className="text-text-muted text-[12px]">
                benjamin@devmail.com
              </p>
            </div>
          </div>

          <div className="card p-4 mobile-card flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-neon/10 border border-neon/20 shrink-0">
              <Phone size={18} className="text-neon" />
            </div>
            <div>
              <h4 className="font-semibold text-text-primary text-[13px]">
                Phone
              </h4>
              <p className="text-text-muted text-[12px]">
                +1 (213) 555-0147
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
