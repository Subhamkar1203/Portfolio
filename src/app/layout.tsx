import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import WorldNavigation from "@/components/navigation/WorldNavigation";
import ChapterIndicator from "@/components/navigation/ChapterIndicator";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subham Kar | AI Engineer & Full Stack Developer — Digital World",
  description:
    "Explore the digital world of Subham Kar. An immersive portfolio experience showcasing AI engineering, full-stack development, and intelligent systems.",
  keywords: [
    "Subham Kar",
    "AI Engineer",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#050505] text-[#f3f3f3]`}
    >
      <body>
        <Cursor />
        {/* Global Film Grain Overlay */}
        <div
          className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
        {/* World Navigation — accessible from all pages except landing */}
        <WorldNavigation />
        <ChapterIndicator />
        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
