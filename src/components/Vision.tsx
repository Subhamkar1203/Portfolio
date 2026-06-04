"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision-gradient",
        { backgroundPosition: "200% center" },
        {
          backgroundPosition: "-200% center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-[#050505] overflow-hidden py-40 md:py-64">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <h2 
          className="vision-gradient font-space-grotesk text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] max-w-5xl text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(90deg, #222 0%, #fff 40%, #fff 60%, #222 100%)",
            backgroundSize: "200% auto",
          }}
        >
          Building intelligent, scalable systems that define the future.
        </h2>
      </div>
    </section>
  );
}
