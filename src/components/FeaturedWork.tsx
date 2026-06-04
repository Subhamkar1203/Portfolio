"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Stock Market Prediction",
    tech: "TimeGAN · LLM Sentiment Analysis · Python",
    stat: "93%",
    statLabel: "Prediction Accuracy",
    highlights: ["10,000+ financial records processed", "LLM sentiment analysis integration", "93% prediction accuracy achieved"],
    description: "An advanced predictive model combining quantitative time-series data with qualitative market sentiment to forecast stock movements.",
  },
  {
    title: "Cyber AI Dual Edge",
    tech: "Deep Learning · PyTorch · Network Analysis",
    stat: "50K+",
    statLabel: "Network Samples",
    highlights: ["50,000+ network samples analyzed", "AI-powered intrusion detection", "Deep learning defense architecture"],
    description: "A dual-edge attack and defense mechanism leveraging neural networks to identify and neutralize cyber threats in real-time.",
  },
  {
    title: "Food Wastage Management",
    tech: "Next.js · Node.js · SQL · Data Visualization",
    stat: null,
    statLabel: null,
    highlights: ["Full-stack scalable application", "Direct NGO integration workflows", "SQL optimization & Data visualization"],
    description: "A localized platform connecting surplus food sources with NGOs, utilizing optimized routing and data analytics to minimize waste.",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray(".work-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] py-40 md:py-64">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section header */}
        <span className="work-reveal text-gray-600 font-inter text-xs tracking-[0.3em] uppercase flex items-center gap-4 mb-12 md:mb-16">
          03 <span className="w-12 h-[1px] bg-gray-700" /> Selected Work
        </span>
        <h2 className="work-reveal font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#f3f3f3] mb-32 md:mb-48">
          Other Projects.
        </h2>

        {/* Project 1 — Stat-dominant layout */}
        <div className="work-reveal flex flex-col md:flex-row items-start gap-12 md:gap-24 mb-32 md:mb-48 lg:mb-64 border-t border-white/5 pt-12 md:pt-16">
          <div className="flex-shrink-0">
            <span className="font-space-grotesk text-[clamp(5rem,10vw,10rem)] font-black leading-none text-white/[0.06] select-none">
              {projects[0].stat}
            </span>
            <span className="block font-inter text-xs tracking-[0.2em] uppercase text-gray-600 mt-2">{projects[0].statLabel}</span>
          </div>
          <div className="max-w-2xl">
            <span className="font-inter text-xs text-gray-500 tracking-widest uppercase block mb-4">{projects[0].tech}</span>
            <h3 className="font-space-grotesk text-3xl md:text-5xl font-bold mb-6 text-[#f3f3f3] tracking-tight leading-tight">
              {projects[0].title}
            </h3>
            <p className="font-inter text-base md:text-lg text-gray-400 font-light leading-relaxed mb-8">
              {projects[0].description}
            </p>
            <ul className="space-y-3">
              {projects[0].highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-gray-500 mt-2.5 flex-shrink-0" />
                  <span className="font-inter text-gray-400 text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project 2 — Full-width title treatment */}
        <div className="work-reveal mb-32 md:mb-48 lg:mb-64 border-t border-white/5 pt-12 md:pt-16">
          <span className="font-inter text-xs text-gray-500 tracking-widest uppercase block mb-6">{projects[1].tech}</span>
          <h3 className="font-space-grotesk text-4xl md:text-6xl lg:text-8xl font-bold mb-8 md:mb-12 text-[#f3f3f3] tracking-tighter leading-[0.95]">
            {projects[1].title}.
          </h3>
          <div className="ml-0 md:ml-[25%] lg:ml-[35%] max-w-2xl">
            <p className="font-inter text-base md:text-lg text-gray-400 font-light leading-relaxed mb-8">
              {projects[1].description}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {projects[1].highlights.map((h, i) => (
                <span key={i} className="font-inter text-sm text-gray-500">{h}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Project 3 — Compact secondary mention */}
        <div className="work-reveal border-t border-white/5 pt-12 md:pt-16 flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <span className="font-inter text-xs text-gray-500 tracking-widest uppercase block mb-4">{projects[2].tech}</span>
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-[#f3f3f3] tracking-tight">
              {projects[2].title}
            </h3>
          </div>
          <p className="font-inter text-base text-gray-400 font-light leading-relaxed max-w-lg">
            {projects[2].description}
          </p>
        </div>

      </div>
    </section>
  );
}
