"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const visionPillars = [
  {
    number: "01",
    title: "AI Engineering at Scale",
    description:
      "Building production-grade AI systems that move beyond research and into real-world impact. Scalable inference, efficient training pipelines, and responsible deployment.",
    color: "#8b5cf6",
    icon: "◉",
  },
  {
    number: "02",
    title: "Products That Matter",
    description:
      "Crafting software products that solve genuine human problems. Not features for the sake of features — solutions that create measurable value in people's lives.",
    color: "#ef4444",
    icon: "△",
  },
  {
    number: "03",
    title: "Open Source & Community",
    description:
      "Contributing back to the ecosystem that made this journey possible. Sharing knowledge, building tools, and collaborating with the global developer community.",
    color: "#10b981",
    icon: "◇",
  },
];

const upcomingGoals = [
  "Deep dive into agentic AI and autonomous systems",
  "Building developer tools for AI-first workflows",
  "Contributing to open-source AI/ML libraries",
  "Exploring edge computing and on-device AI",
  "Systems design for billion-scale applications",
];

export default function FuturePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".future-hero-el", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      const reveals = gsap.utils.toArray(".future-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Vision gradient animation
      gsap.fromTo(
        ".vision-gradient-text",
        { backgroundPosition: "200% center" },
        {
          backgroundPosition: "-200% center",
          ease: "none",
          scrollTrigger: {
            trigger: ".vision-gradient-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Hero ═══ */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#10b981]/[0.03] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full relative">
          <span className="future-hero-el block font-inter text-[10px] tracking-[0.4em] uppercase text-[#10b981]/60 mb-6 flex items-center gap-4">
            IV <span className="w-12 h-[1px] bg-[#10b981]/20" /> Horizon
          </span>

          <h1 className="future-hero-el font-space-grotesk text-massive text-white mb-6">
            WHAT&apos;S
            <br />
            <span className="text-gray-600">NEXT.</span>
          </h1>

          <p className="future-hero-el font-inter text-lg md:text-xl text-gray-500 font-light max-w-xl leading-relaxed">
            The journey doesn&apos;t have a destination. It accelerates.
          </p>
        </div>
      </section>

      {/* ═══ Vision Pillars ═══ */}
      <section className="relative w-full py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="future-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-16 flex items-center gap-4">
            Vision <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {visionPillars.map((pillar) => (
              <motion.div
                key={pillar.number}
                className="future-reveal p-8 md:p-10 rounded-2xl border border-white/[0.04] hover:border-opacity-20 transition-all duration-700 group"
                style={{
                  ["--pillar-color" as string]: pillar.color,
                }}
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center mb-8 transition-all duration-500"
                  style={{
                    borderColor: `${pillar.color}25`,
                    background: `radial-gradient(circle, ${pillar.color}08 0%, transparent 70%)`,
                  }}
                >
                  <span
                    className="text-lg transition-transform duration-500 group-hover:scale-125"
                    style={{ color: pillar.color }}
                  >
                    {pillar.icon}
                  </span>
                </div>

                <span
                  className="font-space-grotesk text-sm font-bold tracking-wider opacity-40 block mb-4"
                  style={{ color: pillar.color }}
                >
                  {pillar.number}
                </span>

                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                  {pillar.title}
                </h3>

                <p className="font-inter text-base text-gray-400 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Upcoming Goals ═══ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="future-reveal max-w-3xl ml-0 md:ml-[15%]">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-8">
              On the Horizon
            </span>

            <div className="space-y-6">
              {upcomingGoals.map((goal, i) => (
                <div
                  key={i}
                  className="future-reveal flex items-start gap-5 group"
                >
                  <span className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-[#10b981]/30 transition-colors duration-300">
                    <span className="font-inter text-[10px] text-gray-600 group-hover:text-[#10b981]/60 transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <p className="font-inter text-lg md:text-xl text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Vision Statement ═══ */}
      <section className="vision-gradient-section relative w-full py-40 md:py-64 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <h2
            className="vision-gradient-text font-space-grotesk text-heading font-black tracking-tighter max-w-5xl text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #222 0%, #fff 40%, #fff 60%, #222 100%)",
              backgroundSize: "200% auto",
            }}
          >
            Building intelligent, scalable systems that define the future.
          </h2>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative w-full py-24 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-2">
              Final destination
            </span>
            <span className="font-space-grotesk text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ready to connect?
            </span>
          </div>
          <MagneticButton>
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 rounded-full border border-white/10 font-space-grotesk text-xs tracking-[0.3em] uppercase text-white/70 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer hover-target"
            >
              Let&apos;s Build →
            </button>
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
