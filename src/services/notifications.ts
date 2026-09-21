import { ToastNotification } from '../types';
import { sound } from './sound';
import { getSvgIcon } from '../ui/icons';

class NotificationService {
  private history: ToastNotification[] = [];
  private listeners: ((items: ToastNotification[]) => void)[] = [];
  private container: HTMLElement | null = null;

  private getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
    }
    return this.container || document.body;
  }

  public show(notification: Omit<ToastNotification, 'id' | 'timestamp'>) {
    const item: ToastNotification = {
      ...notification,
      id: 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeoutMs: notification.timeoutMs || 4500,
    };

    this.history.unshift(item);
    if (this.history.length > 25) {
      this.history.pop();
    }
    this.notifyListeners();

    sound.playNotification();
    this.renderToast(item);
  }

  private renderToast(item: ToastNotification) {
    const container = this.getContainer();
    const toast = document.createElement('div');
    toast.id = item.id;
    toast.className =
      'pointer-events-auto flex flex-col gap-2 p-3.5 rounded-xl border border-white/15 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-slate-100 transition-all duration-300 transform translate-x-12 opacity-0';

    let iconSvg = getSvgIcon('bell', 'w-5 h-5 text-cyan-400');
    if (item.type === 'success') iconSvg = `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
    if (item.type === 'alert') iconSvg = `<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    if (item.type === 'warning') iconSvg = `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

    toast.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-2.5">
          <div class="mt-0.5 shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/10">
            ${iconSvg}
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-xs text-slate-100 tracking-wide">${item.title}</span>
              <span class="text-[10px] text-slate-400 font-mono">${item.timestamp}</span>
            </div>
            <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">${item.message}</p>
          </div>
        </div>
        <button class="toast-close text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
          ${getSvgIcon('close', 'w-3.5 h-3.5')}
        </button>
      </div>
      <div class="w-full bg-white/10 h-0.5 rounded-full overflow-hidden mt-1">
        <div class="toast-bar bg-cyan-400 h-full w-full origin-left transition-transform linear" style="transition-duration: ${item.timeoutMs}ms; transform: scaleX(1);"></div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-12', 'opacity-0');
      const bar = toast.querySelector('.toast-bar') as HTMLElement;
      if (bar) {
        requestAnimationFrame(() => {
          bar.style.transform = 'scaleX(0)';
        });
      }
    });

    const closeBtn = toast.querySelector('.toast-close') as HTMLButtonElement;
    let timerId: number | null = null;
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      toast.classList.add('translate-x-12', 'opacity-0');
      setTimeout(() => {
        toast.remove();
      }, 300);
    };

    closeBtn.addEventListener('click', dismiss);

    if (item.timeoutMs && item.timeoutMs > 0) {
      timerId = window.setTimeout(dismiss, item.timeoutMs);
    }
  }

  public getHistory(): ToastNotification[] {
    return [...this.history];
  }

  public clearHistory() {
    this.history = [];
    this.notifyListeners();
  }

  public subscribe(cb: (items: ToastNotification[]) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l([...this.history]));
  }
}

export const notifications = new NotificationService();
