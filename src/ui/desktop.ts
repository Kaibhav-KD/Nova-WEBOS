import { windowManager } from '../services/windows';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { notifications } from '../services/notifications';
import { novaAI } from '../services/ai';
import { getSvgIcon } from '../ui/icons';
import { AppDefinition } from '../types';

export class DesktopEnvironment {
  private container: HTMLElement;
  private selectedIconId: string | null = null;
  private activeCategory: string = 'all';
  private searchQuery: string = '';
  private contextMenuEl: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init() {
    this.render();
    this.setupContextMenu();
  }

  private render() {
    const settings = storage.getSettings();

    this.container.className =
      'w-full h-full flex flex-col relative overflow-hidden select-none p-3 sm:p-5';

    this.container.innerHTML = `
      <!-- TOP DESKTOP TOOLBAR: Smart Category Filter & Quick Launcher -->
      <div id="desktop-toolbar" class="flex flex-wrap items-center justify-between gap-3 mb-4 z-20 pointer-events-auto">
        <!-- Category Filter Pills -->
        <div class="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <button data-cat="all" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm transition-all">
            All Apps (12)
          </button>
          <button data-cat="core" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all">
            Core & AI
          </button>
          <button data-cat="productivity" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all">
            Productivity
          </button>
          <button data-cat="media" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all">
            Tools & Media
          </button>
        </div>

        <!-- Search desktop apps & widget toggle -->
        <div class="flex items-center gap-2">
          <div class="relative hidden sm:block">
            <span class="absolute left-3 top-2 text-slate-400">${getSvgIcon('search', 'w-3.5 h-3.5')}</span>
            <input type="text" id="desktop-filter-input" placeholder="Filter desktop..."
              class="w-36 lg:w-48 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-xl pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:w-56 transition-all" />
          </div>

          <button id="toggle-widgets-btn" class="px-2.5 py-1.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5">
            <span class="text-cyan-400">${getSvgIcon('dashboard', 'w-3.5 h-3.5')}</span>
            <span class="hidden md:inline">Widgets</span>
          </button>
        </div>
      </div>

      <!-- MAIN DESKTOP CONTENT: Icons Work Area + Right Widgets Panel -->
      <div class="flex-1 flex gap-4 overflow-hidden relative z-10">
        <!-- Desktop Icons Work Area (Scrollable if compact screen) -->
        <div id="desktop-icons-area" class="flex-1 overflow-y-auto pr-1 no-scrollbar flex flex-col gap-6">
          <!-- Rendered dynamically by category or unified grid -->
        </div>

        <!-- RIGHT SIDE: Modern Desktop Widgets Column -->
        <div id="desktop-widgets-col" class="w-72 hidden xl:flex flex-col gap-3.5 shrink-0 overflow-y-auto no-scrollbar pointer-events-auto" style="display: ${
          settings.showDesktopWidgets ? 'flex' : 'none'
        }">
          <!-- Widget 1: Holographic Chrono & Telemetry -->
          <div class="p-4 rounded-3xl bg-slate-950/75 border border-white/15 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-2 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl pointer-events-none"></div>
            <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span class="flex items-center gap-1.5 text-cyan-400">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                QUANTUM CLOCK
              </span>
              <span class="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">ONLINE</span>
            </div>
            <div id="chrono-time" class="text-3xl font-bold font-mono text-slate-100 tracking-wider">--:--:--</div>
            <div id="chrono-date" class="text-xs text-slate-400">Loading date...</div>

            <!-- Mini Telemetry Bars -->
            <div class="pt-2.5 border-t border-white/10 flex flex-col gap-2 text-[10px] font-mono">
              <div>
                <div class="flex justify-between text-slate-400 mb-1">
                  <span>CPU SYNAPSE</span>
                  <span id="widget-cpu-val" class="text-cyan-300">18%</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="widget-cpu-bar" class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" style="width: 18%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-slate-400 mb-1">
                  <span>RAM MATRIX</span>
                  <span id="widget-ram-val" class="text-purple-300">4.2 / 16 GB</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style="width: 28%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Widget 2: Nova AI Quick Command Bar -->
          <div class="p-4 rounded-3xl bg-slate-950/75 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
                  ${getSvgIcon('assistant', 'w-4 h-4')}
                </div>
                <span class="text-xs font-bold text-slate-200">Nova AI Command</span>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">READY</span>
            </div>

            <div class="relative">
              <input type="text" id="widget-ai-input" placeholder="Type prompt or command..."
                class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400" />
            </div>

            <!-- Quick Prompt Pills -->
            <div class="flex flex-wrap gap-1.5 text-[10px]">
              <button data-prompt="check system status" class="ai-quick-chip px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors">
                ⚡ Check Status
              </button>
              <button data-prompt="open terminal" class="ai-quick-chip px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors">
                💻 Terminal
              </button>
              <button data-prompt="set timer 5m" class="ai-quick-chip px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors">
                ⏱️ 5m Timer
              </button>
            </div>
          </div>

          <!-- Widget 3: Desktop Quick Sticky Note -->
          <div class="p-4 rounded-3xl bg-amber-950/25 border border-amber-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-amber-300 flex items-center gap-1.5">
                ${getSvgIcon('notes', 'w-4 h-4 text-amber-400')}
                Quick Scratchpad
              </span>
              <button id="open-scratchpad-in-notes" class="text-[10px] text-amber-400/80 hover:text-amber-300 underline transition-colors">
                Open Notes →
              </button>
            </div>
            <textarea id="desktop-scratchpad" placeholder="Type quick thought right here... auto-saves."
              class="w-full h-20 bg-black/20 border border-white/5 rounded-xl p-2.5 text-xs text-amber-100 placeholder-amber-400/50 resize-none focus:outline-none focus:border-amber-400/50"></textarea>
          </div>
        </div>
      </div>

      <!-- Windows Mount Container (Bound inside Desktop) -->
      <div id="windows-container" class="absolute inset-0 overflow-hidden pointer-events-none z-30"></div>
    `;

    this.bindEvents();
    this.renderOrganizedAppSections();
    this.startChrono();
    this.loadScratchpad();
  }

  private renderOrganizedAppSections() {
    const area = this.container.querySelector('#desktop-icons-area');
    if (!area) return;

    const allApps = windowManager.getRegisteredApps();

    // Definitions of categories
    const categories = [
      {
        id: 'core',
        title: 'Core System & AI Hub',
        desc: 'Autonomous assistant, kernel diagnostics & files',
        appIds: ['assistant', 'dashboard', 'devlogs', 'files'],
        accent: 'cyan',
      },
      {
        id: 'productivity',
        title: 'Productivity Suite',
        desc: 'Documentation, schedule & calculations',
        appIds: ['notes', 'calendar', 'calculator', 'alarm'],
        accent: 'purple',
      },
      {
        id: 'media',
        title: 'Cyber Tools & Media',
        desc: 'Synthesizer, shell terminal & web',
        appIds: ['terminal', 'music', 'browser', 'settings'],
        accent: 'emerald',
      },
    ];

    let sectionsToRender = categories;
    if (this.activeCategory !== 'all') {
      sectionsToRender = categories.filter((c) => c.id === this.activeCategory);
    }

    // Filter by search query if any
    let html = '';
    sectionsToRender.forEach((sec) => {
      let apps = allApps.filter((a) => sec.appIds.includes(a.id));
      if (this.searchQuery) {
        apps = apps.filter((a) => a.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }

      if (apps.length === 0) return;

      html += `
        <div class="flex flex-col gap-2.5">
          <!-- Section Header -->
          <div class="flex items-center gap-2 px-1">
            <span class="w-2 h-2 rounded-full ${
              sec.accent === 'cyan' ? 'bg-cyan-400' : sec.accent === 'purple' ? 'bg-purple-400' : 'bg-emerald-400'
            }"></span>
            <h3 class="text-xs font-bold font-display uppercase tracking-wider text-slate-200">${sec.title}</h3>
            <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">— ${sec.desc}</span>
          </div>

          <!-- Section Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            ${apps.map((app) => this.renderAppCard(app, sec.accent)).join('')}
          </div>
        </div>
      `;
    });

    if (!html) {
      html = `
        <div class="p-8 text-center text-slate-400 text-xs">
          No applications matched "${this.searchQuery}".
        </div>
      `;
    }

    area.innerHTML = html;
    this.bindIconEvents();
  }

  private renderAppCard(app: AppDefinition, accent: string): string {
    const isSelected = this.selectedIconId === app.id;
    return `
      <div data-appid="${app.id}" class="desktop-app-card group relative p-3 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border ${
      isSelected ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'border-white/10 hover:border-white/20'
    } backdrop-blur-xl cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-center gap-3">
        <!-- Icon Badge -->
        <div class="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
          accent === 'cyan'
            ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]'
            : accent === 'purple'
            ? 'bg-purple-500/15 text-purple-300 border border-purple-400/30 group-hover:shadow-[0_0_12px_rgba(192,132,252,0.4)]'
            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.4)]'
        } transition-all">
          ${getSvgIcon(app.icon, 'w-5 h-5')}
        </div>

        <!-- App Info -->
        <div class="flex-1 overflow-hidden">
          <div class="text-xs font-bold text-slate-200 group-hover:text-white truncate transition-colors">
            ${app.title}
          </div>
          <p class="text-[10px] text-slate-400 truncate">
            Double click to open
          </p>
        </div>
      </div>
    `;
  }

  private bindIconEvents() {
    this.container.querySelectorAll('.desktop-app-card').forEach((card) => {
      const appId = card.getAttribute('data-appid');

      // Click: selection feedback
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedIconId = appId;
        this.container.querySelectorAll('.desktop-app-card').forEach((c) => {
          c.classList.remove('border-cyan-400', 'bg-cyan-500/10', 'shadow-[0_0_20px_rgba(0,240,255,0.3)]');
          c.classList.add('border-white/10');
        });
        card.classList.add('border-cyan-400', 'bg-cyan-500/10', 'shadow-[0_0_20px_rgba(0,240,255,0.3)]');
        card.classList.remove('border-white/10');
      });

      // Double-click (or single click if mobile) to launch app
      card.addEventListener('dblclick', () => {
        if (appId) {
          sound.playOpen();
          windowManager.openWindow(appId);
        }
      });

      // Mobile touch helper
      let touchTimer: any = null;
      card.addEventListener('touchend', () => {
        if (touchTimer) {
          clearTimeout(touchTimer);
          touchTimer = null;
          if (appId) {
            sound.playOpen();
            windowManager.openWindow(appId);
          }
        } else {
          touchTimer = setTimeout(() => {
            touchTimer = null;
            if (appId) {
              sound.playOpen();
              windowManager.openWindow(appId);
            }
          }, 350);
        }
      });
    });

    // Deselect on clicking empty desktop
    this.container.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.desktop-app-card')) return;
      this.selectedIconId = null;
      this.container.querySelectorAll('.desktop-app-card').forEach((c) => {
        c.classList.remove('border-cyan-400', 'bg-cyan-500/10', 'shadow-[0_0_20px_rgba(0,240,255,0.3)]');
        c.classList.add('border-white/10');
      });
    });
  }

  private bindEvents() {
    // Category pills
    this.container.querySelectorAll('.desktop-cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const cat = btn.getAttribute('data-cat') || 'all';
        this.activeCategory = cat;

        this.container.querySelectorAll('.desktop-cat-btn').forEach((b) => {
          b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400/40', 'font-semibold');
          b.classList.add('text-slate-400', 'border-transparent', 'font-medium');
        });
        btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400/40', 'font-semibold');
        btn.classList.remove('text-slate-400', 'border-transparent', 'font-medium');

        this.renderOrganizedAppSections();
      });
    });

    // Desktop filter input
    const filterInput = this.container.querySelector('#desktop-filter-input') as HTMLInputElement;
    filterInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value;
      this.renderOrganizedAppSections();
    });

    // Toggle widgets button
    const toggleWidgetsBtn = this.container.querySelector('#toggle-widgets-btn');
    toggleWidgetsBtn?.addEventListener('click', () => {
      sound.playClick();
      const col = this.container.querySelector('#desktop-widgets-col') as HTMLElement;
      if (col) {
        const isHidden = col.style.display === 'none';
        col.style.display = isHidden ? 'flex' : 'none';
        const st = storage.getSettings();
        st.showDesktopWidgets = isHidden;
        storage.saveSettings(st);
      }
    });

    // Widget AI prompt input
    const aiInp = this.container.querySelector('#widget-ai-input') as HTMLInputElement;
    aiInp?.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' && aiInp.value.trim()) {
        const text = aiInp.value.trim();
        aiInp.value = '';
        sound.playOpen();
        windowManager.openWindow('assistant');
        setTimeout(async () => {
          const win = windowManager.getOpenWindows().find((w) => w.appId === 'assistant');
          if (win) {
            const input = win.contentElement.querySelector('#ai-input') as HTMLInputElement;
            const sendBtn = win.contentElement.querySelector('#ai-send-btn') as HTMLButtonElement;
            if (input && sendBtn) {
              input.value = text;
              sendBtn.click();
              return;
            }
          }
          await novaAI.processQuery(text);
        }, 300);
      }
    });

    // AI prompt chips
    this.container.querySelectorAll('.ai-quick-chip').forEach((chip) => {
      chip.addEventListener('click', async () => {
        const p = chip.getAttribute('data-prompt');
        if (p) {
          sound.playOpen();
          windowManager.openWindow('assistant');
          setTimeout(async () => {
            const win = windowManager.getOpenWindows().find((w) => w.appId === 'assistant');
            if (win) {
              const input = win.contentElement.querySelector('#ai-input') as HTMLInputElement;
              const sendBtn = win.contentElement.querySelector('#ai-send-btn') as HTMLButtonElement;
              if (input && sendBtn) {
                input.value = p;
                sendBtn.click();
                return;
              }
            }
            await novaAI.processQuery(p);
          }, 300);
        }
      });
    });

    // Open Scratchpad in Notes
    this.container.querySelector('#open-scratchpad-in-notes')?.addEventListener('click', () => {
      sound.playClick();
      windowManager.openWindow('notes');
    });

    // Chrono Card click -> open calendar
    this.container.querySelector('#chrono-time')?.parentElement?.addEventListener('click', () => {
      sound.playClick();
      windowManager.openWindow('calendar');
    });

    // Scratchpad auto-save
    const scratch = this.container.querySelector('#desktop-scratchpad') as HTMLTextAreaElement;
    scratch?.addEventListener('input', () => {
      localStorage.setItem('nova_desktop_scratchpad', scratch.value);
    });
  }

  private loadScratchpad() {
    const scratch = this.container.querySelector('#desktop-scratchpad') as HTMLTextAreaElement;
    if (scratch) {
      scratch.value =
        localStorage.getItem('nova_desktop_scratchpad') ||
        'Welcome to Nova WebOS!\n- Multitask seamlessly\n- Press Alt+Space for Nova AI';
    }
  }

  private startChrono() {
    const update = () => {
      const now = new Date();
      const timeEl = this.container.querySelector('#chrono-time');
      const dateEl = this.container.querySelector('#chrono-date');
      const cpuVal = this.container.querySelector('#widget-cpu-val');
      const cpuBar = this.container.querySelector('#widget-cpu-bar') as HTMLElement;

      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        });
      }

      // Live CPU fluctuation simulation
      if (cpuVal && cpuBar && Math.random() > 0.6) {
        const cpu = Math.floor(12 + Math.random() * 18);
        cpuVal.textContent = `${cpu}%`;
        cpuBar.style.width = `${cpu}%`;
      }
    };

    update();
    setInterval(update, 1000);
  }

  private setupContextMenu() {
    this.container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY);
    });

    window.addEventListener('click', (e) => {
      if (this.contextMenuEl && !(e.target as HTMLElement).closest('#desktop-context-menu')) {
        this.contextMenuEl.remove();
        this.contextMenuEl = null;
      }
    });
  }

  private showContextMenu(x: number, y: number) {
    if (this.contextMenuEl) {
      this.contextMenuEl.remove();
    }

    const menu = document.createElement('div');
    menu.id = 'desktop-context-menu';
    menu.className =
      'fixed z-[9999] w-60 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2 flex flex-col gap-1 text-xs select-none';

    const posX = Math.min(x, window.innerWidth - 250);
    const posY = Math.min(y, window.innerHeight - 280);
    menu.style.left = `${posX}px`;
    menu.style.top = `${posY}px`;

    menu.innerHTML = `
      <button data-action="notes" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-cyan-400">${getSvgIcon('notes', 'w-4 h-4')}</span>
        <span>Create New Note</span>
      </button>
      <button data-action="terminal" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-emerald-400">${getSvgIcon('terminal', 'w-4 h-4')}</span>
        <span>Open Terminal CLI</span>
      </button>
      <button data-action="assistant" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-cyan-400">${getSvgIcon('assistant', 'w-4 h-4')}</span>
        <span>Launch Nova AI</span>
      </button>
      <button data-action="dashboard" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-cyan-400">${getSvgIcon('dashboard', 'w-4 h-4')}</span>
        <span>System Dashboard</span>
      </button>
      <button data-action="devlogs" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-purple-300 flex items-center gap-2.5 transition-colors">
        <span class="text-purple-400">${getSvgIcon('devlogs', 'w-4 h-4')}</span>
        <span>Dev Logs Journal</span>
      </button>
      <div class="my-1 border-t border-white/10"></div>
      <button data-action="settings" class="ctx-item px-3 py-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2.5 transition-colors">
        <span class="text-slate-400">${getSvgIcon('settings', 'w-4 h-4')}</span>
        <span>Personalize Desktop & Themes</span>
      </button>
      <button data-action="refresh" class="ctx-item px-3 py-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2.5 transition-colors">
        <span class="text-slate-400">${getSvgIcon('refresh', 'w-4 h-4')}</span>
        <span>Refresh Desktop</span>
      </button>
    `;

    document.body.appendChild(menu);
    this.contextMenuEl = menu;

    menu.querySelectorAll('.ctx-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const act = btn.getAttribute('data-action');
        if (act === 'refresh') {
          this.renderOrganizedAppSections();
          notifications.show({ title: 'Desktop', message: 'Desktop refreshed', type: 'info' });
        } else if (act) {
          windowManager.openWindow(act);
        }
        menu.remove();
        this.contextMenuEl = null;
      });
    });
  }
}
