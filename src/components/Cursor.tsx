"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);

  // Directly track raw DOM values for performance (bypassing React state)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Highly snappy spring config for that immediate, physical feel
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let hovered = false;
    
    const moveCursor = (e: MouseEvent) => {
      // Offset by half width/height so it's centered
      cursorX.set(e.clientX - (hovered ? 24 : 8));
      cursorY.set(e.clientY - (hovered ? 24 : 8));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shouldHover = 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.classList.contains("hover-target");
        
      if (shouldHover !== hovered) {
        hovered = shouldHover;
        setIsHovered(shouldHover);
      }
    };

    // Passive event listeners prevent scrolling blockage and are hyper-performant
    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-white mix-blend-difference will-change-transform"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        width: isHovered ? 48 : 16,
        height: isHovered ? 48 : 16,
      }}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
    />
  );
}
