import { WindowState } from '../types';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

interface DevlogEntry {
  id: string;
  tag: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  badge: string;
  badgeColor: string;
  summary: string;
  sections: { heading: string; body: string; highlights?: string[] }[];
}

export function renderDevlogsApp(container: HTMLElement, win: WindowState) {
  const devlogs: DevlogEntry[] = [
    {
      id: 'devlog-1',
      number: '#01',
      tag: 'Genesis & Core Architecture',
      title: 'Devlog #01 — The Beginning',
      subtitle: 'From Blank Canvas to a Living Browser Desktop',
      date: 'Cycle 01 // Architecture Sprint',
      readTime: '4 min read',
      badge: 'ARCHITECTURAL FOUNDATION',
      badgeColor: 'cyan',
      summary:
        'Conceiving a full desktop operating system inside the browser without heavyweight UI frameworks. Why raw DOM manipulation, modern CSS variables, and PointerEvents outperform virtual DOM abstractions for window compositing.',
      sections: [
        {
          heading: '1. Vision & Technical Philosophy',
          body:
            'Most web-based desktop simulations feel sluggish because they wrap every window coordinate update in heavy framework reconciliation cycles. For Nova WebOS, we committed to pure, unadulterated TypeScript and Vanilla DOM operations. By directly controlling element transforms and style properties during pointer dragging and corner resizing, we achieve buttery smooth 60 FPS motion on any device.',
          highlights: [
            'Zero virtual-DOM overhead during continuous mouse/touch dragging',
            'Full viewport boundary clamping with mathematical precision',
            'State preservation across window minimize, maximize, and restore',
          ],
        },
        {
          heading: '2. The Window Compositor & Layering Stack',
          body:
            'The initial challenge was establishing an unbreakable z-index layering pipeline. We designed a central Window Manager that maintains a monotonic z-index counter, automatically promoting active windows on pointerdown, recalculating bounds, and maintaining taskbar process states.',
          highlights: [
            'Dynamic z-index elevation and active window styling',
            'Sub-pixel coordinate snapping to prevent font blurring',
            'Responsive mobile fallback: full-screen touch ergonomics',
          ],
        },
        {
          heading: '3. Aesthetic Philosophy: Beyond Generic UI',
          body:
            'Rather than copying a standard Windows 95 or macOS template, Nova WebOS adopts a high-contrast cybernetic aesthetic: balanced neon accents, dark glassmorphism surfaces, subtle borders, and monospace telemetry. The experience transitions cleanly from a firmware POST bootloader, to a welcome gateway, to an unrestricted desktop.',
        },
      ],
    },
    {
      id: 'devlog-2',
      number: '#02',
      tag: 'Subsystems & Storage',
      title: 'Devlog #02 — Building the OS',
      subtitle: 'Constructing the VFS, Procedural Audio & Core Apps',
      date: 'Cycle 02 // Engineering Sprint',
      readTime: '6 min read',
      badge: 'SUBSYSTEMS & STORAGE',
      badgeColor: 'purple',
      summary:
        'Engineering the internal plumbing: an in-memory & localStorage Virtual File System (VFS), procedural Web Audio synthesizers, and complete productivity utilities (Notes, Calculator, Calendar, Alarm, and System Dashboard).',
      sections: [
        {
          heading: '1. In-Browser Virtual File System (VFS)',
          body:
            'A desktop OS requires real file exploration. We built a hierarchical VFS that stores folders, files, sizes, and timestamps directly in browser localStorage. Users can create directories, write text documents, inspect metadata in real-time, and download simulated files to their actual physical machine.',
          highlights: [
            'Hierarchical directory traversal with back/forward history stacks',
            'Instant document editor with live text saving',
            'Local file export via browser Blob generation',
          ],
        },
        {
          heading: '2. Procedural Web Audio Synthesizer',
          body:
            'External MP3 assets are prone to network latency and 404s. Nova WebOS features a procedural sound engine using the HTML5 Web Audio API. Using native oscillators and gain envelopes, we craft custom audio frequencies for window launches, clicks, timer alarms, and ambient electronic synthesizer tracks.',
          highlights: [
            'Zero external audio asset dependencies',
            'Real-time frequency modulation and harmonic gain shaping',
            'Live canvas audio spectrum visualizer in the Music Player',
          ],
        },
        {
          heading: '3. Full App Ecosystem',
          body:
            'We crafted 10 modular applications that run simultaneously inside the compositor: a full-featured Notes app with search and categories, scientific Calculator with keyboard input, System Dashboard with real-time animated CPU charts, and an Alarm/Timer with background timers.',
        },
      ],
    },
    {
      id: 'devlog-3',
      number: '#03',
      tag: 'Next-Gen Orchestration',
      title: 'Devlog #03 — Final Evolution',
      subtitle: 'Nova AI Assistant, Multi-Theming & Interactive Shell',
      date: 'Cycle 03 // Production Sprint',
      readTime: '5 min read',
      badge: 'AI & FINAL POLISH',
      badgeColor: 'emerald',
      summary:
        'Elevating the OS with our original signature innovation: Nova AI natural language assistant, interactive command terminal CLI, customizable themes, and unified desktop telemetry widgets.',
      sections: [
        {
          heading: '1. Original Innovation: Nova AI Assistant',
          body:
            'Operating systems are evolving from static menus to conversational control. Nova AI interprets natural language intents and directly executes OS-level operations: launching applications, setting timers, switching color themes, calculating math, or checking system status.',
          highlights: [
            'Intent extraction engine with fallback intelligent reasoning',
            'Direct programmatic coupling to WindowManager and storage services',
            'Suggested prompt pills and conversational memory',
          ],
        },
        {
          heading: '2. Nova SH: Interactive Terminal CLI',
          body:
            'For power users, we introduced a bash-style command shell with tab simulation, command history (up/down arrow keys), file inspection (`ls`, `cat`), application spawning (`open calc`), system spec banners (`neofetch`), and digital rain simulations (`matrix`).',
        },
        {
          heading: '3. Complete Customization & Persistence',
          body:
            'Users have complete sovereignty over their environment: 5 themes (Cyberpunk Neon, Obsidian Onyx, Nebula Aurora, Emerald Matrix, Solar Flare), customizable particle canvas wallpapers, clock options, and telemetry widgets—all automatically synchronized to localStorage.',
        },
      ],
    },
  ];

  let activeLogId = 'devlog-1';

  container.className = 'w-full h-full flex flex-col md:flex-row bg-slate-950/85 text-slate-100 select-none overflow-hidden font-sans';

  const updateUI = () => {
    const active = devlogs.find((d) => d.id === activeLogId) || devlogs[0];

    container.innerHTML = `
      <!-- Sidebar / List of Logs -->
      <div class="w-full md:w-72 bg-slate-900/60 border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0 h-44 md:h-full">
        <div class="p-3 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400">${getSvgIcon('devlogs', 'w-5 h-5')}</span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-200">Dev Logs Journal</h3>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">3 / 3</span>
        </div>

        <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
          ${devlogs
            .map(
              (d) => `
            <div data-id="${d.id}" class="devlog-nav-item p-3 rounded-xl cursor-pointer border transition-all ${
                d.id === activeLogId
                  ? 'bg-cyan-500/15 border-cyan-400/50 text-white shadow-lg shadow-cyan-500/15'
                  : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-300'
              }">
              <div class="flex items-center justify-between gap-1 mb-1">
                <span class="text-[10px] font-mono font-bold text-cyan-400">${d.number}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono">${d.readTime}</span>
              </div>
              <h4 class="text-xs font-semibold truncate text-slate-100">${d.title}</h4>
              <p class="text-[11px] text-slate-400 truncate mt-0.5">${d.subtitle}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Main Reader Area -->
      <div class="flex-1 overflow-y-auto p-5 sm:p-7 flex flex-col bg-slate-950/40">
        <div class="max-w-2xl mx-auto w-full flex flex-col gap-5">
          <!-- Header info -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                active.badgeColor === 'cyan'
                  ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
                  : active.badgeColor === 'purple'
                  ? 'bg-purple-500/15 border-purple-400/40 text-purple-300'
                  : 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
              }">
                ${active.badge}
              </span>
              <span class="text-xs text-slate-500 font-mono">•</span>
              <span class="text-xs text-slate-400 font-mono">${active.date}</span>
            </div>

            <h1 class="text-xl sm:text-2xl font-bold font-display text-slate-100 tracking-wide">${active.title}</h1>
            <p class="text-sm text-cyan-400 font-medium mt-1">${active.subtitle}</p>
          </div>

          <!-- Executive Summary Callout -->
          <div class="p-4 rounded-xl bg-white/5 border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-gradient-to-r from-cyan-950/20 to-transparent">
            "${active.summary}"
          </div>

          <!-- Sections -->
          <div class="flex flex-col gap-6 pt-2">
            ${active.sections
              .map(
                (sec) => `
              <div class="flex flex-col gap-2">
                <h3 class="text-sm font-bold text-slate-200 tracking-wide font-display">${sec.heading}</h3>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${sec.body}</p>

                ${
                  sec.highlights && sec.highlights.length > 0
                    ? `
                  <div class="mt-2 p-3 rounded-lg bg-black/30 border border-white/5 flex flex-col gap-1.5">
                    <span class="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-bold">Key Engineering Takeaways:</span>
                    <ul class="text-xs text-slate-400 list-disc pl-4 space-y-1">
                      ${sec.highlights.map((h) => `<li>${h}</li>`).join('')}
                    </ul>
                  </div>
                `
                    : ''
                }
              </div>
            `
              )
              .join('')}
          </div>

          <!-- Footer Stamp -->
          <div class="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Project: NOVA-WEBOS</span>
            <span>Status: PRODUCTION READY</span>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    container.querySelectorAll('.devlog-nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        sound.playClick();
        const id = item.getAttribute('data-id');
        if (id) {
          activeLogId = id;
          updateUI();
        }
      });
    });
  };

  updateUI();
}
