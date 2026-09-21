import { WindowState } from '../types';
import { storage } from '../services/storage';
import { windowManager } from '../services/windows';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

export function renderDashboardApp(container: HTMLElement, win: WindowState) {
  let timerInterval: number | null = null;
  let chartInterval: number | null = null;
  const cpuHistory: number[] = Array(20).fill(15);
  const memHistory: number[] = Array(20).fill(42);

  container.className = 'w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 overflow-y-auto font-sans';

  const startTime = Date.now();

  const renderContent = () => {
    const notesCount = storage.getNotes().length;
    const eventsCount = storage.getEvents().length;
    const filesCount = storage.getFiles().length;
    const openWins = windowManager.getOpenWindows();
    const storageUsage = storage.getStorageUsage();

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hrs = Math.floor(uptimeSeconds / 3600);
    const mins = Math.floor((uptimeSeconds % 3600) / 60);
    const secs = uptimeSeconds % 60;
    const uptimeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    container.innerHTML = `
      <!-- Header telemetry -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            ${getSvgIcon('dashboard', 'w-6 h-6')}
          </div>
          <div>
            <h2 class="text-sm font-bold tracking-wide uppercase text-slate-100 flex items-center gap-2">
              Nova Kernel Telemetry
              <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">ONLINE</span>
            </h2>
            <p class="text-xs text-slate-400">Host: ${navigator.platform || 'Web Container'} • Sandbox Layer v4.2</p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-right">
          <div>
            <div class="text-xs font-mono font-bold text-cyan-300" id="dash-time">${timeString}</div>
            <div class="text-[11px] text-slate-400">${dateString}</div>
          </div>
          <div class="pl-4 border-l border-white/10">
            <div class="text-xs font-mono font-bold text-slate-200" id="dash-uptime">${uptimeStr}</div>
            <div class="text-[11px] text-slate-400">System Uptime</div>
          </div>
        </div>
      </div>

      <!-- Live Performance Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <!-- CPU Load Card -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-medium text-slate-300 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              CPU Load & Core Activity
            </span>
            <span class="font-mono text-cyan-400 font-bold" id="cpu-load-val">${cpuHistory[cpuHistory.length - 1]}%</span>
          </div>
          <canvas id="cpu-chart" width="300" height="70" class="w-full h-16 rounded bg-black/40 border border-white/5"></canvas>
          <div class="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Thread allocation: 4 Logical Workers</span>
            <span>Freq: 3.2 GHz (Virtual)</span>
          </div>
        </div>

        <!-- Memory Load Card -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-medium text-slate-300 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              Virtual Memory (V-RAM)
            </span>
            <span class="font-mono text-purple-400 font-bold" id="mem-load-val">${memHistory[memHistory.length - 1]}%</span>
          </div>
          <canvas id="mem-chart" width="300" height="70" class="w-full h-16 rounded bg-black/40 border border-white/5"></canvas>
          <div class="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Used: ~3.4 GB / 8.0 GB</span>
            <span>Garbage Collection: Stable</span>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">Running Apps</div>
          <div class="text-xl font-bold font-mono text-cyan-400 mt-1">${openWins.length}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Active in compositor</div>
        </div>

        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">Saved Notes</div>
          <div class="text-xl font-bold font-mono text-amber-400 mt-1">${notesCount}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">In localStorage</div>
        </div>

        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">Calendar Events</div>
          <div class="text-xl font-bold font-mono text-emerald-400 mt-1">${eventsCount}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Scheduled items</div>
        </div>

        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">VFS Files</div>
          <div class="text-xl font-bold font-mono text-purple-400 mt-1">${filesCount}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Stored in VFS</div>
        </div>
      </div>

      <!-- Storage & Platform Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <!-- Storage usage -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-medium text-slate-300">Local Storage Quota</span>
            <span class="font-mono text-cyan-400 text-xs">${storageUsage.usedKb} KB / 5.0 MB (${storageUsage.percent}%)</span>
          </div>
          <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full" style="width: ${Math.max(3, storageUsage.percent)}%"></div>
          </div>
          <p class="text-[10px] text-slate-400 mt-2">Browser origin persistence is verified and active.</p>
        </div>

        <!-- Browser & Display -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs flex flex-col justify-between">
          <div class="flex justify-between items-center py-0.5 border-b border-white/5">
            <span class="text-slate-400">User Agent</span>
            <span class="font-mono text-slate-200 truncate max-w-[200px]" title="${navigator.userAgent}">${navigator.userAgent.split(' ')[0]}</span>
          </div>
          <div class="flex justify-between items-center py-0.5 border-b border-white/5">
            <span class="text-slate-400">Resolution</span>
            <span class="font-mono text-slate-200">${window.innerWidth} × ${window.innerHeight} px</span>
          </div>
          <div class="flex justify-between items-center py-0.5">
            <span class="text-slate-400">Network State</span>
            <span class="font-mono text-emerald-400">Connected (Online)</span>
          </div>
        </div>
      </div>

      <!-- Active Running Processes / Windows -->
      <div class="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
        <h3 class="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">Compositor Task Manager (${openWins.length} Active)</h3>
        <div class="flex flex-col gap-1.5">
          ${
            openWins.length === 0
              ? `<div class="text-xs text-slate-500 py-2">No active windows</div>`
              : openWins
                  .map(
                    (w) => `
            <div class="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 text-xs">
              <div class="flex items-center gap-2 overflow-hidden">
                <span class="text-cyan-400">${getSvgIcon(w.icon, 'w-4 h-4')}</span>
                <span class="font-medium text-slate-200 truncate">${w.title}</span>
                <span class="text-[10px] font-mono text-slate-500">ID: ${w.id.split('-').slice(0, 2).join('-')}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-mono text-slate-400">${w.isMinimized ? 'Minimized' : 'Active'}</span>
                <button data-winid="${w.id}" class="dash-kill-win text-[10px] px-2 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded border border-rose-500/30 transition-colors">End Task</button>
              </div>
            </div>
          `
                  )
                  .join('')
          }
        </div>
      </div>
    `;

    // Bind kill buttons
    container.querySelectorAll('.dash-kill-win').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const id = btn.getAttribute('data-winid');
        if (id) {
          windowManager.closeWindow(id);
          renderContent();
        }
      });
    });

    drawCharts();
  };

  const drawCharts = () => {
    // Draw CPU chart
    const cpuCanvas = container.querySelector('#cpu-chart') as HTMLCanvasElement;
    if (cpuCanvas) {
      const ctx = cpuCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, cpuCanvas.width, cpuCanvas.height);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const step = cpuCanvas.width / (cpuHistory.length - 1);
        cpuHistory.forEach((val, i) => {
          const y = cpuCanvas.height - (val / 100) * (cpuCanvas.height - 10) - 5;
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(i * step, y);
        });
        ctx.stroke();

        // Fill gradient
        ctx.lineTo(cpuCanvas.width, cpuCanvas.height);
        ctx.lineTo(0, cpuCanvas.height);
        const grad = ctx.createLinearGradient(0, 0, 0, cpuCanvas.height);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Draw Memory chart
    const memCanvas = container.querySelector('#mem-chart') as HTMLCanvasElement;
    if (memCanvas) {
      const ctx = memCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, memCanvas.width, memCanvas.height);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const step = memCanvas.width / (memHistory.length - 1);
        memHistory.forEach((val, i) => {
          const y = memCanvas.height - (val / 100) * (memCanvas.height - 10) - 5;
          if (i === 0) ctx.moveTo(0, y);
          else ctx.lineTo(i * step, y);
        });
        ctx.stroke();

        ctx.lineTo(memCanvas.width, memCanvas.height);
        ctx.lineTo(0, memCanvas.height);
        const grad = ctx.createLinearGradient(0, 0, 0, memCanvas.height);
        grad.addColorStop(0, 'rgba(192, 132, 252, 0.25)');
        grad.addColorStop(1, 'rgba(192, 132, 252, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }
  };

  renderContent();

  // Tick clock and uptime
  timerInterval = window.setInterval(() => {
    const timeEl = container.querySelector('#dash-time');
    const uptimeEl = container.querySelector('#dash-uptime');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (uptimeEl) {
      const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
      const hrs = Math.floor(uptimeSeconds / 3600);
      const mins = Math.floor((uptimeSeconds % 3600) / 60);
      const secs = uptimeSeconds % 60;
      uptimeEl.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }, 1000);

  // Tick performance simulations
  chartInterval = window.setInterval(() => {
    const nextCpu = Math.max(8, Math.min(85, Math.round(cpuHistory[cpuHistory.length - 1] + (Math.random() * 16 - 8))));
    const nextMem = Math.max(30, Math.min(65, Math.round(memHistory[memHistory.length - 1] + (Math.random() * 6 - 3))));
    cpuHistory.shift();
    cpuHistory.push(nextCpu);
    memHistory.shift();
    memHistory.push(nextMem);

    const cpuValEl = container.querySelector('#cpu-load-val');
    const memValEl = container.querySelector('#mem-load-val');
    if (cpuValEl) cpuValEl.textContent = `${nextCpu}%`;
    if (memValEl) memValEl.textContent = `${nextMem}%`;

    drawCharts();
  }, 1500);

  win.onClose = () => {
    if (timerInterval) clearInterval(timerInterval);
    if (chartInterval) clearInterval(chartInterval);
  };
}
