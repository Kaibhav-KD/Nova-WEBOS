import { OsSettings, Note, CalendarEvent, FileItem, DevLog } from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'nova_webos_settings_v1',
  NOTES: 'nova_webos_notes_v1',
  EVENTS: 'nova_webos_events_v1',
  FILES: 'nova_webos_files_v1',
  CALC_HISTORY: 'nova_webos_calc_history_v1',
};

export const defaultSettings: OsSettings = {
  theme: 'cyberpunk',
  wallpaper: 'canvas-grid',
  accentColor: '#00f0ff',
  clockFormat: '12h',
  showSeconds: true,
  soundEnabled: true,
  soundVolume: 65,
  glassBlur: true,
  animationsEnabled: true,
  showDesktopWidgets: true,
};

export const defaultNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Welcome to Nova WebOS 🚀',
    content: `# Welcome to Nova WebOS (v4.2.0)

Nova is a fully-interactive, futuristic browser operating system designed with native Web technologies.

## ✨ Key Features:
- **True Draggable & Resizable Windows** with active focus & boundary constraints.
- **Nova AI Assistant**: execute OS voice/text commands, app launching, calculations & queries.
- **Interactive Apps**: Notes, Calculator, Calendar, Alarm/Timer, File Explorer, System Dashboard, Music Synth, Terminal, and Browser.
- **Deep Persistence**: All notes, calendar events, settings & files are safely preserved in \`localStorage\`.
- **Procedural Sound**: Audio feedback and ambient synth created dynamically via Web Audio API.

Double click any icon or use the Nova launcher (bottom left) to get started!`,
    category: 'Guides',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'note-2',
    title: 'Terminal & Assistant Cheat Sheet',
    content: `### Nova AI Commands:
- "Open calculator"
- "Set timer for 5 minutes"
- "Change wallpaper to nebula"
- "Change theme to obsidian"
- "What time is it?"
- "Show system dashboard"

### Terminal (CLI) Commands:
- \`help\` - list all commands
- \`open <app>\` - launch any application
- \`ls\`, \`cat <filename>\` - navigate virtual filesystem
- \`neofetch\` - display futuristic system specs
- \`matrix\` - toggle cyber matrix mode
- \`uptime\` - view system running duration`,
    category: 'Shortcuts',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'note-3',
    title: 'Hackathon Mission Briefing',
    content: `Project Scope:
1. Pure vanilla architecture (HTML5 + CSS3 + Vanilla TS/JS).
2. Original visual identity - dark futuristic aesthetics with glassmorphism.
3. Functional window compositor with cascading and z-index elevation.
4. Devlogs #01, #02, #03 detailing design, challenges and architecture.`,
    category: 'Project',
    updatedAt: new Date().toISOString(),
  },
];

export const defaultEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    date: new Date().toISOString().split('T')[0],
    title: 'WebOS Hackathon Showcase',
    time: '14:00',
    color: '#00f0ff',
    description: 'Demonstrate Nova WebOS desktop, window compositor and Nova AI features.',
  },
  {
    id: 'event-2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    title: 'Nova v4.3 Architecture Review',
    time: '10:30',
    color: '#a855f7',
    description: 'Explore WebAssembly plugins and virtual network sockets.',
  },
  {
    id: 'event-3',
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    title: 'Community Feedback Session',
    time: '16:00',
    color: '#10b981',
    description: 'Collect UX feedback on draggable window handles and audio synthesizer.',
  },
];

export const defaultFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'README.md',
    path: '/Documents',
    type: 'file',
    size: '1.4 KB',
    updatedAt: new Date().toISOString(),
    content: `# Nova WebOS
Version: 4.2.0-release
Platform: Browser VFS (Virtual File System)
Compositor: Canvas2D + CSS3 Glassmorphism

Built with pure vanilla web technologies:
- Zero heavy framework dependencies
- High-frame-rate pointer event dragging
- Mathematical window boundary clipping
- Native Web Audio synthesizer`,
  },
  {
    id: 'file-2',
    name: 'system_manifest.json',
    path: '/System',
    type: 'file',
    size: '840 B',
    updatedAt: new Date().toISOString(),
    content: JSON.stringify({
      osName: 'Nova WebOS',
      kernel: '4.2.0-cyber',
      memoryTotal: '8192 MB (Virtual)',
      storageQuota: '50 MB LocalStorage',
      security: 'Sandboxed Browser Container',
      capabilities: ['VFS', 'Synthesizer', 'NovaAI', 'WindowCompositor', 'Multitasking'],
    }, null, 2),
  },
  {
    id: 'file-3',
    name: 'synth_presets.txt',
    path: '/Media',
    type: 'file',
    size: '512 B',
    updatedAt: new Date().toISOString(),
    content: `Cyber Horizon: 220Hz saw + 330Hz sub + 800Hz lowpass
Quantum Drift: 164Hz triangle + 246Hz sine + chorus
Midnight Matrix: 110Hz square + 440Hz arp + dynamic filter sweep`,
  },
  {
    id: 'folder-1',
    name: 'Documents',
    path: '/',
    type: 'folder',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder-2',
    name: 'System',
    path: '/',
    type: 'folder',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder-3',
    name: 'Media',
    path: '/',
    type: 'folder',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder-4',
    name: 'Downloads',
    path: '/',
    type: 'folder',
    updatedAt: new Date().toISOString(),
  },
];

export const devLogsData: DevLog[] = [
  {
    id: 'devlog-01',
    title: 'Devlog #01 — The Beginning',
    date: 'Phase 1: Architecture & Boot Sequence',
    subtitle: 'From Blank Canvas to Futuristic Desktop Operating System',
    sections: [
      {
        heading: '1. Project Vision & Framework Philosophy',
        body: 'The goal of Project WebOS was clear: build a browser-based operating system that looks, feels, and acts like a high-performance desktop rather than a static webpage. To fulfill the challenge, we chose a zero-framework architecture relying purely on modern HTML5, CSS3, and vanilla JavaScript/TypeScript. We bypassed bulky frontend libraries to ensure instantaneous cold boots, absolute control over layout thrashing, and native DOM manipulation for high-fps window dragging.',
      },
      {
        heading: '2. The Boot & Welcome Sequence',
        body: 'A true operating system requires ceremony. We implemented a dual-stage boot sequence: first, a terminal kernel initializer detailing subsystem status checks (Virtual Filesystem, Compositor, Sound Server, AI Engine), followed by a polished futuristic Welcome lock screen featuring high-precision telemetry, date/time clocks, and an immediate single-click "Start WebOS" launch button.',
      },
      {
        heading: '3. Desktop Compositor & Canvas Shader Wallpaper',
        body: 'Rather than using a static PNG wallpaper, we built an interactive HTML5 Canvas background. The background continuously computes an ethereal particle constellation and cybernetic grid that responds subtly to mouse pointer movements. A CSS Glassmorphism layer provides depth without obscuring readability.',
      },
    ],
  },
  {
    id: 'devlog-02',
    title: 'Devlog #02 — Building the OS Engine',
    subtitle: 'Window Mechanics, Taskbar, Multitasking & Virtual Filesystem',
    sections: [
      {
        heading: '1. Advanced Window Management & z-index Hierarchy',
        body: 'A web desktop lives or dies by its windowing mechanics. We developed a centralized WindowManager singleton that maintains active window focus, cascades new instances so they do not overlap identically, enforces edge boundaries so windows never clip off-screen, and supports 8-direction live resizing (N, S, E, W, NE, NW, SE, SW). Minimizing triggers a 3D matrix transform scale toward the taskbar, while maximizing stores pre-maximized dimensions for seamless restoring.',
      },
      {
        heading: '2. Dynamic Dock & System Tray',
        body: 'The taskbar acts as the mission control center. It features an App Launcher with real-time category filtering and search, active running application indicators with toggle-to-minimize behavior, quick audio controls, battery telemetry, and a system tray notification hub.',
      },
      {
        heading: '3. Virtual File System (VFS)',
        body: 'To make the desktop feel like a living machine, we engineered an in-memory & localStorage-backed Virtual File System (VFS). Users can browse folders, create and edit text files, preview content, and download files directly to their local disk.',
      },
    ],
  },
  {
    id: 'devlog-03',
    title: 'Devlog #03 — Final Evolution & Original Features',
    subtitle: 'Nova AI Assistant, Web Audio Synth, Persistence & Polish',
    sections: [
      {
        heading: '1. Original Innovation: Nova AI Assistant',
        body: 'As our standout original feature beyond any workshop guide, we created Nova AI. It features an intelligent natural language intent parser that can control the OS itself. Saying "open calculator", "set a timer for 3 minutes", "change theme to emerald", "what time is it?", or "run diagnostic" executes the requested OS action directly with voice-like typewriter responses.',
      },
      {
        heading: '2. Procedural Web Audio Synthesizer',
        body: 'Instead of loading bulky MP3 assets, we implemented a pure Web Audio API synthesizer. It generates pleasant dual-tone window launch chimes, soft tactile clicks, pulsating alarm frequencies, and even ambient synth music in our built-in Music Player with a real-time canvas frequency visualizer.',
      },
      {
        heading: '3. Full Persistence & Responsive Adaptation',
        body: 'All notes, calendar events, theme preferences, and files persist through localStorage so users can refresh anytime without losing work. On tablets or mobile screens, the desktop dynamically optimizes window dimensions, touch targets, and start menu drawers.',
      },
    ],
  },
];

class StorageManager {
  public getSettings(): OsSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        return { ...defaultSettings, ...JSON.parse(data) };
      }
    } catch {
      // fallback
    }
    return defaultSettings;
  }

  public saveSettings(settings: OsSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // localStorage disabled or quota exceeded
    }
  }

  public getNotes(): Note[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }
    return defaultNotes;
  }

  public saveNotes(notes: Note[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }

  public getEvents(): CalendarEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }
    return defaultEvents;
  }

  public saveEvents(events: CalendarEvent[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch {
      // ignore
    }
  }

  public getFiles(): FileItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FILES);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }
    return defaultFiles;
  }

  public saveFiles(files: FileItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(files));
    } catch {
      // ignore
    }
  }

  public resetAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
      localStorage.removeItem(STORAGE_KEYS.FILES);
      localStorage.removeItem(STORAGE_KEYS.CALC_HISTORY);
    } catch {
      // ignore
    }
  }

  public getStorageUsage(): { usedKb: number; percent: number } {
    try {
      let total = 0;
      for (const x in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
          total += (localStorage[x].length + x.length) * 2;
        }
      }
      const usedKb = Math.round(total / 1024);
      // Assume 5MB limit
      const percent = Math.min(100, Math.round((usedKb / 5120) * 100));
      return { usedKb, percent };
    } catch {
      return { usedKb: 12, percent: 1 };
    }
  }
}

export const storage = new StorageManager();
