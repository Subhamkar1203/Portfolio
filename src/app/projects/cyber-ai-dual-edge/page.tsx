"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const dualEdge = [
  {
    side: "ATTACK",
    color: "#ef4444",
    title: "Adversarial Simulation",
    description: "AI-generated attack vectors that probe and expose network vulnerabilities, simulating real-world cyber threats with deep learning precision.",
    features: [
      "Neural network-generated attack patterns",
      "Automated vulnerability scanning",
      "Adversarial perturbation techniques",
    ],
  },
  {
    side: "DEFENSE",
    color: "#22c55e",
    title: "Intelligent Protection",
    description: "Real-time intrusion detection powered by deep learning that identifies and neutralizes threats before they breach the perimeter.",
    features: [
      "AI-powered intrusion detection system",
      "Real-time anomaly classification",
      "Self-adapting defense architecture",
    ],
  },
];

export default function CyberAIPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cyber-hero-el", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      const reveals = gsap.utils.toArray(".cyber-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Matrix rain characters animation
      const rainChars = gsap.utils.toArray(".matrix-char");
      rainChars.forEach((el: any, i: number) => {
        const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 5 });
        tl.fromTo(el, { opacity: 0, y: -20 }, {
          opacity: 0.6,
          y: 0,
          duration: (2 + Math.random() * 3) / 2,
          ease: "none",
        });
        tl.to(el, {
          opacity: 0,
          y: 20,
          duration: (2 + Math.random() * 3) / 2,
          ease: "none",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const matrixChars = "01アイウエオカキクケコ";

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Hero ═══ */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid pointer-events-none" />

        {/* Matrix rain decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="matrix-char absolute font-mono text-xs text-[#22c55e]/20 select-none"
              style={{
                left: `${5 + (i * 5)}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </span>
          ))}
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#22c55e]/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full relative">
          <span className="cyber-hero-el block font-inter text-[10px] tracking-[0.4em] uppercase text-[#22c55e]/60 mb-6 flex items-center gap-4">
            Cybersecurity <span className="w-12 h-[1px] bg-[#22c55e]/20" />
          </span>

          <h1 className="cyber-hero-el font-space-grotesk text-massive text-white mb-6">
            CYBER AI
            <br />
            <span className="text-[#22c55e]/30">DUAL EDGE.</span>
          </h1>

          <p className="cyber-hero-el font-inter text-lg md:text-xl text-gray-500 font-light max-w-xl leading-relaxed">
            A dual-edge attack and defense mechanism leveraging neural networks to identify and neutralize cyber threats in real-time.
          </p>

          <div className="cyber-hero-el flex flex-wrap gap-3 mt-8">
            {["Deep Learning", "PyTorch", "Network Analysis", "Python"].map((t) => (
              <span key={t} className="px-4 py-1.5 rounded-full border border-[#22c55e]/15 text-xs tracking-wider font-inter text-[#22c55e]/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Scale ═══ */}
      <section className="relative w-full py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="cyber-reveal text-center">
            <span className="font-space-grotesk text-[clamp(5rem,15vw,14rem)] font-black leading-none text-white/[0.04] select-none block">
              50K+
            </span>
            <span className="font-inter text-sm tracking-[0.3em] uppercase text-gray-600 block mt-4">
              Network Samples Analyzed
            </span>
          </div>
        </div>
      </section>

      {/* ═══ Dual Edge — Split Design ═══ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="cyber-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-8 flex items-center gap-4">
            The Dual Edge <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <h2 className="cyber-reveal font-space-grotesk text-heading text-white tracking-tighter mb-16 md:mb-24">
            Two sides of the same AI.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {dualEdge.map((edge) => (
              <div
                key={edge.side}
                className="cyber-reveal relative p-8 md:p-10 rounded-2xl border overflow-hidden group"
                style={{ borderColor: `${edge.color}15` }}
              >
                {/* Side label */}
                <span
                  className="font-space-grotesk text-[8rem] md:text-[10rem] font-black leading-none absolute -top-8 -right-4 opacity-[0.03] select-none"
                  style={{ color: edge.color }}
                >
                  {edge.side}
                </span>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: edge.color,
                        boxShadow: `0 0 15px ${edge.color}40`,
                      }}
                    />
                    <span
                      className="font-space-grotesk text-sm font-bold tracking-[0.2em] uppercase"
                      style={{ color: edge.color }}
                    >
                      {edge.side}
                    </span>
                  </div>

                  <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                    {edge.title}
                  </h3>

                  <p className="font-inter text-base text-gray-400 font-light leading-relaxed mb-8">
                    {edge.description}
                  </p>

                  <ul className="space-y-3">
                    {edge.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: `${edge.color}50` }}
                        />
                        <span className="font-inter text-sm text-gray-400">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Neural Architecture ═══ */}
      <section className="relative w-full py-32 md:py-48 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="cyber-reveal">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-6">
              Architecture
            </span>
            <h2 className="font-space-grotesk text-heading text-white tracking-tighter mb-8">
              Deep learning defense.
            </h2>
            <p className="font-inter text-lg text-gray-400 font-light leading-[1.8] max-w-3xl mb-12">
              The neural network architecture processes network traffic patterns in real-time, classifying packets as benign or malicious with sub-millisecond latency. The dual-edge approach means the same AI that defends also understands how attacks are constructed — creating a continuously evolving security posture.
            </p>

            {/* Architecture flow visualization */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-2">
              {["Network\nTraffic", "Feature\nExtraction", "Neural\nClassifier", "Threat\nResponse"].map((step, i) => (
                <div key={i} className="flex-1 flex items-center gap-2">
                  <div className="flex-1 p-6 rounded-xl border border-[#22c55e]/10 text-center">
                    <span className="font-space-grotesk text-sm font-bold text-white whitespace-pre-line">
                      {step}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block text-[#22c55e]/30 text-lg">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Navigation ═══ */}
      <section className="relative w-full py-16 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => router.push("/projects/stock-market-ai")} className="font-inter text-sm text-gray-500 hover:text-white transition-colors cursor-pointer hover-target">
            ← Stock Market AI
          </button>
          <button onClick={() => router.push("/projects/food-wastage-platform")} className="font-inter text-sm text-gray-500 hover:text-white transition-colors cursor-pointer hover-target">
            Next: Food Wastage Platform →
          </button>
        </div>
      </section>
    </main>
  );
}
