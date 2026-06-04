"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    title: "Computer Science Engineering",
    description: "Began formal education in computer science, laying the foundation in algorithms, data structures, and core programming paradigms.",
  },
  {
    year: "2021",
    title: "Full Stack Development",
    description: "Dived deep into modern web frameworks. Mastered React, Next.js, and backend technologies like Node.js and Spring Boot.",
  },
  {
    year: "2022",
    title: "Cloud & Data Engineering",
    description: "Expanded into cloud architectures (AWS, Azure) and data analytics, utilizing SQL, Power BI, and Tableau to extract meaningful insights.",
  },
  {
    year: "2023",
    title: "Artificial Intelligence Focus",
    description: "Transitioned towards AI. Built predictive models using TimeGAN and integrated LLMs for complex sentiment analysis.",
  },
  {
    year: "2024",
    title: "Building the Future",
    description: "Continuously pushing boundaries in AI Engineering and Full Stack systems, focusing on scalable, intelligent products.",
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".journey-item");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 md:py-64 bg-[#050505] text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        <span className="journey-item text-gray-600 font-inter text-xs tracking-[0.3em] uppercase flex items-center gap-4 mb-16 md:mb-24">
          05 <span className="w-12 h-[1px] bg-gray-700" /> The Journey
        </span>

        {/* Editorial year-driven layout — no dots, no lines */}
        <div className="space-y-20 md:space-y-32">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className="journey-item flex flex-col md:flex-row items-start gap-6 md:gap-16 lg:gap-24 border-t border-white/5 pt-8 md:pt-12"
            >
              {/* Year as typographic anchor */}
              <span className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-black text-white/[0.06] leading-none flex-shrink-0 select-none w-full md:w-auto">
                {milestone.year}
              </span>
              
              {/* Content */}
              <div className="max-w-xl">
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold mb-3 text-[#f3f3f3] tracking-tight">
                  {milestone.title}
                </h3>
                <p className="font-inter text-base text-gray-400 font-light leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
