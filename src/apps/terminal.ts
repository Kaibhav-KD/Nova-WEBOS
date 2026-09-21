import { WindowState } from '../types';
import { vfs } from '../services/vfs';
import { windowManager } from '../services/windows';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

export function renderTerminalApp(container: HTMLElement, win: WindowState) {
  const history: string[] = [];
  let historyIndex = -1;
  let lines: { text: string; type?: 'output' | 'input' | 'error' | 'success' | 'system' }[] = [
    { text: 'Nova Core Operating System Terminal — Shell v3.1', type: 'system' },
    { text: 'Type "help" to view available commands or "neofetch" for system spec.', type: 'system' },
    { text: '', type: 'output' },
  ];

  let isMatrixRunning = false;
  let matrixInterval: number | null = null;

  container.className = 'w-full h-full flex flex-col bg-black/95 text-cyan-400 font-mono text-xs p-3 overflow-hidden select-text';

  const updateUI = () => {
    container.innerHTML = `
      <!-- Lines Output Container -->
      <div id="term-lines" class="flex-1 overflow-y-auto space-y-1 pr-1">
        ${lines
          .map((l) => {
            let color = 'text-cyan-300';
            if (l.type === 'input') color = 'text-slate-100 font-bold';
            else if (l.type === 'error') color = 'text-rose-400';
            else if (l.type === 'success') color = 'text-emerald-400';
            else if (l.type === 'system') color = 'text-purple-400';
            return `<div class="${color} leading-relaxed whitespace-pre-wrap break-all">${escapeHtml(l.text)}</div>`;
          })
          .join('')}

        ${
          isMatrixRunning
            ? `<div class="text-emerald-500 font-bold animate-pulse text-xs">=== MATRIX RAIN STREAM ACTIVE (type any key to stop) ===</div>`
            : ''
        }
      </div>

      <!-- Command Prompt Input -->
      <div class="flex items-center gap-2 pt-2 border-t border-cyan-950 shrink-0">
        <span class="text-emerald-400 font-bold select-none">operative@nova:~$</span>
        <input type="text" id="term-input" autocomplete="off" spellcheck="false"
          class="flex-1 bg-transparent text-slate-100 focus:outline-none caret-cyan-400 border-none p-0 text-xs font-mono" />
      </div>
    `;

    bindEvents();
    scrollToBottom();
  };

  const escapeHtml = (str: string) => {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const scrollToBottom = () => {
    const el = container.querySelector('#term-lines');
    if (el) el.scrollTop = el.scrollHeight;
  };

  const executeCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;

    lines.push({ text: `operative@nova:~$ ${trimmed}`, type: 'input' });

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        lines.push({
          text: `Available Terminal Commands:
  help              Display this command list
  open <app>        Launch an app (ai, notes, calc, dash, calendar, alarm, files, music, browser, settings, devlogs)
  ls [path]         List directory contents
  cat <filename>    Display file contents
  mkdir <name>      Create directory
  touch <filename>  Create blank text file
  clear             Clear terminal screen
  neofetch          Display system architecture banner
  matrix            Toggle digital rain simulation
  date              Show current system date & time
  uptime            Show OS running time
  theme <name>      Switch theme (cyberpunk, obsidian, aurora, emerald, solar)
  echo <text>       Echo input text`,
          type: 'output',
        });
        break;

      case 'clear':
        lines = [];
        break;

      case 'open':
        if (!args[0]) {
          lines.push({ text: 'Error: Please specify an application name. e.g. "open calc"', type: 'error' });
        } else {
          const target = args[0].toLowerCase();
          const map: Record<string, string> = {
            notes: 'notes',
            calc: 'calculator',
            calculator: 'calculator',
            dash: 'dashboard',
            dashboard: 'dashboard',
            calendar: 'calendar',
            alarm: 'alarm',
            timer: 'alarm',
            files: 'files',
            music: 'music',
            browser: 'browser',
            settings: 'settings',
            ai: 'assistant',
            assistant: 'assistant',
            devlogs: 'devlogs',
          };
          const appId = (map[target] || target) as any;
          try {
            const w = windowManager.openWindow(appId);
            if (w) {
              lines.push({ text: `Process spawned: [${w.title}] with PID ${w.id}`, type: 'success' });
            } else {
              lines.push({ text: `Failed to spawn: unknown application "${target}"`, type: 'error' });
            }
          } catch {
            lines.push({ text: `Failed to spawn: unknown application "${target}"`, type: 'error' });
          }
        }
        break;

      case 'ls':
        const dir = args[0] || '/';
        const items = vfs.getItemsInPath(dir);
        if (items.length === 0) {
          lines.push({ text: `(Directory ${dir} is empty)`, type: 'output' });
        } else {
          const formatted = items.map((i) => (i.type === 'folder' ? `[DIR]  ${i.name}/` : `[FILE] ${i.name}  (${i.size || '0 KB'})`)).join('\n');
          lines.push({ text: formatted, type: 'output' });
        }
        break;

      case 'cat':
        if (!args[0]) {
          lines.push({ text: 'Usage: cat <filename>', type: 'error' });
        } else {
          const files = vfs.getAllFiles();
          const f = files.find((item) => item.name.toLowerCase() === args[0].toLowerCase());
          if (f) {
            lines.push({ text: f.content || '(empty file)', type: 'output' });
          } else {
            lines.push({ text: `File not found: ${args[0]}`, type: 'error' });
          }
        }
        break;

      case 'mkdir':
        if (!args[0]) {
          lines.push({ text: 'Usage: mkdir <folder_name>', type: 'error' });
        } else {
          vfs.createFolder(args[0], '/');
          lines.push({ text: `Created directory /${args[0]}`, type: 'success' });
        }
        break;

      case 'touch':
        if (!args[0]) {
          lines.push({ text: 'Usage: touch <filename>', type: 'error' });
        } else {
          vfs.createFile(args[0], '/', `Created on ${new Date().toISOString()}`);
          lines.push({ text: `Created file ${args[0]}`, type: 'success' });
        }
        break;

      case 'date':
        lines.push({ text: new Date().toString(), type: 'output' });
        break;

      case 'uptime':
        lines.push({ text: `Nova OS kernel active. Session initialized.`, type: 'output' });
        break;

      case 'theme':
        if (!args[0]) {
          lines.push({ text: 'Usage: theme <cyberpunk | obsidian | aurora | emerald | solar>', type: 'error' });
        } else {
          const th = args[0].toLowerCase() as any;
          if (['cyberpunk', 'obsidian', 'aurora', 'emerald', 'solar'].includes(th)) {
            const st = storage.getSettings();
            st.theme = th;
            storage.saveSettings(st);
            document.documentElement.setAttribute('data-theme', th);
            lines.push({ text: `Theme switched to: ${th.toUpperCase()}`, type: 'success' });
          } else {
            lines.push({ text: `Invalid theme. Choose from: cyberpunk, obsidian, aurora, emerald, solar`, type: 'error' });
          }
        }
        break;

      case 'echo':
        lines.push({ text: args.join(' '), type: 'output' });
        break;

      case 'neofetch':
        lines.push({
          text: `
  _  _ _____   _____    ___  ___ 
 | \\| | _ \\ \\ / /   \\  / _ \\/ __|
 | .\` |  _/\\ V /| |) || (_) \\__ \\
 |_|\\_|_|   \\_/ |___/  \\___/|___/
 ---------------------------------
 OS:        Nova WebOS v4.2 [Cybernetic Edition]
 Host:      ${navigator.userAgent.split(' ')[0]}
 Kernel:    Browser WebPlatform Core (Vanilla TS)
 Shell:     Nova SH v3.1 (interactive)
 Theme:     ${storage.getSettings().theme.toUpperCase()}
 Memory:    Virtual JS Heap (Managed)
 Windows:   ${windowManager.getOpenWindows().length} active processes
 Audio:     Web Audio Synthesizer Engine
          `,
          type: 'system',
        });
        break;

      case 'matrix':
        startMatrixSimulation();
        break;

      default:
        lines.push({ text: `Command not found: "${cmd}". Type "help" for a list of commands.`, type: 'error' });
        break;
    }

    sound.playClick();
    updateUI();
  };

  const startMatrixSimulation = () => {
    isMatrixRunning = true;
    const chars = '01010101ABCDEFXYZ$%#@!&<>~*';
    matrixInterval = window.setInterval(() => {
      let rain = '';
      for (let i = 0; i < 48; i++) {
        rain += chars[Math.floor(Math.random() * chars.length)];
      }
      lines.push({ text: rain, type: 'success' });
      if (lines.length > 50) lines.shift();
      updateUI();
    }, 150);
  };

  const stopMatrix = () => {
    if (isMatrixRunning) {
      isMatrixRunning = false;
      if (matrixInterval) clearInterval(matrixInterval);
      lines.push({ text: 'Matrix rain terminated.', type: 'system' });
      updateUI();
    }
  };

  const bindEvents = () => {
    const input = container.querySelector('#term-input') as HTMLInputElement;
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (isMatrixRunning) {
          stopMatrix();
          return;
        }

        if (e.key === 'Enter') {
          executeCommand(input.value);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
          } else {
            historyIndex = history.length;
            input.value = '';
          }
        }
      });
    }

    // Keep focus
    container.addEventListener('click', () => {
      const inp = container.querySelector('#term-input') as HTMLInputElement;
      if (inp) inp.focus();
    });
  };

  win.onClose = () => {
    if (matrixInterval) clearInterval(matrixInterval);
  };

  updateUI();
}
