"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const pipelineSteps = [
  { number: "01", title: "Data Collection", description: "10,000+ financial records aggregated from multiple market sources, preprocessed and normalized for temporal analysis." },
  { number: "02", title: "Synthetic Augmentation", description: "TimeGAN generates realistic synthetic market data, expanding the training dataset while preserving temporal correlations." },
  { number: "03", title: "Sentiment Integration", description: "LLM-powered sentiment analysis extracts market mood from news articles, social media, and financial reports." },
  { number: "04", title: "Prediction Engine", description: "Deep learning model combines quantitative time-series with qualitative sentiment data for multi-factor stock prediction." },
];

export default function StockMarketAIPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stock-hero-el",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: "expo.out", delay: 0.3 }
      );

      const reveals = gsap.utils.toArray(".stock-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Stat counter animation
      const statEl = document.querySelector(".stat-counter");
      if (statEl) {
        gsap.fromTo(statEl, { textContent: "0" }, {
          textContent: "93",
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: statEl, start: "top 80%" },
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Hero ═══ */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Data grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/[0.04] blur-[150px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full relative">
          <span className="stock-hero-el block font-inter text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/60 mb-6 flex items-center gap-4">
            AI Project <span className="w-12 h-[1px] bg-[#3b82f6]/20" />
          </span>

          <h1 className="stock-hero-el font-space-grotesk text-massive text-white mb-6">
            STOCK
            <br />
            <span className="text-[#3b82f6]/30">MARKET AI.</span>
          </h1>

          <p className="stock-hero-el font-inter text-lg md:text-xl text-gray-500 font-light max-w-xl leading-relaxed">
            An advanced predictive model combining quantitative time-series data with qualitative market sentiment to forecast stock movements.
          </p>

          <div className="stock-hero-el flex flex-wrap gap-3 mt-8">
            {["TimeGAN", "LLM Sentiment", "PyTorch", "Python"].map((t) => (
              <span key={t} className="px-4 py-1.5 rounded-full border border-[#3b82f6]/15 text-xs tracking-wider font-inter text-[#3b82f6]/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Key Stats ═══ */}
      <section className="relative w-full py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="stock-reveal">
              <div className="flex items-end gap-2 mb-4">
                <span className="stat-counter font-space-grotesk text-[clamp(5rem,12vw,10rem)] font-black leading-none text-white tracking-tighter">
                  93
                </span>
                <span className="font-space-grotesk text-4xl md:text-6xl font-black text-[#3b82f6] mb-2">%</span>
              </div>
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gray-600 block">Prediction Accuracy</span>
            </div>
            <div className="stock-reveal flex flex-col justify-end">
              <span className="font-space-grotesk text-6xl md:text-8xl font-black text-white/[0.06] leading-none mb-4">10K+</span>
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gray-600 block">Financial Records Processed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Pipeline ═══ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="stock-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-8 flex items-center gap-4">
            The Pipeline <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <h2 className="stock-reveal font-space-grotesk text-heading text-white tracking-tighter mb-16 md:mb-24">
            From raw data to prediction.
          </h2>

          <div className="space-y-6 md:space-y-8">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.number}
                className="stock-reveal flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-10 rounded-2xl border border-white/[0.04] hover:border-[#3b82f6]/10 transition-all duration-500 group"
              >
                <span className="font-space-grotesk text-4xl font-black text-[#3b82f6]/10 group-hover:text-[#3b82f6]/20 transition-colors duration-500 flex-shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="font-inter text-base text-gray-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connection arrow */}
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden md:flex items-center ml-auto">
                    <div className="w-8 h-[1px] bg-[#3b82f6]/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Insights ═══ */}
      <section className="relative w-full py-32 md:py-48 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="stock-reveal max-w-3xl ml-auto">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-6">
              Key Insights
            </span>
            <h2 className="font-space-grotesk text-heading text-white tracking-tighter mb-8">
              Quantitative meets qualitative.
            </h2>
            <p className="font-inter text-lg text-gray-400 font-light leading-[1.8] mb-8">
              The breakthrough came from combining two traditionally separate approaches: mathematical time-series modeling with natural language understanding. TimeGAN creates synthetic data that preserves the statistical properties of real markets, while LLMs capture the human element — fear, optimism, uncertainty — that drives actual market behavior.
            </p>
            <ul className="space-y-4">
              {[
                "LLM sentiment analysis integration for market mood detection",
                "TimeGAN synthetic data preserves temporal correlations",
                "Multi-factor prediction outperforms single-signal approaches",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]/40 mt-2.5 flex-shrink-0" />
                  <span className="font-inter text-gray-400 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ Navigation ═══ */}
      <section className="relative w-full py-16 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => router.push("/projects/simi-cafe")} className="font-inter text-sm text-gray-500 hover:text-white transition-colors cursor-pointer hover-target">
            ← Simi Cafe
          </button>
          <button onClick={() => router.push("/projects/cyber-ai-dual-edge")} className="font-inter text-sm text-gray-500 hover:text-white transition-colors cursor-pointer hover-target">
            Next: Cyber AI Dual Edge →
          </button>
        </div>
      </section>
    </main>
  );
}
