"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRouteByPath } from "@/lib/navigation";

export default function ChapterIndicator() {
  const pathname = usePathname();
  const [route, setRoute] = useState(getRouteByPath("/"));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const r = getRouteByPath(pathname);
    if (r) setRoute(r);

    // Delay showing the indicator to not conflict with page transition
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Don't show on landing page
  if (pathname === "/") return null;

  return (
    <AnimatePresence>
      {isVisible && route && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-8 z-[100] glass rounded-full px-5 py-3 flex items-center gap-3 cursor-default select-none"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: route.color,
              boxShadow: `0 0 10px ${route.color}`,
            }}
          />
          <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-gray-400">
            {route.chapter}
          </span>
          <span className="w-[1px] h-3 bg-white/10" />
          <span className="font-inter text-xs text-gray-500">
            {route.title}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
