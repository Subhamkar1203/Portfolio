"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./canvas/HeroScene"), { 
  ssr: false 
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".char",
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 1.5,
          ease: "expo.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 1.8 }
      );

      gsap.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = ["BUILDING", "INTELLIGENT", "EXPERIENCES."];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[700px] flex flex-col justify-end overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <HeroScene />
      
      {/* Gradient mask for deep contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-0 pointer-events-none" />

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pb-16 md:pb-24 lg:pb-32"
      >
        <h1
          className="font-space-grotesk font-bold text-[clamp(3rem,11vw,12rem)] tracking-tighter leading-[0.9] uppercase text-white text-left w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-block mr-[0.3em]">
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="char inline-block origin-bottom"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle font-inter text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed mt-12 md:mt-16 max-w-2xl">
          I build high-performance software systems that bridge complex engineering, artificial intelligence, and premium design.
        </p>
      </motion.div>

      {/* Scroll indicator — simple, elegant */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  );
}
