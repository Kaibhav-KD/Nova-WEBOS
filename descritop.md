> **Mini Description**: *This document outlines the desktop environment architecture of Nova WebOS, detailing the workspace layout, category shelves, interactive desktop widgets (Quantum Chrono, Nova AI Command, Sticky Scratchpad), context menu subsystems, and desktop interaction patterns.*

---

# Nova WebOS — Desktop Environment Specification

The Nova WebOS desktop provides an organized, high-density cybernetic computing canvas designed for responsive multitasking, immediate accessibility, and aesthetic elegance.

---

## 1. Desktop Topology & Layout Structure

The desktop canvas occupies the full viewport between the top status area and the persistent bottom taskbar dock:

```
+-----------------------------------------------------------------------------+
| Desktop Environment Header (Category Filters: All, Core, Prod, Media)      |
+------------------------------------------------------+----------------------+
|                                                      | Desktop Widgets Col  |
|  [Core System & AI Hub]                              |                      |
|  +--------------+ +--------------+ +--------------+  |  [ Quantum Chrono ]  |
|  | Nova AI      | | SysDashboard | | Dev Logs     |  |  * Time & Telemetry  |
|  +--------------+ +--------------+ +--------------+  |                      |
|                                                      |  [ Nova AI Command ] |
|  [Productivity Suite]                                |  * Instant Query Inp |
|  +--------------+ +--------------+ +--------------+  |  * Quick Prompt Pills|
|  | Notes & Docs | | Calendar     | | Calculator   |  |                      |
|  +--------------+ +--------------+ +--------------+  |  [ Sticky Pad ]      |
|                                                      |  * Auto-saving Notes |
|  [Tools & Cyber Media]                               |                      |
|  +--------------+ +--------------+ +--------------+  |                      |
|  | Terminal CLI | | Music Synth  | | Nova Browser |  |                      |
|  +--------------+ +--------------+ +--------------+  |                      |
|                                                      |                      |
|  (Windows Mount Container: z-30 pointer-events-none, |                      |
|   Individual Windows: pointer-events-auto)           |                      |
+------------------------------------------------------+----------------------+
| Taskbar Dock (Start Menu | AI Search | App Icons | Audio Tray | Clock)      |
+-----------------------------------------------------------------------------+
```

---

## 2. Workspace Organization & Smart Categorization

Instead of an unorganized scatter of desktop icons, Nova WebOS organizes applications into logical functional categories:

### A. Core System & AI Hub (Cyan Accent)
- **Nova AI Assistant**: Autonomous natural language assistant, terminal automation, and system diagnostics.
- **System Dashboard**: Real-time hardware telemetry, CPU load, memory utilization, and VFS disk inspection.
- **Dev Logs Journal**: Interactive log viewer for system events, error telemetry, and internal audit trails.
- **File Manager**: Hierarchical virtual file explorer with file previews, creation, deletion, and editing.

### B. Productivity Suite (Purple Accent)
- **Notes & Docs**: Rich markdown-capable document editor with persistent storage and export capabilities.
- **Calendar & Schedule**: Event scheduler, monthly visualizer, agenda tracker, and task planning.
- **Quantum Calculator**: Dual-mode (standard and scientific) arithmetic calculator with calculation history log.
- **Alarm & Timer**: Multi-timer utility with audio chimes and countdown alerts.

### C. Cyber Tools & Media (Emerald Accent)
- **Terminal CLI**: Full-featured bash-like terminal with built-in commands (`cat`, `ls`, `ai`, `help`, `matrix`, `neofetch`).
- **Procedural Music Synth**: Polyphonic Web Audio synthesizer with generative cyber ambient arpeggiators and visualizer.
- **Nova Web Browser**: In-app cyber proxy browser with bookmarks, navigation controls, and dev inspect view.
- **System Settings**: Theme switcher, wallpaper engine controls, font sizing, and audio preferences.

---

## 3. Desktop Widgets Panel

Located on the right side of the desktop (`w-72`), collapsible via the top toolbar toggle:

1. **Holographic Chrono & Telemetry**:
   - Digital real-time clock and localized day/date display.
   - Dynamic CPU Synapse and RAM Matrix consumption meters with simulated live jitter.
2. **Nova AI Quick Command Bar**:
   - Inline prompt input bar for launching natural language queries directly from the desktop.
   - Quick prompt pills for one-click action dispatch:
     - `⚡ Check Status`
     - `💻 Terminal`
     - `⏱️ 5m Timer`
3. **Desktop Sticky Scratchpad**:
   - Instant notepad with zero-latency local storage autosave (`nova_desktop_scratchpad`).
   - One-click "Open Notes →" link to transfer scratch thoughts into the full document editor.

---

## 4. Context Menu System

Right-clicking anywhere on the empty desktop canvas opens a floating cybernetic context menu positioned dynamically within window bounds:

- **Create New Note**: Spawns a fresh note session in Notes & Docs.
- **Open Terminal CLI**: Launches the bash command console.
- **Launch Nova AI**: Opens the autonomous assistant dialog.
- **System Dashboard**: Opens the telemetry and hardware monitor.
- **Dev Logs Journal**: Inspects system boot and event traces.
- **Personalize Desktop & Themes**: Fast shortcut to visual preferences.
- **Refresh Desktop**: Re-indexes apps and resets category shelf views.

---

## 5. Interaction Patterns & Gestures

| Interaction | Action |
|-------------|--------|
| **Single Click (Icon)** | Highlights app card with an active cybernetic border. |
| **Double Click (Icon)** | Spawns or focuses the application window with audio feedback. |
| **Touch Tap (Mobile)** | Smart double-tap detection (350ms window) for launching apps without accidental taps. |
| **Right Click (Canvas)** | Displays context menu at cursor coordinates. |
| **Filter Bar Input** | Dynamically filters app cards across all category shelves in real-time. |
| **⌘K / Taskbar Pill** | Instantly focuses the Nova AI command center. |
