"use client";

import { Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Building Scalable Microservices with Go and Kubernetes",
    excerpt:
      "A deep dive into designing fault-tolerant microservice architectures that handle millions of requests per day with minimal operational overhead.",
    category: "Engineering",
    date: "Mar 15, 2024",
    readTime: "8 min read",
  },
  {
    title: "The Future of AI in Software Development",
    excerpt:
      "How machine learning is transforming the way we write, test, and deploy code — from AI-assisted pair programming to automated code reviews.",
    category: "AI / ML",
    date: "Feb 28, 2024",
    readTime: "12 min read",
  },
  {
    title: "React Server Components: A Practical Guide",
    excerpt:
      "Everything you need to know about React Server Components, from mental models to production patterns and performance optimization techniques.",
    category: "Frontend",
    date: "Jan 10, 2024",
    readTime: "10 min read",
  },
  {
    title: "Data Pipeline Design Patterns for Real-Time Analytics",
    excerpt:
      "Exploring streaming architectures using Apache Kafka, Flink, and modern data lakehouse patterns for sub-second analytics at scale.",
    category: "Data Engineering",
    date: "Dec 5, 2023",
    readTime: "15 min read",
  },
];

export default function ArticlesSection() {
  return (
    <section id="articles" className="section-animate">
      <h2 className="text-2xl font-bold mb-6 green-first-letter">Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <a
            key={article.title}
            href="#"
            className="card p-5 group block"
          >
            {/* Category & Date */}
            <div className="flex items-center justify-between mb-3">
              <span className="info-tag text-[11px]">{article.category}</span>
              <div className="flex items-center gap-1.5 text-text-muted text-[11px]">
                <Clock size={12} />
                {article.readTime}
              </div>
            </div>

            <h3 className="font-semibold text-text-primary text-[15px] mb-2 leading-snug group-hover:text-neon transition-colors">
              {article.title}
            </h3>

            <p className="text-text-muted text-[13px] leading-relaxed mb-4">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
              <span className="text-text-muted text-[12px]">
                {article.date}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-neon opacity-0 group-hover:opacity-100 transition-opacity">
                Read More
                <ArrowRight size={12} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
