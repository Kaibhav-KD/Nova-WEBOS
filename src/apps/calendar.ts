import { WindowState, CalendarEvent } from '../types';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { notifications } from '../services/notifications';
import { getSvgIcon } from '../ui/icons';

export function renderCalendarApp(container: HTMLElement, win: WindowState) {
  let viewDate = new Date();
  let selectedDateStr = new Date().toISOString().split('T')[0];

  container.className = 'w-full h-full flex flex-col md:flex-row bg-slate-950/80 text-slate-100 p-3 gap-3 overflow-hidden select-none';

  const updateUI = () => {
    const events = storage.getEvents();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toISOString().split('T')[0];

    const selectedEvents = events.filter((e) => e.date === selectedDateStr);

    container.innerHTML = `
      <!-- Left side: Calendar Grid -->
      <div class="flex-1 flex flex-col bg-slate-900/40 rounded-xl p-3 border border-white/10 overflow-hidden">
        <!-- Month / Year Navigation -->
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div class="flex items-center gap-2">
            <h2 class="font-bold text-sm tracking-wide text-cyan-300 font-display">${monthNames[month]} ${year}</h2>
            <button id="cal-today-btn" class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/15 text-[10px] text-slate-300 transition-colors">Today</button>
          </div>
          <div class="flex items-center gap-1">
            <button id="cal-prev-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              ${getSvgIcon('chevron-left', 'w-4 h-4')}
            </button>
            <button id="cal-next-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              ${getSvgIcon('chevron-right', 'w-4 h-4')}
            </button>
          </div>
        </div>

        <!-- Days of week -->
        <div class="grid grid-cols-7 text-center text-[10px] font-mono text-slate-400 py-2 border-b border-white/5">
          <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
        </div>

        <!-- Dates Grid -->
        <div class="flex-1 grid grid-cols-7 grid-rows-6 gap-1 pt-1.5 text-xs font-mono">
          ${Array(firstDay)
            .fill(null)
            .map(() => `<div class="p-1 opacity-20"></div>`)
            .join('')}
          ${Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const curDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = curDateStr === todayStr;
            const isSelected = curDateStr === selectedDateStr;
            const dayEvents = events.filter((e) => e.date === curDateStr);

            return `
              <div data-date="${curDateStr}" class="cal-day-cell relative p-1 rounded-lg cursor-pointer transition-all flex flex-col justify-between items-center border ${
                isSelected
                  ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : isToday
                  ? 'bg-purple-500/20 border-purple-400/60 text-purple-200'
                  : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-300'
              }">
                <span class="${isToday ? 'font-bold' : ''}">${dayNum}</span>
                <div class="flex gap-0.5 mt-0.5">
                  ${dayEvents.slice(0, 3).map((e) => `<span class="w-1.5 h-1.5 rounded-full" style="background-color: ${e.color || '#00f0ff'}"></span>`).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Right side: Events for Selected Date -->
      <div class="w-full md:w-72 bg-slate-900/50 rounded-xl p-3 border border-white/10 flex flex-col">
        <div class="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <h3 class="text-xs font-bold text-slate-200">Scheduled Events</h3>
            <p class="text-[10px] text-slate-400 font-mono">${selectedDateStr}</p>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">${selectedEvents.length}</span>
        </div>

        <!-- Events List -->
        <div class="flex-1 overflow-y-auto py-2 flex flex-col gap-2">
          ${
            selectedEvents.length === 0
              ? `<div class="text-center py-6 text-xs text-slate-500">No events on this date</div>`
              : selectedEvents
                  .map(
                    (e) => `
              <div class="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between gap-2">
                <div class="flex items-start gap-2 overflow-hidden">
                  <span class="w-2 h-2 rounded-full mt-1 shrink-0" style="background-color: ${e.color || '#00f0ff'}"></span>
                  <div>
                    <div class="text-xs font-semibold text-slate-200">${e.title}</div>
                    ${e.time ? `<div class="text-[10px] text-slate-400 font-mono">${e.time}</div>` : ''}
                    ${e.description ? `<div class="text-[11px] text-slate-400 mt-0.5">${e.description}</div>` : ''}
                  </div>
                </div>
                <button data-eventid="${e.id}" class="cal-del-event text-slate-500 hover:text-rose-400 p-1 rounded transition-colors">
                  ${getSvgIcon('trash', 'w-3.5 h-3.5')}
                </button>
              </div>
            `
                  )
                  .join('')
          }
        </div>

        <!-- Add Event Form -->
        <div class="pt-2 border-t border-white/10 flex flex-col gap-2">
          <input type="text" id="cal-new-title" placeholder="Event title..."
            class="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400" />
          <div class="flex gap-2">
            <input type="time" id="cal-new-time" value="12:00"
              class="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none flex-1" />
            <select id="cal-new-color" class="bg-slate-900 border border-white/10 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none">
              <option value="#00f0ff">Cyan</option>
              <option value="#a855f7">Purple</option>
              <option value="#10b981">Green</option>
              <option value="#f97316">Orange</option>
              <option value="#f43f5e">Red</option>
            </select>
          </div>
          <button id="cal-add-btn" class="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded text-xs font-medium transition-colors">
            + Add Event
          </button>
        </div>
      </div>
    `;

    // Bind event handlers
    container.querySelector('#cal-prev-btn')?.addEventListener('click', () => {
      sound.playClick();
      viewDate.setMonth(viewDate.getMonth() - 1);
      updateUI();
    });

    container.querySelector('#cal-next-btn')?.addEventListener('click', () => {
      sound.playClick();
      viewDate.setMonth(viewDate.getMonth() + 1);
      updateUI();
    });

    container.querySelector('#cal-today-btn')?.addEventListener('click', () => {
      sound.playClick();
      viewDate = new Date();
      selectedDateStr = new Date().toISOString().split('T')[0];
      updateUI();
    });

    container.querySelectorAll('.cal-day-cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        sound.playClick();
        const d = cell.getAttribute('data-date');
        if (d) {
          selectedDateStr = d;
          updateUI();
        }
      });
    });

    container.querySelectorAll('.cal-del-event').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const evId = btn.getAttribute('data-eventid');
        if (evId) {
          const updated = events.filter((e) => e.id !== evId);
          storage.saveEvents(updated);
          notifications.show({ title: 'Calendar', message: 'Event removed', type: 'warning' });
          updateUI();
        }
      });
    });

    const addBtn = container.querySelector('#cal-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        sound.playClick();
        const titleInput = container.querySelector('#cal-new-title') as HTMLInputElement;
        const timeInput = container.querySelector('#cal-new-time') as HTMLInputElement;
        const colorInput = container.querySelector('#cal-new-color') as HTMLSelectElement;

        const title = titleInput?.value.trim();
        if (!title) return;

        const newEvent: CalendarEvent = {
          id: 'event-' + Date.now(),
          date: selectedDateStr,
          title,
          time: timeInput?.value || '12:00',
          color: colorInput?.value || '#00f0ff',
        };

        events.push(newEvent);
        storage.saveEvents(events);
        notifications.show({ title: 'Calendar', message: `Added: ${newEvent.title}`, type: 'success' });
        updateUI();
      });
    }
  };

  updateUI();
}
