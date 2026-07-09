# Omnitrix Portfolio - Architecture & Context

This document provides a high-level overview of the Omnitrix Portfolio architecture, component relationships, and styling systems. Inject this into Claude to provide immediate context on the codebase without needing to read every file.

## 1. Project Overview & Tech Stack
- **Concept:** An immersive, cyber-brutalist "digital mainframe" portfolio.
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (utility-first) + Vanilla CSS (`index.css` for custom animations, glassmorphism, and color variables).
- **Animations & Physics:** GSAP (ScrollTrigger, useGSAP) for anti-gravity component reveals and parallax.
- **3D / WebGL Environment:** Native WebGL/Three.js integrated into React components (`DataArchitecture.jsx`, `TronGrid.jsx`) for highly optimized GLSL shaders.

## 2. Core Architecture & Component Tree

The app is orchestrated by `App.jsx`, which handles the initial boot sequence and global scroll tracking.

### Global Wrappers & Effects (in `App.jsx`)
- **`AresBootScreen`**: A terminal-style boot loader. Once completed, it unmounts and hands control to the main layout.
- **Global 3D Environment**: Contains `DataArchitecture.jsx` and `TronGrid.jsx` to render the interactive background layers.
- **GSAP ScrollTrigger**: Manages the global scroll state (`scrollProgress`), triggering the anti-gravity float effect for all `.ares-section-wrapper` elements.

### Content Sections (The Mainframe)
- **`AresHero`**: The landing section. Emphasizes "System Architect" and "Java/Spring Boot". Features a 3D parallax effect on cursor movement.
- **`AresIdentity`**: The dossier/resume section. Uses glassmorphic bento-box layouts to display experience, a timeline, and a dedicated "Cloud & GenAI Infrastructure" panel.
- **`AresProjects`**: The project archive. Renders projects as "Active Protocols". Includes a detailed holographic modal (triggered by a `DECODE` button) that presents deep Engineering Case Studies.
- **`AresStream`**: The uplink hub. Contains direct communication links (GitHub, LinkedIn, LeetCode) and a mock terminal dispatch form with "Copy to Clipboard" functionality.

### Layout Components
- **`AresHeader`**: Sticky top navigation.
- **`AresFooter`**: The bottom anchor. Features a sleek telemetry data stream (e.g., `LATENCY 0.02ms :: HEAP 62%`) running on a continuous loop, reinforcing the backend/infrastructure theme.
- **`Magnetic`**: A wrapper component applied to interactive elements (like footer nav links) causing them to smoothly pull toward the user's cursor.

## 3. The 3D Environment & Shaders

The background is NOT a static image, but a live, responsive WebGL environment.
- **DataArchitecture.jsx (GLSL Raymarching)**: A fullscreen GLSL pass that renders an organic, infinite skyline of server monoliths. 
  - **Features**: Corridor camera (camera glides down an empty central avenue), fwidth-based anti-aliased triplanar grid (sharp scanlines), exponential fog (fades perfectly into the `#02040a` background).
  - **Interactivity**: The camera sways via GSAP-eased mouse parallax and responds to scroll depth. A `uIntro` uniform drives a cinematic "Through the Clouds" plunge animation directly after the boot sequence.

## 4. Styling System & Aesthetics

- **Color Palette**: Defined in `index.css` via CSS variables. 
  - Backgrounds: Absolute midnight black / dark tints (`#02040a`, `#0a0f18`).
  - Primary Accent: Rich Crimson (`#E63946`) and Cyan accents (`#00EEFC` in alternate themes).
- **Glassmorphism (`.glass-panel`)**: Used globally across all bento boxes and modals. Achieved via `backdrop-filter: blur(16px)` combined with a subtle translucent dark background `rgba(10, 15, 24, 0.4)` and a faint white/primary border.
- **Typography**: 
  - Headings / Display: `Space Grotesk`
  - Paragraphs / Detailed Text: `Inter`
  - Tags / Terminal Text / UI labels: `JetBrains Mono`

## 5. Recent Architectural Changes (Clean Route)
- **Removed Heavy Physics**: The `DebrisField.jsx` (which previously rained Three.js cubes into the footer) was intentionally removed in favor of a cleaner, premium aesthetic. The background raymarching shader carries the visual weight, while the footer remains sleek with a lightweight telemetry ticker.
- **Static Assets Purged**: Heavy placeholder backgrounds (`tron-background.png`) were removed from `App.jsx` since the dynamic shader occludes them completely, saving ~1.9MB on load. 

---
*Note for Claude: When building upon this architecture, adhere to the glassmorphic styling (`.glass-panel`), respect the GSAP animation lifecycles (prefer `useGSAP` hook), and maintain the high-fidelity cyber-brutalist aesthetic.*
