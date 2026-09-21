import { WindowState, Note } from '../types';
import { storage } from '../services/storage';
import { notifications } from '../services/notifications';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

export function renderNotesApp(container: HTMLElement, win: WindowState) {
  let notes = storage.getNotes();
  let activeNoteId = notes.length > 0 ? notes[0].id : null;
  let searchQuery = '';

  container.className = 'w-full h-full flex flex-col md:flex-row bg-slate-950/70 text-slate-100 overflow-hidden';

  const updateUI = () => {
    notes = storage.getNotes();
    const filtered = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeNote = notes.find((n) => n.id === activeNoteId) || filtered[0] || null;
    if (activeNote) {
      activeNoteId = activeNote.id;
    }

    const words = activeNote ? (activeNote.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0) : 0;
    const chars = activeNote ? activeNote.content.length : 0;

    container.innerHTML = `
      <!-- Sidebar / Notes List -->
      <div class="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-slate-900/50 shrink-0 h-48 md:h-full">
        <div class="p-3 border-b border-white/10 flex items-center justify-between gap-2">
          <div class="relative flex-1">
            <input type="text" id="notes-search" placeholder="Search notes..." value="${searchQuery}"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400" />
          </div>
          <button id="notes-new-btn" class="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 rounded-lg transition-colors" title="New Note">
            ${getSvgIcon('plus', 'w-4 h-4')}
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
          ${filtered.length === 0 ? `<div class="p-4 text-center text-xs text-slate-500">No notes found</div>` : ''}
          ${filtered
            .map(
              (n) => `
            <div data-id="${n.id}" class="note-item p-2.5 rounded-lg cursor-pointer transition-all border ${
                n.id === activeNoteId
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-white'
                  : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-300'
              }">
              <div class="flex items-center justify-between gap-2">
                <span class="font-medium text-xs truncate flex-1">${n.title || 'Untitled Note'}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 shrink-0">${n.category}</span>
              </div>
              <p class="text-[11px] text-slate-400 truncate mt-1">${n.content.replace(/[#*`_]/g, '') || 'Empty note...'}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Main Editor Area -->
      <div class="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/50">
        ${
          activeNote
            ? `
          <div class="p-3 border-b border-white/10 flex items-center justify-between gap-3 bg-white/5 shrink-0">
            <input type="text" id="note-title-input" value="${activeNote.title}" placeholder="Note Title"
              class="bg-transparent font-semibold text-sm text-slate-100 focus:outline-none flex-1 border-b border-transparent focus:border-cyan-400/50 px-1 py-0.5" />
            <div class="flex items-center gap-2">
              <select id="note-category-select" class="bg-slate-900 border border-white/15 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none">
                <option value="Personal" ${activeNote.category === 'Personal' ? 'selected' : ''}>Personal</option>
                <option value="Work" ${activeNote.category === 'Work' ? 'selected' : ''}>Work</option>
                <option value="Ideas" ${activeNote.category === 'Ideas' ? 'selected' : ''}>Ideas</option>
                <option value="Guides" ${activeNote.category === 'Guides' ? 'selected' : ''}>Guides</option>
                <option value="Shortcuts" ${activeNote.category === 'Shortcuts' ? 'selected' : ''}>Shortcuts</option>
                <option value="Project" ${activeNote.category === 'Project' ? 'selected' : ''}>Project</option>
              </select>
              <button id="note-download-btn" class="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Export as TXT">
                ${getSvgIcon('download', 'w-4 h-4')}
              </button>
              <button id="note-delete-btn" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors" title="Delete Note">
                ${getSvgIcon('trash', 'w-4 h-4')}
              </button>
            </div>
          </div>

          <div class="flex-1 p-4 overflow-hidden flex flex-col">
            <textarea id="note-content-textarea" placeholder="Start typing your note here..."
              class="w-full flex-1 bg-transparent resize-none focus:outline-none text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">${activeNote.content}</textarea>
          </div>

          <div class="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 shrink-0">
            <span>Words: <strong class="text-slate-200 font-mono">${words}</strong> • Chars: <strong class="text-slate-200 font-mono">${chars}</strong></span>
            <span class="text-[10px] text-slate-500">Auto-saved to localStorage</span>
          </div>
        `
            : `
          <div class="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            ${getSvgIcon('notes', 'w-12 h-12 mb-3 text-slate-600')}
            <p class="text-sm">No note selected</p>
            <button id="notes-empty-new-btn" class="mt-3 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-xs font-medium">Create New Note</button>
          </div>
        `
        }
      </div>
    `;

    // Bind event listeners
    const searchInput = container.querySelector('#notes-search') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = (e.target as HTMLInputElement).value;
        updateUI();
        const refocused = container.querySelector('#notes-search') as HTMLInputElement;
        if (refocused) {
          refocused.focus();
          refocused.selectionStart = refocused.selectionEnd = refocused.value.length;
        }
      });
    }

    const newBtn = container.querySelector('#notes-new-btn');
    const emptyNewBtn = container.querySelector('#notes-empty-new-btn');
    const createNew = () => {
      sound.playClick();
      const newNote: Note = {
        id: 'note-' + Date.now(),
        title: 'New Note',
        content: '',
        category: 'Personal',
        updatedAt: new Date().toISOString(),
      };
      notes.unshift(newNote);
      storage.saveNotes(notes);
      activeNoteId = newNote.id;
      notifications.show({ title: 'Notes', message: 'Created new note', type: 'success' });
      updateUI();
    };
    if (newBtn) newBtn.addEventListener('click', createNew);
    if (emptyNewBtn) emptyNewBtn.addEventListener('click', createNew);

    const noteItems = container.querySelectorAll('.note-item');
    noteItems.forEach((el) => {
      el.addEventListener('click', () => {
        sound.playClick();
        activeNoteId = el.getAttribute('data-id');
        updateUI();
      });
    });

    const titleInput = container.querySelector('#note-title-input') as HTMLInputElement;
    if (titleInput && activeNote) {
      titleInput.addEventListener('input', (e) => {
        activeNote.title = (e.target as HTMLInputElement).value;
        activeNote.updatedAt = new Date().toISOString();
        storage.saveNotes(notes);
      });
    }

    const categorySelect = container.querySelector('#note-category-select') as HTMLSelectElement;
    if (categorySelect && activeNote) {
      categorySelect.addEventListener('change', (e) => {
        activeNote.category = (e.target as HTMLSelectElement).value;
        storage.saveNotes(notes);
        updateUI();
      });
    }

    const contentArea = container.querySelector('#note-content-textarea') as HTMLTextAreaElement;
    if (contentArea && activeNote) {
      contentArea.addEventListener('input', (e) => {
        activeNote.content = (e.target as HTMLTextAreaElement).value;
        activeNote.updatedAt = new Date().toISOString();
        storage.saveNotes(notes);
        const wordsSpan = container.querySelector('strong.font-mono');
        if (wordsSpan) {
          const w = activeNote.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
          wordsSpan.textContent = `${w}`;
        }
      });
    }

    const downloadBtn = container.querySelector('#note-download-btn');
    if (downloadBtn && activeNote) {
      downloadBtn.addEventListener('click', () => {
        sound.playClick();
        const blob = new Blob([activeNote.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeNote.title.replace(/[^a-z0-9]/gi, '_') || 'note'}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        notifications.show({ title: 'Notes', message: `Exported ${activeNote.title}.txt`, type: 'info' });
      });
    }

    const deleteBtn = container.querySelector('#note-delete-btn');
    if (deleteBtn && activeNote) {
      deleteBtn.addEventListener('click', () => {
        sound.playClick();
        notes = notes.filter((n) => n.id !== activeNote.id);
        storage.saveNotes(notes);
        activeNoteId = notes.length > 0 ? notes[0].id : null;
        notifications.show({ title: 'Notes', message: 'Note deleted', type: 'warning' });
        updateUI();
      });
    }
  };

  updateUI();
}
