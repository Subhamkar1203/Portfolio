"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { useRouter } from "next/navigation";

const socialLinks = [
  {
    label: "LinkedIn",
    url: "#",
    description: "Professional network",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    url: "#",
    description: "Open source",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    url: "#",
    description: "Thoughts & updates",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    url: "mailto:hello@subhamkar.dev",
    description: "Direct contact",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update time
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        ".contact-char",
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.04,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        ".contact-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "expo.out",
          delay: 1.5,
        }
      );
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const title = "LET'S BUILD.";

  return (
    <main ref={containerRef} className="relative bg-[#000] min-h-screen flex flex-col">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-white/[0.01] blur-[200px]" />
      </div>

      {/* ═══ Main Content ═══ */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 py-20 md:py-32 min-h-[70vh]">
        {/* Thank you message */}
        <motion.p
          className="contact-reveal font-inter text-sm text-gray-600 tracking-[0.3em] uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Thank you for exploring
        </motion.p>

        {/* Massive title */}
        <h1
          className="font-space-grotesk text-[clamp(3rem,14vw,14rem)] leading-none font-black tracking-tighter text-white text-center mix-blend-difference select-none hover-target mb-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className={`contact-char inline-block origin-bottom ${
                char === " " ? "mr-[0.15em]" : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Social links — large interactive cards */}
        <div className="contact-reveal grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
          {socialLinks.map((link) => (
            <MagneticButton key={link.label}>
              <a
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border border-white/[0.04] hover:border-white/[0.12] transition-all duration-500 group hover-target text-center"
              >
                <div className="text-gray-500 group-hover:text-white transition-colors duration-300">
                  {link.icon}
                </div>
                <div>
                  <span className="block font-space-grotesk text-base font-bold text-white/80 group-hover:text-white transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="block font-inter text-[10px] text-gray-600 tracking-wider uppercase mt-1">
                    {link.description}
                  </span>
                </div>
              </a>
            </MagneticButton>
          ))}
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <section className="relative w-full border-t border-white/[0.04]">
        <div className="contact-reveal max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1.5">
            <span className="font-inter text-gray-600 uppercase tracking-widest text-[10px]">
              Based in
            </span>
            <span className="font-space-grotesk text-lg text-[#f3f3f3]">
              Remote / Global
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <span className="font-inter text-gray-600 uppercase tracking-widest text-[10px]">
              Local Time
            </span>
            <span className="font-space-grotesk text-lg text-[#f3f3f3] tabular-nums">
              {currentTime}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-center md:text-right">
            <span className="font-inter text-gray-600 uppercase tracking-widest text-[10px]">
              Status
            </span>
            <span className="font-space-grotesk text-lg text-[#10b981] flex items-center gap-2 justify-center md:justify-end">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#10b981]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available
            </span>
          </div>
        </div>

        {/* Back to world */}
        <div className="border-t border-white/[0.03] py-6">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            <button
              onClick={() => router.push("/world")}
              className="font-inter text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer hover-target"
            >
              ← Return to World
            </button>
            <span className="font-inter text-[10px] text-gray-700 tracking-wider">
              © {new Date().getFullYear()} Subham Kar
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
