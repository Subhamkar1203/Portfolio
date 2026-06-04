"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { WORLD_ROUTES, PROJECT_ROUTES } from "@/lib/navigation";

const destinations = WORLD_ROUTES.filter(
  (r) => r.path !== "/" && r.path !== "/world"
);

export default function WorldPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".world-title-char",
        { y: 80, opacity: 0, rotateX: -60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".world-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 1.5 }
      );

      gsap.fromTo(
        ".world-node",
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "expo.out",
          delay: 2,
        }
      );

      gsap.fromTo(
        ".world-connection-line",
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          stagger: 0.1,
          duration: 2,
          ease: "power2.out",
          delay: 2.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navigateTo = (path: string) => {
    // Cinematic exit
    gsap.to(".world-content", {
      opacity: 0,
      scale: 0.97,
      filter: "blur(10px)",
      duration: 0.6,
      ease: "expo.in",
      onComplete: () => router.push(path),
    });
  };

  const title = "EXPLORE";

  return (
    <main
      ref={containerRef}
      className="relative min-h-[100dvh] bg-[#050505] overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8b5cf6]/[0.03] blur-[120px]" />
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#06b6d4]/[0.02] blur-[80px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#ef4444]/[0.02] blur-[80px]" />

        {/* Floating particles — CSS only */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-white/10 anim-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="world-content relative z-10 flex flex-col items-center min-h-[100dvh]">
        {/* Header */}
        <div className="pt-24 md:pt-32 lg:pt-40 text-center px-6">
          <h1
            className="font-space-grotesk font-black text-[clamp(3rem,12vw,12rem)] tracking-tighter leading-[0.85] uppercase text-white/[0.06] select-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {title.split("").map((char, i) => (
              <span key={i} className="world-title-char inline-block origin-bottom">
                {char}
              </span>
            ))}
          </h1>
          <p className="world-subtitle font-inter text-sm md:text-base text-gray-500 tracking-[0.2em] uppercase mt-6">
            Choose your destination
          </p>
        </div>

        {/* Constellation grid — Desktop */}
        <div className="hidden md:flex flex-1 w-full max-w-7xl mx-auto items-center justify-center px-12 py-16 relative">
          {/* SVG Connections */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {/* Connection lines between nodes */}
            <line
              className="world-connection-line"
              x1="20%" y1="35%" x2="50%" y2="25%"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              className="world-connection-line"
              x1="50%" y1="25%" x2="80%" y2="35%"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              className="world-connection-line"
              x1="20%" y1="35%" x2="35%" y2="75%"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              className="world-connection-line"
              x1="50%" y1="25%" x2="50%" y2="50%"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              className="world-connection-line"
              x1="80%" y1="35%" x2="65%" y2="75%"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Destination nodes positioned in constellation */}
          {destinations.map((dest, i) => {
            const positions = [
              { left: "20%", top: "30%" },    // Story
              { left: "50%", top: "18%" },    // Projects
              { left: "80%", top: "30%" },    // Skills
              { left: "35%", top: "72%" },    // Future
              { left: "65%", top: "72%" },    // Contact
            ];
            const pos = positions[i] || { left: "50%", top: "50%" };

            return (
              <motion.button
                key={dest.path}
                className="world-node absolute group cursor-pointer hover-target"
                style={{
                  left: pos.left,
                  top: pos.top,
                  x: "-50%",
                  y: "-50%",
                }}
                onClick={() => navigateTo(dest.path)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex flex-col items-center gap-4">
                  {/* Glowing orb */}
                  <div className="relative">
                    <div
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border flex items-center justify-center transition-all duration-700 group-hover:border-opacity-60"
                      style={{
                        borderColor: `${dest.color}20`,
                        background: `radial-gradient(circle, ${dest.color}08 0%, transparent 70%)`,
                      }}
                    >
                      <span
                        className="text-2xl lg:text-3xl transition-all duration-500 group-hover:scale-125"
                        style={{
                          filter: `drop-shadow(0 0 8px ${dest.color}40)`,
                        }}
                      >
                        {dest.icon}
                      </span>
                    </div>
                    {/* Hover glow ring */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        boxShadow: `0 0 40px ${dest.color}20, 0 0 80px ${dest.color}10`,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <span
                      className="block font-space-grotesk text-base lg:text-lg font-bold tracking-tight transition-colors duration-300"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {dest.title}
                    </span>
                    <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {dest.subtitle}
                    </span>
                  </div>

                  {/* Chapter marker */}
                  <span
                    className="font-inter text-[10px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ color: dest.color }}
                  >
                    {dest.chapter}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile layout — vertical scrollable */}
        <div className="md:hidden flex flex-col gap-4 px-6 py-12 w-full max-w-md mx-auto">
          {destinations.map((dest, i) => (
            <motion.button
              key={dest.path}
              className="world-node w-full glass rounded-2xl p-6 flex items-center gap-5 text-left cursor-pointer hover-target group"
              onClick={() => navigateTo(dest.path)}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-14 h-14 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: `${dest.color}25`,
                  background: `radial-gradient(circle, ${dest.color}10 0%, transparent 70%)`,
                }}
              >
                <span className="text-xl">{dest.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-space-grotesk text-lg font-bold text-white/80 tracking-tight">
                  {dest.title}
                </span>
                <span className="block font-inter text-xs text-gray-500 mt-0.5">
                  {dest.description}
                </span>
              </div>
              <div className="flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 5l5 5-5 5"
                    stroke={dest.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom projects teaser */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 mt-auto">
          <div className="border-t border-white/5 pt-8">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-4">
              Featured Destinations
            </span>
            <div className="flex flex-wrap gap-3">
              {PROJECT_ROUTES.map((project) => (
                <button
                  key={project.path}
                  onClick={() => navigateTo(project.path)}
                  className="px-4 py-2 rounded-full border border-white/5 font-inter text-xs text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer hover-target"
                >
                  {project.flagship && (
                    <span className="mr-1.5 text-[8px]">★</span>
                  )}
                  {project.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
