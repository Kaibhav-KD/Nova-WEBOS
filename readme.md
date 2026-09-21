> **Mini Description**: *This document provides the high-level overview, quick start guide, technology stack, directory layout, and feature highlights of Nova WebOS.*

---

# Nova WebOS — Futuristic Web Operating System

**Nova WebOS** is an interactive, futuristic cybernetic operating system running natively in the browser. It features a complete multi-window compositing manager, 12 built-in applications, an autonomous Nova AI companion, a procedural Web Audio synthesizer, an interactive virtual file system, and a customizable desktop environment.

---

## Highlights & Innovations

- **Comprehensive Multi-Window Environment**: Fluid draggable, 8-point resizable, maximizable, and minimizable windows with dynamic z-index stacking.
- **Dedicated Taskbar & Dock**: Persistent bottom dock (`z-[9990]`) with Start Menu, live app indicators, audio control tray, and quick desktop peek.
- **Organized Desktop Workspace**: Category-based application shelves (*Core & AI*, *Productivity*, *Tools & Cyber Media*), instant search filtering, and right-click desktop context menu.
- **Holographic Desktop Widgets**: Real-time quantum clock, live CPU/RAM telemetry bars, Nova AI command input with one-click prompt pills, and an autosaving sticky scratchpad.
- **12 Native Applications**: From autonomous AI assistant and terminal CLI to polyphonic synthesizer and markdown notes editor.
- **Procedural Audio Synthesizer**: Pure Web Audio API synthesizers producing harmonic cyber chimes, window sound effects, and ambient generative music.
- **5 Cyberpunk Themes**: Cyberpunk Cyan, Obsidian Slate, Aurora Violet, Matrix Emerald, and Solar Amber with live canvas wallpaper engines.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Core Runtime** | TypeScript 5.x / JavaScript ES2022 |
| **Styling & Layout** | Tailwind CSS with custom cyber glassmorphism and animations |
| **Audio Engine** | Web Audio API (ADSR gain envelopes, procedural oscillator nodes) |
| **Graphics & Wallpapers** | HTML5 Canvas 2D API (`requestAnimationFrame` live particle physics) |
| **Icons** | Custom Lucide SVG vectors integrated inline |
| **Build Tooling** | Vite 5.x / TypeScript compiler |

---

## Quick Start

### 1. Installation
```bash
# Clone the repository
git clone <repo-url>

# Navigate to the project directory
cd nova-webos

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Generates production-optimized static files in the `dist/` directory.

---

## Project Directory Structure

```
.
├── index.html                 # Main entry point & viewport mount
├── package.json               # Package manifests & scripts
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite configuration
├── metadata.json              # Application metadata & platform permissions
├── descritop.md               # Desktop environment specification
├── arch.md                    # System architecture & internals documentation
├── readme.md                  # Project overview & quick start guide
├── feature.md                 # Complete feature matrix & application guide
└── src/
    ├── main.ts                # Operating system bootstrap & lifecycle
    ├── index.css              # Global styles, glassmorphism & typography
    ├── types.ts               # Shared TypeScript types, interfaces & enums
    ├── apps/                  # 12 Built-in Applications
    │   ├── assistant.ts       # Nova AI Assistant
    │   ├── terminal.ts        # Cybernetic Terminal CLI
    │   ├── devlogs.ts         # System Dev Logs Journal
    │   ├── files.ts           # Virtual File System Explorer
    │   ├── dashboard.ts       # System Telemetry & Hardware Monitor
    │   ├── notes.ts           # Markdown Notes & Document Editor
    │   ├── calendar.ts        # Calendar, Agenda & Scheduler
    │   ├── music.ts           # Procedural Polyphonic Synthesizer
    │   ├── calculator.ts      # Scientific Quantum Calculator
    │   ├── alarm.ts           # Stopwatch, Alarm & Timer
    │   ├── browser.ts         # Nova Web Proxy Browser
    │   └── settings.ts        # Theme & Desktop Personalization
    ├── services/              # Core Kernel Services
    │   ├── ai.ts              # Nova AI Inference Engine
    │   ├── notifications.ts   # System Toast Notifications
    │   ├── sound.ts           # Web Audio Procedural Synth
    │   ├── storage.ts         # Persistent LocalStorage Manager
    │   ├── vfs.ts             # Virtual File System Hierarchy
    │   └── windows.ts         # Window Compositing & Z-Index Manager
    └── ui/                    # Presentation Components
        ├── bootscreen.ts      # Futuristic BIOS Boot & Welcome Screen
        ├── desktop.ts         # Organized Desktop Workspace & Shelves
        ├── taskbar.ts         # Bottom Taskbar, Start Menu & Audio Tray
        ├── wallpaper.ts       # Canvas Particle Wallpaper Engine
        └── icons.ts           # Unified Cyber SVG Icon Library
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Esc / Enter** | Skip BIOS boot sequence |
| **Alt + Space** | Quick launch / focus Nova AI Assistant |
| **⌘K (Click)** | Focus Taskbar AI command search |
| **Right Click** | Open Desktop context menu |
