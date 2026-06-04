// ═══════════════════════════════════════
// WORLD NAVIGATION — Route Definitions
// ═══════════════════════════════════════

export interface WorldRoute {
  path: string;
  chapter: string;       // Roman numeral or symbol
  title: string;
  subtitle: string;
  color: string;         // Accent color for this destination
  icon: string;          // Emoji/symbol for the world map
  description: string;
  gridPosition: { x: number; y: number };  // Position on world map (0-100 percentage)
}

export const WORLD_ROUTES: WorldRoute[] = [
  {
    path: "/",
    chapter: "—",
    title: "Landing",
    subtitle: "The Portal",
    color: "#ffffff",
    icon: "◈",
    description: "Where it all begins",
    gridPosition: { x: 50, y: 10 },
  },
  {
    path: "/world",
    chapter: "⬡",
    title: "World Hub",
    subtitle: "The Nexus",
    color: "#8b5cf6",
    icon: "⬡",
    description: "Explore all destinations",
    gridPosition: { x: 50, y: 30 },
  },
  {
    path: "/story",
    chapter: "I",
    title: "The Story",
    subtitle: "Origin",
    color: "#f59e0b",
    icon: "◉",
    description: "The journey of Subham Kar",
    gridPosition: { x: 20, y: 50 },
  },
  {
    path: "/projects",
    chapter: "II",
    title: "Projects",
    subtitle: "Universe",
    color: "#ef4444",
    icon: "△",
    description: "Explore the project universe",
    gridPosition: { x: 50, y: 55 },
  },
  {
    path: "/skills",
    chapter: "III",
    title: "Skills",
    subtitle: "Constellation",
    color: "#06b6d4",
    icon: "✦",
    description: "Technologies and expertise",
    gridPosition: { x: 80, y: 50 },
  },
  {
    path: "/future",
    chapter: "IV",
    title: "Future",
    subtitle: "Horizon",
    color: "#10b981",
    icon: "◇",
    description: "What's being built next",
    gridPosition: { x: 35, y: 75 },
  },
  {
    path: "/contact",
    chapter: "V",
    title: "Contact",
    subtitle: "Destination",
    color: "#f3f3f3",
    icon: "○",
    description: "Let's build together",
    gridPosition: { x: 65, y: 80 },
  },
];

export const PROJECT_ROUTES = [
  {
    path: "/projects/simi-cafe",
    title: "Simi Cafe",
    color: "#e11d48",
    flagship: true,
  },
  {
    path: "/projects/stock-market-ai",
    title: "Stock Market AI",
    color: "#3b82f6",
    flagship: false,
  },
  {
    path: "/projects/cyber-ai-dual-edge",
    title: "Cyber AI Dual Edge",
    color: "#22c55e",
    flagship: false,
  },
  {
    path: "/projects/food-wastage-platform",
    title: "Food Wastage Platform",
    color: "#f59e0b",
    flagship: false,
  },
];

// Connection pairs for the world map constellation lines
export const WORLD_CONNECTIONS: [string, string][] = [
  ["/", "/world"],
  ["/world", "/story"],
  ["/world", "/projects"],
  ["/world", "/skills"],
  ["/world", "/future"],
  ["/world", "/contact"],
  ["/story", "/skills"],
  ["/projects", "/future"],
  ["/future", "/contact"],
];

export function getRouteByPath(path: string): WorldRoute | undefined {
  return WORLD_ROUTES.find((r) => r.path === path);
}

export function getChapterNumber(path: string): string {
  return getRouteByPath(path)?.chapter ?? "—";
}

export function getChapterColor(path: string): string {
  return getRouteByPath(path)?.color ?? "#ffffff";
}
