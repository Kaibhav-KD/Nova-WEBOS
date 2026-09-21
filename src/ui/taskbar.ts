import { windowManager } from '../services/windows';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { notifications } from '../services/notifications';
import { getSvgIcon } from '../ui/icons';

export class Taskbar {
  private container: HTMLElement;
  private isStartOpen = false;
  private isTrayOpen = false;
  private clockInterval: number | null = null;
  private activeCategory: string = 'all';

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private init() {
    this.render();

    // Listen for window state changes to re-render taskbar badges and running indicators
    windowManager.onWindowsChange(() => {
      this.renderDockIcons();
    });

    // Close flyouts on clicking outside
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#start-menu-flyout') && !target.closest('#start-btn')) {
        if (this.isStartOpen) {
          this.isStartOpen = false;
          this.updateFlyoutsState();
        }
      }
      if (!target.closest('#tray-flyout') && !target.closest('#tray-btn')) {
        if (this.isTrayOpen) {
          this.isTrayOpen = false;
          this.updateFlyoutsState();
        }
      }
    });

    this.startClock();
  }

  private render() {
    this.container.className =
      'w-full h-14 bg-slate-950/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] flex items-center justify-between px-3 z-[9990] select-none relative';

    this.container.innerHTML = `
      <!-- LEFT SECTION: Start Button + Nova AI Search Pill -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Start Button -->
        <button id="start-btn" class="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 transition-all active:scale-95 shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:border-cyan-300">
          <span class="text-cyan-400 group-hover:scale-110 transition-transform">${getSvgIcon('nova-logo', 'w-5 h-5')}</span>
          <span class="text-xs font-bold font-display tracking-wider hidden sm:inline text-slate-100 group-hover:text-cyan-200">NOVA OS</span>
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse hidden sm:inline"></span>
        </button>

        <!-- Nova AI Quick Command Bar / Search Pill -->
        <div id="taskbar-ai-pill" class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 cursor-pointer transition-all text-slate-300 group shadow-inner">
          <span class="text-cyan-400 group-hover:scale-105 transition-transform">${getSvgIcon('assistant', 'w-4 h-4')}</span>
          <span class="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Ask Nova AI or search...</span>
          <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-cyan-300">⌘K</kbd>
        </div>
      </div>

      <!-- CENTER SECTION: Floating App Dock -->
      <div class="flex-1 flex items-center justify-center px-2 overflow-hidden h-full">
        <div id="taskbar-dock" class="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md overflow-x-auto max-w-full no-scrollbar">
          <!-- Dock icons rendered dynamically -->
        </div>
      </div>

      <!-- RIGHT SECTION: Control Center / System Tray -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Volume / Audio Flyout Toggle -->
        <button id="tray-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white border border-transparent hover:border-white/10 transition-all text-xs" title="Sound & Audio Controls">
          <span class="text-cyan-400">${getSvgIcon('volume', 'w-4 h-4')}</span>
          <span id="tb-vol-label" class="font-mono text-[11px] hidden sm:inline">75%</span>
        </button>

        <!-- Quick Theme Cycle -->
        <button id="theme-quick-btn" class="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-transparent hover:border-white/10 transition-colors" title="Quick Theme Switcher">
          ${getSvgIcon('settings', 'w-4 h-4')}
        </button>

        <!-- Clock & Calendar Pill -->
        <button id="taskbar-clock" class="flex flex-col items-end px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/5 hover:border-cyan-400/30 transition-all text-right group cursor-pointer" title="Click to open Calendar & Schedule">
          <span id="tb-time" class="text-xs font-mono font-bold text-slate-100 group-hover:text-cyan-300 tracking-wider">00:00:00</span>
          <span id="tb-date" class="text-[10px] text-slate-400 font-sans tracking-tight">Jan 01</span>
        </button>

        <!-- Show Desktop Peek Button -->
        <button id="peek-desktop-btn" class="w-2.5 h-8 rounded hover:bg-cyan-400/40 transition-colors border-l border-white/10" title="Show Desktop / Minimize All"></button>
      </div>

      <!-- ================= START MENU FLYOUT ================= -->
      <div id="start-menu-flyout" class="absolute bottom-16 left-3 w-[400px] max-w-[calc(100vw-24px)] rounded-3xl bg-slate-950/95 backdrop-blur-3xl border border-cyan-500/25 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 flex flex-col gap-4 transition-all duration-200 opacity-0 pointer-events-none translate-y-4 z-[9999]">
        <!-- User Profile & System Status Header -->
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/15">
              ${getSvgIcon('user', 'w-5 h-5')}
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
            </div>
            <div>
              <div class="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <span>Operative // Admin</span>
                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">v4.2</span>
              </div>
              <p class="text-[10px] text-slate-400 font-mono">Nova Quantum Kernel Active</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="start-devlogs-btn" class="p-2 rounded-xl text-slate-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors" title="Open Dev Logs Journal">
              ${getSvgIcon('devlogs', 'w-4 h-4')}
            </button>
            <button id="start-reboot-btn" class="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" title="Reboot WebOS">
              ${getSvgIcon('power', 'w-4 h-4')}
            </button>
          </div>
        </div>

        <!-- Search Bar with Live Filter -->
        <div class="relative">
          <span class="absolute left-3.5 top-3 text-cyan-400">${getSvgIcon('search', 'w-4 h-4')}</span>
          <input type="text" id="start-search-input" placeholder="Type app name, file or command..."
            class="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <button data-cat="all" class="start-cat-pill px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium">All (12)</button>
          <button data-cat="core" class="start-cat-pill px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent font-medium">Core & AI</button>
          <button data-cat="productivity" class="start-cat-pill px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent font-medium">Productivity</button>
          <button data-cat="media" class="start-cat-pill px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent font-medium">Tools & Web</button>
        </div>

        <!-- App Grid -->
        <div class="space-y-1">
          <div class="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1">Applications & Tools</div>
          <div id="start-apps-grid" class="grid grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Quick System Status Footer -->
        <div class="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <div class="flex items-center gap-1.5 text-cyan-300 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Online (Full Access)</span>
          </div>
          <button id="start-settings-btn" class="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors">
            ${getSvgIcon('settings', 'w-3.5 h-3.5')}
            <span>Settings</span>
          </button>
        </div>
      </div>

      <!-- ================= TRAY / AUDIO FLYOUT ================= -->
      <div id="tray-flyout" class="absolute bottom-16 right-3 w-80 rounded-3xl bg-slate-950/95 backdrop-blur-3xl border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 flex flex-col gap-4 transition-all duration-200 opacity-0 pointer-events-none translate-y-4 z-[9999]">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <span class="text-cyan-400">${getSvgIcon('volume', 'w-4 h-4')}</span>
            Audio & Control Hub
          </h4>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">SYNTH OK</span>
        </div>

        <!-- Audio Volume Slider & Mute -->
        <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">Master Synthesizer</span>
            <span id="tray-vol-text" class="font-mono text-cyan-300 font-bold">75%</span>
          </div>
          <div class="flex items-center gap-2.5">
            <button id="tray-mute-btn" class="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-400 transition-colors" title="Toggle Sound">
              ${getSvgIcon('volume', 'w-4 h-4')}
            </button>
            <input type="range" id="tray-vol-slider" min="0" max="100" value="75"
              class="flex-1 accent-cyan-400 cursor-pointer h-2 bg-white/15 rounded-lg" />
          </div>
          <button id="tray-test-sound-btn" class="w-full py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium transition-colors">
            Play Test Harmonic Chime
          </button>
        </div>

        <!-- Theme Switcher Grid -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Cyber Themes</span>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <button data-theme="cyberpunk" class="tray-theme-btn p-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
              <span>Cyberpunk</span>
            </button>
            <button data-theme="obsidian" class="tray-theme-btn p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-slate-200"></span>
              <span>Obsidian</span>
            </button>
            <button data-theme="aurora" class="tray-theme-btn p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
              <span>Aurora</span>
            </button>
            <button data-theme="emerald" class="tray-theme-btn p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
              <span>Matrix</span>
            </button>
            <button data-theme="solar" class="tray-theme-btn p-2 rounded-xl bg-orange-950/40 hover:bg-orange-900/50 border border-orange-500/40 text-orange-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]"></span>
              <span>Solar</span>
            </button>
            <button id="tray-open-settings" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex flex-col items-center gap-1 transition-all">
              <span class="text-slate-400">${getSvgIcon('settings', 'w-3 h-3')}</span>
              <span>More...</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderDockIcons();
    this.renderStartMenuApps();
  }

  private renderDockIcons() {
    const dock = this.container.querySelector('#taskbar-dock');
    if (!dock) return;

    const registered = windowManager.getRegisteredApps();
    const openWins = windowManager.getOpenWindows();
    const activeWinId = windowManager.getActiveWindowId();

    dock.innerHTML = registered
      .map((app) => {
        const appWins = openWins.filter((w) => w.appId === app.id);
        const isOpen = appWins.length > 0;
        const isActive = appWins.some((w) => w.id === activeWinId && !w.isMinimized);
        const isMinimized = isOpen && appWins.every((w) => w.isMinimized);

        return `
        <div class="relative group">
          <button data-appid="${app.id}" class="dock-app-btn relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isActive
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-105'
              : isOpen
              ? isMinimized
                ? 'bg-white/10 text-slate-300 border border-white/15 opacity-75'
                : 'bg-white/15 text-cyan-200 border border-white/20'
              : 'hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent hover:scale-105'
          }">
            ${getSvgIcon(app.icon, 'w-5 h-5')}

            <!-- Running indicator bar -->
            ${
              isOpen
                ? `<span class="absolute -bottom-1 left-2 right-2 h-1 rounded-full ${
                    isActive ? 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]' : 'bg-slate-400'
                  }"></span>`
                : ''
            }
          </button>

          <!-- Floating Tooltip -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-white/15 text-[11px] font-medium text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl z-50">
            ${app.title} ${isOpen ? (isMinimized ? '(Minimized)' : '(Running)') : ''}
          </div>
        </div>
      `;
      })
      .join('');

    dock.querySelectorAll('.dock-app-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const appId = btn.getAttribute('data-appid');
        if (!appId) return;

        const openWin = windowManager.getOpenWindows().find((w) => w.appId === appId);
        if (openWin) {
          if (openWin.isMinimized) {
            windowManager.restoreWindow(openWin.id);
            windowManager.focusWindow(openWin.id);
          } else if (windowManager.getActiveWindowId() === openWin.id) {
            // Already active, minimize it
            windowManager.minimizeWindow(openWin.id);
          } else {
            // Not active, focus it
            windowManager.focusWindow(openWin.id);
          }
        } else {
          windowManager.openWindow(appId);
        }
      });
    });
  }

  private renderStartMenuApps(filter: string = '') {
    const grid = this.container.querySelector('#start-apps-grid');
    if (!grid) return;

    let apps = windowManager.getRegisteredApps();

    // Category filtering
    if (this.activeCategory === 'core') {
      apps = apps.filter((a) => ['assistant', 'dashboard', 'devlogs', 'files'].includes(a.id));
    } else if (this.activeCategory === 'productivity') {
      apps = apps.filter((a) => ['notes', 'calendar', 'calculator', 'alarm'].includes(a.id));
    } else if (this.activeCategory === 'media') {
      apps = apps.filter((a) => ['terminal', 'music', 'browser', 'settings'].includes(a.id));
    }

    if (filter) {
      apps = apps.filter((a) => a.title.toLowerCase().includes(filter.toLowerCase()));
    }

    grid.innerHTML = apps
      .map(
        (app) => `
      <button data-appid="${app.id}" class="start-app-item p-2.5 rounded-2xl bg-white/5 hover:bg-cyan-500/15 hover:border-cyan-400/40 border border-white/5 flex flex-col items-center text-center gap-1.5 transition-all text-slate-300 hover:text-white group">
        <div class="p-2 rounded-xl bg-white/5 group-hover:bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
          ${getSvgIcon(app.icon, 'w-5 h-5')}
        </div>
        <span class="text-[11px] font-medium truncate w-full">${app.title}</span>
      </button>
    `
      )
      .join('');

    grid.querySelectorAll('.start-app-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playOpen();
        const appId = btn.getAttribute('data-appid');
        if (appId) {
          windowManager.openWindow(appId);
          this.isStartOpen = false;
          this.updateFlyoutsState();
        }
      });
    });
  }

  private updateFlyoutsState() {
    const startMenu = this.container.querySelector('#start-menu-flyout');
    const trayFlyout = this.container.querySelector('#tray-flyout');

    if (startMenu) {
      if (this.isStartOpen) {
        startMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        const searchInput = startMenu.querySelector('#start-search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.value = '';
          this.renderStartMenuApps();
          setTimeout(() => searchInput.focus(), 60);
        }
      } else {
        startMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    }

    if (trayFlyout) {
      if (this.isTrayOpen) {
        trayFlyout.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      } else {
        trayFlyout.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    }
  }

  private bindEvents() {
    // Start Button click
    this.container.querySelector('#start-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      this.isStartOpen = !this.isStartOpen;
      if (this.isStartOpen) this.isTrayOpen = false;
      this.updateFlyoutsState();
    });

    // Nova AI search pill on taskbar
    this.container.querySelector('#taskbar-ai-pill')?.addEventListener('click', () => {
      sound.playClick();
      windowManager.openWindow('assistant');
    });

    // Tray toggle button
    this.container.querySelector('#tray-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      this.isTrayOpen = !this.isTrayOpen;
      if (this.isTrayOpen) this.isStartOpen = false;
      this.updateFlyoutsState();
    });

    // Theme quick button
    this.container.querySelector('#theme-quick-btn')?.addEventListener('click', () => {
      sound.playClick();
      const themes = ['cyberpunk', 'obsidian', 'aurora', 'emerald', 'solar'];
      const current = storage.getSettings().theme;
      const nextIdx = (themes.indexOf(current) + 1) % themes.length;
      const nextTheme = themes[nextIdx];

      const st = storage.getSettings();
      st.theme = nextTheme as any;
      storage.saveSettings(st);
      document.documentElement.setAttribute('data-theme', nextTheme);
      notifications.show({
        title: 'Theme Applied',
        message: `Active Cyber Theme: ${nextTheme.toUpperCase()}`,
        type: 'info',
        timeoutMs: 2500,
      });
    });

    // Taskbar Clock click -> opens Calendar & Schedule
    this.container.querySelector('#taskbar-clock')?.addEventListener('click', () => {
      sound.playClick();
      windowManager.openWindow('calendar');
    });

    // Peek Desktop button -> minimizes all or restores all
    this.container.querySelector('#peek-desktop-btn')?.addEventListener('click', () => {
      sound.playClick();
      const openWins = windowManager.getOpenWindows();
      const anyVisible = openWins.some((w) => !w.isMinimized);
      openWins.forEach((w) => {
        if (anyVisible) windowManager.minimizeWindow(w.id);
        else windowManager.restoreWindow(w.id);
      });
    });

    // Start Menu Category Pills
    this.container.querySelectorAll('.start-cat-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        sound.playClick();
        const cat = pill.getAttribute('data-cat') || 'all';
        this.activeCategory = cat;

        this.container.querySelectorAll('.start-cat-pill').forEach((p) => {
          p.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
          p.classList.add('bg-white/5', 'text-slate-400', 'border-transparent');
        });
        pill.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        pill.classList.remove('bg-white/5', 'text-slate-400', 'border-transparent');

        const searchInp = this.container.querySelector('#start-search-input') as HTMLInputElement;
        this.renderStartMenuApps(searchInp ? searchInp.value : '');
      });
    });

    // Start Search Input
    const searchInp = this.container.querySelector('#start-search-input') as HTMLInputElement;
    searchInp?.addEventListener('input', (e) => {
      this.renderStartMenuApps((e.target as HTMLInputElement).value);
    });

    // Start Menu Header Buttons
    this.container.querySelector('#start-devlogs-btn')?.addEventListener('click', () => {
      sound.playOpen();
      windowManager.openWindow('devlogs');
      this.isStartOpen = false;
      this.updateFlyoutsState();
    });

    this.container.querySelector('#start-reboot-btn')?.addEventListener('click', () => {
      this.isStartOpen = false;
      this.updateFlyoutsState();
      notifications.confirmModal({
        title: 'Reboot Nova WebOS',
        message: 'Are you sure you want to reboot the operating system session?',
        confirmText: 'Reboot Now',
        isDestructive: false,
        onConfirm: () => {
          window.location.reload();
        },
      });
    });

    this.container.querySelector('#start-settings-btn')?.addEventListener('click', () => {
      sound.playOpen();
      windowManager.openWindow('settings');
      this.isStartOpen = false;
      this.updateFlyoutsState();
    });

    // Tray Volume Slider
    const volSlider = this.container.querySelector('#tray-vol-slider') as HTMLInputElement;
    const volText = this.container.querySelector('#tray-vol-text');
    const tbVolLabel = this.container.querySelector('#tb-vol-label');
    volSlider?.addEventListener('input', (e) => {
      const v = parseInt((e.target as HTMLInputElement).value, 10);
      sound.setVolume(v);
      if (volText) volText.textContent = `${v}%`;
      if (tbVolLabel) tbVolLabel.textContent = `${v}%`;
    });

    // Test Sound Chime button in tray
    this.container.querySelector('#tray-test-sound-btn')?.addEventListener('click', () => {
      sound.playBootChime();
    });

    // Tray Theme buttons
    this.container.querySelectorAll('.tray-theme-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const th = btn.getAttribute('data-theme') as any;
        if (th) {
          const st = storage.getSettings();
          st.theme = th;
          storage.saveSettings(st);
          document.documentElement.setAttribute('data-theme', th);
          notifications.show({
            title: 'Theme Applied',
            message: `Active Cyber Theme: ${th.toUpperCase()}`,
            type: 'info',
            timeoutMs: 2000,
          });
        }
      });
    });

    this.container.querySelector('#tray-open-settings')?.addEventListener('click', () => {
      sound.playOpen();
      windowManager.openWindow('settings');
      this.isTrayOpen = false;
      this.updateFlyoutsState();
    });
  }

  private startClock() {
    const updateTime = () => {
      const now = new Date();
      const settings = storage.getSettings();
      const is12h = settings.clockFormat === '12h';
      const showSec = settings.showSeconds;

      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: showSec ? '2-digit' : undefined,
        hour12: is12h,
      });

      const dateStr = now.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const timeEl = this.container.querySelector('#tb-time');
      const dateEl = this.container.querySelector('#tb-date');
      if (timeEl) timeEl.textContent = timeStr;
      if (dateEl) dateEl.textContent = dateStr;
    };

    updateTime();
    this.clockInterval = window.setInterval(updateTime, 1000);
  }

  public destroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }
}
