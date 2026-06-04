"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const impactAreas = [
  {
    number: "01",
    title: "Surplus Detection",
    description: "Identifies and catalogs surplus food sources from restaurants, supermarkets, and event venues in real-time using data-driven monitoring.",
  },
  {
    number: "02",
    title: "NGO Integration",
    description: "Direct connection workflows between food sources and verified NGOs. Automated matching based on location, capacity, and urgency.",
  },
  {
    number: "03",
    title: "Optimized Routing",
    description: "Intelligent routing algorithms minimize transit time and maximize freshness, ensuring food reaches recipients at peak quality.",
  },
  {
    number: "04",
    title: "Impact Analytics",
    description: "Comprehensive data visualization dashboards track waste reduction metrics, distribution patterns, and community impact over time.",
  },
];

export default function FoodWastagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".food-hero-el", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      const reveals = gsap.utils.toArray(".food-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Hero ═══ */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#f59e0b]/[0.03] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#10b981]/[0.02] blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full relative">
          <span className="food-hero-el block font-inter text-[10px] tracking-[0.4em] uppercase text-[#f59e0b]/60 mb-6 flex items-center gap-4">
            Impact Project <span className="w-12 h-[1px] bg-[#f59e0b]/20" />
          </span>

          <h1 className="food-hero-el font-space-grotesk text-massive text-white mb-6">
            FOOD
            <br />
            <span className="text-[#f59e0b]/30">WASTAGE.</span>
          </h1>

          <p className="food-hero-el font-inter text-lg md:text-xl text-gray-500 font-light max-w-xl leading-relaxed">
            A localized platform connecting surplus food sources with NGOs, utilizing optimized routing and data analytics to minimize waste and maximize impact.
          </p>

          <div className="food-hero-el flex flex-wrap gap-3 mt-8">
            {["Next.js", "Node.js", "SQL", "Data Visualization"].map((t) => (
              <span key={t} className="px-4 py-1.5 rounded-full border border-[#f59e0b]/15 text-xs tracking-wider font-inter text-[#f59e0b]/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ The Problem ═══ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="food-reveal max-w-3xl">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-6">
              The Problem
            </span>
            <h2 className="font-space-grotesk text-heading text-white tracking-tighter mb-8">
              Food waste is a <span className="text-[#f59e0b]">solvable</span> problem.
            </h2>
            <p className="font-inter text-lg md:text-xl text-gray-400 font-light leading-[1.8]">
              Billions of tonnes of food are wasted annually while millions go hungry. The disconnect isn&apos;t supply — it&apos;s logistics. The challenge is connecting surplus with need in real-time, at scale, with minimal waste in transit.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Solution — Impact Areas ═══ */}
      <section className="relative w-full py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="food-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-8 flex items-center gap-4">
            The Solution <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <h2 className="food-reveal font-space-grotesk text-4xl md:text-6xl font-bold text-white tracking-tighter mb-16 md:mb-24">
            Technology as a bridge.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {impactAreas.map((area) => (
              <div
                key={area.number}
                className="food-reveal p-8 md:p-10 rounded-2xl border border-white/[0.04] hover:border-[#f59e0b]/10 transition-all duration-500 group"
              >
                <span className="font-space-grotesk text-3xl font-black text-[#f59e0b]/10 group-hover:text-[#f59e0b]/20 transition-colors duration-500 block mb-4">
                  {area.number}
                </span>
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                  {area.title}
                </h3>
                <p className="font-inter text-base text-gray-400 font-light leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Architecture ═══ */}
      <section className="relative w-full py-32 md:py-48 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="food-reveal">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-6">
              Architecture
            </span>
            <h2 className="font-space-grotesk text-heading text-white tracking-tighter mb-8">
              Full-stack, scalable, <span className="text-[#f59e0b]">impactful</span>.
            </h2>
            <p className="font-inter text-lg text-gray-400 font-light leading-[1.8] max-w-3xl mb-12">
              Built with Next.js for the frontend, Node.js powering the API layer, and SQL databases optimized for geospatial queries and real-time data processing. Every architectural decision was driven by the mission: minimize waste, maximize reach.
            </p>

            {/* Tech highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Full-Stack", detail: "Next.js + Node.js" },
                { label: "Database", detail: "SQL Optimized" },
                { label: "Analytics", detail: "Data Visualization" },
                { label: "Integration", detail: "NGO Workflows" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl border border-white/[0.04] text-center"
                >
                  <span className="block font-space-grotesk text-sm font-bold text-white mb-1">
                    {item.label}
                  </span>
                  <span className="block font-inter text-[10px] text-gray-600 tracking-wider uppercase">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Closing Statement ═══ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="food-reveal text-center max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-heading text-white tracking-tighter mb-8">
              Software can solve real problems.
            </h2>
            <p className="font-inter text-xl text-gray-400 font-light leading-[1.7]">
              This project represents the belief that technology should serve humanity&apos;s most pressing challenges. Connecting surplus with need isn&apos;t just an optimization problem — it&apos;s a moral imperative.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Navigation ═══ */}
      <section className="relative w-full py-16 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => router.push("/projects/cyber-ai-dual-edge")} className="font-inter text-sm text-gray-500 hover:text-white transition-colors cursor-pointer hover-target">
            ← Cyber AI Dual Edge
          </button>
          <button onClick={() => router.push("/projects")} className="font-inter text-sm text-gray-500 hover:text-white transition-colors cursor-pointer hover-target">
            All Projects →
          </button>
        </div>
      </section>
    </main>
  );
}
