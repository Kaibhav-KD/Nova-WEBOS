import { AppDefinition, WindowState, AppId } from '../types';
import { sound } from './sound';
import { getSvgIcon } from '../ui/icons';
import { logger } from '../utils/logger';

type WindowListener = (windows: WindowState[], activeId: string | null) => void;

class WindowManager {
  private windows: Map<string, WindowState> = new Map();
  private apps: Map<string, AppDefinition> = new Map();
  private activeWindowId: string | null = null;
  private highestZ: number = 100;
  private cascadeCount: number = 0;
  private listeners: WindowListener[] = [];
  private container: HTMLElement | null = null;

  public registerApp(app: AppDefinition) {
    this.apps.set(app.id, app);
  }

  public getApp(id: AppId | string): AppDefinition | undefined {
    return this.apps.get(id);
  }

  public getAllApps(): AppDefinition[] {
    return Array.from(this.apps.values());
  }

  public getRegisteredApps(): AppDefinition[] {
    return this.getAllApps();
  }

  public subscribe(cb: WindowListener) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public onWindowsChange(cb: WindowListener) {
    return this.subscribe(cb);
  }

  private notify() {
    const list = Array.from(this.windows.values());
    this.listeners.forEach((l) => l(list, this.activeWindowId));
  }

  private getContainer(): HTMLElement {
    return document.getElementById('windows-container') || document.getElementById('desktop') || document.body;
  }

  public getOpenWindows(): WindowState[] {
    return Array.from(this.windows.values());
  }

  public getActiveWindowId(): string | null {
    return this.activeWindowId;
  }

  public openWindow(appId: AppId | string, customTitle?: string): WindowState {
    // If single-instance app already open, focus and restore it!
    const existing = Array.from(this.windows.values()).find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        this.restoreWindow(existing.id);
      } else {
        this.focusWindow(existing.id);
      }
      return existing;
    }

    const app = this.apps.get(appId);
    if (!app) {
      throw new Error(`App ${appId} not registered`);
    }

    sound.playOpen();

    const container = this.getContainer();
    const desktopRect = container.getBoundingClientRect();

    const defaultWidth = Math.min(app.defaultWidth, Math.max(340, desktopRect.width - 40));
    const defaultHeight = Math.min(app.defaultHeight, Math.max(280, desktopRect.height - 40));

    // Cascade positioning
    this.cascadeCount = (this.cascadeCount + 1) % 8;
    const baseOffset = 30 + this.cascadeCount * 26;
    let initialX = Math.max(20, Math.min(desktopRect.width - defaultWidth - 30, baseOffset));
    let initialY = Math.max(20, Math.min(desktopRect.height - defaultHeight - 40, baseOffset));

    if (window.innerWidth < 640) {
      initialX = 8;
      initialY = 8;
    }

    const winId = 'win-' + appId + '-' + Date.now();
    this.highestZ += 2;

    const winElem = document.createElement('div');
    winElem.id = winId;
    winElem.className =
      'os-window absolute glass-panel flex flex-col rounded-xl overflow-hidden select-none active pointer-events-auto';
    winElem.style.left = `${initialX}px`;
    winElem.style.top = `${initialY}px`;
    winElem.style.width = `${defaultWidth}px`;
    winElem.style.height = `${defaultHeight}px`;
    winElem.style.zIndex = `${this.highestZ}`;

    const title = customTitle || app.title;

    winElem.innerHTML = `
      <!-- Window Header Bar -->
      <div class="window-header glass-header flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing shrink-0 select-none">
        <div class="flex items-center gap-2 overflow-hidden pointer-events-none">
          <div class="shrink-0 text-cyan-400">
            ${getSvgIcon(app.icon, 'w-4 h-4')}
          </div>
          <span class="font-semibold text-xs tracking-wide text-slate-100 truncate">${title}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 ml-2">
          <!-- Minimize Button -->
          <button class="win-btn-minimize p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Minimize">
            ${getSvgIcon('minimize', 'w-3.5 h-3.5')}
          </button>
          <!-- Maximize / Restore Button -->
          <button class="win-btn-maximize p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Maximize">
            ${getSvgIcon('maximize', 'w-3.5 h-3.5')}
          </button>
          <!-- Close Button -->
          <button class="win-btn-close p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors" title="Close">
            ${getSvgIcon('close', 'w-3.5 h-3.5')}
          </button>
        </div>
      </div>
      
      <!-- Window Body / Content Area -->
      <div class="window-content relative flex-1 overflow-auto bg-slate-950/40 text-slate-200"></div>

      <!-- Resize Handles (8 directions) -->
      <div class="resize-handle resize-n" data-dir="n"></div>
      <div class="resize-handle resize-s" data-dir="s"></div>
      <div class="resize-handle resize-e" data-dir="e"></div>
      <div class="resize-handle resize-w" data-dir="w"></div>
      <div class="resize-handle resize-ne" data-dir="ne"></div>
      <div class="resize-handle resize-nw" data-dir="nw"></div>
      <div class="resize-handle resize-se" data-dir="se"></div>
      <div class="resize-handle resize-sw" data-dir="sw"></div>
    `;

    container.appendChild(winElem);
    const contentElem = winElem.querySelector('.window-content') as HTMLElement;

    const winState: WindowState = {
      id: winId,
      appId,
      title,
      icon: app.icon,
      element: winElem,
      contentElement: contentElem,
      x: initialX,
      y: initialY,
      width: defaultWidth,
      height: defaultHeight,
      isMinimized: false,
      isMaximized: false,
      zIndex: this.highestZ,
    };

    this.windows.set(winId, winState);
    this.focusWindow(winId);

    // Setup window controls
    this.setupWindowEvents(winState, app);

    // Render app inside window with error boundary protection
    try {
      app.render(contentElem, winState);
    } catch (renderError: unknown) {
      const errMsg = renderError instanceof Error ? renderError.message : String(renderError);
      logger.error('WindowManager', `Failed to render application [${app.id}]: ${errMsg}`, renderError);
      contentElem.innerHTML = `
        <div class="p-6 flex flex-col items-center justify-center h-full text-center select-none bg-slate-950/60">
          <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-3">
            ${getSvgIcon('alert', 'w-8 h-8')}
          </div>
          <h3 class="text-sm font-semibold text-slate-100 mb-1">Application Error</h3>
          <p class="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">${errMsg || 'An unexpected error occurred while loading this app.'}</p>
          <button id="retry-launch-${winId}" class="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-colors">
            Reload Application
          </button>
        </div>
      `;
      contentElem.querySelector(`#retry-launch-${winId}`)?.addEventListener('click', () => {
        try {
          contentElem.innerHTML = '';
          app.render(contentElem, winState);
        } catch {
          // ignore
        }
      });
    }

    this.notify();
    return winState;
  }

  public focusWindow(id: string) {
    const win = this.windows.get(id);
    if (!win) return;

    this.highestZ += 1;
    win.zIndex = this.highestZ;
    win.element.style.zIndex = `${this.highestZ}`;
    this.activeWindowId = id;

    // Update active visual classes
    this.windows.forEach((w) => {
      if (w.id === id) {
        w.element.classList.add('active');
      } else {
        w.element.classList.remove('active');
      }
    });

    this.notify();
  }

  public closeWindow(id: string) {
    const win = this.windows.get(id);
    if (!win) return;

    sound.playClose();

    try {
      if (win.onClose) {
        win.onClose();
      }
    } catch (closeErr) {
      logger.warn('WindowManager', `Error in window onClose handler [${win.id}]:`, closeErr);
    }

    try {
      const app = this.apps.get(win.appId);
      if (app && app.onClose) {
        app.onClose(win);
      }
    } catch (appCloseErr) {
      logger.warn('WindowManager', `Error in app onClose handler [${win.appId}]:`, appCloseErr);
    }

    win.element.classList.add('opacity-0', 'scale-90');
    setTimeout(() => {
      win.element.remove();
      this.windows.delete(id);
      if (this.activeWindowId === id) {
        // Find next highest window to focus
        let highest: WindowState | null = null;
        for (const w of this.windows.values()) {
          if (!w.isMinimized && (!highest || w.zIndex > highest.zIndex)) {
            highest = w;
          }
        }
        if (highest) {
          const targetWin: WindowState = highest;
          this.activeWindowId = targetWin.id;
          this.focusWindow(targetWin.id);
        } else {
          this.activeWindowId = null;
        }
      }
      this.notify();
    }, 150);
  }

  public minimizeWindow(id: string) {
    const win = this.windows.get(id);
    if (!win) return;

    sound.playClick();
    win.isMinimized = true;
    win.element.classList.add('minimized');

    if (this.activeWindowId === id) {
      this.activeWindowId = null;
      let nextWin: WindowState | null = null;
      for (const w of this.windows.values()) {
        if (!w.isMinimized && (!nextWin || w.zIndex > nextWin.zIndex)) {
          nextWin = w;
        }
      }
      if (nextWin) {
        const targetWin: WindowState = nextWin;
        this.focusWindow(targetWin.id);
      }
    }
    this.notify();
  }

  public restoreWindow(id: string) {
    const win = this.windows.get(id);
    if (!win) return;

    sound.playClick();
    win.isMinimized = false;
    win.element.classList.remove('minimized');
    this.focusWindow(id);
    this.notify();
  }

  public toggleMinimize(id: string) {
    const win = this.windows.get(id);
    if (!win) return;

    if (win.isMinimized) {
      this.restoreWindow(id);
    } else if (this.activeWindowId === id) {
      this.minimizeWindow(id);
    } else {
      this.focusWindow(id);
    }
  }

  public maximizeWindow(id: string) {
    const win = this.windows.get(id);
    if (!win) return;

    sound.playClick();
    const container = this.getContainer();
    const bounds = container.getBoundingClientRect();

    if (!win.isMaximized) {
      // Save prev
      win.prevX = win.x;
      win.prevY = win.y;
      win.prevWidth = win.width;
      win.prevHeight = win.height;

      win.x = 0;
      win.y = 0;
      win.width = bounds.width;
      win.height = bounds.height;
      win.isMaximized = true;

      win.element.classList.add('maximized');
      win.element.style.left = '0px';
      win.element.style.top = '0px';
      win.element.style.width = '100%';
      win.element.style.height = '100%';

      const maxBtn = win.element.querySelector('.win-btn-maximize');
      if (maxBtn) maxBtn.innerHTML = getSvgIcon('restore', 'w-3.5 h-3.5');
    } else {
      // Restore prev
      win.x = win.prevX || 40;
      win.y = win.prevY || 40;
      win.width = win.prevWidth || 600;
      win.height = win.prevHeight || 420;
      win.isMaximized = false;

      win.element.classList.remove('maximized');
      win.element.style.left = `${win.x}px`;
      win.element.style.top = `${win.y}px`;
      win.element.style.width = `${win.width}px`;
      win.element.style.height = `${win.height}px`;

      const maxBtn = win.element.querySelector('.win-btn-maximize');
      if (maxBtn) maxBtn.innerHTML = getSvgIcon('maximize', 'w-3.5 h-3.5');
    }
    this.focusWindow(id);
    this.notify();
  }

  private setupWindowEvents(win: WindowState, app: AppDefinition) {
    const header = win.element.querySelector('.window-header') as HTMLElement;
    const minBtn = win.element.querySelector('.win-btn-minimize') as HTMLButtonElement;
    const maxBtn = win.element.querySelector('.win-btn-maximize') as HTMLButtonElement;
    const closeBtn = win.element.querySelector('.win-btn-close') as HTMLButtonElement;

    // Focus on click
    win.element.addEventListener('pointerdown', () => {
      this.focusWindow(win.id);
    });

    // Control buttons
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.minimizeWindow(win.id);
    });

    maxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.maximizeWindow(win.id);
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeWindow(win.id);
    });

    // Double click header to maximize
    header.addEventListener('dblclick', () => {
      this.maximizeWindow(win.id);
    });

    // Window Dragging
    header.addEventListener('pointerdown', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      if (win.isMaximized) return;

      this.focusWindow(win.id);

      const startX = e.clientX;
      const startY = e.clientY;
      const initialWinX = win.x;
      const initialWinY = win.y;

      const container = this.getContainer();
      const contRect = container.getBoundingClientRect();

      header.setPointerCapture(e.pointerId);

      const onPointerMove = (moveEvt: PointerEvent) => {
        const dx = moveEvt.clientX - startX;
        const dy = moveEvt.clientY - startY;

        let newX = initialWinX + dx;
        let newY = initialWinY + dy;

        // Boundary constraints
        newX = Math.max(-win.width + 100, Math.min(contRect.width - 100, newX));
        newY = Math.max(0, Math.min(contRect.height - 40, newY));

        win.x = newX;
        win.y = newY;
        win.element.style.left = `${newX}px`;
        win.element.style.top = `${newY}px`;
      };

      const onPointerUp = (upEvt: PointerEvent) => {
        header.releasePointerCapture(upEvt.pointerId);
        header.removeEventListener('pointermove', onPointerMove);
        header.removeEventListener('pointerup', onPointerUp);
        header.removeEventListener('pointercancel', onPointerUp);
      };

      header.addEventListener('pointermove', onPointerMove);
      header.addEventListener('pointerup', onPointerUp);
      header.addEventListener('pointercancel', onPointerUp);
    });

    // Window Resizing (8 handles)
    const resizeHandles = win.element.querySelectorAll('.resize-handle');
    const minW = app.minWidth || 300;
    const minH = app.minHeight || 200;

    resizeHandles.forEach((handleElem) => {
      handleElem.addEventListener('pointerdown', (e) => {
        const evt = e as PointerEvent;
        evt.stopPropagation();
        if (win.isMaximized) return;

        this.focusWindow(win.id);

        const dir = (evt.target as HTMLElement).getAttribute('data-dir') || 'se';
        const startX = evt.clientX;
        const startY = evt.clientY;
        const startLeft = win.x;
        const startTop = win.y;
        const startW = win.width;
        const startH = win.height;

        const target = evt.target as HTMLElement;
        target.setPointerCapture(evt.pointerId);

        const onResizeMove = (moveEvt: PointerEvent) => {
          const dx = moveEvt.clientX - startX;
          const dy = moveEvt.clientY - startY;

          let newW = startW;
          let newH = startH;
          let newX = startLeft;
          let newY = startTop;

          if (dir.includes('e')) newW = Math.max(minW, startW + dx);
          if (dir.includes('s')) newH = Math.max(minH, startH + dy);
          if (dir.includes('w')) {
            const possibleW = startW - dx;
            if (possibleW >= minW) {
              newW = possibleW;
              newX = startLeft + dx;
            }
          }
          if (dir.includes('n')) {
            const possibleH = startH - dy;
            if (possibleH >= minH) {
              newH = possibleH;
              newY = startTop + dy;
            }
          }

          win.x = newX;
          win.y = newY;
          win.width = newW;
          win.height = newH;

          win.element.style.left = `${newX}px`;
          win.element.style.top = `${newY}px`;
          win.element.style.width = `${newW}px`;
          win.element.style.height = `${newH}px`;
        };

        const onResizeUp = (upEvt: PointerEvent) => {
          target.releasePointerCapture(upEvt.pointerId);
          target.removeEventListener('pointermove', onResizeMove);
          target.removeEventListener('pointerup', onResizeUp);
          target.removeEventListener('pointercancel', onResizeUp);
        };

        target.addEventListener('pointermove', onResizeMove);
        target.addEventListener('pointerup', onResizeUp);
        target.addEventListener('pointercancel', onResizeUp);
      });
    });
  }
}

export const windowManager = new WindowManager();
