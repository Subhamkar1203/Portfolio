"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { PROJECT_ROUTES } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    slug: "simi-cafe",
    title: "Simi Cafe",
    tagline: "Redefining digital dining",
    tech: ["Next.js", "React", "Spring Boot", "PostgreSQL"],
    color: "#e11d48",
    description:
      "A modern full-stack restaurant platform designed to deliver a premium digital dining experience with scalable microservices architecture.",
    flagship: true,
    stat: null,
    statLabel: null,
  },
  {
    slug: "stock-market-ai",
    title: "Stock Market AI",
    tagline: "Predicting market movements with neural networks",
    tech: ["TimeGAN", "LLM", "Python", "PyTorch"],
    color: "#3b82f6",
    description:
      "An advanced predictive model combining quantitative time-series data with qualitative market sentiment to forecast stock movements with 93% accuracy.",
    flagship: false,
    stat: "93%",
    statLabel: "Prediction Accuracy",
  },
  {
    slug: "cyber-ai-dual-edge",
    title: "Cyber AI Dual Edge",
    tagline: "Attack and defense, unified by AI",
    tech: ["Deep Learning", "PyTorch", "Network Analysis"],
    color: "#22c55e",
    description:
      "A dual-edge attack and defense mechanism leveraging neural networks to identify and neutralize cyber threats in real-time across 50K+ network samples.",
    flagship: false,
    stat: "50K+",
    statLabel: "Network Samples",
  },
  {
    slug: "food-wastage-platform",
    title: "Food Wastage Platform",
    tagline: "Connecting surplus food with those who need it",
    tech: ["Next.js", "Node.js", "SQL", "Data Visualization"],
    color: "#f59e0b",
    description:
      "A localized platform connecting surplus food sources with NGOs, utilizing optimized routing and data analytics to minimize waste and maximize impact.",
    flagship: false,
    stat: null,
    statLabel: null,
  },
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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

  const navigateToProject = (slug: string) => {
    gsap.to(".projects-content", {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "expo.in",
      onComplete: () => router.push(`/projects/${slug}`),
    });
  };

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Header ═══ */}
      <section className="relative w-full pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#ef4444]/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto">
          <span className="projects-header block font-inter text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-8 flex items-center gap-4">
            II <span className="w-12 h-[1px] bg-gray-700" /> Project Universe
          </span>

          <h1 className="projects-header font-space-grotesk text-display text-white mb-6 tracking-tighter">
            The Work.
          </h1>

          <p className="projects-header font-inter text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
            Each project is its own universe. Enter one to explore the full story — architecture, challenges, solutions, and impact.
          </p>
        </div>
      </section>

      {/* ═══ Projects ═══ */}
      <div className="projects-content">
        {/* Flagship — Simi Cafe */}
        <section className="project-card relative w-full mb-8 md:mb-12 px-4 md:px-8 lg:px-16">
          <motion.button
            onClick={() => navigateToProject("simi-cafe")}
            className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover-target group text-left"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${projects[0].color}08 0%, #0a0a0a 50%, ${projects[0].color}04 100%)`,
              }}
            />
            <div className="absolute inset-0 border border-white/[0.04] rounded-2xl md:rounded-3xl" />

            <div className="relative p-8 md:p-12 lg:p-16 min-h-[400px] md:min-h-[500px] flex flex-col justify-between">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-inter border mb-6"
                    style={{ borderColor: `${projects[0].color}30`, color: projects[0].color }}>
                    <span className="text-[8px]">★</span> Flagship Project
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500">
                  <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="font-space-grotesk text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter leading-[0.85] uppercase text-white mb-4 group-hover:text-opacity-90 transition-all duration-500">
                  Simi Cafe.
                </h2>
                <p className="font-inter text-base md:text-lg text-gray-500 font-light max-w-xl mb-8">
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {projects[0].tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-1.5 rounded-full border border-white/[0.06] text-xs tracking-wider font-inter text-gray-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        </section>

        {/* Other projects grid */}
        <section className="px-4 md:px-8 lg:px-16 pb-24 md:pb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {projects.slice(1).map((project) => (
              <motion.button
                key={project.slug}
                className="project-card relative rounded-2xl overflow-hidden cursor-pointer hover-target group text-left"
                onClick={() => navigateToProject(project.slug)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${project.color}06 0%, #0a0a0a 100%)`,
                  }}
                />
                <div className="absolute inset-0 border border-white/[0.04] rounded-2xl group-hover:border-white/[0.08] transition-colors duration-500" />

                <div className="relative p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
                  {/* Stat if exists */}
                  {project.stat && (
                    <div className="mb-auto">
                      <span className="font-space-grotesk text-4xl md:text-5xl font-black text-white/[0.06] leading-none select-none">
                        {project.stat}
                      </span>
                      <span className="block font-inter text-[9px] tracking-[0.2em] uppercase text-gray-700 mt-1">
                        {project.statLabel}
                      </span>
                    </div>
                  )}

                  <div className={!project.stat ? "mt-auto" : ""}>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-inter text-[10px] tracking-wider text-gray-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-opacity-90 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="font-inter text-sm text-gray-500 font-light leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 mt-6 text-gray-600 group-hover:text-white/60 transition-colors duration-300">
                      <span className="font-inter text-xs tracking-wider uppercase">
                        Explore
                      </span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
