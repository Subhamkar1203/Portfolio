"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-text",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[80vh] flex flex-col justify-end bg-[#000] overflow-hidden">
      <div className="container mx-auto px-6 py-24 flex flex-col items-center">
        <h2 className="footer-text font-space-grotesk text-[15vw] leading-none font-black tracking-tighter text-white mb-12 text-center mix-blend-difference select-none hover-target">
          Let's Build.
        </h2>
        
        <div className="footer-text flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto border-t border-white/10 pt-12 gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-inter text-gray-500 uppercase tracking-widest text-xs">Based in</span>
            <span className="font-space-grotesk text-xl text-[#f3f3f3]">Remote / Global</span>
          </div>
          
          <div className="flex gap-8">
            {["LinkedIn", "GitHub", "Twitter", "Email"].map((link, i) => (
              <a 
                key={i} 
                href="#" 
                className="font-inter text-gray-400 hover:text-white transition-colors duration-300 relative group overflow-hidden hover-target"
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </a>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 text-right">
            <span className="font-inter text-gray-500 uppercase tracking-widest text-xs">Local Time</span>
            <span className="font-space-grotesk text-xl text-[#f3f3f3]">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
