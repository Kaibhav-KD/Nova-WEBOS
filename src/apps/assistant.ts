import { WindowState } from '../types';
import { novaAI } from '../services/ai';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionTaken?: string;
  suggestedPrompts?: string[];
}

export function renderAssistantApp(container: HTMLElement, win: WindowState) {
  let messages: ChatMessage[] = [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello, Operative. I am **Nova AI**, your integrated operating system intelligence.\n\nYou can issue natural language commands to control apps, manage settings, evaluate math, or inspect system state.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: [
        'Open calculator',
        'Show system dashboard',
        'Set a timer for 5 minutes',
        'What time is it?',
        'Open notes',
      ],
    },
  ];

  let isThinking = false;

  container.className = 'w-full h-full flex flex-col bg-slate-950/90 text-slate-100 select-none overflow-hidden font-sans';

  const updateUI = () => {
    container.innerHTML = `
      <!-- Header with status pulse -->
      <div class="px-4 py-2.5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="relative w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            ${getSvgIcon('assistant', 'w-4 h-4')}
            <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs tracking-wide text-slate-100 font-display">Nova AI</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">NEURAL v4.2</span>
            </div>
            <p class="text-[10px] text-slate-400">Integrated OS Intent & Command Interface</p>
          </div>
        </div>
        <button id="ai-clear-btn" class="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors" title="Clear Chat">
          ${getSvgIcon('trash', 'w-3.5 h-3.5')}
        </button>
      </div>

      <!-- Messages History -->
      <div id="ai-messages-container" class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        ${messages
          .map(
            (m) => `
          <div class="flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-full">
            <div class="flex items-center gap-2 mb-1 px-1">
              <span class="text-[10px] font-mono ${m.sender === 'user' ? 'text-slate-400' : 'text-cyan-400'} font-semibold">
                ${m.sender === 'user' ? 'Operative' : 'Nova AI'}
              </span>
              <span class="text-[9px] text-slate-500 font-mono">${m.timestamp}</span>
            </div>

            <div class="p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
              m.sender === 'user'
                ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-cyan-500/20'
                : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-none'
            }">
              <div class="whitespace-pre-wrap">${formatMarkdown(m.text)}</div>
              ${
                m.actionTaken
                  ? `<div class="mt-2 pt-1.5 border-t border-white/10 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <span>✓</span>
                      <span>OS Action Executed: [${m.actionTaken}]</span>
                    </div>`
                  : ''
              }
            </div>

            <!-- Suggested Prompt Pills -->
            ${
              m.suggestedPrompts && m.suggestedPrompts.length > 0
                ? `
              <div class="flex flex-wrap gap-1.5 mt-2.5 max-w-sm">
                ${m.suggestedPrompts
                  .map(
                    (p) => `
                  <button data-prompt="${p}" class="ai-prompt-pill px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-medium transition-colors">
                    ${p}
                  </button>
                `
                  )
                  .join('')}
              </div>
            `
                : ''
            }
          </div>
        `
          )
          .join('')}

        ${
          isThinking
            ? `
          <div class="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 w-32">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
            <span class="text-[10px] text-slate-400 font-mono ml-1">Analyzing...</span>
          </div>
        `
            : ''
        }
      </div>

      <!-- Input Bar -->
      <div class="p-3 border-t border-white/10 bg-slate-900/50 flex items-center gap-2 shrink-0">
        <input type="text" id="ai-input" placeholder="Type a command or ask a question (e.g. 'Open calculator')..."
          class="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400" />
        <button id="ai-send-btn" class="px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-1.5">
          <span>Send</span>
          ${getSvgIcon('sparkles', 'w-3.5 h-3.5')}
        </button>
      </div>
    `;

    bindEvents();
    scrollToBottom();
  };

  const formatMarkdown = (txt: string): string => {
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-black/40 px-1 py-0.5 rounded text-cyan-300 font-mono text-[11px]">$1</code>');
  };

  const scrollToBottom = () => {
    const box = container.querySelector('#ai-messages-container');
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isThinking) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    messages.push(userMsg);
    isThinking = true;
    updateUI();

    // Process with AI Engine
    const response = await novaAI.processQuery(text.trim());

    setTimeout(() => {
      isThinking = false;
      const botMsg: ChatMessage = {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionTaken: response.actionTaken,
        suggestedPrompts: response.suggestedPrompts,
      };
      messages.push(botMsg);
      sound.playNotification();
      updateUI();
    }, 450);
  };

  const bindEvents = () => {
    const input = container.querySelector('#ai-input') as HTMLInputElement;
    const sendBtn = container.querySelector('#ai-send-btn');

    const submit = () => {
      if (input && input.value) {
        const val = input.value;
        input.value = '';
        handleSend(val);
      }
    };

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submit();
      });
      // Auto focus
      setTimeout(() => input.focus(), 100);
    }
    if (sendBtn) sendBtn.addEventListener('click', submit);

    container.querySelectorAll('.ai-prompt-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const p = pill.getAttribute('data-prompt');
        if (p) handleSend(p);
      });
    });

    container.querySelector('#ai-clear-btn')?.addEventListener('click', () => {
      sound.playClick();
      messages = [messages[0]];
      updateUI();
    });
  };

  updateUI();
}
