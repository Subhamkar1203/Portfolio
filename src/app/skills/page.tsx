"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: string;
  level: number; // 1-5 for orbit radius visual
  projects: string[];
  description: string;
}

const skillClusters = [
  {
    id: "engineering",
    title: "Engineering",
    subtitle: "The Foundation",
    color: "#ef4444",
    icon: "△",
    skills: [
      { name: "Java", category: "engineering", level: 5, projects: ["Simi Cafe", "Cyber AI"], description: "Primary backend language for enterprise-grade systems" },
      { name: "Spring Boot", category: "engineering", level: 5, projects: ["Simi Cafe"], description: "Microservices architecture and RESTful API development" },
      { name: "Next.js", category: "engineering", level: 5, projects: ["Simi Cafe", "Food Wastage Platform"], description: "Full-stack React framework for production applications" },
      { name: "React", category: "engineering", level: 5, projects: ["Simi Cafe", "Food Wastage Platform"], description: "Component-based UI architecture and state management" },
      { name: "TypeScript", category: "engineering", level: 4, projects: ["Simi Cafe", "Portfolio"], description: "Type-safe JavaScript for scalable codebases" },
      { name: "Node.js", category: "engineering", level: 4, projects: ["Food Wastage Platform"], description: "Server-side JavaScript runtime for API services" },
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "The Mind",
    color: "#8b5cf6",
    icon: "◉",
    skills: [
      { name: "PyTorch", category: "intelligence", level: 5, projects: ["Stock Market AI", "Cyber AI"], description: "Deep learning framework for neural network training" },
      { name: "TimeGAN", category: "intelligence", level: 4, projects: ["Stock Market AI"], description: "Generative adversarial networks for time-series synthesis" },
      { name: "LLMs", category: "intelligence", level: 4, projects: ["Stock Market AI"], description: "Large Language Models for sentiment analysis and NLP" },
      { name: "Deep Learning", category: "intelligence", level: 5, projects: ["Stock Market AI", "Cyber AI"], description: "Neural architectures for pattern recognition and prediction" },
      { name: "Python", category: "intelligence", level: 5, projects: ["Stock Market AI", "Cyber AI"], description: "Primary language for AI/ML research and development" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    subtitle: "The Scale",
    color: "#06b6d4",
    icon: "✦",
    skills: [
      { name: "AWS", category: "infrastructure", level: 4, projects: ["Cloud Projects"], description: "Amazon Web Services — compute, storage, serverless" },
      { name: "Azure", category: "infrastructure", level: 3, projects: ["Cloud Projects"], description: "Microsoft Azure cloud platform and services" },
      { name: "PostgreSQL", category: "infrastructure", level: 5, projects: ["Simi Cafe"], description: "Advanced relational database with optimized indexing" },
      { name: "SQL", category: "infrastructure", level: 5, projects: ["Simi Cafe", "Food Wastage Platform"], description: "Data querying, optimization, and analytics" },
      { name: "Power BI", category: "infrastructure", level: 4, projects: ["Data Analytics"], description: "Business intelligence and data visualization dashboards" },
      { name: "Tableau", category: "infrastructure", level: 3, projects: ["Data Analytics"], description: "Advanced data visualization and storytelling" },
    ],
  },
];

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      const clusters = gsap.utils.toArray(".skill-cluster");
      clusters.forEach((el: any) => {
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
              start: "top 80%",
            },
          }
        );
      });

      const nodes = gsap.utils.toArray(".skill-node-anim");
      nodes.forEach((el: any, i: number) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el.closest(".skill-cluster") || el,
              start: "top 80%",
            },
            delay: i * 0.05,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen">
      {/* ═══ Header ═══ */}
      <section className="relative w-full pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#06b6d4]/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto">
          <span className="skills-header block font-inter text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-8 flex items-center gap-4">
            III <span className="w-12 h-[1px] bg-gray-700" /> Skills Universe
          </span>

          <h1 className="skills-header font-space-grotesk text-display text-white mb-6 tracking-tighter">
            Technologies
            <br />
            <span className="text-gray-600">&amp; Expertise.</span>
          </h1>

          <p className="skills-header font-inter text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
            Discover the technologies through the work they enabled. Not bars. Not lists. Connections.
          </p>
        </div>
      </section>

      {/* ═══ Skill Clusters ═══ */}
      {skillClusters.map((cluster, clusterIdx) => (
        <section
          key={cluster.id}
          className="skill-cluster relative w-full py-24 md:py-40 overflow-hidden"
        >
          {/* Cluster background glow */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none opacity-[0.03]"
            style={{
              backgroundColor: cluster.color,
              left: clusterIdx % 2 === 0 ? "0" : "auto",
              right: clusterIdx % 2 !== 0 ? "0" : "auto",
            }}
          />

          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative">
            {/* Cluster header */}
            <div className="flex items-center gap-6 mb-16 md:mb-24">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center"
                style={{
                  borderColor: `${cluster.color}30`,
                  background: `radial-gradient(circle, ${cluster.color}10 0%, transparent 70%)`,
                }}
              >
                <span className="text-xl md:text-2xl" style={{ color: cluster.color }}>
                  {cluster.icon}
                </span>
              </div>
              <div>
                <h2 className="font-space-grotesk text-3xl md:text-5xl font-bold text-white tracking-tight">
                  {cluster.title}
                </h2>
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-gray-600 mt-1 block">
                  {cluster.subtitle}
                </span>
              </div>
            </div>

            {/* Skill nodes — constellation layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {cluster.skills.map((skill, i) => (
                <motion.button
                  key={skill.name}
                  className={`skill-node-anim skill-node group relative p-6 md:p-8 rounded-2xl border text-left cursor-pointer hover-target transition-all duration-500 ${
                    activeSkill?.name === skill.name
                      ? "border-opacity-40"
                      : "border-white/[0.04] hover:border-opacity-20"
                  }`}
                  style={{
                    borderColor:
                      activeSkill?.name === skill.name
                        ? cluster.color
                        : undefined,
                    background:
                      activeSkill?.name === skill.name
                        ? `radial-gradient(circle at top right, ${cluster.color}08 0%, transparent 60%)`
                        : "transparent",
                  }}
                  onClick={() =>
                    setActiveSkill(
                      activeSkill?.name === skill.name ? null : skill
                    )
                  }
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Skill level indicator — orbit dots */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor:
                            j < skill.level
                              ? `${cluster.color}80`
                              : "rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>

                  <h3
                    className="font-space-grotesk text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300"
                    style={{
                      color:
                        activeSkill?.name === skill.name
                          ? cluster.color
                          : "#f3f3f3",
                    }}
                  >
                    {skill.name}
                  </h3>

                  {/* Expanded info */}
                  <AnimatePresence>
                    {activeSkill?.name === skill.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-sm text-gray-400 font-light leading-relaxed mt-4 mb-4">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skill.projects.map((proj) => (
                            <span
                              key={proj}
                              className="px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-inter"
                              style={{
                                backgroundColor: `${cluster.color}10`,
                                color: `${cluster.color}aa`,
                                border: `1px solid ${cluster.color}20`,
                              }}
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Default subtitle */}
                  {activeSkill?.name !== skill.name && (
                    <p className="font-inter text-xs text-gray-600 mt-2 group-hover:text-gray-500 transition-colors duration-300">
                      {skill.projects.length} project{skill.projects.length > 1 ? "s" : ""}
                    </p>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ═══ Narrative summary ═══ */}
      <section className="relative w-full py-32 md:py-48 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="font-space-grotesk text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.4] tracking-tight">
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
            <span className="text-gray-600">
              {" "}to build software that solves real problems.
            </span>
          </div>

          <div className="mt-20 md:mt-32 ml-0 md:ml-[20%] lg:ml-[30%] max-w-3xl font-space-grotesk text-xl md:text-3xl lg:text-4xl font-medium leading-[1.4] tracking-tight">
            <span className="text-gray-600">My focus spans </span>
            <span className="text-white">Artificial Intelligence</span>
            <span className="text-gray-600"> — </span>
            <span className="text-white">TimeGAN</span>
            <span className="text-gray-600">, </span>
            <span className="text-white">LLMs</span>
            <span className="text-gray-600">, </span>
            <span className="text-white">Deep Learning</span>
            <span className="text-gray-600"> — and </span>
            <span className="text-white">Cloud Platforms</span>
            <span className="text-gray-600"> like </span>
            <span className="text-white">AWS</span>
            <span className="text-gray-600"> and </span>
            <span className="text-white">Azure</span>
            <span className="text-gray-600">.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
