/**
 * Centralized logging & error handling system for Nova WebOS.
 * Captures system events, uncaught exceptions, and telemetry logs
 * with in-memory buffering and subscription capabilities.
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'system';

export interface SystemLogEntry {
  id: string;
  level: LogLevel;
  source: string;
  message: string;
  timestamp: string;
  details?: unknown;
}

type LogSubscriber = (entry: SystemLogEntry) => void;

class SystemLogger {
  private logs: SystemLogEntry[] = [];
  private maxLogs: number = 100;
  private subscribers: Set<LogSubscriber> = new Set();
  private initialized: boolean = false;

  public init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    // Capture uncaught window runtime errors
    window.addEventListener('error', (event) => {
      this.error('WindowRuntime', event.message || 'Uncaught runtime exception', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);
      this.error('PromiseRuntime', `Unhandled Promise rejection: ${message}`, reason);
    });

    this.system('Kernel', 'System diagnostic logger active and monitoring runtime events');
  }

  private addEntry(level: LogLevel, source: string, message: string, details?: unknown) {
    const entry: SystemLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      level,
      source,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      details,
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Safely emit to subscribers
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(entry);
      } catch (subErr) {
        console.error('Logger subscriber error:', subErr);
      }
    });

    // Mirror to developer console in a clean format
    const prefix = `[NovaOS:${source}]`;
    if (level === 'error') {
      console.error(prefix, message, details || '');
    } else if (level === 'warn') {
      console.warn(prefix, message, details || '');
    } else {
      console.log(prefix, message);
    }
  }

  public info(source: string, message: string, details?: unknown) {
    this.addEntry('info', source, message, details);
  }

  public warn(source: string, message: string, details?: unknown) {
    this.addEntry('warn', source, message, details);
  }

  public error(source: string, message: string, details?: unknown) {
    this.addEntry('error', source, message, details);
  }

  public system(source: string, message: string, details?: unknown) {
    this.addEntry('system', source, message, details);
  }

  public getRecentLogs(): SystemLogEntry[] {
    return [...this.logs];
  }

  public clear() {
    this.logs = [];
  }

  public subscribe(fn: LogSubscriber): () => void {
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    };
  }
}

export const logger = new SystemLogger();
