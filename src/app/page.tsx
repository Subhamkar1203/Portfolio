"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/MagneticButton";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), {
  ssr: false,
});

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name reveal — character by character
      gsap.fromTo(
        ".name-char",
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

      // Subtitle typing reveal
      gsap.fromTo(
        ".landing-subtitle",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          delay: 2.2,
        }
      );

      // CTA button appear
      gsap.fromTo(
        ".landing-cta",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "expo.out",
          delay: 3,
        }
      );

      // Bottom hint
      gsap.fromTo(
        ".landing-hint",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);

    // Cinematic exit animation
    const tl = gsap.timeline({
      onComplete: () => router.push("/world"),
    });

    tl.to(".landing-content", {
      scale: 0.95,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.8,
      ease: "expo.in",
    });
    tl.to(
      ".landing-overlay",
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.4"
    );
  };

  const name = "SUBHAM KAR";

  return (
    <main
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-transparent z-[1] pointer-events-none" />

      {/* Main content */}
      <div className="landing-content relative z-10 flex flex-col items-center text-center px-6">
        {/* Name */}
        <h1
          className="font-space-grotesk font-black text-[clamp(2.5rem,10vw,10rem)] tracking-tighter leading-[0.9] uppercase text-white mb-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          {name.split("").map((char, i) => (
            <span
              key={i}
              className={`name-char inline-block origin-bottom ${
                char === " " ? "mr-[0.3em]" : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="landing-subtitle font-inter text-sm md:text-base lg:text-lg text-gray-500 tracking-[0.15em] uppercase font-light">
          AI Engineer{" "}
          <span className="text-gray-700 mx-2">·</span> Full Stack Developer{" "}
          <span className="text-gray-700 mx-2">·</span> Builder
        </p>

        {/* Divider line */}
        <motion.div
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-12 mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        />

        {/* Enter CTA */}
        <div className="landing-cta">
          <MagneticButton>
            <button
              onClick={handleEnter}
              className="group relative px-10 py-4 md:px-14 md:py-5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm cursor-pointer overflow-hidden hover-target"
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              <span className="relative z-10 font-space-grotesk text-xs md:text-sm tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                Enter the World
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Cinematic exit overlay */}
      <div className="landing-overlay fixed inset-0 bg-[#050505] z-[200] opacity-0 pointer-events-none" />
    </main>
  );
}
