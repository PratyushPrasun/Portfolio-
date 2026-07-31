"use client";

import {
  Smartphone,
  BarChart3,
  Palette,
  Globe,
  Camera,
  Megaphone,
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "End-to-end organization, UI/UX design, optimization, and maintenance of your mobile and web applications with cutting-edge technologies.",
    color: "#22c55e",
  },
  {
    icon: BarChart3,
    title: "Data Scientist",
    description:
      "Great marketing campaigns, improve customer service, better business decisions through data analysis, machine learning, and statistical modeling.",
    color: "#22c55e",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive, engaging user interfaces and experiences that drive conversion and delight users through research-driven design.",
    color: "#22c55e",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building responsive, performant websites and web applications using modern frameworks like React, Next.js, and Node.js.",
    color: "#22c55e",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Professional product and portrait photography for brands, portfolios, and marketing campaigns with post-production editing.",
    color: "#22c55e",
  },
  {
    icon: Megaphone,
    title: "Advertising",
    description:
      "Strategic digital advertising campaigns across platforms to maximize ROI, brand awareness, and customer acquisition.",
    color: "#22c55e",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 green-first-letter">
        My Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="card p-5 group">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 shrink-0 group-hover:bg-neon/20 transition-colors">
                  <Icon size={22} className="text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-text-primary text-[15px]">
                      {service.title}
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-neon opacity-60" />
                  </div>
                  <p className="text-text-muted text-[13px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
