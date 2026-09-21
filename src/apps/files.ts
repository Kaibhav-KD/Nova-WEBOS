import { WindowState, FileItem } from '../types';
import { vfs } from '../services/vfs';
import { sound } from '../services/sound';
import { notifications } from '../services/notifications';
import { getSvgIcon } from '../ui/icons';

export function renderFilesApp(container: HTMLElement, win: WindowState) {
  let currentPath = '/';
  const history: string[] = ['/'];
  let historyIdx = 0;
  let selectedItemId: string | null = null;
  let previewFile: FileItem | null = null;

  container.className = 'w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-3 select-none overflow-hidden';

  const updateUI = () => {
    const items = vfs.getItemsInPath(currentPath);
    const selectedItem = selectedItemId ? vfs.getFileById(selectedItemId) : null;

    container.innerHTML = `
      <!-- Toolbar & Breadcrumb -->
      <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10 shrink-0">
        <div class="flex items-center gap-1.5">
          <button id="files-back-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors ${historyIdx <= 0 ? 'opacity-30 pointer-events-none' : ''}">
            ${getSvgIcon('chevron-left', 'w-4 h-4')}
          </button>
          <button id="files-fwd-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors ${historyIdx >= history.length - 1 ? 'opacity-30 pointer-events-none' : ''}">
            ${getSvgIcon('chevron-right', 'w-4 h-4')}
          </button>
          <div class="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-300">
            <span class="text-slate-400">root:</span>
            <span>${currentPath}</span>
          </div>
        </div>

        <div class="flex items-center gap-1.5">
          <button id="files-new-folder-btn" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors">
            ${getSvgIcon('folder', 'w-3.5 h-3.5 text-amber-400')}
            <span>+ Folder</span>
          </button>
          <button id="files-new-file-btn" class="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs text-cyan-300 flex items-center gap-1.5 transition-colors">
            ${getSvgIcon('plus', 'w-3.5 h-3.5')}
            <span>+ Text File</span>
          </button>
        </div>
      </div>

      <!-- Main Explorer Layout -->
      <div class="flex-1 flex overflow-hidden pt-3 gap-3">
        <!-- Folders/Files Grid -->
        <div class="flex-1 overflow-y-auto pr-1">
          ${
            items.length === 0
              ? `<div class="text-center py-12 text-slate-500 text-xs">Folder is empty</div>`
              : `
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              ${items
                .map(
                  (item) => `
                <div data-id="${item.id}" class="file-item-card p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                    item.id === selectedItemId
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-300'
                  }">
                  <div class="mb-2">
                    ${
                      item.type === 'folder'
                        ? getSvgIcon('folder', 'w-10 h-10 text-amber-400 drop-shadow')
                        : getSvgIcon('file', 'w-10 h-10 text-cyan-300 drop-shadow')
                    }
                  </div>
                  <span class="text-xs font-medium truncate w-full" title="${item.name}">${item.name}</span>
                  <span class="text-[10px] text-slate-500 mt-0.5">${item.type === 'folder' ? 'Directory' : item.size || '0 KB'}</span>
                </div>
              `
                )
                .join('')}
            </div>
          `
          }
        </div>

        <!-- File Details Inspector Sidebar -->
        <div class="w-56 bg-slate-900/50 rounded-xl p-3 border border-white/10 flex flex-col justify-between shrink-0">
          <div>
            <h4 class="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">Inspector</h4>
            ${
              selectedItem
                ? `
              <div class="flex flex-col gap-2 text-xs">
                <div class="p-2 rounded bg-white/5 border border-white/5 text-center mb-1">
                  ${
                    selectedItem.type === 'folder'
                      ? getSvgIcon('folder', 'w-8 h-8 text-amber-400 mx-auto mb-1')
                      : getSvgIcon('file', 'w-8 h-8 text-cyan-400 mx-auto mb-1')
                  }
                  <span class="font-semibold break-all text-slate-200 text-xs">${selectedItem.name}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                  <span class="text-slate-400">Type</span>
                  <span class="font-mono text-slate-200 capitalize">${selectedItem.type}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                  <span class="text-slate-400">Size</span>
                  <span class="font-mono text-slate-200">${selectedItem.size || 'Folder'}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                  <span class="text-slate-400">Path</span>
                  <span class="font-mono text-slate-200 truncate max-w-[100px]">${selectedItem.path}</span>
                </div>
              </div>
            `
                : `<p class="text-xs text-slate-500 py-4 text-center">Select an item to view properties</p>`
            }
          </div>

          ${
            selectedItem
              ? `
            <div class="flex flex-col gap-2 pt-2 border-t border-white/10">
              ${
                selectedItem.type === 'file'
                  ? `
                <button id="file-open-btn" class="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-medium transition-colors">
                  Open / Edit
                </button>
                <button id="file-download-btn" class="w-full py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                  ${getSvgIcon('download', 'w-3.5 h-3.5')}
                  <span>Download</span>
                </button>
              `
                  : `
                <button id="folder-enter-btn" class="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-medium transition-colors">
                  Enter Directory
                </button>
              `
              }
              <button id="file-delete-btn" class="w-full py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors">
                Delete
              </button>
            </div>
          `
              : ''
          }
        </div>
      </div>

      <!-- File Content Preview Modal -->
      ${
        previewFile
          ? `
        <div class="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col p-4">
          <div class="flex items-center justify-between pb-3 border-b border-white/10">
            <div class="flex items-center gap-2">
              <span class="text-cyan-400">${getSvgIcon('file', 'w-4 h-4')}</span>
              <span class="font-bold text-xs text-slate-100 font-mono">${previewFile.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="preview-save-btn" class="px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition-colors">Save</button>
              <button id="preview-close-btn" class="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10">${getSvgIcon('close', 'w-4 h-4')}</button>
            </div>
          </div>
          <div class="flex-1 py-3 overflow-hidden flex flex-col">
            <textarea id="preview-editor" class="w-full flex-1 bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-200 focus:outline-none resize-none leading-relaxed">${previewFile.content || ''}</textarea>
          </div>
        </div>
      `
          : ''
      }
    `;

    bindEvents();
  };

  const navigateTo = (newPath: string) => {
    sound.playClick();
    currentPath = newPath;
    selectedItemId = null;
    history.splice(historyIdx + 1);
    history.push(currentPath);
    historyIdx = history.length - 1;
    updateUI();
  };

  const bindEvents = () => {
    // Back / Forward
    container.querySelector('#files-back-btn')?.addEventListener('click', () => {
      if (historyIdx > 0) {
        sound.playClick();
        historyIdx--;
        currentPath = history[historyIdx];
        selectedItemId = null;
        updateUI();
      }
    });

    container.querySelector('#files-fwd-btn')?.addEventListener('click', () => {
      if (historyIdx < history.length - 1) {
        sound.playClick();
        historyIdx++;
        currentPath = history[historyIdx];
        selectedItemId = null;
        updateUI();
      }
    });

    // New folder
    container.querySelector('#files-new-folder-btn')?.addEventListener('click', () => {
      sound.playClick();
      const name = prompt('Folder name:', 'New_Folder');
      if (name && name.trim()) {
        vfs.createFolder(name.trim(), currentPath);
        notifications.show({ title: 'Files', message: `Created folder "${name.trim()}"`, type: 'success' });
        updateUI();
      }
    });

    // New text file
    container.querySelector('#files-new-file-btn')?.addEventListener('click', () => {
      sound.playClick();
      const name = prompt('File name (e.g. notes.txt):', 'document.txt');
      if (name && name.trim()) {
        vfs.createFile(name.trim(), currentPath, 'New document created in Nova WebOS.\n');
        notifications.show({ title: 'Files', message: `Created file "${name.trim()}"`, type: 'success' });
        updateUI();
      }
    });

    // Cards click / double click
    container.querySelectorAll('.file-item-card').forEach((card) => {
      const id = card.getAttribute('data-id');
      card.addEventListener('click', () => {
        sound.playClick();
        selectedItemId = id;
        updateUI();
      });

      card.addEventListener('dblclick', () => {
        if (!id) return;
        const item = vfs.getFileById(id);
        if (item?.type === 'folder') {
          const next = (currentPath === '/' ? '' : currentPath) + '/' + item.name;
          navigateTo(next);
        } else if (item?.type === 'file') {
          previewFile = item;
          updateUI();
        }
      });
    });

    // Sidebar actions
    container.querySelector('#folder-enter-btn')?.addEventListener('click', () => {
      if (!selectedItemId) return;
      const item = vfs.getFileById(selectedItemId);
      if (item && item.type === 'folder') {
        const next = (currentPath === '/' ? '' : currentPath) + '/' + item.name;
        navigateTo(next);
      }
    });

    container.querySelector('#file-open-btn')?.addEventListener('click', () => {
      if (!selectedItemId) return;
      const item = vfs.getFileById(selectedItemId);
      if (item && item.type === 'file') {
        sound.playClick();
        previewFile = item;
        updateUI();
      }
    });

    container.querySelector('#file-download-btn')?.addEventListener('click', () => {
      if (!selectedItemId) return;
      vfs.downloadFile(selectedItemId);
      notifications.show({ title: 'Files', message: 'Downloading file...', type: 'info' });
    });

    container.querySelector('#file-delete-btn')?.addEventListener('click', () => {
      if (!selectedItemId) return;
      sound.playClick();
      vfs.deleteItem(selectedItemId);
      selectedItemId = null;
      notifications.show({ title: 'Files', message: 'Item deleted', type: 'warning' });
      updateUI();
    });

    // Preview save/close
    container.querySelector('#preview-close-btn')?.addEventListener('click', () => {
      sound.playClick();
      previewFile = null;
      updateUI();
    });

    container.querySelector('#preview-save-btn')?.addEventListener('click', () => {
      sound.playClick();
      if (previewFile) {
        const editor = container.querySelector('#preview-editor') as HTMLTextAreaElement;
        if (editor) {
          vfs.updateFile(previewFile.id, editor.value);
          notifications.show({ title: 'Files', message: 'Saved changes to file', type: 'success' });
          previewFile = null;
          updateUI();
        }
      }
    });
  };

  updateUI();
}
