"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";

/* ── Types ── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/* ── Quick Actions ── */
const QUICK_ACTIONS = [
  { label: "About Me", prompt: "Who is Pratyush?" },
  { label: "Skills", prompt: "What are Pratyush's technical skills?" },
  { label: "Projects", prompt: "Tell me about Pratyush's projects." },
  { label: "Education", prompt: "Where does Pratyush study?" },
  { label: "Hackathons", prompt: "What hackathons has Pratyush participated in?" },
  { label: "Services", prompt: "What services does Pratyush offer?" },
];

/* ── Welcome Message ── */
const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! 👋 I'm Pratyush's AI assistant. I can tell you all about his skills, projects, education, achievements, and services. What would you like to know?",
};

/* ── Animation Variants ── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

const windowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 40,
    transformOrigin: "bottom right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 350,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 40,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
} as const;

const messageVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
} as const;

const fabVariants = {
  idle: {
    scale: 1,
    boxShadow: "0 0 20px rgba(34,197,94,0.2), 0 8px 32px rgba(0,0,0,0.3)",
  },
  hover: {
    scale: 1.08,
    boxShadow: "0 0 30px rgba(34,197,94,0.4), 0 12px 40px rgba(0,0,0,0.4)",
  },
  tap: { scale: 0.95 },
} as const;

/* ── Typing Dots Component ── */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-start gap-2.5 px-4"
    >
      <div className="shrink-0 w-7 h-7 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center">
        <Bot size={14} className="text-neon" />
      </div>
      <div className="bg-bg-card border border-border-card rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
          <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main ChatBot Component ── */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  /* ── Close on click outside ── */
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  /* ── Auto-scroll to bottom ── */
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  /* ── Track scroll position for scroll-down button ── */
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollDown(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  /* ── Focus input when chat opens ── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ── Generate unique ID ── */
  const generateId = () =>
    `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  /* ── Send message ── */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
      };

      const assistantId = generateId();

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      // Build message history for API (exclude welcome, limit context)
      const apiMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // Add empty assistant message placeholder
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "" },
        ]);

        // Read the SSE stream
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: m.content + parsed.text }
                        : m
                    )
                  );
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content:
              "Sorry, I'm having trouble responding right now. Please try again in a moment!",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  /* ── Handle form submit ── */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /* ── Handle quick action ── */
  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  /* ── Check if only welcome message ── */
  const showQuickActions = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            variants={fabVariants}
            initial="idle"
            animate="idle"
            whileHover="hover"
            whileTap="tap"
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-neon flex items-center justify-center cursor-pointer group shadow-lg"
            aria-label="Open AI Chat Assistant"
            id="chatbot-fab"
          >
            <MessageCircle
              size={20}
              className="text-bg-dark group-hover:rotate-12 transition-transform"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={chatWindowRef}
              variants={windowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed z-[60] bottom-20 right-3 sm:bottom-6 sm:right-6 w-[calc(100%-1.5rem)] sm:w-[400px] h-[70vh] max-h-[540px] rounded-2xl overflow-hidden flex flex-col chatbot-window"
              id="chatbot-window"
            >
              {/* ── Header ── */}
              <div className="shrink-0 px-4 py-3 flex items-center justify-between chatbot-header">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-neon/15 border border-neon/25 flex items-center justify-center">
                    <Sparkles size={18} className="text-neon" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary leading-tight">
                      Pratyush&apos;s AI Assistant
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                      <span className="text-[11px] text-text-muted">
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X size={16} className="text-text-muted" />
                </motion.button>
              </div>

              {/* ── Messages Area ── */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-3 py-3 space-y-3 chatbot-messages"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-start gap-2.5 ${
                      msg.role === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        msg.role === "user"
                          ? "bg-neon/15 border border-neon/25"
                          : "bg-neon/10 border border-neon/20"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User size={13} className="text-neon" />
                      ) : (
                        <Bot size={14} className="text-neon" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "chatbot-user-bubble"
                          : "chatbot-bot-bubble"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isLoading && <TypingIndicator />}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* ── Scroll down button ── */}
              <AnimatePresence>
                {showScrollDown && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-[120px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-card/90 backdrop-blur border border-border-card shadow-lg flex items-center justify-center hover:border-neon/40 transition-colors cursor-pointer z-10"
                  >
                    <ChevronDown size={16} className="text-text-muted" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* ── Quick Actions ── */}
              <AnimatePresence>
                {showQuickActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="shrink-0 px-3 pb-2 flex flex-wrap gap-1.5"
                  >
                    {QUICK_ACTIONS.map((action) => (
                      <motion.button
                        key={action.label}
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleQuickAction(action.prompt)}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-border-card text-text-secondary hover:text-neon hover:border-neon/30 hover:bg-neon/5 transition-all cursor-pointer"
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Input Area ── */}
              <form onSubmit={handleSubmit} className="shrink-0 chatbot-input-area">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about Pratyush..."
                    disabled={isLoading}
                    className="flex-1 bg-white/5 border border-border-card rounded-xl px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 transition-all disabled:opacity-50"
                    id="chatbot-input"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-neon flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
                    aria-label="Send message"
                    id="chatbot-send"
                  >
                    <Send size={16} className="text-bg-dark" />
                  </motion.button>
                </div>

                <p className="text-center text-[10px] text-text-muted/40 pb-2 sm:pb-1.5">
                  Powered by AI · Knows everything about Pratyush
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
