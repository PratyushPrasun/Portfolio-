import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benjamin Ryan | Software Developer",
  description:
    "Portfolio of Benjamin Ryan — Software Developer & Data Scientist with 8+ years of experience specializing in Java, React, and Python.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="h-full overflow-hidden font-sans">{children}</body>
    </html>
  );
}
