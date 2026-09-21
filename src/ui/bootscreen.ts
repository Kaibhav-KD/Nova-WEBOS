import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

export class BootSequence {
  private container: HTMLElement;
  private onComplete: () => void;

  constructor(container: HTMLElement, onComplete: () => void) {
    this.container = container;
    this.onComplete = onComplete;
  }

  public start() {
    this.renderBiosScreen();
  }

  private renderBiosScreen() {
    this.container.className = 'fixed inset-0 z-50 bg-black text-cyan-400 font-mono flex flex-col justify-between p-6 sm:p-10 select-none';
    this.container.innerHTML = `
      <div>
        <div class="flex items-center justify-between border-b border-cyan-950 pb-3 mb-4">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400">${getSvgIcon('nova-logo', 'w-6 h-6')}</span>
            <span class="font-bold tracking-widest text-sm">NOVA ARCHITECTURE SYSTEM // BIOS v4.2</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="boot-desktop-btn" class="text-xs px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all active:scale-95 shadow-md shadow-cyan-500/30">
              Enter Desktop Now →
            </button>
            <button id="boot-skip-btn" class="text-xs px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800 transition-colors">
              Skip [ESC]
            </button>
          </div>
        </div>

        <div id="bios-logs" class="space-y-1.5 text-xs sm:text-sm text-cyan-300">
          <div>INITIALIZING KERNEL SYSTEM...</div>
        </div>
      </div>

      <div class="space-y-2 pt-4 border-t border-cyan-950">
        <div class="flex justify-between text-xs text-cyan-400">
          <span id="boot-status-text">Loading subsystem drivers...</span>
          <span id="boot-pct" class="font-bold">0%</span>
        </div>
        <div class="w-full bg-cyan-950/50 h-2 rounded-full overflow-hidden border border-cyan-900/40">
          <div id="boot-progress-bar" class="bg-gradient-to-r from-cyan-500 to-purple-500 h-full w-0 transition-all duration-150"></div>
        </div>
      </div>
    `;

    const logsContainer = this.container.querySelector('#bios-logs') as HTMLElement;
    const bar = this.container.querySelector('#boot-progress-bar') as HTMLElement;
    const pct = this.container.querySelector('#boot-pct') as HTMLElement;
    const statusText = this.container.querySelector('#boot-status-text') as HTMLElement;
    const skipBtn = this.container.querySelector('#boot-skip-btn');
    const directBtn = this.container.querySelector('#boot-desktop-btn');

    let isDone = false;
    const finishBoot = () => {
      if (isDone) return;
      isDone = true;
      sound.playOpen();
      this.container.classList.add('transition-opacity', 'duration-300', 'opacity-0', 'pointer-events-none');
      setTimeout(() => {
        this.container.remove();
        this.onComplete();
      }, 300);
    };

    directBtn?.addEventListener('click', finishBoot);

    skipBtn?.addEventListener('click', () => {
      if (!isDone) this.renderWelcomeScreen();
    });

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        window.removeEventListener('keydown', escHandler);
        if (!isDone) finishBoot();
      }
    };
    window.addEventListener('keydown', escHandler);

    const steps = [
      { text: 'CPU: Quantum Core Architecture [OK]', delay: 100, pct: 20 },
      { text: 'MEMORY: 16384 MB V-RAM ALLOCATED [OK]', delay: 200, pct: 40 },
      { text: 'VFS: Mounting /root /apps /home /user [OK]', delay: 350, pct: 60 },
      { text: 'AUDIO: Initializing Procedural Synth Context [OK]', delay: 500, pct: 75 },
      { text: 'NEURAL: Loading Nova AI Inference Core [OK]', delay: 650, pct: 90 },
      { text: 'SYSTEM READY: Entering Session Gateway...', delay: 800, pct: 100 },
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        if (isDone || !logsContainer) return;
        const line = document.createElement('div');
        line.className = 'text-cyan-200';
        line.textContent = `> ${step.text}`;
        logsContainer.appendChild(line);

        if (bar) bar.style.width = `${step.pct}%`;
        if (pct) pct.textContent = `${step.pct}%`;
        if (statusText) statusText.textContent = step.text;
      }, step.delay);
    });

    setTimeout(() => {
      window.removeEventListener('keydown', escHandler);
      if (!isDone) this.renderWelcomeScreen();
    }, 1000);
  }

  private renderWelcomeScreen() {
    sound.playBootChime();

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

    this.container.className = 'fixed inset-0 z-50 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950/40 text-slate-100 flex flex-col items-center justify-between p-6 select-none backdrop-blur-xl animate-fade-in';
    this.container.innerHTML = `
      <!-- Top Time Display -->
      <div class="text-center pt-8">
        <div class="text-5xl sm:text-6xl font-extrabold font-mono text-cyan-300 tracking-wider">${timeStr}</div>
        <div class="text-sm sm:text-base text-slate-400 mt-1 font-sans">${dateStr}</div>
      </div>

      <!-- Center Profile / Login Card -->
      <div class="max-w-xs w-full p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center gap-4 text-center backdrop-blur-md">
        <!-- Avatar with neon glow -->
        <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20">
          <div class="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-cyan-400">
            ${getSvgIcon('user', 'w-10 h-10')}
          </div>
          <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow"></span>
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-100">Operative Nova</h2>
          <p class="text-xs text-cyan-400 font-mono">Session ID: #NV-8821</p>
        </div>

        <button id="welcome-enter-btn" class="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/30 active:scale-95 flex items-center justify-center gap-2">
          <span>Enter Desktop</span>
          ${getSvgIcon('chevron-right', 'w-4 h-4')}
        </button>
      </div>

      <!-- Bottom OS Identifier -->
      <div class="text-center pb-4 text-xs text-slate-500 font-mono flex items-center gap-2">
        <span>NOVA WEBOS v4.2</span>
        <span>•</span>
        <span>BROWSER RUNTIME ARCHITECTURE</span>
      </div>
    `;

    const enterBtn = this.container.querySelector('#welcome-enter-btn');
    const enterDesktop = () => {
      sound.playOpen();
      this.container.classList.add('transition-opacity', 'duration-500', 'opacity-0', 'pointer-events-none');
      setTimeout(() => {
        this.container.remove();
        this.onComplete();
      }, 500);
    };

    enterBtn?.addEventListener('click', enterDesktop);

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        window.removeEventListener('keydown', keyListener);
        enterDesktop();
      }
    };
    window.addEventListener('keydown', keyListener);
  }
}
