"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "Next.js", role: "Frontend Framework", color: "#fff" },
  { name: "React", role: "UI Architecture", color: "#61dafb" },
  { name: "Spring Boot", role: "Backend API", color: "#6db33f" },
  { name: "PostgreSQL", role: "Database", color: "#336791" },
  { name: "Tailwind CSS", role: "Styling System", color: "#06b6d4" },
  { name: "TypeScript", role: "Type Safety", color: "#3178c6" },
];

const archFeatures = [
  {
    number: "01",
    title: "API-Driven Microservices",
    description:
      "Strictly decoupled architecture with isolated business logic. The React frontend consumes a robust, stateless RESTful API powered by Spring Boot.",
  },
  {
    number: "02",
    title: "Secure JWT Authentication",
    description:
      "Stateless authentication using JSON Web Tokens. Zero session overhead, complete security isolation, and seamless token refresh flows.",
  },
  {
    number: "03",
    title: "Optimized Database Layer",
    description:
      "PostgreSQL with carefully indexed queries for instant menu retrieval. High-performance relational mapping handles complex data relationships seamlessly.",
  },
  {
    number: "04",
    title: "Edge Deployment",
    description:
      "Fully automated CI/CD pipeline with zero-downtime deployments. Frontend distributed across Vercel's global edge network for lowest TTFB worldwide.",
  },
];

const deploymentTags = ["Vercel Edge", "PostgreSQL", "GitHub Actions", "TypeScript", "CI/CD", "Docker"];

export default function SimiCafePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      gsap.fromTo(
        ".simi-hero-text",
        { y: 80, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.3,
        }
      );

      // Scroll-triggered reveals
      const reveals = gsap.utils.toArray(".simi-reveal");
      reveals.forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
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

      // Architecture cards stagger
      const archCards = gsap.utils.toArray(".arch-card");
      archCards.forEach((el: any, i: number) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // Tech stack pills
      gsap.fromTo(
        ".tech-pill",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] min-h-screen theme-simi">
      {/* ═══════════════════════════════════════
          ACT 1: HERO — Full Screen Title
          ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-[100dvh] min-h-[700px] flex flex-col justify-end overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#e11d48]/[0.04] blur-[150px]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-24 pb-16 md:pb-24"
        >
          <span className="simi-hero-text block font-inter text-[10px] tracking-[0.4em] uppercase text-[#e11d48]/60 mb-6 flex items-center gap-4">
            <span className="text-[8px]">★</span> Flagship Project{" "}
            <span className="w-12 h-[1px] bg-[#e11d48]/20" />
          </span>

          <h1
            className="simi-hero-text font-space-grotesk text-massive text-white mb-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            SIMI CAFE.
          </h1>

          <p className="simi-hero-text font-inter text-lg md:text-xl text-gray-500 font-light max-w-xl leading-relaxed">
            A modern full-stack restaurant platform designed to deliver a premium digital dining experience.
          </p>

          <div className="simi-hero-text flex flex-wrap gap-4 mt-8">
            {["Next.js", "Spring Boot", "PostgreSQL"].map((t) => (
              <span
                key={t}
                className="px-4 py-1.5 rounded-full border border-[#e11d48]/15 text-xs tracking-wider font-inter text-[#e11d48]/60"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-inter text-[9px] tracking-[0.4em] uppercase text-gray-700">Explore</span>
          <motion.div
            className="w-[1px] h-6 bg-gradient-to-b from-gray-700 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ACT 2: VISUAL SHOWCASE
          ═══════════════════════════════════════ */}
      <section className="relative w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="simi-reveal relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden group">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <Image
              src="/images/simi-cafe-desktop.png"
              alt="Simi Cafe Platform — Full Desktop View"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30" />

          {/* Floating CTA */}
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
      </section>

      {/* ═══════════════════════════════════════
          ACT 3: THE VISION
          ═══════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="simi-reveal max-w-3xl">
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-6">
              01 — The Vision
            </span>
            <h2 className="font-space-grotesk text-heading text-white mb-8 tracking-tighter">
              Redefining the digital dining experience.
            </h2>
            <p className="font-inter text-lg md:text-xl text-gray-400 font-light leading-[1.8]">
              Simi Cafe was designed from the ground up to remove friction from the customer journey while maintaining a highly aesthetic, premium interface. The focus was on layout fluidity, large imagery, and zero-latency interactions.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ACT 4: TECH STACK
          ═══════════════════════════════════════ */}
      <section className="tech-section relative w-full py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="simi-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-12 flex items-center gap-4">
            02 — Technology <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="tech-pill group p-6 md:p-8 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 hover:bg-white/[0.01]"
              >
                <div
                  className="w-2 h-2 rounded-full mb-4 opacity-60"
                  style={{ backgroundColor: tech.color }}
                />
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                  {tech.name}
                </h3>
                <span className="font-inter text-xs text-gray-600">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ACT 5: ARCHITECTURE DEEP DIVE
          ═══════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="simi-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-8 flex items-center gap-4">
            03 — Architecture <span className="w-12 h-[1px] bg-gray-700" />
          </span>

          <h2 className="simi-reveal font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-16 md:mb-24">
            Scalable, decoupled
            <br />
            <span className="text-gray-600">microservices.</span>
          </h2>

          {/* Architecture feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {archFeatures.map((feature, i) => (
              <div
                key={feature.number}
                className="arch-card p-8 md:p-10 rounded-2xl border border-white/[0.04] hover:border-[#e11d48]/10 transition-all duration-500 group"
              >
                <span
                  className="font-space-grotesk text-4xl md:text-5xl font-black text-white/[0.04] leading-none block mb-6 group-hover:text-[#e11d48]/[0.08] transition-colors duration-500"
                >
                  {feature.number}
                </span>
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                  {feature.title}
                </h3>
                <p className="font-inter text-base text-gray-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ACT 6: DEPLOYMENT & CTA
          ═══════════════════════════════════════ */}
      <section className="relative w-full py-32 md:py-48 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <span className="simi-reveal font-inter text-[10px] tracking-[0.3em] uppercase text-gray-600 block mb-8">
            04 — Deployment
          </span>

          <h2 className="simi-reveal font-space-grotesk text-heading text-white tracking-tighter mb-8">
            Continuous delivery at the edge.
          </h2>

          <p className="simi-reveal font-inter text-lg text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
            A fully automated CI/CD pipeline ensures that every commit is tested and deployed with zero downtime. The frontend is distributed across Vercel&apos;s global edge network for lowest possible TTFB.
          </p>

          <div className="simi-reveal flex flex-wrap gap-3 mb-24">
            {deploymentTags.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2.5 rounded-full border border-white/[0.06] text-xs tracking-widest uppercase font-inter text-gray-500 hover:border-[#e11d48]/20 hover:text-[#e11d48]/60 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Massive CTA */}
          <div className="simi-reveal text-center py-16 md:py-24">
            <MagneticButton>
              <a
                href="https://simi-cafe.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 md:px-16 md:py-8 bg-[#e11d48] text-white rounded-full font-space-grotesk text-sm md:text-base tracking-[0.2em] uppercase hover:bg-[#be123c] transition-colors duration-300 glow-pulse hover-target"
                style={{ boxShadow: "0 0 40px rgba(225, 29, 72, 0.3)" }}
              >
                Experience Simi Cafe <ArrowUpRight size={20} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══ Navigation ═══ */}
      <section className="relative w-full py-16 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => router.push("/projects")}
            className="font-inter text-sm text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer hover-target"
          >
            ← All Projects
          </button>
          <button
            onClick={() => router.push("/projects/stock-market-ai")}
            className="font-inter text-sm text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer hover-target"
          >
            Next: Stock Market AI →
          </button>
        </div>
      </section>
    </main>
  );
}
