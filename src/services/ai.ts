import { windowManager } from './windows';
import { storage } from './storage';
import { notifications } from './notifications';
import { AppId } from '../types';
import { evaluateMath } from '../utils/math';
import { logger } from '../utils/logger';

export interface AssistantResponse {
  text: string;
  actionTaken?: string;
  suggestedPrompts?: string[];
}

class NovaAIEngine {
  public async processQuery(rawInput: string): Promise<AssistantResponse> {
    const query = rawInput.trim().toLowerCase();

    // 1. App Opening Commands
    const appKeywords: { [key in AppId]?: string[] } = {
      calculator: ['calculator', 'calc'],
      notes: ['notes', 'note', 'notepad'],
      calendar: ['calendar', 'events', 'schedule', 'date'],
      alarm: ['alarm', 'timer', 'stopwatch', 'clock'],
      files: ['files', 'file manager', 'explorer', 'folder', 'vfs'],
      dashboard: ['dashboard', 'system dashboard', 'system info', 'specs', 'status', 'hardware', 'top'],
      settings: ['settings', 'preferences', 'configuration', 'config'],
      music: ['music', 'player', 'synth', 'audio', 'song'],
      browser: ['browser', 'web', 'internet', 'search'],
      terminal: ['terminal', 'cli', 'console', 'command line', 'bash', 'shell'],
      devlogs: ['devlogs', 'devlog', 'development log', 'dev log', 'docs'],
    };

    if (query.startsWith('open ') || query.startsWith('launch ') || query.startsWith('start ') || query.startsWith('show ')) {
      for (const [appId, terms] of Object.entries(appKeywords)) {
        if (terms?.some((t) => query.includes(t))) {
          windowManager.openWindow(appId as AppId);
          notifications.show({
            title: 'Nova AI',
            message: `Launched ${appId.toUpperCase()} per voice/text intent`,
            type: 'info',
          });
          return {
            text: `Launching ${appId.charAt(0).toUpperCase() + appId.slice(1)} for you now.`,
            actionTaken: `open_${appId}`,
            suggestedPrompts: ['Show system dashboard', 'What time is it?', 'Set a timer for 5m'],
          };
        }
      }
    }

    // 2. Direct math calculations
    if (query.startsWith('calc ') || query.startsWith('calculate ') || /^[\d\s+\-*/().^%]+$/.test(query)) {
      const expr = query.replace(/^(calc|calculate|what is)\s*/i, '').trim();
      const mathRes = evaluateMath(expr);
      if (mathRes.success && mathRes.formatted !== undefined) {
        logger.info('NovaAI', `Evaluated expression: ${expr} = ${mathRes.formatted}`);
        return {
          text: `The calculation result for \`${expr}\` is: **${mathRes.formatted}**`,
          actionTaken: 'calculated',
          suggestedPrompts: ['Open calculator', 'Take a note', 'System status'],
        };
      } else {
        return {
          text: `I couldn't evaluate that math expression (${mathRes.error || 'Syntax Error'}). You can try "Open calculator" for manual input.`,
        };
      }
    }

    // 3. Quick Note Creation
    if (query.startsWith('note ') || query.startsWith('create note ') || query.startsWith('new note ')) {
      const noteContent = query.replace(/^(note|create note|new note)\s*/i, '').trim();
      if (noteContent) {
        const notes = storage.getNotes();
        const newNote = {
          id: 'note-' + Date.now(),
          title: noteContent.slice(0, 24) + (noteContent.length > 24 ? '...' : ''),
          content: noteContent,
          category: 'Quick',
          updatedAt: new Date().toISOString(),
        };
        notes.unshift(newNote);
        storage.saveNotes(notes);
        notifications.show({
          title: 'Note Saved',
          message: `Saved quick note: "${newNote.title}"`,
          type: 'success',
        });
        return {
          text: `I've saved your quick note: "${noteContent}". You can open the Notes app anytime to edit or expand it.`,
          actionTaken: 'created_note',
          suggestedPrompts: ['Open notes', 'Show system dashboard'],
        };
      }
    }

    // 4. Time & Date queries
    if (query.includes('time') || query.includes('date') || query.includes('clock')) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      return {
        text: `Current System Time: **${timeStr}**\nDate: **${dateStr}** (Nova Local Realtime).`,
        suggestedPrompts: ['Open calendar', 'Set a timer for 5 minutes', 'Open alarm'],
      };
    }

    // 5. Timer / Alarm queries
    if (query.includes('timer') || query.includes('alarm')) {
      windowManager.openWindow('alarm');
      return {
        text: `Opened the Alarm & Timer module. You can start a countdown, set scheduled alarms, or use the millisecond stopwatch.`,
        actionTaken: 'open_alarm',
        suggestedPrompts: ['Open calendar', 'Open calculator'],
      };
    }

    // 6. Theme and Wallpaper controls
    if (query.includes('wallpaper') || query.includes('theme') || query.includes('background') || query.includes('dark') || query.includes('light')) {
      windowManager.openWindow('settings');
      return {
        text: `Opened System Settings. You can choose between themes (Cyberpunk, Obsidian, Aurora, Emerald, Solar) and dynamic wallpapers (Canvas Grid, Nebula, Circuit, Minimal).`,
        actionTaken: 'open_settings',
        suggestedPrompts: ['Open music player', 'Show system dashboard'],
      };
    }

    // 7. System Diagnostic / Specs
    if (query.includes('system') || query.includes('diagnostic') || query.includes('specs') || query.includes('ram') || query.includes('cpu')) {
      windowManager.openWindow('dashboard');
      return {
        text: `System Telemetry Summary:\n• Kernel: Nova WebOS v4.2.0-cyber\n• Environment: Sandboxed Browser Compositor\n• VFS: 4 Directories, Storage Quota Healthy\n• Status: All daemons operating normally.`,
        actionTaken: 'open_dashboard',
        suggestedPrompts: ['Open terminal', 'Open file manager'],
      };
    }

    // 8. Help and identity
    if (query.includes('help') || query.includes('who are you') || query.includes('what can you do') || query.includes('command')) {
      return {
        text: `I am **Nova AI**, your integrated operating system assistant.
I can help you control Nova WebOS and get things done:
• **Open apps**: "Open calculator", "Open notes", "Open music"
• **Execute math**: "calculate (45 * 12) / 2"
• **Take notes**: "note Buy replacement cybernetic cooling coil"
• **Check system**: "Show system dashboard", "What time is it?"
• **Customize**: "Change wallpaper", "Open settings"`,
        suggestedPrompts: ['Open calculator', 'Show system dashboard', 'Open terminal', 'What time is it?'],
      };
    }

    // 9. Conversational responses
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return {
        text: `Greetings, Operative. Nova WebOS is fully initialized and standing by. What would you like to accomplish today?`,
        suggestedPrompts: ['Open notes', 'Show system dashboard', 'Open music player'],
      };
    }

    // Default intelligent conversational fallback
    return {
      text: `Understood: "${rawInput}". I am continuously learning system commands. Try asking me to open apps like "Open calculator", "Show system dashboard", "note [text]", or "What time is it?".`,
      suggestedPrompts: ['Open calculator', 'Open notes', 'Show system dashboard', 'What time is it?'],
    };
  }
}

export const novaAI = new NovaAIEngine();
