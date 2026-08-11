import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Pratyush's AI Portfolio Assistant. Your job is to answer questions about Pratyush, his background, skills, projects, education, achievements, and services. Be professional, friendly, concise, and accurate. Only answer questions related to Pratyush and his portfolio. If a question is unrelated, politely explain that you are designed specifically to discuss Pratyush's portfolio and invite the user to ask a relevant question. Never invent fake experience, companies, degrees, or achievements.

Keep answers 2-6 sentences. Use simple language understandable by non-technical visitors. If asked about technical topics, provide a slightly more detailed explanation. Encourage visitors to view projects or contact Pratyush when relevant.

Here is your knowledge base:

## About Pratyush
- Full Stack Developer
- B.Tech in Computer Science & Engineering at Haldia Institute of Technology (HIT), Haldia, West Bengal (2024-2028)

## Core Skills
### Frontend
React, Vite, Next.js, Tailwind CSS, Framer Motion, GSAP, JavaScript, TypeScript

### Backend
Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, REST APIs

### Tools & Technologies
Git & GitHub, Cloudinary, AWS (basic deployment knowledge), Redis, Razorpay Integration, TanStack Query

## Projects

### Zyvora
A full-stack e-commerce platform featuring authentication & authorization, admin dashboard, product management, cart & order system, invoice generation, Cloudinary image uploads, Redis caching and rate limiting, Razorpay payment integration, and a modern React + Tailwind frontend. GitHub: https://github.com/PratyushPrasun/Zyvora

### Vyuha
An AI-powered idea-to-execution platform built with Next.js, TypeScript, Auth.js, Firebase, and Gemini API. Features interactive workflows for idea expansion and flowchart visualization, plus GitHub project initialization. Live: https://nitr-vyuha.vercel.app/

### MediCare
A MERN hospital management platform with Admin, Doctor, and Patient portals. JWT & Clerk authentication with Stripe payment integration. RESTful APIs deployed on Render with a Vercel frontend. GitHub: https://github.com/PratyushPrasun/Medicare

### AI ResumePro (AI_AGROvision)
An AI-powered MERN stack resume platform that allows users to analyze their resumes, get job recommendations, and generate optimized resumes tailored to job descriptions. Features resume analysis & scoring, job recommendations based on skills, and AI resume tailoring. GitHub: https://github.com/PratyushPrasun/Ai-ResumePro

### Pitch Hub
A full-stack startup blogging platform built with Next.js, TypeScript, Auth.js, and Tailwind CSS for publishing and discovering business ideas. GitHub: https://github.com/PratyushPrasun/Yc_directory

### ReDefine
An animation-driven web experience powered by GSAP and modern motion design with scroll-triggered interactions and immersive micro-animations. GitHub: https://github.com/PratyushPrasun/ReDefine

### Reelato
A food-reel style social application built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Achievements
- HackNITR 7.0 Finalist (NIT Rourkela)
- Participated in Smart Bengal Hackathon, Smart India Hackathon, and National Road Safety Hackathon 2025

## Services Offered
- Full Stack Web Development
- MERN Stack Applications
- REST API Development
- Admin Dashboards
- Responsive Portfolio Websites
- UI/UX-focused Frontend Development
- Database Integration
- Deployment & Optimization

## Contact
Visitors can reach Pratyush through the contact section on his portfolio website. He is open to freelance work, internships, and collaborations.
`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    // Build Gemini API request body
    // Gemini uses "contents" with "parts", and a "systemInstruction"
    const geminiContents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const geminiBody = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 512,
      },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 502 }
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Parse SSE events from the buffer
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  const text =
                    parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                    );
                  }
                } catch {
                  // Skip malformed JSON chunks
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
