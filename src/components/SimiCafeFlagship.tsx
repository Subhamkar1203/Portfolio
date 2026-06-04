"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function SimiCafeFlagship() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray(".simi-reveal");
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] text-white">
      
      {/* ——— ACT 1: Full-width typographic opening ——— */}
      <div className="pt-40 md:pt-64 lg:pt-80 pb-16 md:pb-24 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <span className="simi-reveal text-gray-600 font-inter text-xs tracking-[0.3em] uppercase flex items-center gap-4 mb-12 md:mb-16">
          02 <span className="w-12 h-[1px] bg-gray-700" /> Flagship Project
        </span>
        <h2 className="simi-reveal font-space-grotesk text-[clamp(4rem,12vw,14rem)] font-bold tracking-tighter leading-[0.85] uppercase text-[#f3f3f3]">
          Simi Cafe.
        </h2>
        <p className="simi-reveal font-inter text-lg md:text-xl text-gray-500 font-light mt-8 md:mt-12 max-w-xl">
          A modern full-stack restaurant platform designed to deliver a premium digital dining experience.
        </p>
      </div>

      {/* ——— ACT 2: Full-bleed image showcase ——— */}
      <div className="simi-reveal relative w-full px-4 md:px-8 lg:px-16 mb-32 md:mb-48">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden group">
          <Image 
            src="/images/simi-cafe-desktop.png" 
            alt="Simi Cafe Platform — Full Desktop View" 
            fill 
            priority
            sizes="100vw"
            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-[2s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          
          {/* Floating CTA on image */}
          <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-20">
            <MagneticButton>
              <a 
                href="https://simi-cafe.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-space-grotesk uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors duration-300"
              >
                Visit Live Site <ArrowUpRight size={16} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ——— ACT 3: Architectural deep dive — staggered alignment ——— */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pb-40 md:pb-64">

        {/* Chapter 1 — The Vision: Left-aligned, narrow */}
        <div className="simi-reveal max-w-2xl mb-32 md:mb-48 lg:mb-64">
          <span className="text-gray-600 font-inter text-[10px] tracking-[0.3em] uppercase block mb-6">01 — The Vision</span>
          <h3 className="font-space-grotesk text-3xl md:text-5xl font-bold mb-8 text-[#f3f3f3] tracking-tight leading-tight">
            Redefining the digital dining experience.
          </h3>
          <p className="font-inter text-base md:text-lg text-gray-400 font-light leading-relaxed">
            Simi Cafe was designed from the ground up to remove friction from the customer journey while maintaining a highly aesthetic, premium interface. The focus was on layout fluidity, large imagery, and zero-latency interactions.
          </p>
        </div>

        {/* Chapter 2 — Architecture: Right-aligned with stat accent */}
        <div className="simi-reveal flex flex-col items-end mb-32 md:mb-48 lg:mb-64">
          <div className="max-w-2xl text-right md:text-left">
            <span className="text-gray-600 font-inter text-[10px] tracking-[0.3em] uppercase block mb-6">02 — Architecture</span>
            
            {/* Tech stack — presented as architectural metadata */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 md:mb-10 justify-end md:justify-start">
              {["Next.js", "React", "Spring Boot", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="font-inter text-sm text-gray-500 tracking-wide">{tech}</span>
              ))}
            </div>

            <h4 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-6 text-[#f3f3f3] tracking-tight text-left">
              Scalable, decoupled microservices.
            </h4>
            <p className="font-inter text-base md:text-lg text-gray-400 font-light leading-relaxed text-left mb-10">
              Built on a strictly decoupled architecture. The React frontend consumes a robust, stateless RESTful API powered by Spring Boot. Data integrity and high-performance relational mapping are handled seamlessly via PostgreSQL.
            </p>
            <ul className="space-y-4 text-left">
              {[
                "API-driven microservices for isolated logic",
                "Secure JWT-based stateless authentication",
                "Optimized database indexing for instant menu queries"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-1 h-1 rounded-full bg-gray-500 mt-2.5 flex-shrink-0" />
                  <span className="font-inter text-gray-400 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chapter 3 — Deployment: Full-width closing */}
        <div className="simi-reveal">
          <span className="text-gray-600 font-inter text-[10px] tracking-[0.3em] uppercase block mb-6">03 — Deployment</span>
          <h4 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-[#f3f3f3] tracking-tighter leading-tight">
            Continuous delivery at the edge.
          </h4>
          <p className="font-inter text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            A fully automated CI/CD pipeline ensures that every commit is tested and deployed with zero downtime. The frontend is distributed across Vercel's global edge network for lowest possible TTFB.
          </p>
          <div className="flex flex-wrap gap-4">
            {["Vercel Edge", "PostgreSQL", "GitHub Actions", "TypeScript"].map((tag) => (
              <span key={tag} className="px-5 py-2.5 rounded-full border border-white/10 text-xs tracking-widest uppercase font-inter text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
