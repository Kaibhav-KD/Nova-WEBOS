import { FileItem } from '../types';
import { storage } from './storage';

class VirtualFileSystem {
  private files: FileItem[] = [];

  constructor() {
    this.files = storage.getFiles();
  }

  public getItemsInPath(path: string): FileItem[] {
    const norm = path === '/' ? '/' : path.replace(/\/$/, '');
    return this.files.filter((f) => f.path === norm);
  }

  public getFileById(id: string): FileItem | undefined {
    return this.files.find((f) => f.id === id);
  }

  public createFile(name: string, path: string, content: string = ''): FileItem {
    const normPath = path === '/' ? '/' : path.replace(/\/$/, '');
    const newFile: FileItem = {
      id: 'file-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name,
      path: normPath,
      type: 'file',
      content,
      size: `${Math.max(1, Math.round(content.length / 1024 * 10) / 10)} KB`,
      updatedAt: new Date().toISOString(),
    };
    this.files.push(newFile);
    storage.saveFiles(this.files);
    return newFile;
  }

  public createFolder(name: string, path: string): FileItem {
    const normPath = path === '/' ? '/' : path.replace(/\/$/, '');
    const newFolder: FileItem = {
      id: 'folder-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name,
      path: normPath,
      type: 'folder',
      updatedAt: new Date().toISOString(),
    };
    this.files.push(newFolder);
    storage.saveFiles(this.files);
    return newFolder;
  }

  public updateFile(id: string, content: string) {
    const file = this.files.find((f) => f.id === id);
    if (file && file.type === 'file') {
      file.content = content;
      file.size = `${Math.max(1, Math.round(content.length / 1024 * 10) / 10)} KB`;
      file.updatedAt = new Date().toISOString();
      storage.saveFiles(this.files);
    }
  }

  public deleteItem(id: string) {
    const item = this.files.find((f) => f.id === id);
    if (!item) return;

    if (item.type === 'folder') {
      // Remove folder and recursive items inside folder
      const folderSubPath = (item.path === '/' ? '' : item.path) + '/' + item.name;
      this.files = this.files.filter((f) => f.id !== id && !f.path.startsWith(folderSubPath));
    } else {
      this.files = this.files.filter((f) => f.id !== id);
    }
    storage.saveFiles(this.files);
  }

  public downloadFile(id: string) {
    const file = this.files.find((f) => f.id === id);
    if (!file || file.type !== 'file') return;

    const blob = new Blob([file.content || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  public getAllFiles(): FileItem[] {
    return [...this.files];
  }

  public getFiles(): FileItem[] {
    return this.getAllFiles();
  }
}

export const vfs = new VirtualFileSystem();
