"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".story-line");

      gsap.fromTo(
        lines,
        { opacity: 0.08, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.5,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-40 md:py-64 lg:py-80"
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section marker */}
        <span className="story-line text-gray-600 font-inter text-xs tracking-[0.3em] uppercase flex items-center gap-4 mb-16 md:mb-24">
          01 <span className="w-12 h-[1px] bg-gray-700" /> The Philosophy
        </span>

        {/* Full-width opening statement — gets its own moment */}
        <p className="story-line font-space-grotesk text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tighter text-[#f3f3f3] mb-32 md:mb-48 lg:mb-64">
          It starts with a question.
        </p>

        {/* Indented narrative — pushed right for asymmetry */}
        <div className="ml-0 md:ml-[20%] lg:ml-[30%] max-w-3xl space-y-24 md:space-y-40">
          <div className="story-line">
            <span className="text-gray-600 font-inter text-[10px] tracking-[0.3em] uppercase block mb-6">The Approach</span>
            <p className="font-inter text-xl md:text-2xl lg:text-3xl font-light leading-[1.6] text-gray-400">
              My journey in software engineering is driven by this very pursuit. From structuring robust cloud architectures to training deep learning models, I build systems that don't just compute.
            </p>
          </div>
          
          <div className="story-line">
            <span className="text-gray-600 font-inter text-[10px] tracking-[0.3em] uppercase block mb-6">The Result</span>
            <p className="font-inter text-xl md:text-2xl lg:text-3xl font-light leading-[1.6] text-gray-400">
              They understand, predict, and solve.
            </p>
          </div>
        </div>

        {/* Closing statement — full-width, back to left edge */}
        <p className="story-line font-space-grotesk text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tighter text-[#f3f3f3] mt-32 md:mt-48 lg:mt-64">
          Engineering craftsmanship meets artificial intelligence.
        </p>

      </div>
    </section>
  );
}
