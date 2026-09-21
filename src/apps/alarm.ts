import { WindowState } from '../types';
import { sound } from '../services/sound';
import { notifications } from '../services/notifications';
import { getSvgIcon } from '../ui/icons';

export function renderAlarmApp(container: HTMLElement, win: WindowState) {
  let activeTab: 'timer' | 'alarm' | 'stopwatch' = 'timer';

  // Timer State
  let timerDurationSecs = 300; // 5 mins
  let timerRemainingSecs = 300;
  let timerRunning = false;
  let timerInterval: number | null = null;

  // Alarm State
  let alarmTime = '08:00';
  let alarmEnabled = false;
  let alarmCheckInterval: number | null = null;

  // Stopwatch State
  let swStartTime = 0;
  let swElapsed = 0;
  let swRunning = false;
  let swInterval: number | null = null;
  let swLaps: string[] = [];

  container.className = 'w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 select-none overflow-hidden';

  const updateUI = () => {
    container.innerHTML = `
      <!-- Tabs -->
      <div class="flex items-center justify-center gap-2 pb-3 border-b border-white/10 shrink-0">
        <button id="tab-timer" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${
          activeTab === 'timer'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }">Countdown Timer</button>
        <button id="tab-alarm" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${
          activeTab === 'alarm'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }">Scheduled Alarm</button>
        <button id="tab-stopwatch" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${
          activeTab === 'stopwatch'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }">Precision Stopwatch</button>
      </div>

      <!-- Tab Content Area -->
      <div class="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        ${renderTabContent()}
      </div>
    `;

    // Bind tab switching
    container.querySelector('#tab-timer')?.addEventListener('click', () => {
      sound.playClick();
      activeTab = 'timer';
      updateUI();
    });
    container.querySelector('#tab-alarm')?.addEventListener('click', () => {
      sound.playClick();
      activeTab = 'alarm';
      updateUI();
    });
    container.querySelector('#tab-stopwatch')?.addEventListener('click', () => {
      sound.playClick();
      activeTab = 'stopwatch';
      updateUI();
    });

    bindTabEvents();
  };

  const renderTabContent = (): string => {
    if (activeTab === 'timer') {
      const mins = Math.floor(timerRemainingSecs / 60);
      const secs = timerRemainingSecs % 60;
      const progress = timerDurationSecs > 0 ? (timerRemainingSecs / timerDurationSecs) * 100 : 0;

      return `
        <div class="flex flex-col items-center gap-5 w-full max-w-xs">
          <!-- Digital readout -->
          <div class="relative w-48 h-48 rounded-full border-4 border-white/10 flex flex-col items-center justify-center bg-black/30 shadow-inner">
            <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 240, 255, 0.8)" stroke-width="4"
                stroke-dasharray="283" stroke-dashoffset="${283 - (283 * progress) / 100}" stroke-linecap="round" class="transition-all duration-300"/>
            </svg>
            <div class="text-4xl font-mono font-bold text-cyan-300 tracking-wider">
              ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}
            </div>
            <div class="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Remaining</div>
          </div>

          <!-- Quick presets -->
          <div class="flex gap-2 text-xs">
            <button data-sec="60" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">1m</button>
            <button data-sec="300" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">5m</button>
            <button data-sec="600" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">10m</button>
            <button data-sec="1500" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">25m</button>
          </div>

          <!-- Controls -->
          <div class="flex gap-3">
            <button id="timer-toggle-btn" class="px-6 py-2 rounded-xl font-bold text-xs ${
              timerRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-lg shadow-cyan-500/30'
            } transition-all">
              ${timerRunning ? 'PAUSE' : 'START'}
            </button>
            <button id="timer-reset-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors">
              RESET
            </button>
          </div>
        </div>
      `;
    }

    if (activeTab === 'alarm') {
      const now = new Date();
      const curTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return `
        <div class="flex flex-col items-center gap-6 w-full max-w-xs text-center">
          <div class="p-4 rounded-2xl bg-black/40 border border-white/10 w-full">
            <div class="text-xs text-slate-400 mb-1">Current System Time</div>
            <div class="text-2xl font-bold font-mono text-slate-200">${curTime}</div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <label class="text-xs text-slate-400 font-medium">Trigger Alarm At:</label>
            <input type="time" id="alarm-time-input" value="${alarmTime}"
              class="bg-white/5 border border-white/20 text-3xl font-mono text-cyan-300 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-cyan-400"/>
          </div>

          <div class="flex items-center gap-3">
            <button id="alarm-toggle-btn" class="px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              alarmEnabled
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-white/10 text-slate-300 border border-white/10 hover:bg-white/20'
            }">
              ${alarmEnabled ? '● ALARM ACTIVE' : '○ ACTIVATE ALARM'}
            </button>
          </div>
          <p class="text-[11px] text-slate-500">Will play chime and trigger system toast when time matches.</p>
        </div>
      `;
    }

    // Stopwatch
    const totalMs = swRunning ? swElapsed + (Date.now() - swStartTime) : swElapsed;
    const sMinutes = Math.floor(totalMs / 60000);
    const sSeconds = Math.floor((totalMs % 60000) / 1000);
    const sMillis = Math.floor((totalMs % 1000) / 10);
    const swDisplay = `${sMinutes.toString().padStart(2, '0')}:${sSeconds.toString().padStart(2, '0')}.${sMillis.toString().padStart(2, '0')}`;

    return `
      <div class="flex flex-col items-center gap-4 w-full max-w-sm h-full justify-between">
        <div class="text-4xl sm:text-5xl font-mono font-bold text-cyan-300 tracking-wider py-4" id="sw-display-val">
          ${swDisplay}
        </div>

        <div class="flex gap-3">
          <button id="sw-toggle-btn" class="px-6 py-2 rounded-xl text-xs font-bold ${
            swRunning
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-lg shadow-cyan-500/30'
          } transition-all">
            ${swRunning ? 'STOP' : 'START'}
          </button>
          <button id="sw-lap-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium" ${
            !swRunning ? 'disabled' : ''
          }>
            LAP
          </button>
          <button id="sw-reset-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium">
            RESET
          </button>
        </div>

        <!-- Laps List -->
        <div class="w-full flex-1 max-h-36 overflow-y-auto rounded-xl bg-black/30 border border-white/10 p-2 text-xs font-mono">
          ${
            swLaps.length === 0
              ? `<div class="text-center text-slate-500 py-3 text-[11px]">No laps recorded</div>`
              : swLaps
                  .map(
                    (lap, idx) => `
              <div class="flex justify-between py-1 px-2 border-b border-white/5">
                <span class="text-slate-400">Lap ${swLaps.length - idx}</span>
                <span class="text-cyan-300 font-bold">${lap}</span>
              </div>
            `
                  )
                  .join('')
          }
        </div>
      </div>
    `;
  };

  const bindTabEvents = () => {
    if (activeTab === 'timer') {
      container.querySelectorAll('.timer-preset').forEach((btn) => {
        btn.addEventListener('click', () => {
          sound.playClick();
          const s = parseInt(btn.getAttribute('data-sec') || '300', 10);
          timerDurationSecs = s;
          timerRemainingSecs = s;
          if (timerRunning && timerInterval) {
            clearInterval(timerInterval);
            timerRunning = false;
          }
          updateUI();
        });
      });

      container.querySelector('#timer-toggle-btn')?.addEventListener('click', () => {
        sound.playClick();
        if (timerRunning) {
          if (timerInterval) clearInterval(timerInterval);
          timerRunning = false;
        } else {
          timerRunning = true;
          timerInterval = window.setInterval(() => {
            if (timerRemainingSecs > 0) {
              timerRemainingSecs--;
              updateUI();
            } else {
              if (timerInterval) clearInterval(timerInterval);
              timerRunning = false;
              sound.playAlarmBeep();
              notifications.show({
                title: 'Timer Complete! ⏰',
                message: 'Your countdown timer has reached zero.',
                type: 'alert',
                timeoutMs: 8000,
              });
              updateUI();
            }
          }, 1000);
        }
        updateUI();
      });

      container.querySelector('#timer-reset-btn')?.addEventListener('click', () => {
        sound.playClick();
        if (timerInterval) clearInterval(timerInterval);
        timerRunning = false;
        timerRemainingSecs = timerDurationSecs;
        updateUI();
      });
    }

    if (activeTab === 'alarm') {
      const timeInp = container.querySelector('#alarm-time-input') as HTMLInputElement;
      if (timeInp) {
        timeInp.addEventListener('change', (e) => {
          alarmTime = (e.target as HTMLInputElement).value;
        });
      }

      container.querySelector('#alarm-toggle-btn')?.addEventListener('click', () => {
        sound.playClick();
        alarmEnabled = !alarmEnabled;
        if (alarmEnabled) {
          notifications.show({ title: 'Alarm Set', message: `Alarm armed for ${alarmTime}`, type: 'info' });
        }
        updateUI();
      });
    }

    if (activeTab === 'stopwatch') {
      container.querySelector('#sw-toggle-btn')?.addEventListener('click', () => {
        sound.playClick();
        if (swRunning) {
          swElapsed += Date.now() - swStartTime;
          swRunning = false;
          if (swInterval) clearInterval(swInterval);
        } else {
          swStartTime = Date.now();
          swRunning = true;
          swInterval = window.setInterval(() => {
            const totalMs = swElapsed + (Date.now() - swStartTime);
            const sMinutes = Math.floor(totalMs / 60000);
            const sSeconds = Math.floor((totalMs % 60000) / 1000);
            const sMillis = Math.floor((totalMs % 1000) / 10);
            const el = container.querySelector('#sw-display-val');
            if (el) {
              el.textContent = `${sMinutes.toString().padStart(2, '0')}:${sSeconds.toString().padStart(2, '0')}.${sMillis.toString().padStart(2, '0')}`;
            }
          }, 33);
        }
        updateUI();
      });

      container.querySelector('#sw-lap-btn')?.addEventListener('click', () => {
        if (!swRunning) return;
        sound.playClick();
        const totalMs = swElapsed + (Date.now() - swStartTime);
        const sMinutes = Math.floor(totalMs / 60000);
        const sSeconds = Math.floor((totalMs % 60000) / 1000);
        const sMillis = Math.floor((totalMs % 1000) / 10);
        swLaps.unshift(`${sMinutes.toString().padStart(2, '0')}:${sSeconds.toString().padStart(2, '0')}.${sMillis.toString().padStart(2, '0')}`);
        updateUI();
      });

      container.querySelector('#sw-reset-btn')?.addEventListener('click', () => {
        sound.playClick();
        if (swInterval) clearInterval(swInterval);
        swRunning = false;
        swElapsed = 0;
        swLaps = [];
        updateUI();
      });
    }
  };

  // Background Alarm Checker
  alarmCheckInterval = window.setInterval(() => {
    if (!alarmEnabled) return;
    const now = new Date();
    const curTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    if (curTime === alarmTime && now.getSeconds() === 0) {
      sound.playAlarmBeep();
      notifications.show({
        title: 'ALARM TRIGGERED! 🔔',
        message: `Scheduled alarm for ${alarmTime} is ringing!`,
        type: 'alert',
        timeoutMs: 10000,
      });
    }
  }, 1000);

  win.onClose = () => {
    if (timerInterval) clearInterval(timerInterval);
    if (alarmCheckInterval) clearInterval(alarmCheckInterval);
    if (swInterval) clearInterval(swInterval);
  };

  updateUI();
}
