# Subham Kar - Interactive 3D Portfolio

[![Repository](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Subhamkar1203/Portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)

> An immersive, high-performance web experience blending modern web architecture with real-time 3D rendering.

This repository contains the source code for my professional portfolio. Designed to be both a showcase of technical capabilities and an engaging user experience, the project bridges the gap between traditional UI/UX and cinematic, spatial web design.

---

## Architecture & Technical Overview

The application is built on a robust, modern foundation designed for scale, performance, and maintainability.

### Rendering Engine
- **Three.js & React Three Fiber:** At the core of the experience is a WebGL rendering pipeline. React Three Fiber provides a declarative interface to Three.js, enabling complex 3D scenes, custom shaders, and optimized asset loading directly within the React ecosystem.
- **Drei:** Utilized for advanced 3D utilities, camera controls, and environment setups.

### Application Framework
- **Next.js 16 (App Router):** Leverages server-side rendering (SSR), static site generation (SSG), and advanced routing paradigms to ensure rapid initial page loads and optimal SEO performance.
- **React 19:** Utilizing the latest React features for concurrent rendering and state management.
- **TypeScript:** Enforces strict type safety across both standard web components and 3D scene graphs, minimizing runtime errors.

### Animation & Physics
- **GSAP (GreenSock Animation Platform):** Drives complex timeline-based animations, cinematic transitions, and sophisticated element reveals.
- **Framer Motion:** Handles component-level declarative animations and interactive states.
- **Lenis:** Provides a customized, frictionless smooth-scrolling experience that synchronizes perfectly with the 3D rendering loop.

### Styling System
- **TailwindCSS v4:** Employs a utility-first approach to styling, featuring custom design tokens, glassmorphism effects, and highly responsive layouts.

---

## Core Features

- **Spatial Computing Context:** Users navigate through a persistent 3D world rather than standard static pages.
- **Cinematic Choreography:** All page transitions and element mounts are strictly choreographed using GSAP timelines for a seamless, movie-like experience.
- **Performance First:** The 3D pipeline utilizes lazy-loading, geometry instancing, and compressed textures to maintain a stable 60FPS on a wide range of devices.
- **Interactive Typography:** Magnetic buttons, dynamic text reveals, and custom typography treatments.

---

## Local Development Setup

To explore the codebase and run the environment locally, ensure you have Node.js (v20+) installed.

### 1. Repository Initialization
Clone the repository to your local machine:
```bash
git clone https://github.com/Subhamkar1203/Portfolio.git
cd Portfolio
```

### 2. Dependency Installation
Install the necessary packages. The project supports standard package managers:
```bash
npm install
```

### 3. Execution
Initialize the Next.js development server:
```bash
npm run dev
```

Navigate to `http://localhost:3000` in your preferred browser. The server supports hot-module replacement (HMR) for both standard React components and Three.js scene graphs.

---

## Repository Structure

```text
├── public/                 # Static assets, compressed 3D models, textures, and fonts
├── src/
│   ├── app/                # Next.js App Router endpoints and layouts
│   │   ├── page.tsx        # Entry point: Cinematic Landing Page
│   │   └── world/          # Main immersive 3D routing context
│   ├── components/         # Reusable atomic UI components
│   │   ├── canvas/         # WebGL/R3F Scene components and shaders
│   │   └── navigation/     # UI overlays and navigation controllers
│   ├── hooks/              # Custom React hooks for physics, animation, and state
│   └── styles/             # Global CSS variables and Tailwind extensions
├── tailwind.config.ts      # Tailwind configuration and design tokens
└── package.json            # Dependency manifest and execution scripts
```

---

## About the Developer

**Subham Kar**
- AI Engineer
- Full Stack Developer
- Builder

*Focusing on the intersection of artificial intelligence, high-performance web architecture, and creative engineering.*
