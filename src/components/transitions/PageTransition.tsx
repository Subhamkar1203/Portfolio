"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRouteByPath } from "@/lib/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showCurtain, setShowCurtain] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterSubtitle, setChapterSubtitle] = useState("");
  const [chapterColor, setChapterColor] = useState("#ffffff");

  useEffect(() => {
    const route = getRouteByPath(pathname);
    if (route) {
      setChapterTitle(route.title);
      setChapterSubtitle(route.subtitle);
      setChapterColor(route.color);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Chapter flash on entry */}
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <div className="text-center">
              <motion.span
                className="block font-inter text-[10px] tracking-[0.5em] uppercase mb-4"
                style={{ color: chapterColor }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
                transition={{ duration: 1.2, times: [0, 0.3, 0.7, 1] }}
              >
                {chapterSubtitle}
              </motion.span>
              <motion.h1
                className="font-space-grotesk text-4xl md:text-6xl font-bold tracking-tighter"
                style={{ color: chapterColor }}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [30, 0, 0, -15],
                  filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(5px)"],
                }}
                transition={{ duration: 1.4, times: [0, 0.25, 0.65, 1] }}
              >
                {chapterTitle}
              </motion.h1>
            </div>
          </motion.div>

          {/* Page content */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Cinematic curtain wipe */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            className="fixed inset-0 z-[350] bg-[#050505]"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, transformOrigin: "right" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
