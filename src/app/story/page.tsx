"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    number: "I",
    label: "The Spark",
    year: "2020",
    title: "It began with a question.",
    body: "Entering the world of Computer Science Engineering wasn't just choosing a major — it was choosing a way of thinking. Algorithms, data structures, core paradigms. The foundation was laid not in code, but in curiosity.",
    accent: "#f59e0b",
  },
  {
    number: "II",
    label: "The Craft",
    year: "2021",
    title: "Code became the medium.",
    body: "Deep immersion into modern web frameworks. React, Next.js, Node.js, Spring Boot. Every line written was a step toward mastery. Full-stack development wasn't a skillset — it became an instinct.",
    accent: "#ef4444",
  },
  {
    number: "III",
    label: "The Horizon",
    year: "2022",
    title: "Systems grew beyond the screen.",
    body: "The scope expanded into cloud architectures — AWS, Azure — and the art of extracting meaning from data. SQL queries, Power BI dashboards, Tableau visualizations. Turning noise into signal.",
    accent: "#06b6d4",
  },
  {
    number: "IV",
    label: "The Mind",
    year: "2023",
    title: "Machines learned to think.",
    body: "The transition to Artificial Intelligence opened a new dimension. TimeGAN for synthetic data generation, LLMs for sentiment analysis, deep learning architectures for prediction. Building systems that don't just compute — they understand.",
    accent: "#8b5cf6",
  },
  {
    number: "V",
    label: "The Builder",
    year: "2024",
    title: "Engineering craftsmanship meets artificial intelligence.",
    body: "Continuously pushing boundaries. Building scalable, intelligent products that bridge complex engineering and AI. The journey never stops — it accelerates.",
    accent: "#10b981",
  },
];

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        ".story-header-line",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      // Chapter reveals
      const chapterEls = gsap.utils.toArray(".story-chapter");
      chapterEls.forEach((el: any) => {
        gsap.fromTo(
          el.querySelectorAll(".chapter-reveal"),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
            },
          }
        );
      });

      // Year parallax
      const yearEls = gsap.utils.toArray(".chapter-year");
      yearEls.forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // Philosophy reveal
      gsap.fromTo(
        ".philosophy-line",
        { opacity: 0.06, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.4,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".philosophy-section",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Opening ═══ */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#f59e0b]/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full">
          <span className="story-header-line block font-inter text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-8 flex items-center gap-4">
            Chapter I — V <span className="w-12 h-[1px] bg-gray-700" /> The
            Story
          </span>

          <h1 className="story-header-line font-space-grotesk text-display text-white mb-8">
            The journey of
            <br />
            <span className="text-gray-600">Subham Kar.</span>
          </h1>

          <p className="story-header-line font-inter text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
            Not a biography. A story of curiosity, engineering, and the relentless pursuit of building systems that think.
          </p>
        </div>
      </section>

      {/* ═══ Chapters ═══ */}
      {chapters.map((chapter, idx) => (
        <section
          key={chapter.number}
          className="story-chapter relative w-full py-32 md:py-48 lg:py-64 overflow-hidden"
        >
          {/* Accent glow for this chapter */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none opacity-[0.04]"
            style={{
              backgroundColor: chapter.accent,
              left: idx % 2 === 0 ? "-10%" : "auto",
              right: idx % 2 !== 0 ? "-10%" : "auto",
            }}
          />

          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative">
            {/* Year — massive ghost typography */}
            <div
              className={`chapter-year chapter-reveal ${
                idx % 2 === 0 ? "" : "text-right"
              }`}
            >
              <span className="font-space-grotesk text-[clamp(6rem,18vw,16rem)] font-black leading-none text-white/[0.03] select-none block">
                {chapter.year}
              </span>
            </div>

            {/* Content */}
            <div
              className={`mt-[-4rem] md:mt-[-8rem] relative ${
                idx % 2 === 0
                  ? "ml-0 md:ml-[10%] lg:ml-[15%]"
                  : "mr-0 md:mr-[10%] lg:mr-[15%] md:ml-auto"
              } max-w-3xl`}
            >
              {/* Chapter marker */}
              <div className="chapter-reveal flex items-center gap-4 mb-8">
                <span
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-space-grotesk font-bold"
                  style={{
                    borderColor: `${chapter.accent}40`,
                    color: chapter.accent,
                  }}
                >
                  {chapter.number}
                </span>
                <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600">
                  {chapter.label}
                </span>
                <span className="flex-1 h-[1px] bg-white/5" />
              </div>

              {/* Title */}
              <h2 className="chapter-reveal font-space-grotesk text-heading text-white mb-8 tracking-tighter">
                {chapter.title}
              </h2>

              {/* Body */}
              <p className="chapter-reveal font-inter text-lg md:text-xl text-gray-400 font-light leading-[1.8]">
                {chapter.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ Philosophy Section ═══ */}
      <section className="philosophy-section relative w-full py-40 md:py-64 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="philosophy-line block font-inter text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-16 flex items-center gap-4">
            The Philosophy <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <p className="philosophy-line font-space-grotesk text-heading text-white tracking-tighter mb-16">
            It starts with a question.
          </p>

          <div className="ml-0 md:ml-[20%] lg:ml-[30%] max-w-3xl space-y-12">
            <p className="philosophy-line font-inter text-xl md:text-2xl text-gray-400 font-light leading-[1.7]">
              My journey in software engineering is driven by this very pursuit. From structuring robust cloud architectures to training deep learning models, I build systems that don't just compute.
            </p>
            <p className="philosophy-line font-inter text-xl md:text-2xl text-gray-400 font-light leading-[1.7]">
              They understand, predict, and solve.
            </p>
          </div>

          <p className="philosophy-line font-space-grotesk text-heading text-white tracking-tighter mt-32">
            Engineering craftsmanship meets artificial intelligence.
          </p>
        </div>
      </section>

      {/* ═══ Navigation CTA ═══ */}
      <section className="relative w-full py-24 md:py-32 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-2">
              Continue exploring
            </span>
            <span className="font-space-grotesk text-2xl md:text-3xl font-bold text-white tracking-tight">
              Discover what was built.
            </span>
          </div>
          <MagneticButton>
            <button
              onClick={() => router.push("/projects")}
              className="px-8 py-4 rounded-full border border-white/10 font-space-grotesk text-xs tracking-[0.3em] uppercase text-white/70 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer hover-target"
            >
              Enter Projects →
            </button>
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
