export type AppId =
  | 'notes'
  | 'dashboard'
  | 'calculator'
  | 'calendar'
  | 'alarm'
  | 'files'
  | 'settings'
  | 'music'
  | 'browser'
  | 'assistant'
  | 'terminal'
  | 'devlogs';

export interface AppDefinition {
  id: AppId;
  title: string;
  category?: 'Productivity' | 'Utilities' | 'Media' | 'System' | string;
  icon: string; // SVG icon name
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
  pinnedToTaskbar?: boolean;
  render: (container: HTMLElement, win: WindowState) => void;
  onClose?: (win: WindowState) => void;
}

export interface WindowState {
  id: string;
  appId: AppId | string;
  title: string;
  icon: string;
  element: HTMLElement;
  contentElement: HTMLElement;
  x: number;
  y: number;
  width: number;
  height: number;
  prevX?: number;
  prevY?: number;
  prevWidth?: number;
  prevHeight?: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose?: () => void;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'alert';
  icon?: string;
  timestamp: string;
  timeoutMs?: number;
}

export interface OsSettings {
  theme: 'cyberpunk' | 'obsidian' | 'aurora' | 'emerald' | 'solar';
  wallpaper: 'canvas-grid' | 'nebula' | 'circuit' | 'minimal' | 'custom';
  customWallpaperUrl?: string;
  accentColor?: string;
  clockFormat: '12h' | '24h';
  showSeconds: boolean;
  soundEnabled: boolean;
  soundVolume: number; // 0 - 100
  glassBlur: boolean;
  animationsEnabled: boolean;
  showDesktopWidgets: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  color?: string;
  description?: string;
}

export interface FileItem {
  id: string;
  name: string;
  path: string; // e.g., "/Documents"
  type: 'file' | 'folder';
  content?: string;
  size?: string;
  updatedAt: string;
}

export interface DevLog {
  id: string;
  title: string;
  date?: string;
  subtitle: string;
  sections: { heading: string; body: string; code?: string }[];
}
