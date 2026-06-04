"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ 
  children, 
  className = ""
}: { 
  children: React.ReactNode, 
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // High-performance spring bypassing React rendering
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { width, height, left, top } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Pull intensity set to 0.3 for an elegant, snappy feel
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.1 }}
      className={`hover-target inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
