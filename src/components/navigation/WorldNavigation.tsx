"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { WORLD_ROUTES, WORLD_CONNECTIONS, type WorldRoute } from "@/lib/navigation";

export default function WorldNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set(["/"]) );
  const pathname = usePathname();
  const router = useRouter();

  // Track visited pages
  useEffect(() => {
    setVisitedPaths((prev) => new Set([...prev, pathname]));
  }, [pathname]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const navigateTo = useCallback(
    (path: string) => {
      setIsOpen(false);
      setTimeout(() => router.push(path), 300);
    },
    [router]
  );

  // Don't show on landing page
  if (pathname === "/") return null;

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[150] w-14 h-14 rounded-full glass flex items-center justify-center cursor-pointer group hover-target"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Open world navigation"
      >
        <motion.div
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {/* World map icon — constellation pattern */}
            <circle cx="12" cy="6" r="1.5" fill="white" opacity={isOpen ? 0 : 0.6} />
            <circle cx="6" cy="14" r="1.5" fill="white" opacity={isOpen ? 0 : 0.6} />
            <circle cx="18" cy="14" r="1.5" fill="white" opacity={isOpen ? 0 : 0.6} />
            <circle cx="12" cy="20" r="1.5" fill="white" opacity={isOpen ? 0 : 0.6} />
            <line x1="12" y1="7.5" x2="6" y2="12.5" stroke="white" strokeWidth="0.5" opacity={isOpen ? 0 : 0.3} />
            <line x1="12" y1="7.5" x2="18" y2="12.5" stroke="white" strokeWidth="0.5" opacity={isOpen ? 0 : 0.3} />
            <line x1="6" y1="15.5" x2="12" y2="18.5" stroke="white" strokeWidth="0.5" opacity={isOpen ? 0 : 0.3} />
            <line x1="18" y1="15.5" x2="12" y2="18.5" stroke="white" strokeWidth="0.5" opacity={isOpen ? 0 : 0.3} />
            {/* Close X when open */}
            {isOpen && (
              <>
                <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="1.5" />
                <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </motion.div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20"
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.button>

      {/* Full-screen world map overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="world-nav-overlay flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background constellation connections (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {WORLD_CONNECTIONS.map(([from, to], i) => {
                const fromRoute = WORLD_ROUTES.find((r) => r.path === from);
                const toRoute = WORLD_ROUTES.find((r) => r.path === to);
                if (!fromRoute || !toRoute) return null;
                return (
                  <motion.line
                    key={i}
                    x1={fromRoute.gridPosition.x}
                    y1={fromRoute.gridPosition.y}
                    x2={toRoute.gridPosition.x}
                    y2={toRoute.gridPosition.y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.15"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Destination nodes */}
            <div className="relative w-full h-full max-w-6xl mx-auto">
              {/* Mobile: vertical list layout */}
              <div className="md:hidden flex flex-col items-center justify-center h-full gap-4 px-6 py-20 overflow-y-auto">
                <motion.h2
                  className="font-space-grotesk text-xl font-bold text-white/40 tracking-wider uppercase mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Navigate World
                </motion.h2>
                {WORLD_ROUTES.filter((r) => r.path !== "/").map((route, i) => (
                  <MobileNavItem
                    key={route.path}
                    route={route}
                    isActive={pathname === route.path}
                    isVisited={visitedPaths.has(route.path)}
                    onClick={() => navigateTo(route.path)}
                    delay={0.1 + i * 0.05}
                  />
                ))}
              </div>

              {/* Desktop: constellation map layout */}
              <div className="hidden md:block w-full h-full relative">
                {WORLD_ROUTES.filter((r) => r.path !== "/").map((route, i) => (
                  <DesktopNavNode
                    key={route.path}
                    route={route}
                    isActive={pathname === route.path}
                    isVisited={visitedPaths.has(route.path)}
                    onClick={() => navigateTo(route.path)}
                    delay={0.15 + i * 0.08}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopNavNode({
  route,
  isActive,
  isVisited,
  onClick,
  delay,
}: {
  route: WorldRoute;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`absolute world-nav-node group flex flex-col items-center gap-3 cursor-pointer hover-target`}
      style={{
        left: `${route.gridPosition.x}%`,
        top: `${route.gridPosition.y}%`,
        x: "-50%",
        y: "-50%",
        ["--node-color" as string]: route.color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow ring */}
      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
          isActive ? "scale-125" : ""
        }`}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border transition-all duration-500"
          style={{
            borderColor: isActive
              ? route.color
              : isVisited
              ? `${route.color}44`
              : "rgba(255,255,255,0.08)",
            boxShadow: isActive
              ? `0 0 30px ${route.color}40, 0 0 60px ${route.color}20`
              : "none",
          }}
        />
        {/* Inner dot */}
        <div
          className="node-dot w-3 h-3 rounded-full transition-all duration-500 group-hover:w-5 group-hover:h-5"
          style={{
            backgroundColor: isActive || isVisited ? route.color : "rgba(255,255,255,0.2)",
            boxShadow:
              isActive || isVisited
                ? `0 0 15px ${route.color}60`
                : "none",
          }}
        />
        {/* Icon */}
        <span
          className="absolute -top-0.5 -right-0.5 text-xs opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ color: route.color }}
        >
          {route.icon}
        </span>
      </div>

      {/* Label */}
      <div className="text-center">
        <span
          className="block font-space-grotesk text-sm font-bold tracking-tight transition-colors duration-300"
          style={{
            color: isActive ? route.color : "rgba(255,255,255,0.5)",
          }}
        >
          {route.title}
        </span>
        <span className="block font-inter text-[9px] tracking-[0.3em] uppercase text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {route.subtitle}
        </span>
      </div>

      {/* "You are here" indicator */}
      {isActive && (
        <motion.span
          className="font-inter text-[8px] tracking-[0.3em] uppercase mt-1"
          style={{ color: route.color }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          current
        </motion.span>
      )}
    </motion.button>
  );
}

function MobileNavItem({
  route,
  isActive,
  isVisited,
  onClick,
  delay,
}: {
  route: WorldRoute;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full max-w-sm glass rounded-2xl px-6 py-5 flex items-center gap-5 text-left cursor-pointer hover-target group"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        borderColor: isActive ? `${route.color}30` : undefined,
      }}
    >
      {/* Node dot */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300"
        style={{
          borderColor: isActive
            ? route.color
            : isVisited
            ? `${route.color}40`
            : "rgba(255,255,255,0.08)",
          boxShadow: isActive ? `0 0 20px ${route.color}30` : "none",
        }}
      >
        <span className="text-sm" style={{ color: route.color }}>
          {route.icon}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span
          className="block font-space-grotesk text-base font-bold tracking-tight"
          style={{ color: isActive ? route.color : "#f3f3f3" }}
        >
          {route.title}
        </span>
        <span className="block font-inter text-xs text-gray-500 mt-0.5">
          {route.description}
        </span>
      </div>

      {/* Chapter */}
      <span className="font-inter text-[10px] tracking-[0.2em] text-gray-600 flex-shrink-0">
        {route.chapter}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: route.color }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
