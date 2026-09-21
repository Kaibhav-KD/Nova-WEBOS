import { WindowState } from '../types';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

export function renderBrowserApp(container: HTMLElement, win: WindowState) {
  let url = 'https://nova.search/home';
  let title = 'Nova Search — Web Gateway';
  let history: string[] = ['https://nova.search/home'];
  let historyIdx = 0;
  let activeTabContent = 'search'; // 'search' | 'page' | 'iframe'
  let currentSearchQuery = '';

  container.className = 'w-full h-full flex flex-col bg-slate-950 text-slate-100 select-none overflow-hidden';

  const searchDatabase = [
    {
      title: 'Nova WebOS — Next-Generation Browser Operating System',
      url: 'https://webos.nova/overview',
      snippet: 'A revolutionary desktop environment executed directly in browser runtimes. Featuring zero-dependency vanilla JS window compositor, persistent VFS and Nova AI.',
      content: `
        <h1 class="text-xl font-bold text-cyan-300 mb-2">Nova WebOS Architecture</h1>
        <p class="text-sm text-slate-300 leading-relaxed mb-4">Nova WebOS represents the apex of browser capability. Built without heavy virtual DOM abstractions, it handles window dragging and resizing at native frame rates.</p>
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
          <h3 class="text-xs font-bold uppercase text-slate-200 mb-2">Core Subsystems:</h3>
          <ul class="text-xs text-slate-400 list-disc pl-4 space-y-1">
            <li><strong>Compositor:</strong> Real-time z-index layering and boundary clamping</li>
            <li><strong>Virtual File System:</strong> In-memory and localStorage-backed hierarchical tree</li>
            <li><strong>Synthesizer:</strong> Web Audio API procedural sound module</li>
          </ul>
        </div>
      `,
    },
    {
      title: 'Vanilla JavaScript Best Practices in 2026',
      url: 'https://dev.portal/vanilla-js',
      snippet: 'Why developers are embracing frameworkless architectures for lightweight web apps, micro-frontends, and high-performance operating systems.',
      content: `
        <h1 class="text-xl font-bold text-emerald-400 mb-2">The Power of Vanilla JavaScript</h1>
        <p class="text-sm text-slate-300 leading-relaxed mb-3">Modern browsers provide standard APIs for layout, animation, audio, and state that rival traditional framework abstractions without bundle overhead.</p>
        <p class="text-xs text-slate-400">By utilizing PointerEvents, custom CSS properties, and Web Audio, web applications can achieve 60fps performance on any modern hardware.</p>
      `,
    },
    {
      title: 'Web Audio API: Procedural Audio Generation',
      url: 'https://audio.labs/synth-guide',
      snippet: 'Complete technical reference for synthesizing oscillators, biquad filters, and ambient background music without external audio files.',
      content: `
        <h1 class="text-xl font-bold text-purple-400 mb-2">Procedural Audio in Modern Browsers</h1>
        <p class="text-sm text-slate-300 leading-relaxed mb-3">Learn how Nova WebOS uses AudioContext and OscillatorNode to dynamically generate tactile UI clicks, window chimes, and full musical scales in real time.</p>
      `,
    },
    {
      title: 'Artificial Intelligence in Operating Systems',
      url: 'https://ai.futures/os-assistants',
      snippet: 'Integrating conversational intent models directly into desktop workflow orchestration. How natural language commands replace manual navigation.',
      content: `
        <h1 class="text-xl font-bold text-amber-400 mb-2">AI-Driven OS Navigation</h1>
        <p class="text-sm text-slate-300 leading-relaxed">Modern operating systems now feature integrated assistants like Nova AI, capable of launching tools, altering system themes, and managing timers through intent recognition.</p>
      `,
    },
  ];

  const updateUI = () => {
    container.innerHTML = `
      <!-- Top Navigation Bar -->
      <div class="p-2 border-b border-white/10 bg-slate-900/70 flex flex-col gap-1.5 shrink-0">
        <!-- Controls & URL Bar -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <button id="br-back" class="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors ${historyIdx <= 0 ? 'opacity-30 pointer-events-none' : ''}">
              ${getSvgIcon('chevron-left', 'w-4 h-4')}
            </button>
            <button id="br-fwd" class="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors ${historyIdx >= history.length - 1 ? 'opacity-30 pointer-events-none' : ''}">
              ${getSvgIcon('chevron-right', 'w-4 h-4')}
            </button>
            <button id="br-reload" class="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              ${getSvgIcon('refresh', 'w-4 h-4')}
            </button>
          </div>

          <!-- Address Input -->
          <div class="flex-1 relative flex items-center">
            <span class="absolute left-2.5 text-slate-500">
              ${getSvgIcon('browser', 'w-3.5 h-3.5')}
            </span>
            <input type="text" id="br-url-input" value="${url}" placeholder="Search web or enter address..."
              class="w-full bg-black/50 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400" />
          </div>

          <button id="br-go-btn" class="px-3 py-1.5 bg-cyan-500 text-slate-950 rounded-lg font-semibold text-xs hover:bg-cyan-400 transition-colors">
            Go
          </button>
        </div>

        <!-- Bookmarks Bar -->
        <div class="flex items-center gap-2 text-[11px] text-slate-400 px-1 overflow-x-auto">
          <span class="text-slate-500 text-[10px] uppercase tracking-wider">Bookmarks:</span>
          <button data-burl="https://nova.search/home" class="b-mark hover:text-cyan-300 transition-colors">Nova Search</button>
          <span class="text-slate-600">•</span>
          <button data-burl="https://webos.nova/overview" class="b-mark hover:text-cyan-300 transition-colors">WebOS Docs</button>
          <span class="text-slate-600">•</span>
          <button data-burl="https://dev.portal/vanilla-js" class="b-mark hover:text-cyan-300 transition-colors">Vanilla JS</button>
          <span class="text-slate-600">•</span>
          <button data-burl="https://audio.labs/synth-guide" class="b-mark hover:text-cyan-300 transition-colors">Audio Synthesis</button>
        </div>
      </div>

      <!-- Viewport content -->
      <div class="flex-1 overflow-y-auto bg-slate-950 p-6 flex flex-col">
        ${renderBrowserContent()}
      </div>
    `;

    bindEvents();
  };

  const renderBrowserContent = (): string => {
    if (url.includes('nova.search/home') || currentSearchQuery) {
      const results = currentSearchQuery
        ? searchDatabase.filter(
            (item) =>
              item.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
              item.snippet.toLowerCase().includes(currentSearchQuery.toLowerCase())
          )
        : searchDatabase;

      return `
        <div class="max-w-2xl mx-auto w-full flex flex-col gap-6">
          <div class="text-center py-4">
            <div class="inline-flex items-center gap-2 text-cyan-400 mb-2">
              ${getSvgIcon('nova-logo', 'w-8 h-8')}
              <span class="text-xl font-bold font-display tracking-wider text-slate-100">NOVA SEARCH</span>
            </div>
            <p class="text-xs text-slate-400">Next-generation indexed knowledge network</p>
          </div>

          <div class="flex flex-col gap-4">
            <h4 class="text-xs font-mono text-slate-500 uppercase tracking-wider">
              ${currentSearchQuery ? `Search Results for "${currentSearchQuery}" (${results.length})` : 'Featured Topics & Knowledge Articles'}
            </h4>

            ${
              results.length === 0
                ? `<div class="text-center py-8 text-slate-500 text-xs">No indexed pages match your search.</div>`
                : results
                    .map(
                      (item) => `
                <div data-url="${item.url}" class="br-result-card p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 cursor-pointer transition-all">
                  <span class="text-[10px] text-cyan-400 font-mono">${item.url}</span>
                  <h3 class="text-sm font-semibold text-slate-100 hover:underline mt-0.5">${item.title}</h3>
                  <p class="text-xs text-slate-400 mt-1 leading-relaxed">${item.snippet}</p>
                </div>
              `
                    )
                    .join('')
            }
          </div>
        </div>
      `;
    }

    // Check specific article match
    const found = searchDatabase.find((d) => d.url === url);
    if (found) {
      return `
        <div class="max-w-2xl mx-auto w-full bg-slate-900/60 p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div class="mb-4 pb-2 border-b border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>${found.url}</span>
            <button id="br-back-to-search" class="text-cyan-400 hover:underline">← Back to Search</button>
          </div>
          ${found.content}
        </div>
      `;
    }

    // Generic fallback for custom URLs
    return `
      <div class="max-w-xl mx-auto w-full text-center py-12">
        <div class="text-slate-600 mb-3 mx-auto flex justify-center">${getSvgIcon('browser', 'w-12 h-12')}</div>
        <h3 class="text-base font-bold text-slate-200">Browsing: ${url}</h3>
        <p class="text-xs text-slate-400 mt-2">Simulated sandbox view. This browser safely renders internal WebOS knowledge pages and simulated documents.</p>
        <button id="br-back-home" class="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition-colors">
          Return to Nova Search
        </button>
      </div>
    `;
  };

  const navigateTo = (newUrl: string) => {
    sound.playClick();
    url = newUrl;
    history.splice(historyIdx + 1);
    history.push(url);
    historyIdx = history.length - 1;
    currentSearchQuery = '';
    updateUI();
  };

  const bindEvents = () => {
    const input = container.querySelector('#br-url-input') as HTMLInputElement;
    const goBtn = container.querySelector('#br-go-btn');

    const doNav = () => {
      const val = input.value.trim();
      if (!val) return;
      if (val.startsWith('http://') || val.startsWith('https://')) {
        navigateTo(val);
      } else {
        // Search
        currentSearchQuery = val;
        url = `https://nova.search/results?q=${encodeURIComponent(val)}`;
        history.splice(historyIdx + 1);
        history.push(url);
        historyIdx = history.length - 1;
        updateUI();
      }
    };

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doNav();
      });
    }
    if (goBtn) {
      goBtn.addEventListener('click', doNav);
    }

    // Back / Forward
    container.querySelector('#br-back')?.addEventListener('click', () => {
      if (historyIdx > 0) {
        sound.playClick();
        historyIdx--;
        url = history[historyIdx];
        currentSearchQuery = '';
        updateUI();
      }
    });

    container.querySelector('#br-fwd')?.addEventListener('click', () => {
      if (historyIdx < history.length - 1) {
        sound.playClick();
        historyIdx++;
        url = history[historyIdx];
        currentSearchQuery = '';
        updateUI();
      }
    });

    container.querySelector('#br-reload')?.addEventListener('click', () => {
      sound.playClick();
      updateUI();
    });

    // Bookmarks
    container.querySelectorAll('.b-mark').forEach((bm) => {
      bm.addEventListener('click', () => {
        const u = bm.getAttribute('data-burl');
        if (u) navigateTo(u);
      });
    });

    // Result card clicks
    container.querySelectorAll('.br-result-card').forEach((card) => {
      card.addEventListener('click', () => {
        const u = card.getAttribute('data-url');
        if (u) navigateTo(u);
      });
    });

    container.querySelector('#br-back-to-search')?.addEventListener('click', () => {
      navigateTo('https://nova.search/home');
    });

    container.querySelector('#br-back-home')?.addEventListener('click', () => {
      navigateTo('https://nova.search/home');
    });
  };

  updateUI();
}
