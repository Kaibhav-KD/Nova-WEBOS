> **Mini Description**: *This document details the software architecture, component layers, service modules, state persistence mechanisms, window compositing pipeline, and audio/AI subsystems powering Nova WebOS.*

---

# Nova WebOS — System Architecture & Internals

Nova WebOS is designed as a client-first, highly modular Web Operating System built on TypeScript and modern browser standards (Web Audio API, Canvas 2D API, Web Storage, and DOM Compositing).

---

## 1. Architectural Topology

```
+-------------------------------------------------------------------------+
|                           User Presentation Layer                       |
|   +-------------------+  +-------------------+  +-------------------+   |
|   | Desktop & Shelves |  | Persistent Dock   |  | Holographic HUD   |   |
|   | (desktop.ts)      |  | (taskbar.ts)      |  | (widgets & tray)  |   |
|   +-------------------+  +-------------------+  +-------------------+   |
+-------------------------------------------------------------------------+
|                      Window Compositing Subsystem                       |
|   +-----------------------------------------------------------------+   |
|   |  WindowManager (windows.ts)                                     |   |
|   |  - Z-Index Stacking & Focus Dispatcher                          |   |
|   |  - Draggable Header Handlers (pointer-events-auto)              |   |
|   |  - Multi-directional 8-point Resizing Matrix                    |   |
|   |  - Maximize / Minimize / Restore Virtual State Machine          |   |
|   +-----------------------------------------------------------------+   |
+-------------------------------------------------------------------------+
|                        Application Ecosystem (12)                       |
|   Assistant | Terminal | Notes | Files | Dashboard | Music | DevLogs    |
|   Calendar  | Calc     | Alarm | Settings | Web Browser                 |
+-------------------------------------------------------------------------+
|                          Kernel & Core Services                         |
|  +--------------------+ +--------------------+ +--------------------+   |
|  | Virtual File System| | Storage Service    | | Sound Synthesizer  |   |
|  | (vfs.ts)           | | (storage.ts)       | | (sound.ts)         |   |
|  +--------------------+ +--------------------+ +--------------------+   |
|  +--------------------+ +--------------------+ +--------------------+   |
|  | Nova AI Engine     | | Notification Mgr   | | Canvas Wallpaper   |   |
|  | (ai.ts)            | | (notifications.ts) | | (wallpaper.ts)     |   |
|  +--------------------+ +--------------------+ +--------------------+   |
+-------------------------------------------------------------------------+
|                     Browser Hardware & Web APIs                         |
|   DOM API | Web Audio Context | LocalStorage | Canvas 2D | Clipboard    |
+-------------------------------------------------------------------------+
```

---

## 2. Core Service Modules

### 2.1 Window Manager (`src/services/windows.ts`)
The `WindowManager` acts as the operating system's window compositing manager:
- **Registry**: Manages registered application factories (`AppDefinition`) with unique IDs, window dimensions, icons, and categories.
- **Z-Index Layering**: Employs monotonically incrementing z-index stacking (`baseZIndex = 100`) so clicking any window brings it directly to the foreground.
- **Transform State**: Stores coordinates `(x, y)`, dimensions `(w, h)`, and previous pre-maximized rectangles for smooth restoration.
- **Mount Target**: Mounts windows inside `#windows-container` with `pointer-events-none` on the backdrop and `pointer-events-auto` on window frames, preventing clicks from bleeding into background components.
- **Event Dispatching**: Employs reactive change listeners (`onWindowsChange`) that notify the desktop dock and taskbar whenever windows open, close, minimize, or switch focus.

### 2.2 Virtual File System — VFS (`src/services/vfs.ts`)
Provides an in-memory and persisted UNIX-like file system:
- **Directory Hierarchy**: `/root`, `/home/user`, `/home/user/documents`, `/system`, and `/apps`.
- **Node Structure**: Support for files (with text/binary content, size, and MIME type) and directories.
- **Standard Operations**: `readFile()`, `writeFile()`, `deleteFile()`, `mkdir()`, `listDir()`, and `exists()`.
- **System Seeding**: Seeds sample cybernetic logs, system readmes, user documents, and config profiles on first boot.

### 2.3 Storage & Configuration (`src/services/storage.ts`)
- Encapsulates schema-validated local storage operations for OS user settings.
- Manages:
  - Theme selection (`cyberpunk`, `obsidian`, `aurora`, `emerald`, `solar`)
  - Wallpaper engine (`matrix`, `waves`, `particles`, `grid`, `space`)
  - Sound effects toggle and master volume (0–100%)
  - Clock preferences (12-hour vs. 24-hour, show seconds)
  - Desktop widget visibility toggle
  - Application notes, alarms, and calendar events

### 2.4 Procedural Sound Synthesizer (`src/services/sound.ts`)
- Pure browser Web Audio API synthesizer that requires no external audio assets:
  - **Oscillators**: Sine, triangle, and sawtooth waves shaped with custom attack/decay/sustain/release (ADSR) envelope gain nodes.
  - **Harmonic Chimes**: Chime sequences for window open, close, maximize, error warning, and boot chime.
  - **Ambient Music Generator**: Interactive synth pads used in the Music Synth app for realtime procedural cyber ambient tracks.

### 2.5 Nova AI Engine (`src/services/ai.ts`)
- In-browser AI inference and rule-based fallback assistant capable of:
  - Natural language parsing of system commands (`open terminal`, `set timer 5m`, `theme aurora`).
  - Code generation, markdown formatting, and system diagnostic explanations.
  - Autonomous task execution across the desktop environment.

### 2.6 Notification Center (`src/services/notifications.ts`)
- High-priority floating toast dispatcher rendered inside `#toast-container` (`z-[9999]`).
- Supports `info`, `success`, `warning`, and `error` toasts with automatic dismissal timers and click-to-dismiss capabilities.

---

## 3. Window Lifecycle & State Diagram

```
                 [ User Launches App ]
                          |
                          v
                 +-----------------+
                 |  openWindow()   |
                 +-----------------+
                          |
              +-----------+-----------+
              |                       |
       [ App Already Open ]     [ New Instance ]
              |                       |
              v                       v
    +-------------------+   +--------------------+
    | If Minimized:     |   | Instantiate Frame  |
    | restoreWindow()   |   | Render Content     |
    +-------------------+   | Set Geometry (x,y) |
              |             | Stacking z-index   |
              |             +--------------------+
              v                       |
    +---------------------------------+
    |                                 |
    v                                 v
+------------------+         +------------------+
|  focusWindow()   |         |  minimizeWindow()|
|  (Active state)  |<------->|  (Hidden / Dock) |
+------------------+         +------------------+
         |                            |
         |                            |
         +-------------+--------------+
                       |
                       v
             +--------------------+
             |   closeWindow()    |
             |   Cleanup DOM/Refs |
             +--------------------+
```

---

## 4. Performance & Resource Constraints

1. **Zero External CSS Framework Runtime**: Compiled via Tailwind utility classes with tree-shaking for minimal payload.
2. **Hardware Acceleration**: Background canvas runs at requestAnimationFrame with throttling when window loses focus.
3. **No Memory Leaks**: Event listeners attached during window instantiation are removed when windows are closed.
4. **Sandboxed Iframe Resilient**: Bypasses browser alert modals in favor of native in-OS toasts and sound synthesizers.
