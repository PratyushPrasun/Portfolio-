import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pratyush | Full Stack Developer",
  description:
    "Portfolio of Pratyush — Full Stack MERN Developer & Computer Science student specializing in React, Next.js, Node.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="h-full overflow-hidden font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
