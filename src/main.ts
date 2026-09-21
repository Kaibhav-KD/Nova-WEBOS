import './index.css';
import { storage } from './services/storage';
import { windowManager } from './services/windows';
import { notifications } from './services/notifications';
import { sound } from './services/sound';
import { WallpaperManager } from './ui/wallpaper';
import { DesktopEnvironment } from './ui/desktop';
import { Taskbar } from './ui/taskbar';
import { BootSequence } from './ui/bootscreen';

// Import All Applications
import { renderNotesApp } from './apps/notes';
import { renderCalculatorApp } from './apps/calculator';
import { renderDashboardApp } from './apps/dashboard';
import { renderCalendarApp } from './apps/calendar';
import { renderAlarmApp } from './apps/alarm';
import { renderFilesApp } from './apps/files';
import { renderSettingsApp } from './apps/settings';
import { renderMusicApp } from './apps/music';
import { renderBrowserApp } from './apps/browser';
import { renderAssistantApp } from './apps/assistant';
import { renderTerminalApp } from './apps/terminal';
import { renderDevlogsApp } from './apps/devlogs';

function initNovaOS() {
  // 1. Apply Persistent Settings & Theme
  const settings = storage.getSettings();
  document.documentElement.setAttribute('data-theme', settings.theme || 'cyberpunk');
  sound.setEnabled(settings.soundEnabled);
  sound.setVolume(settings.soundVolume);

  // 2. Register Applications in Window Manager
  windowManager.registerApp({
    id: 'devlogs',
    title: 'Dev Logs Journal',
    icon: 'devlogs',
    defaultWidth: 780,
    defaultHeight: 560,
    render: renderDevlogsApp,
  });

  windowManager.registerApp({
    id: 'assistant',
    title: 'Nova AI',
    icon: 'assistant',
    defaultWidth: 540,
    defaultHeight: 600,
    render: renderAssistantApp,
  });

  windowManager.registerApp({
    id: 'dashboard',
    title: 'System Dashboard',
    icon: 'dashboard',
    defaultWidth: 720,
    defaultHeight: 560,
    render: renderDashboardApp,
  });

  windowManager.registerApp({
    id: 'notes',
    title: 'Notes & Docs',
    icon: 'notes',
    defaultWidth: 680,
    defaultHeight: 520,
    render: renderNotesApp,
  });

  windowManager.registerApp({
    id: 'calculator',
    title: 'Calculator',
    icon: 'calculator',
    defaultWidth: 340,
    defaultHeight: 480,
    render: renderCalculatorApp,
  });

  windowManager.registerApp({
    id: 'files',
    title: 'File Manager',
    icon: 'files',
    defaultWidth: 740,
    defaultHeight: 500,
    render: renderFilesApp,
  });

  windowManager.registerApp({
    id: 'calendar',
    title: 'Calendar & Schedule',
    icon: 'calendar',
    defaultWidth: 700,
    defaultHeight: 500,
    render: renderCalendarApp,
  });

  windowManager.registerApp({
    id: 'alarm',
    title: 'Alarm & Timer',
    icon: 'alarm',
    defaultWidth: 440,
    defaultHeight: 480,
    render: renderAlarmApp,
  });

  windowManager.registerApp({
    id: 'music',
    title: 'Synth Music Player',
    icon: 'music',
    defaultWidth: 420,
    defaultHeight: 560,
    render: renderMusicApp,
  });

  windowManager.registerApp({
    id: 'browser',
    title: 'Nova Web Browser',
    icon: 'browser',
    defaultWidth: 800,
    defaultHeight: 560,
    render: renderBrowserApp,
  });

  windowManager.registerApp({
    id: 'terminal',
    title: 'Terminal CLI',
    icon: 'terminal',
    defaultWidth: 640,
    defaultHeight: 440,
    render: renderTerminalApp,
  });

  windowManager.registerApp({
    id: 'settings',
    title: 'System Settings',
    icon: 'settings',
    defaultWidth: 620,
    defaultHeight: 560,
    render: renderSettingsApp,
  });

  // 3. Initialize Interactive Procedural Canvas Wallpaper
  const canvas = document.getElementById('wallpaper-canvas') as HTMLCanvasElement;
  if (canvas) {
    new WallpaperManager(canvas);
  }

  // 4. Initialize Desktop & Taskbar
  const desktopEl = document.getElementById('desktop');
  if (desktopEl) {
    new DesktopEnvironment(desktopEl);
  }

  const taskbarEl = document.getElementById('taskbar');
  if (taskbarEl) {
    new Taskbar(taskbarEl);
  }

  // 5. Run Boot Sequence
  const bootOverlay = document.getElementById('boot-overlay');
  if (bootOverlay) {
    const boot = new BootSequence(bootOverlay, () => {
      // Desktop Entered!
      notifications.show({
        title: 'Nova WebOS v4.2 Active',
        message: 'Welcome Operative! Press Alt+Space anytime to invoke Nova AI.',
        type: 'success',
        timeoutMs: 6000,
      });

      // Automatically open the Dev Logs Journal to immediately present Devlog #01, #02, and #03
      setTimeout(() => {
        windowManager.openWindow('devlogs');
      }, 300);
    });

    boot.start();
  }

  // 6. Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Alt + Space or Ctrl + Space => Launch Nova AI
    if ((e.altKey || e.ctrlKey) && e.code === 'Space') {
      e.preventDefault();
      sound.playClick();
      windowManager.openWindow('assistant');
    }

    // Alt + T => Launch Terminal
    if (e.altKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      sound.playClick();
      windowManager.openWindow('terminal');
    }

    // Alt + D => Show Desktop (minimize all)
    if (e.altKey && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      sound.playClick();
      const openWins = windowManager.getOpenWindows();
      const anyVisible = openWins.some((w) => !w.isMinimized);
      openWins.forEach((w) => {
        if (anyVisible) {
          windowManager.minimizeWindow(w.id);
        } else {
          windowManager.restoreWindow(w.id);
        }
      });
    }
  });
}

// Start OS when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNovaOS);
} else {
  initNovaOS();
}
