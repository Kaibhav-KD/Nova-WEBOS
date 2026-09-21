import { WindowState } from '../types';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';
import { evaluateMath } from '../utils/math';

export function renderCalculatorApp(container: HTMLElement, win: WindowState) {
  let displayValue = '0';
  let formula = '';
  let history: string[] = [];

  container.className = 'w-full h-full flex flex-col bg-slate-950/80 text-slate-100 select-none p-3 overflow-hidden';

  const updateUI = () => {
    container.innerHTML = `
      <div class="flex flex-col h-full gap-2">
        <!-- Display Screen -->
        <div class="bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col justify-end items-end shrink-0 min-h-[70px]">
          <div class="text-[11px] text-slate-400 font-mono tracking-wider h-4 overflow-hidden truncate">${formula}</div>
          <div id="calc-display" class="text-2xl sm:text-3xl font-bold font-mono tracking-wider text-cyan-300 break-all overflow-hidden text-right w-full">${displayValue}</div>
        </div>

        <!-- History Drawer (collapsible) -->
        <div class="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span>Recent: <span class="text-slate-300 font-mono">${history.length > 0 ? history[history.length - 1] : 'No history'}</span></span>
          <button id="calc-clear-hist" class="text-[10px] text-slate-500 hover:text-slate-300">Clear</button>
        </div>

        <!-- Keypad Grid -->
        <div class="flex-1 grid grid-cols-4 gap-1.5 text-xs font-mono font-medium">
          <!-- Row 1: Clear & Advanced -->
          <button data-key="C" class="calc-btn bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg p-2 transition-colors">AC</button>
          <button data-key="DEL" class="calc-btn bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 rounded-lg p-2 transition-colors">DEL</button>
          <button data-key="%" class="calc-btn bg-white/5 text-cyan-400 hover:bg-white/10 border border-white/10 rounded-lg p-2 transition-colors">%</button>
          <button data-key="/" class="calc-btn bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg p-2 transition-colors">÷</button>

          <!-- Row 2 -->
          <button data-key="7" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">7</button>
          <button data-key="8" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">8</button>
          <button data-key="9" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">9</button>
          <button data-key="*" class="calc-btn bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg p-2 transition-colors">×</button>

          <!-- Row 3 -->
          <button data-key="4" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">4</button>
          <button data-key="5" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">5</button>
          <button data-key="6" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">6</button>
          <button data-key="-" class="calc-btn bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg p-2 transition-colors">−</button>

          <!-- Row 4 -->
          <button data-key="1" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">1</button>
          <button data-key="2" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">2</button>
          <button data-key="3" class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">3</button>
          <button data-key="+" class="calc-btn bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg p-2 transition-colors">+</button>

          <!-- Row 5 -->
          <button data-key="0" class="calc-btn col-span-2 bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">0</button>
          <button data-key="." class="calc-btn bg-white/10 text-white hover:bg-white/15 border border-white/10 rounded-lg p-2 transition-colors">.</button>
          <button data-key="=" class="calc-btn bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 border border-cyan-400 rounded-lg p-2 transition-colors shadow-lg shadow-cyan-500/25">=</button>
        </div>
      </div>
    `;

    // Bind clicks
    container.querySelectorAll('.calc-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        if (key) handleInput(key);
      });
    });

    const clearHist = container.querySelector('#calc-clear-hist');
    if (clearHist) {
      clearHist.addEventListener('click', () => {
        history = [];
        updateUI();
      });
    }
  };

  const handleInput = (key: string) => {
    sound.playClick();
    if (key === 'C') {
      displayValue = '0';
      formula = '';
    } else if (key === 'DEL') {
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
      } else {
        displayValue = '0';
      }
    } else if (key === '=') {
      const expr = formula + displayValue;
      const res = evaluateMath(expr);
      if (res.success && res.formatted !== undefined) {
        history.push(`${formula + displayValue} = ${res.formatted}`);
        if (history.length > 10) history.shift();
        formula = '';
        displayValue = res.formatted;
      } else {
        displayValue = 'Error';
      }
    } else if (['+', '-', '*', '/'].includes(key)) {
      formula = `${displayValue} ${key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : '+'} `;
      displayValue = '0';
    } else if (key === '%') {
      const val = parseFloat(displayValue);
      if (!isNaN(val)) {
        displayValue = String(val / 100);
      }
    } else if (key === '.') {
      if (!displayValue.includes('.')) {
        displayValue += '.';
      }
    } else {
      // Numbers
      if (displayValue === '0' || displayValue === 'Error') {
        displayValue = key;
      } else {
        displayValue += key;
      }
    }
    updateUI();
  };

  // Keyboard support when window is active
  const keyHandler = (e: KeyboardEvent) => {
    if (!win.element.classList.contains('active')) return;
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
      handleInput(e.key);
    } else if (e.key === '+') handleInput('+');
    else if (e.key === '-') handleInput('-');
    else if (e.key === '*') handleInput('*');
    else if (e.key === '/') {
      e.preventDefault();
      handleInput('/');
    } else if (e.key === 'Enter' || e.key === '=') {
      handleInput('=');
    } else if (e.key === 'Backspace') {
      handleInput('DEL');
    } else if (e.key === 'Escape') {
      handleInput('C');
    }
  };

  window.addEventListener('keydown', keyHandler);
  win.onClose = () => {
    window.removeEventListener('keydown', keyHandler);
  };

  updateUI();
}
