export interface Project {
  id: string;
  title: string;
  image?: string;
  mockupGradient: string;
  techStack: string[];
  keyFeatures: string[];
  github: string;
  liveDemo: string;
}

export const projects: Project[] = [
  {
    id: "Zyvora",
    title: "Zyvora",
    image: "/zyvora.png",
    mockupGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    techStack: [
      "React.js",
      "Express.js",
      "Mongo DB",
      "AWS",
      "Redis",
    ],
    keyFeatures: [
      "Full-stack online retail platform with admin portal, order management, and AWS deployment.",
      "High-performance architecture powered by Redis caching, rate limiting, and optimized queries.",
      "Secure commerce with Razorpay payments, RBAC, order tracking, and automated invoices.",
    ],
    github: "https://github.com/PratyushPrasun/Zyvora",
    liveDemo: "http://13.251.249.145/",
  },
  {
    id: "DocuMind",
    title: "DocuMind",
    image: "/documind.png",
    mockupGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    techStack: [
      "React.js",
      "Express.js",
      "ChromaDB",
      "Voyage AI",
      "LangChain",
    ],
    keyFeatures: [
      "Document intelligence platform for asking questions about uploaded PDFs.",
      "RAG-based Q&A using Gemini, ChromaDB, Voyage AI, and LangChain for grounded responses.",
      "Source citations & secure authentication to provide reliable answers with traceable document reference.",
    ],
    github: "https://github.com/PratyushPrasun/DocuMind",
    liveDemo: "https://docu-mind-two-rouge.vercel.app/",
  },
  {
    id: "Vyuha ",
    title: "Vyuha ",
    image: "./vyuha.png",
    mockupGradient: "linear-gradient(135deg, #1a0533, #2d1b69, #4a1a8a)",
    techStack: [
      "Next.js",
      "Typescript",
      "Auth Js",
      "Firebase",
      "Gemini API",
    ],
    keyFeatures: [
      "AI-powered idea-to-execution platform built with Next.js.",
      "Interactive workflows for idea expansion and flowchart visualization.",
      "GitHub project initialization with a modern, responsive interface."

    ],
    github: "https://github.com/PratyushPrasun/Vyuha-web",
    liveDemo: "https://nitr-vyuha.vercel.app/",
  },
  {
    id: "Medicare",
    title: "MediCare",
    image: "/medicare.png",
    mockupGradient: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    techStack: [
      "React.js",
      "Express.js",
      "Mongo DB",
      "Clerk",
      "Cloudinary",
    ],
    keyFeatures: [
      "MERN hospital management platform with Admin, Doctor, and Patient portals.",
      "JWT & Clerk authentication with Stripe payment integration.",
      "RESTful APIs deployed on Render with a Vercel frontend.",
    ],
    github: "https://github.com/PratyushPrasun/Medicare",
    liveDemo: "https://medicare-eight-nu.vercel.app/",
  },
  {
    id: "Ai Resume",
    title: "AI ResumePro",
    image: "/airesume.png",
    mockupGradient: "linear-gradient(135deg, #0a1628, #1a2744, #0d3b66)",
    techStack: [
      "React.js",
      "Express.js",
      "Mongo DB",
    ],
    keyFeatures: [
      "AI-powered resume analyzer with ATS scoring and personalized feedback.",
      "Resume scoring engine using JD matching and keyword analysis.",
      "AI resume tailoring with automated role-specific resume generation.",
    ],
    github: "https://github.com/PratyushPrasun/Ai-ResumePro",
    liveDemo: "https://ai-resume-pro-inky.vercel.app/",
  },
  {
    id: "GOT",
    title: "Game of Thrones",
    image: "/got.png",
    mockupGradient: "linear-gradient(135deg, #0a1628, #1a2744, #0d3b66)",
    techStack: [
      "JavaScript",
      "HTML Canvas",
      "GSAP",
      "Lenis",
      "Scroll Trigger"
    ],
    keyFeatures: [
      "Animation-driven web experience powered by GSAP and modern motion design.",
      "Scroll-triggered interactions with immersive micro-animations.",
      "Performance-optimized UI delivering smooth, fluid user experiences."
    ],
    github: "https://github.com/PratyushPrasun/GameOfThrones",
    liveDemo: "https://game-of-thrones-eight.vercel.app/",
  },
];
