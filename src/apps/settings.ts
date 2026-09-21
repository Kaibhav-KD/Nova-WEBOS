import { WindowState } from '../types';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { notifications } from '../services/notifications';
import { getSvgIcon } from '../ui/icons';

export function renderSettingsApp(container: HTMLElement, win: WindowState) {
  let settings = storage.getSettings();

  container.className = 'w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 select-none overflow-y-auto font-sans';

  const updateUI = () => {
    container.innerHTML = `
      <div class="max-w-xl mx-auto w-full flex flex-col gap-5 pb-6">
        <!-- Header -->
        <div class="flex items-center gap-3 pb-3 border-b border-white/10">
          <div class="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            ${getSvgIcon('settings', 'w-6 h-6')}
          </div>
          <div>
            <h2 class="text-sm font-bold tracking-wide uppercase text-slate-100">System Preferences & Customization</h2>
            <p class="text-xs text-slate-400">All configurations are stored securely in browser storage.</p>
          </div>
        </div>

        <!-- 1. Theme Selection -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div>
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Color Theme</h3>
            <p class="text-[11px] text-slate-400">Select the overall color accent and glass atmosphere.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            ${[
              { id: 'cyberpunk', name: 'Cyberpunk Neon', color: '#00f0ff', desc: 'Electric Cyan & Deep Indigo' },
              { id: 'obsidian', name: 'Obsidian Onyx', color: '#f8fafc', desc: 'Sleek Monochrome Luxury' },
              { id: 'aurora', name: 'Nebula Aurora', color: '#c084fc', desc: 'Cosmic Violet & Magenta' },
              { id: 'emerald', name: 'Emerald Matrix', color: '#10b981', desc: 'Bio-Cyberpunk Green' },
              { id: 'solar', name: 'Solar Flare', color: '#f97316', desc: 'Warm Radiant Amber' },
            ]
              .map(
                (th) => `
              <button data-theme="${th.id}" class="theme-choice-btn p-2.5 rounded-lg border text-left flex flex-col gap-1.5 transition-all ${
                  settings.theme === th.id
                    ? 'bg-white/15 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-black/30 border-white/5 hover:bg-white/10'
                }">
                <div class="flex items-center justify-between w-full">
                  <span class="text-xs font-semibold text-slate-200">${th.name}</span>
                  <span class="w-3 h-3 rounded-full shadow" style="background-color: ${th.color}"></span>
                </div>
                <span class="text-[10px] text-slate-400">${th.desc}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- 2. Wallpaper Selection -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div>
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Desktop Wallpaper</h3>
            <p class="text-[11px] text-slate-400">Choose an interactive procedural canvas shader or background style.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${[
              { id: 'canvas-grid', name: 'Interactive Grid', desc: 'Particle constellation canvas' },
              { id: 'nebula', name: 'Deep Nebula', desc: 'Cosmic deep space glow' },
              { id: 'circuit', name: 'Cyber Circuit', desc: 'Geometric vector lines' },
              { id: 'minimal', name: 'Obsidian Void', desc: 'Pure dark minimal canvas' },
            ]
              .map(
                (wp) => `
              <button data-wall="${wp.id}" class="wall-choice-btn p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                  settings.wallpaper === wp.id
                    ? 'bg-white/15 border-cyan-400 ring-1 ring-cyan-400/40'
                    : 'bg-black/30 border-white/5 hover:bg-white/10'
                }">
                <span class="text-xs font-semibold text-slate-200">${wp.name}</span>
                <span class="text-[10px] text-slate-400">${wp.desc}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- 3. Clock & Telemetry Format -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div>
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Time & Clock Format</h3>
            <p class="text-[11px] text-slate-400">Configure taskbar and lockscreen digital clocks.</p>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="clock-format" value="12h" ${settings.clockFormat === '12h' ? 'checked' : ''} class="text-cyan-400" />
                <span>12-Hour (AM/PM)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="clock-format" value="24h" ${settings.clockFormat === '24h' ? 'checked' : ''} class="text-cyan-400" />
                <span>24-Hour (Military)</span>
              </label>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="clock-show-sec" ${settings.showSeconds ? 'checked' : ''} class="rounded text-cyan-400" />
              <span>Show Seconds</span>
            </label>
          </div>
        </div>

        <!-- 4. Sound & Audio Effects -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Web Audio Synthesizer</h3>
              <p class="text-[11px] text-slate-400">Procedural audio feedback for window launches, clicks and alarms.</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="sound-toggle-chk" ${settings.soundEnabled ? 'checked' : ''} class="rounded text-cyan-400" />
              <span class="text-xs font-medium">${settings.soundEnabled ? 'Enabled' : 'Muted'}</span>
            </label>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400">Volume:</span>
            <input type="range" id="sound-vol-range" min="0" max="100" value="${settings.soundVolume}"
              class="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-white/10 rounded-lg" />
            <span class="font-mono text-xs text-cyan-300 w-8 text-right">${settings.soundVolume}%</span>
            <button id="sound-test-btn" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-xs text-slate-300 transition-colors">Test Sound</button>
          </div>
        </div>

        <!-- 5. Performance & Desktop Widgets -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3 text-xs">
          <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Performance & UI Features</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label class="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 cursor-pointer">
              <span>Desktop Telemetry Widgets</span>
              <input type="checkbox" id="widgets-toggle" ${settings.showDesktopWidgets ? 'checked' : ''} class="rounded text-cyan-400" />
            </label>
            <label class="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 cursor-pointer">
              <span>Glassmorphism Blur Filter</span>
              <input type="checkbox" id="blur-toggle" ${settings.glassBlur ? 'checked' : ''} class="rounded text-cyan-400" />
            </label>
          </div>
        </div>

        <!-- 6. Reset Storage -->
        <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between gap-3">
          <div>
            <h4 class="text-xs font-bold text-rose-300">Reset Operating System Storage</h4>
            <p class="text-[11px] text-rose-200/70">Wipe all notes, calendar events, and custom files back to defaults.</p>
          </div>
          <button id="settings-reset-all" class="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-semibold shrink-0 transition-colors">
            Reset Data
          </button>
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Theme switch
    container.querySelectorAll('.theme-choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const th = btn.getAttribute('data-theme') as any;
        if (th) {
          settings.theme = th;
          storage.saveSettings(settings);
          document.documentElement.setAttribute('data-theme', th);
          notifications.show({ title: 'Settings', message: `Theme switched to ${th.toUpperCase()}`, type: 'info' });
          updateUI();
        }
      });
    });

    // Wallpaper switch
    container.querySelectorAll('.wall-choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const wp = btn.getAttribute('data-wall') as any;
        if (wp) {
          settings.wallpaper = wp;
          storage.saveSettings(settings);
          notifications.show({ title: 'Settings', message: `Wallpaper set to ${wp}`, type: 'info' });
          updateUI();
          // Notify desktop wallpaper updater
          window.dispatchEvent(new CustomEvent('wallpaper-changed', { detail: wp }));
        }
      });
    });

    // Clock radio
    container.querySelectorAll('input[name="clock-format"]').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        settings.clockFormat = (e.target as HTMLInputElement).value as any;
        storage.saveSettings(settings);
      });
    });

    // Show seconds
    container.querySelector('#clock-show-sec')?.addEventListener('change', (e) => {
      settings.showSeconds = (e.target as HTMLInputElement).checked;
      storage.saveSettings(settings);
    });

    // Sound toggle
    container.querySelector('#sound-toggle-chk')?.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).checked;
      settings.soundEnabled = val;
      sound.setEnabled(val);
      storage.saveSettings(settings);
      updateUI();
    });

    // Volume slider
    container.querySelector('#sound-vol-range')?.addEventListener('input', (e) => {
      const vol = parseInt((e.target as HTMLInputElement).value, 10);
      settings.soundVolume = vol;
      sound.setVolume(vol);
      storage.saveSettings(settings);
      const span = container.querySelector('#sound-vol-range')?.nextElementSibling;
      if (span) span.textContent = `${vol}%`;
    });

    // Sound test
    container.querySelector('#sound-test-btn')?.addEventListener('click', () => {
      sound.playOpen();
    });

    // Widgets toggle
    container.querySelector('#widgets-toggle')?.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).checked;
      settings.showDesktopWidgets = val;
      storage.saveSettings(settings);
      const wCont = document.getElementById('desktop-widgets');
      if (wCont) wCont.style.display = val ? 'flex' : 'none';
    });

    // Glass blur toggle
    container.querySelector('#blur-toggle')?.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).checked;
      settings.glassBlur = val;
      storage.saveSettings(settings);
    });

    // Reset All
    container.querySelector('#settings-reset-all')?.addEventListener('click', () => {
      notifications.confirmModal({
        title: 'Factory Reset Nova WebOS',
        message: 'Are you sure you want to reset all stored notes, files, events, and preferences? This action cannot be undone.',
        confirmText: 'Clear All Data',
        isDestructive: true,
        onConfirm: () => {
          sound.playClose();
          storage.resetAllData();
          notifications.show({ title: 'System Reset', message: 'All data cleared. Reloading session...', type: 'warning' });
          setTimeout(() => {
            window.location.reload();
          }, 800);
        },
      });
    });
  };

  updateUI();
}
