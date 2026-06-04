"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalExpertise() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray(".expertise-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full py-40 md:py-64 bg-[#050505] text-[#f3f3f3]" ref={containerRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        <span className="expertise-reveal text-gray-600 font-inter text-xs tracking-[0.3em] uppercase flex items-center gap-4 mb-16 md:mb-24">
          04 <span className="w-12 h-[1px] bg-gray-700" /> Expertise
        </span>

        {/* Editorial typography composition — skills are part of the narrative */}
        <div className="expertise-reveal font-space-grotesk text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.3] tracking-tight">
          <span className="text-gray-600">I work across </span>
          <span className="text-white">Java</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">Spring Boot</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">Next.js</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">React</span>
          <span className="text-gray-600">, and </span>
          <span className="text-white">TypeScript</span>
          <span className="text-gray-600"> to build software that solves real problems.</span>
        </div>

        <div className="expertise-reveal mt-24 md:mt-40 ml-0 md:ml-[20%] lg:ml-[30%] max-w-3xl font-space-grotesk text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] tracking-tight">
          <span className="text-gray-600">My focus spans </span>
          <span className="text-white">Artificial Intelligence</span>
          <span className="text-gray-600"> — </span>
          <span className="text-white">TimeGAN</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">LLMs</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">Deep Learning</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">PyTorch</span>
          <span className="text-gray-600"> — and </span>
          <span className="text-white">Cloud Platforms</span>
          <span className="text-gray-600"> like </span>
          <span className="text-white">AWS</span>
          <span className="text-gray-600"> and </span>
          <span className="text-white">Azure</span>
          <span className="text-gray-600">.</span>
        </div>

        <div className="expertise-reveal mt-24 md:mt-40 font-space-grotesk text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] tracking-tight max-w-4xl">
          <span className="text-gray-600">I extract insight through </span>
          <span className="text-white">SQL</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">Power BI</span>
          <span className="text-gray-600">, </span>
          <span className="text-white">Tableau</span>
          <span className="text-gray-600">, and </span>
          <span className="text-white">time-series analysis</span>
          <span className="text-gray-600">.</span>
        </div>
      </div>
    </section>
  );
}
