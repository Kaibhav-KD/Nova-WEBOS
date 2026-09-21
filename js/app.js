(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={SETTINGS:`nova_webos_settings_v1`,NOTES:`nova_webos_notes_v1`,EVENTS:`nova_webos_events_v1`,FILES:`nova_webos_files_v1`,CALC_HISTORY:`nova_webos_calc_history_v1`},t={theme:`cyberpunk`,wallpaper:`canvas-grid`,accentColor:`#00f0ff`,clockFormat:`12h`,showSeconds:!0,soundEnabled:!0,soundVolume:65,glassBlur:!0,animationsEnabled:!0,showDesktopWidgets:!0},n=[{id:`note-1`,title:`Welcome to Nova WebOS 🚀`,content:`# Welcome to Nova WebOS (v4.2.0)

Nova is a fully-interactive, futuristic browser operating system designed with native Web technologies.

## ✨ Key Features:
- **True Draggable & Resizable Windows** with active focus & boundary constraints.
- **Nova AI Assistant**: execute OS voice/text commands, app launching, calculations & queries.
- **Interactive Apps**: Notes, Calculator, Calendar, Alarm/Timer, File Explorer, System Dashboard, Music Synth, Terminal, and Browser.
- **Deep Persistence**: All notes, calendar events, settings & files are safely preserved in \`localStorage\`.
- **Procedural Sound**: Audio feedback and ambient synth created dynamically via Web Audio API.

Double click any icon or use the Nova launcher (bottom left) to get started!`,category:`Guides`,updatedAt:new Date().toISOString()},{id:`note-2`,title:`Terminal & Assistant Cheat Sheet`,content:`### Nova AI Commands:
- "Open calculator"
- "Set timer for 5 minutes"
- "Change wallpaper to nebula"
- "Change theme to obsidian"
- "What time is it?"
- "Show system dashboard"

### Terminal (CLI) Commands:
- \`help\` - list all commands
- \`open <app>\` - launch any application
- \`ls\`, \`cat <filename>\` - navigate virtual filesystem
- \`neofetch\` - display futuristic system specs
- \`matrix\` - toggle cyber matrix mode
- \`uptime\` - view system running duration`,category:`Shortcuts`,updatedAt:new Date().toISOString()},{id:`note-3`,title:`Hackathon Mission Briefing`,content:`Project Scope:
1. Pure vanilla architecture (HTML5 + CSS3 + Vanilla TS/JS).
2. Original visual identity - dark futuristic aesthetics with glassmorphism.
3. Functional window compositor with cascading and z-index elevation.
4. Devlogs #01, #02, #03 detailing design, challenges and architecture.`,category:`Project`,updatedAt:new Date().toISOString()}],r=[{id:`event-1`,date:new Date().toISOString().split(`T`)[0],title:`WebOS Hackathon Showcase`,time:`14:00`,color:`#00f0ff`,description:`Demonstrate Nova WebOS desktop, window compositor and Nova AI features.`},{id:`event-2`,date:new Date(Date.now()+864e5).toISOString().split(`T`)[0],title:`Nova v4.3 Architecture Review`,time:`10:30`,color:`#a855f7`,description:`Explore WebAssembly plugins and virtual network sockets.`},{id:`event-3`,date:new Date(Date.now()+2592e5).toISOString().split(`T`)[0],title:`Community Feedback Session`,time:`16:00`,color:`#10b981`,description:`Collect UX feedback on draggable window handles and audio synthesizer.`}],i=[{id:`file-1`,name:`README.md`,path:`/Documents`,type:`file`,size:`1.4 KB`,updatedAt:new Date().toISOString(),content:`# Nova WebOS
Version: 4.2.0-release
Platform: Browser VFS (Virtual File System)
Compositor: Canvas2D + CSS3 Glassmorphism

Built with pure vanilla web technologies:
- Zero heavy framework dependencies
- High-frame-rate pointer event dragging
- Mathematical window boundary clipping
- Native Web Audio synthesizer`},{id:`file-2`,name:`system_manifest.json`,path:`/System`,type:`file`,size:`840 B`,updatedAt:new Date().toISOString(),content:JSON.stringify({osName:`Nova WebOS`,kernel:`4.2.0-cyber`,memoryTotal:`8192 MB (Virtual)`,storageQuota:`50 MB LocalStorage`,security:`Sandboxed Browser Container`,capabilities:[`VFS`,`Synthesizer`,`NovaAI`,`WindowCompositor`,`Multitasking`]},null,2)},{id:`file-3`,name:`synth_presets.txt`,path:`/Media`,type:`file`,size:`512 B`,updatedAt:new Date().toISOString(),content:`Cyber Horizon: 220Hz saw + 330Hz sub + 800Hz lowpass
Quantum Drift: 164Hz triangle + 246Hz sine + chorus
Midnight Matrix: 110Hz square + 440Hz arp + dynamic filter sweep`},{id:`folder-1`,name:`Documents`,path:`/`,type:`folder`,updatedAt:new Date().toISOString()},{id:`folder-2`,name:`System`,path:`/`,type:`folder`,updatedAt:new Date().toISOString()},{id:`folder-3`,name:`Media`,path:`/`,type:`folder`,updatedAt:new Date().toISOString()},{id:`folder-4`,name:`Downloads`,path:`/`,type:`folder`,updatedAt:new Date().toISOString()}],a=new class{constructor(){this.memoryCache=new Map}safeGetItem(e){try{if(typeof window<`u`&&window.localStorage){let t=localStorage.getItem(e);if(t!==null)return t}}catch{}return this.memoryCache.get(e)||null}safeSetItem(e,t){this.memoryCache.set(e,t);try{if(typeof window<`u`&&window.localStorage)return localStorage.setItem(e,t),!0}catch{}return!1}safeRemoveItem(e){this.memoryCache.delete(e);try{typeof window<`u`&&window.localStorage&&localStorage.removeItem(e)}catch{}}getSettings(){try{let n=this.safeGetItem(e.SETTINGS);if(n){let e=JSON.parse(n);if(e&&typeof e==`object`)return{...t,...e}}}catch{}return t}saveSettings(t){try{this.safeSetItem(e.SETTINGS,JSON.stringify(t))}catch{}}getNotes(){try{let t=this.safeGetItem(e.NOTES);if(t){let e=JSON.parse(t);if(Array.isArray(e)&&e.length>0)return e.filter(e=>e&&typeof e.id==`string`&&typeof e.title==`string`)}}catch{}return n}saveNotes(t){try{this.safeSetItem(e.NOTES,JSON.stringify(t))}catch{}}getEvents(){try{let t=this.safeGetItem(e.EVENTS);if(t){let e=JSON.parse(t);if(Array.isArray(e))return e}}catch{}return r}saveEvents(t){try{this.safeSetItem(e.EVENTS,JSON.stringify(t))}catch{}}getFiles(){try{let t=this.safeGetItem(e.FILES);if(t){let e=JSON.parse(t);if(Array.isArray(e)&&e.length>0)return e}}catch{}return i}saveFiles(t){try{this.safeSetItem(e.FILES,JSON.stringify(t))}catch{}}resetAllData(){this.safeRemoveItem(e.SETTINGS),this.safeRemoveItem(e.NOTES),this.safeRemoveItem(e.EVENTS),this.safeRemoveItem(e.FILES),this.safeRemoveItem(e.CALC_HISTORY)}getStorageUsage(){try{let e=0;if(typeof window<`u`&&window.localStorage)for(let t=0;t<localStorage.length;t++){let n=localStorage.key(t);if(n){let t=localStorage.getItem(n)||``;e+=(t.length+n.length)*2}}else this.memoryCache.forEach((t,n)=>{e+=(t.length+n.length)*2});let t=Math.round(e/1024);return{usedKb:t,percent:Math.min(100,Math.round(t/5120*100))}}catch{return{usedKb:12,percent:1}}}},o=new class{constructor(){this.ctx=null,this.enabled=!0,this.volume=.5,this.gestureUnlocked=!1,this.registerGestureUnlock()}registerGestureUnlock(){if(typeof window>`u`)return;let e=()=>{this.gestureUnlocked=!0,this.ctx&&this.ctx.state===`suspended`&&this.ctx.resume().catch(()=>{}),window.removeEventListener(`pointerdown`,e),window.removeEventListener(`keydown`,e),window.removeEventListener(`touchstart`,e)};window.addEventListener(`pointerdown`,e,{passive:!0}),window.addEventListener(`keydown`,e,{passive:!0}),window.addEventListener(`touchstart`,e,{passive:!0})}initCtx(){if(typeof window>`u`)return null;try{if(!this.ctx||this.ctx.state===`closed`){let e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}this.ctx&&this.ctx.state===`suspended`&&this.gestureUnlocked&&this.ctx.resume().catch(()=>{})}catch{return null}return this.ctx}setEnabled(e){this.enabled=e}setVolume(e){this.volume=Math.max(0,Math.min(1,e/100))}isEnabled(){return this.enabled}getVolume(){return Math.round(this.volume*100)}playClick(){if(this.enabled)try{if(this.initCtx(),!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type=`sine`,e.frequency.setValueAtTime(1200,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(300,this.ctx.currentTime+.04),t.gain.setValueAtTime(this.volume*.15,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.04),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.04)}catch{}}playBootChime(){if(this.enabled)try{if(this.initCtx(),!this.ctx)return;let e=this.ctx.currentTime;[261.63,329.63,392,523.25,659.25,783.99].forEach((t,n)=>{if(!this.ctx)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`triangle`,r.frequency.setValueAtTime(t,e+n*.08),i.gain.setValueAtTime(0,e+n*.08),i.gain.linearRampToValueAtTime(this.volume*.15,e+n*.08+.03),i.gain.exponentialRampToValueAtTime(.001,e+n*.08+.45),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.08),r.stop(e+n*.08+.45)})}catch{}}playOpen(){if(this.enabled)try{if(this.initCtx(),!this.ctx)return;let e=this.ctx.currentTime;[523.25,783.99,1046.5].forEach((t,n)=>{if(!this.ctx)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`triangle`,r.frequency.setValueAtTime(t,e+n*.05),i.gain.setValueAtTime(0,e+n*.05),i.gain.linearRampToValueAtTime(this.volume*.12,e+n*.05+.02),i.gain.exponentialRampToValueAtTime(.001,e+n*.05+.25),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.05),r.stop(e+n*.05+.25)})}catch{}}playClose(){if(this.enabled)try{if(this.initCtx(),!this.ctx)return;let e=this.ctx.currentTime;[880,587.33].forEach((t,n)=>{if(!this.ctx)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.04),i.gain.setValueAtTime(this.volume*.1,e+n*.04),i.gain.exponentialRampToValueAtTime(.001,e+n*.04+.15),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.04),r.stop(e+n*.04+.15)})}catch{}}playNotification(){if(this.enabled)try{if(this.initCtx(),!this.ctx)return;let e=this.ctx.currentTime;[659.25,987.77].forEach((t,n)=>{if(!this.ctx)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`sine`,r.frequency.setValueAtTime(t,e+n*.07),i.gain.setValueAtTime(0,e+n*.07),i.gain.linearRampToValueAtTime(this.volume*.2,e+n*.07+.02),i.gain.exponentialRampToValueAtTime(.001,e+n*.07+.35),r.connect(i),i.connect(this.ctx.destination),r.start(e+n*.07),r.stop(e+n*.07+.35)})}catch{}}playAlarmBeep(){if(this.enabled)try{if(this.initCtx(),!this.ctx)return;let e=this.ctx.currentTime;for(let t=0;t<3;t++){let n=this.ctx.createOscillator(),r=this.ctx.createGain();n.type=`square`,n.frequency.setValueAtTime(1760,e+t*.15),r.gain.setValueAtTime(this.volume*.25,e+t*.15),r.gain.exponentialRampToValueAtTime(.001,e+t*.15+.1),n.connect(r),r.connect(this.ctx.destination),n.start(e+t*.15),n.stop(e+t*.15+.1)}}catch{}}createSynthVoice(e,t=`sawtooth`){if(this.initCtx(),!this.ctx)return null;let n=this.ctx.createOscillator(),r=this.ctx.createBiquadFilter(),i=this.ctx.createGain();return n.type=t,n.frequency.value=e,r.type=`lowpass`,r.frequency.value=800,i.gain.value=this.volume*.1,n.connect(r),r.connect(i),i.connect(this.ctx.destination),{osc:n,filter:r,gain:i}}getAudioContext(){return this.initCtx(),this.ctx}};function s(e,t=`w-5 h-5`){let n=t;switch(e){case`notes`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`;case`dashboard`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`;case`calculator`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" stroke-width="2"/><line x1="8" y1="6" x2="16" y2="6" stroke-width="2"/><line x1="8" y1="10" x2="10" y2="10" stroke-width="2"/><line x1="14" y1="10" x2="16" y2="10" stroke-width="2"/><line x1="8" y1="14" x2="10" y2="14" stroke-width="2"/><line x1="14" y1="14" x2="16" y2="14" stroke-width="2"/><line x1="8" y1="18" x2="16" y2="18" stroke-width="2"/></svg>`;case`calendar`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>`;case`alarm`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" stroke-width="2"/><polyline points="12 9 12 13 15 15" stroke-width="2"/><line x1="5" y1="3" x2="2" y2="6" stroke-width="2"/><line x1="19" y1="3" x2="22" y2="6" stroke-width="2"/></svg>`;case`files`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`;case`settings`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`;case`music`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>`;case`browser`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`;case`assistant`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;case`terminal`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5" stroke-width="2"/><line x1="12" y1="19" x2="20" y2="19" stroke-width="2"/></svg>`;case`devlogs`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`;case`close`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;case`minimize`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>`;case`maximize`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/></svg>`;case`restore`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="8" width="12" height="12" rx="1.5" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8V6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-2"/></svg>`;case`bell`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>`;case`battery`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="16" height="10" rx="2" stroke-width="2"/><line x1="22" y1="11" x2="22" y2="13" stroke-width="2"/></svg>`;case`wifi`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.393 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`;case`volume`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>`;case`mute`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke-width="2"/><line x1="23" y1="9" x2="17" y2="15" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke-width="2"/></svg>`;case`nova-logo`:return`<svg class="${n}" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2.5" class="text-cyan-400"/><path d="M16 5V27M5 16H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" class="text-cyan-300/40"/><polygon points="16,8 24,16 16,24 8,16" fill="currentColor" class="text-cyan-400/30" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="3" fill="currentColor" class="text-cyan-200"/></svg>`;case`search`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/></svg>`;case`play`:return`<svg class="${n}" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;case`pause`:return`<svg class="${n}" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;case`trash`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`;case`plus`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke-width="2"/><line x1="5" y1="12" x2="19" y2="12" stroke-width="2"/></svg>`;case`folder`:return`<svg class="${n}" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;case`file`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8" stroke-width="2"/></svg>`;case`chevron-left`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" stroke-width="2"/></svg>`;case`chevron-right`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" stroke-width="2"/></svg>`;case`refresh`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10" stroke-width="2"/><polyline points="1 20 1 14 7 14" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>`;case`download`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10" stroke-width="2"/><line x1="12" y1="15" x2="12" y2="3" stroke-width="2"/></svg>`;case`sparkles`:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`;default:return`<svg class="${n}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/></svg>`}}var c=new class{constructor(){this.logs=[],this.maxLogs=100,this.subscribers=new Set,this.initialized=!1}init(){this.initialized||typeof window>`u`||(this.initialized=!0,window.addEventListener(`error`,e=>{this.error(`WindowRuntime`,e.message||`Uncaught runtime exception`,{filename:e.filename,lineno:e.lineno,colno:e.colno})}),window.addEventListener(`unhandledrejection`,e=>{let t=e.reason,n=t instanceof Error?t.message:String(t);this.error(`PromiseRuntime`,`Unhandled Promise rejection: ${n}`,t)}),this.system(`Kernel`,`System diagnostic logger active and monitoring runtime events`))}addEntry(e,t,n,r){let i={id:`log-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,level:e,source:t,message:n,timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),details:r};this.logs.unshift(i),this.logs.length>this.maxLogs&&this.logs.pop(),this.subscribers.forEach(e=>{try{e(i)}catch(e){console.error(`Logger subscriber error:`,e)}});let a=`[NovaOS:${t}]`;e===`error`?console.error(a,n,r||``):e===`warn`?console.warn(a,n,r||``):console.log(a,n)}info(e,t,n){this.addEntry(`info`,e,t,n)}warn(e,t,n){this.addEntry(`warn`,e,t,n)}error(e,t,n){this.addEntry(`error`,e,t,n)}system(e,t,n){this.addEntry(`system`,e,t,n)}getRecentLogs(){return[...this.logs]}clear(){this.logs=[]}subscribe(e){return this.subscribers.add(e),()=>{this.subscribers.delete(e)}}},l=new class{constructor(){this.windows=new Map,this.apps=new Map,this.activeWindowId=null,this.highestZ=100,this.cascadeCount=0,this.listeners=[],this.container=null}registerApp(e){this.apps.set(e.id,e)}getApp(e){return this.apps.get(e)}getAllApps(){return Array.from(this.apps.values())}getRegisteredApps(){return this.getAllApps()}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}onWindowsChange(e){return this.subscribe(e)}notify(){let e=Array.from(this.windows.values());this.listeners.forEach(t=>t(e,this.activeWindowId))}getContainer(){return document.getElementById(`windows-container`)||document.getElementById(`desktop`)||document.body}getOpenWindows(){return Array.from(this.windows.values())}getActiveWindowId(){return this.activeWindowId}openWindow(e,t){let n=Array.from(this.windows.values()).find(t=>t.appId===e);if(n)return n.isMinimized?this.restoreWindow(n.id):this.focusWindow(n.id),n;let r=this.apps.get(e);if(!r)throw Error(`App ${e} not registered`);o.playOpen();let i=this.getContainer(),a=i.getBoundingClientRect(),l=Math.min(r.defaultWidth,Math.max(340,a.width-40)),u=Math.min(r.defaultHeight,Math.max(280,a.height-40));this.cascadeCount=(this.cascadeCount+1)%8;let d=30+this.cascadeCount*26,f=Math.max(20,Math.min(a.width-l-30,d)),p=Math.max(20,Math.min(a.height-u-40,d));window.innerWidth<640&&(f=8,p=8);let m=`win-`+e+`-`+Date.now();this.highestZ+=2;let h=document.createElement(`div`);h.id=m,h.className=`os-window absolute glass-panel flex flex-col rounded-xl overflow-hidden select-none active pointer-events-auto`,h.style.left=`${f}px`,h.style.top=`${p}px`,h.style.width=`${l}px`,h.style.height=`${u}px`,h.style.zIndex=`${this.highestZ}`;let g=t||r.title;h.innerHTML=`
      <!-- Window Header Bar -->
      <div class="window-header glass-header flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing shrink-0 select-none">
        <div class="flex items-center gap-2 overflow-hidden pointer-events-none">
          <div class="shrink-0 text-cyan-400">
            ${s(r.icon,`w-4 h-4`)}
          </div>
          <span class="font-semibold text-xs tracking-wide text-slate-100 truncate">${g}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 ml-2">
          <!-- Minimize Button -->
          <button class="win-btn-minimize p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Minimize">
            ${s(`minimize`,`w-3.5 h-3.5`)}
          </button>
          <!-- Maximize / Restore Button -->
          <button class="win-btn-maximize p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Maximize">
            ${s(`maximize`,`w-3.5 h-3.5`)}
          </button>
          <!-- Close Button -->
          <button class="win-btn-close p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors" title="Close">
            ${s(`close`,`w-3.5 h-3.5`)}
          </button>
        </div>
      </div>
      
      <!-- Window Body / Content Area -->
      <div class="window-content relative flex-1 overflow-auto bg-slate-950/40 text-slate-200"></div>

      <!-- Resize Handles (8 directions) -->
      <div class="resize-handle resize-n" data-dir="n"></div>
      <div class="resize-handle resize-s" data-dir="s"></div>
      <div class="resize-handle resize-e" data-dir="e"></div>
      <div class="resize-handle resize-w" data-dir="w"></div>
      <div class="resize-handle resize-ne" data-dir="ne"></div>
      <div class="resize-handle resize-nw" data-dir="nw"></div>
      <div class="resize-handle resize-se" data-dir="se"></div>
      <div class="resize-handle resize-sw" data-dir="sw"></div>
    `,i.appendChild(h);let _=h.querySelector(`.window-content`),v={id:m,appId:e,title:g,icon:r.icon,element:h,contentElement:_,x:f,y:p,width:l,height:u,isMinimized:!1,isMaximized:!1,zIndex:this.highestZ};this.windows.set(m,v),this.focusWindow(m),this.setupWindowEvents(v,r);try{r.render(_,v)}catch(e){let t=e instanceof Error?e.message:String(e);c.error(`WindowManager`,`Failed to render application [${r.id}]: ${t}`,e),_.innerHTML=`
        <div class="p-6 flex flex-col items-center justify-center h-full text-center select-none bg-slate-950/60">
          <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-3">
            ${s(`alert`,`w-8 h-8`)}
          </div>
          <h3 class="text-sm font-semibold text-slate-100 mb-1">Application Error</h3>
          <p class="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">${t||`An unexpected error occurred while loading this app.`}</p>
          <button id="retry-launch-${m}" class="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition-colors">
            Reload Application
          </button>
        </div>
      `,_.querySelector(`#retry-launch-${m}`)?.addEventListener(`click`,()=>{try{_.innerHTML=``,r.render(_,v)}catch{}})}return this.notify(),v}focusWindow(e){let t=this.windows.get(e);t&&(this.highestZ+=1,t.zIndex=this.highestZ,t.element.style.zIndex=`${this.highestZ}`,this.activeWindowId=e,this.windows.forEach(t=>{t.id===e?t.element.classList.add(`active`):t.element.classList.remove(`active`)}),this.notify())}closeWindow(e){let t=this.windows.get(e);if(t){o.playClose();try{t.onClose&&t.onClose()}catch(e){c.warn(`WindowManager`,`Error in window onClose handler [${t.id}]:`,e)}try{let e=this.apps.get(t.appId);e&&e.onClose&&e.onClose(t)}catch(e){c.warn(`WindowManager`,`Error in app onClose handler [${t.appId}]:`,e)}t.element.classList.add(`opacity-0`,`scale-90`),setTimeout(()=>{if(t.element.remove(),this.windows.delete(e),this.activeWindowId===e){let e=null;for(let t of this.windows.values())!t.isMinimized&&(!e||t.zIndex>e.zIndex)&&(e=t);if(e){let t=e;this.activeWindowId=t.id,this.focusWindow(t.id)}else this.activeWindowId=null}this.notify()},150)}}minimizeWindow(e){let t=this.windows.get(e);if(t){if(o.playClick(),t.isMinimized=!0,t.element.classList.add(`minimized`),this.activeWindowId===e){this.activeWindowId=null;let e=null;for(let t of this.windows.values())!t.isMinimized&&(!e||t.zIndex>e.zIndex)&&(e=t);if(e){let t=e;this.focusWindow(t.id)}}this.notify()}}restoreWindow(e){let t=this.windows.get(e);t&&(o.playClick(),t.isMinimized=!1,t.element.classList.remove(`minimized`),this.focusWindow(e),this.notify())}toggleMinimize(e){let t=this.windows.get(e);t&&(t.isMinimized?this.restoreWindow(e):this.activeWindowId===e?this.minimizeWindow(e):this.focusWindow(e))}maximizeWindow(e){let t=this.windows.get(e);if(!t)return;o.playClick();let n=this.getContainer().getBoundingClientRect();if(t.isMaximized){t.x=t.prevX||40,t.y=t.prevY||40,t.width=t.prevWidth||600,t.height=t.prevHeight||420,t.isMaximized=!1,t.element.classList.remove(`maximized`),t.element.style.left=`${t.x}px`,t.element.style.top=`${t.y}px`,t.element.style.width=`${t.width}px`,t.element.style.height=`${t.height}px`;let e=t.element.querySelector(`.win-btn-maximize`);e&&(e.innerHTML=s(`maximize`,`w-3.5 h-3.5`))}else{t.prevX=t.x,t.prevY=t.y,t.prevWidth=t.width,t.prevHeight=t.height,t.x=0,t.y=0,t.width=n.width,t.height=n.height,t.isMaximized=!0,t.element.classList.add(`maximized`),t.element.style.left=`0px`,t.element.style.top=`0px`,t.element.style.width=`100%`,t.element.style.height=`100%`;let e=t.element.querySelector(`.win-btn-maximize`);e&&(e.innerHTML=s(`restore`,`w-3.5 h-3.5`))}this.focusWindow(e),this.notify()}setupWindowEvents(e,t){let n=e.element.querySelector(`.window-header`),r=e.element.querySelector(`.win-btn-minimize`),i=e.element.querySelector(`.win-btn-maximize`),a=e.element.querySelector(`.win-btn-close`);e.element.addEventListener(`pointerdown`,()=>{this.focusWindow(e.id)}),r.addEventListener(`click`,t=>{t.stopPropagation(),this.minimizeWindow(e.id)}),i.addEventListener(`click`,t=>{t.stopPropagation(),this.maximizeWindow(e.id)}),a.addEventListener(`click`,t=>{t.stopPropagation(),this.closeWindow(e.id)}),n.addEventListener(`dblclick`,()=>{this.maximizeWindow(e.id)}),n.addEventListener(`pointerdown`,t=>{if(t.target.closest(`button`)||e.isMaximized)return;this.focusWindow(e.id);let r=t.clientX,i=t.clientY,a=e.x,o=e.y,s=this.getContainer().getBoundingClientRect();n.setPointerCapture(t.pointerId);let c=t=>{let n=t.clientX-r,c=t.clientY-i,l=a+n,u=o+c;l=Math.max(-e.width+100,Math.min(s.width-100,l)),u=Math.max(0,Math.min(s.height-40,u)),e.x=l,e.y=u,e.element.style.left=`${l}px`,e.element.style.top=`${u}px`},l=e=>{n.releasePointerCapture(e.pointerId),n.removeEventListener(`pointermove`,c),n.removeEventListener(`pointerup`,l),n.removeEventListener(`pointercancel`,l)};n.addEventListener(`pointermove`,c),n.addEventListener(`pointerup`,l),n.addEventListener(`pointercancel`,l)});let o=e.element.querySelectorAll(`.resize-handle`),s=t.minWidth||300,c=t.minHeight||200;o.forEach(t=>{t.addEventListener(`pointerdown`,t=>{let n=t;if(n.stopPropagation(),e.isMaximized)return;this.focusWindow(e.id);let r=n.target.getAttribute(`data-dir`)||`se`,i=n.clientX,a=n.clientY,o=e.x,l=e.y,u=e.width,d=e.height,f=n.target;f.setPointerCapture(n.pointerId);let p=t=>{let n=t.clientX-i,f=t.clientY-a,p=u,m=d,h=o,g=l;if(r.includes(`e`)&&(p=Math.max(s,u+n)),r.includes(`s`)&&(m=Math.max(c,d+f)),r.includes(`w`)){let e=u-n;e>=s&&(p=e,h=o+n)}if(r.includes(`n`)){let e=d-f;e>=c&&(m=e,g=l+f)}e.x=h,e.y=g,e.width=p,e.height=m,e.element.style.left=`${h}px`,e.element.style.top=`${g}px`,e.element.style.width=`${p}px`,e.element.style.height=`${m}px`},m=e=>{f.releasePointerCapture(e.pointerId),f.removeEventListener(`pointermove`,p),f.removeEventListener(`pointerup`,m),f.removeEventListener(`pointercancel`,m)};f.addEventListener(`pointermove`,p),f.addEventListener(`pointerup`,m),f.addEventListener(`pointercancel`,m)})})}},u=new class{constructor(){this.history=[],this.listeners=[],this.container=null}getContainer(){return this.container||=document.getElementById(`toast-container`),this.container||document.body}show(e){let t={...e,id:`toast-`+Date.now()+`-`+Math.random().toString(36).substr(2,4),timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),timeoutMs:e.timeoutMs||4500};this.history.unshift(t),this.history.length>25&&this.history.pop(),this.notifyListeners(),o.playNotification(),this.renderToast(t)}renderToast(e){let t=this.getContainer(),n=document.createElement(`div`);n.id=e.id,n.className=`pointer-events-auto flex flex-col gap-2 p-3.5 rounded-xl border border-white/15 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-slate-100 transition-all duration-300 transform translate-x-12 opacity-0`;let r=s(`bell`,`w-5 h-5 text-cyan-400`);e.type===`success`&&(r=`<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`),e.type===`alert`&&(r=`<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`),e.type===`warning`&&(r=`<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`),n.innerHTML=`
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-2.5">
          <div class="mt-0.5 shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/10">
            ${r}
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-xs text-slate-100 tracking-wide">${e.title}</span>
              <span class="text-[10px] text-slate-400 font-mono">${e.timestamp}</span>
            </div>
            <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">${e.message}</p>
          </div>
        </div>
        <button class="toast-close text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
          ${s(`close`,`w-3.5 h-3.5`)}
        </button>
      </div>
      <div class="w-full bg-white/10 h-0.5 rounded-full overflow-hidden mt-1">
        <div class="toast-bar bg-cyan-400 h-full w-full origin-left transition-transform linear" style="transition-duration: ${e.timeoutMs}ms; transform: scaleX(1);"></div>
      </div>
    `,t.appendChild(n),requestAnimationFrame(()=>{n.classList.remove(`translate-x-12`,`opacity-0`);let e=n.querySelector(`.toast-bar`);e&&requestAnimationFrame(()=>{e.style.transform=`scaleX(0)`})});let i=n.querySelector(`.toast-close`),a=null,o=!1,c=()=>{o||(o=!0,a!==null&&(clearTimeout(a),a=null),n.classList.add(`translate-x-12`,`opacity-0`),setTimeout(()=>{n.remove()},300))};i.addEventListener(`click`,c),e.timeoutMs&&e.timeoutMs>0&&(a=window.setTimeout(c,e.timeoutMs))}confirmModal(e){o.playNotification();let t=document.createElement(`div`);t.className=`fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-200 opacity-0`;let n=document.createElement(`div`);n.className=`w-full max-w-sm rounded-2xl bg-slate-900/95 border border-white/15 p-5 shadow-2xl flex flex-col gap-4 text-slate-100 transform scale-95 transition-all duration-200`;let r=e.isDestructive?`bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25`:`bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25`;n.innerHTML=`
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-xl ${e.isDestructive?`bg-rose-500/20 text-rose-400`:`bg-cyan-500/20 text-cyan-400`} shrink-0">
          ${s(e.isDestructive?`alert`:`sparkles`,`w-5 h-5`)}
        </div>
        <div>
          <h3 class="font-bold text-sm text-slate-100">${e.title}</h3>
          <p class="text-xs text-slate-300 mt-1 leading-relaxed">${e.message}</p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
        <button id="modal-cancel" class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors">
          ${e.cancelText||`Cancel`}
        </button>
        <button id="modal-confirm" class="px-4 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors ${r}">
          ${e.confirmText||`Confirm`}
        </button>
      </div>
    `,t.appendChild(n),document.body.appendChild(t),requestAnimationFrame(()=>{t.classList.remove(`opacity-0`),n.classList.remove(`scale-95`)});let i=()=>{t.classList.add(`opacity-0`),n.classList.add(`scale-95`),setTimeout(()=>t.remove(),200)};n.querySelector(`#modal-cancel`)?.addEventListener(`click`,()=>{o.playClick(),i()}),n.querySelector(`#modal-confirm`)?.addEventListener(`click`,()=>{o.playClick(),i(),e.onConfirm()}),t.addEventListener(`click`,e=>{e.target===t&&i()})}getHistory(){return[...this.history]}clearHistory(){this.history=[],this.notifyListeners()}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notifyListeners(){this.listeners.forEach(e=>e([...this.history]))}},d=class{constructor(e){this.animId=null,this.mouse={x:-1e3,y:-1e3},this.particles=[],this.currentType=`canvas-grid`,this.canvas=e,this.ctx=e.getContext(`2d`),this.init()}init(){this.resize(),window.addEventListener(`resize`,()=>this.resize()),window.addEventListener(`mousemove`,e=>{this.mouse.x=e.clientX,this.mouse.y=e.clientY}),window.addEventListener(`wallpaper-changed`,e=>{this.setType(e.detail)}),this.currentType=a.getSettings().wallpaper||`canvas-grid`,this.initParticles(),this.startAnimation()}setType(e){this.currentType=e,this.initParticles()}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.initParticles()}initParticles(){this.particles=[];let e=Math.min(65,Math.floor(this.canvas.width*this.canvas.height/22e3)),t=[`#00f0ff`,`#c084fc`,`#38bdf8`,`#818cf8`];for(let n=0;n<e;n++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8,radius:Math.random()*2+1,color:t[Math.floor(Math.random()*t.length)]})}startAnimation(){let e=()=>{this.draw(),this.animId=requestAnimationFrame(e)};e()}draw(){if(!this.ctx)return;let{width:e,height:t}=this.canvas;if(this.ctx.clearRect(0,0,e,t),this.currentType===`minimal`){let n=this.ctx.createRadialGradient(e/2,t/2,50,e/2,t/2,e);n.addColorStop(0,`#0f172a`),n.addColorStop(1,`#020617`),this.ctx.fillStyle=n,this.ctx.fillRect(0,0,e,t);return}if(this.currentType===`nebula`){let n=this.ctx.createRadialGradient(e*.3,t*.4,20,e*.3,t*.4,e*.7);n.addColorStop(0,`rgba(88, 28, 135, 0.45)`),n.addColorStop(1,`rgba(2, 6, 23, 0.95)`),this.ctx.fillStyle=n,this.ctx.fillRect(0,0,e,t);let r=this.ctx.createRadialGradient(e*.7,t*.7,30,e*.7,t*.7,e*.6);r.addColorStop(0,`rgba(6, 78, 59, 0.3)`),r.addColorStop(1,`rgba(0, 0, 0, 0)`),this.ctx.fillStyle=r,this.ctx.fillRect(0,0,e,t)}else if(this.currentType===`circuit`){this.ctx.fillStyle=`#030712`,this.ctx.fillRect(0,0,e,t),this.ctx.strokeStyle=`rgba(0, 240, 255, 0.08)`,this.ctx.lineWidth=1;for(let n=0;n<e;n+=60)this.ctx.beginPath(),this.ctx.moveTo(n,0),this.ctx.lineTo(n,t),this.ctx.stroke();for(let n=0;n<t;n+=60)this.ctx.beginPath(),this.ctx.moveTo(0,n),this.ctx.lineTo(e,n),this.ctx.stroke()}else{let n=this.ctx.createLinearGradient(0,0,e,t);n.addColorStop(0,`#050b14`),n.addColorStop(.5,`#020617`),n.addColorStop(1,`#070f1e`),this.ctx.fillStyle=n,this.ctx.fillRect(0,0,e,t),this.ctx.strokeStyle=`rgba(0, 240, 255, 0.05)`,this.ctx.lineWidth=1;let r=t*.65;for(let n=r;n<t;n+=28)this.ctx.beginPath(),this.ctx.moveTo(0,n),this.ctx.lineTo(e,n),this.ctx.stroke()}for(let n=0;n<this.particles.length;n++){let r=this.particles[n];r.x+=r.vx,r.y+=r.vy,(r.x<0||r.x>e)&&(r.vx*=-1),(r.y<0||r.y>t)&&(r.vy*=-1);let i=r.x-this.mouse.x,a=r.y-this.mouse.y,o=Math.sqrt(i*i+a*a);o<140&&(this.ctx.beginPath(),this.ctx.strokeStyle=`rgba(0, 240, 255, ${.4*(1-o/140)})`,this.ctx.lineWidth=1,this.ctx.moveTo(r.x,r.y),this.ctx.lineTo(this.mouse.x,this.mouse.y),this.ctx.stroke());for(let e=n+1;e<this.particles.length;e++){let t=this.particles[e],n=r.x-t.x,i=r.y-t.y,a=Math.sqrt(n*n+i*i);a<110&&(this.ctx.beginPath(),this.ctx.strokeStyle=`rgba(0, 240, 255, ${.12*(1-a/110)})`,this.ctx.lineWidth=1,this.ctx.moveTo(r.x,r.y),this.ctx.lineTo(t.x,t.y),this.ctx.stroke())}this.ctx.beginPath(),this.ctx.arc(r.x,r.y,r.radius,0,Math.PI*2),this.ctx.fillStyle=r.color,this.ctx.fill()}}destroy(){this.animId&&cancelAnimationFrame(this.animId)}};function f(e){if(!e||typeof e!=`string`)return{success:!1,error:`Empty expression`};let t=e.replace(/×/g,`*`).replace(/÷/g,`/`).replace(/−/g,`-`).trim();if(!t)return{success:!1,error:`Empty expression`};let n=[],r=0;for(;r<t.length;){let e=t[r];if(/\s/.test(e)){r++;continue}if(/[0-9.]/.test(e)){let e=``,i=0;for(;r<t.length&&/[0-9.]/.test(t[r]);){if(t[r]===`.`&&(i++,i>1))return{success:!1,error:`Multiple decimals in number`};e+=t[r],r++}n.push(e);continue}if(`+-*/%^()`.includes(e)){n.push(e),r++;continue}return{success:!1,error:`Unrecognized character: '${e}'`}}if(n.length===0)return{success:!1,error:`No valid tokens found`};let i=0;function a(){let e=o();for(;i<n.length&&(n[i]===`+`||n[i]===`-`);){let t=n[i++],r=o();t===`+`?e+=r:e-=r}return e}function o(){let e=s();for(;i<n.length&&(n[i]===`*`||n[i]===`/`||n[i]===`%`);){let t=n[i++],r=s();if(t===`*`)e*=r;else if(t===`/`){if(r===0)throw Error(`Division by zero`);e/=r}else{if(r===0)throw Error(`Modulo by zero`);e%=r}}return e}function s(){let e=c();if(i<n.length&&n[i]===`^`){i++;let t=s();e**=+t}return e}function c(){if(i>=n.length)throw Error(`Unexpected end of expression`);if(n[i]===`+`)return i++,c();if(n[i]===`-`)return i++,-c();let e=n[i++];if(e===`(`){let e=a();if(i>=n.length||n[i]!==`)`)throw Error(`Missing closing parenthesis`);return i++,e}let t=parseFloat(e);if(isNaN(t))throw Error(`Invalid numeric token: '${e}'`);return t}try{let e=a();if(i<n.length)return{success:!1,error:`Unexpected token '${n[i]}'`};if(!isFinite(e))return{success:!1,error:`Result is undefined or infinite`};let t=Math.round(e*1e8)/1e8;return{success:!0,value:t,formatted:String(t)}}catch(e){return{success:!1,error:e instanceof Error?e.message:`Calculation error`}}}var p=new class{async processQuery(e){let t=e.trim().toLowerCase(),n={calculator:[`calculator`,`calc`],notes:[`notes`,`note`,`notepad`],calendar:[`calendar`,`events`,`schedule`,`date`],alarm:[`alarm`,`timer`,`stopwatch`,`clock`],files:[`files`,`file manager`,`explorer`,`folder`,`vfs`],dashboard:[`dashboard`,`system dashboard`,`system info`,`specs`,`status`,`hardware`,`top`],settings:[`settings`,`preferences`,`configuration`,`config`],music:[`music`,`player`,`synth`,`audio`,`song`],browser:[`browser`,`web`,`internet`,`search`],terminal:[`terminal`,`cli`,`console`,`command line`,`bash`,`shell`],devlogs:[`devlogs`,`devlog`,`development log`,`dev log`,`docs`]};if(t.startsWith(`open `)||t.startsWith(`launch `)||t.startsWith(`start `)||t.startsWith(`show `)){for(let[e,r]of Object.entries(n))if(r?.some(e=>t.includes(e)))return l.openWindow(e),u.show({title:`Nova AI`,message:`Launched ${e.toUpperCase()} per voice/text intent`,type:`info`}),{text:`Launching ${e.charAt(0).toUpperCase()+e.slice(1)} for you now.`,actionTaken:`open_${e}`,suggestedPrompts:[`Show system dashboard`,`What time is it?`,`Set a timer for 5m`]}}if(t.startsWith(`calc `)||t.startsWith(`calculate `)||/^[\d\s+\-*/().^%]+$/.test(t)){let e=t.replace(/^(calc|calculate|what is)\s*/i,``).trim(),n=f(e);return n.success&&n.formatted!==void 0?(c.info(`NovaAI`,`Evaluated expression: ${e} = ${n.formatted}`),{text:`The calculation result for \`${e}\` is: **${n.formatted}**`,actionTaken:`calculated`,suggestedPrompts:[`Open calculator`,`Take a note`,`System status`]}):{text:`I couldn't evaluate that math expression (${n.error||`Syntax Error`}). You can try "Open calculator" for manual input.`}}if(t.startsWith(`note `)||t.startsWith(`create note `)||t.startsWith(`new note `)){let e=t.replace(/^(note|create note|new note)\s*/i,``).trim();if(e){let t=a.getNotes(),n={id:`note-`+Date.now(),title:e.slice(0,24)+(e.length>24?`...`:``),content:e,category:`Quick`,updatedAt:new Date().toISOString()};return t.unshift(n),a.saveNotes(t),u.show({title:`Note Saved`,message:`Saved quick note: "${n.title}"`,type:`success`}),{text:`I've saved your quick note: "${e}". You can open the Notes app anytime to edit or expand it.`,actionTaken:`created_note`,suggestedPrompts:[`Open notes`,`Show system dashboard`]}}}if(t.includes(`time`)||t.includes(`date`)||t.includes(`clock`)){let e=new Date;return{text:`Current System Time: **${e.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}**\nDate: **${e.toLocaleDateString(void 0,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})}** (Nova Local Realtime).`,suggestedPrompts:[`Open calendar`,`Set a timer for 5 minutes`,`Open alarm`]}}return t.includes(`timer`)||t.includes(`alarm`)?(l.openWindow(`alarm`),{text:`Opened the Alarm & Timer module. You can start a countdown, set scheduled alarms, or use the millisecond stopwatch.`,actionTaken:`open_alarm`,suggestedPrompts:[`Open calendar`,`Open calculator`]}):t.includes(`wallpaper`)||t.includes(`theme`)||t.includes(`background`)||t.includes(`dark`)||t.includes(`light`)?(l.openWindow(`settings`),{text:`Opened System Settings. You can choose between themes (Cyberpunk, Obsidian, Aurora, Emerald, Solar) and dynamic wallpapers (Canvas Grid, Nebula, Circuit, Minimal).`,actionTaken:`open_settings`,suggestedPrompts:[`Open music player`,`Show system dashboard`]}):t.includes(`system`)||t.includes(`diagnostic`)||t.includes(`specs`)||t.includes(`ram`)||t.includes(`cpu`)?(l.openWindow(`dashboard`),{text:`System Telemetry Summary:
• Kernel: Nova WebOS v4.2.0-cyber
• Environment: Sandboxed Browser Compositor
• VFS: 4 Directories, Storage Quota Healthy
• Status: All daemons operating normally.`,actionTaken:`open_dashboard`,suggestedPrompts:[`Open terminal`,`Open file manager`]}):t.includes(`help`)||t.includes(`who are you`)||t.includes(`what can you do`)||t.includes(`command`)?{text:`I am **Nova AI**, your integrated operating system assistant.
I can help you control Nova WebOS and get things done:
• **Open apps**: "Open calculator", "Open notes", "Open music"
• **Execute math**: "calculate (45 * 12) / 2"
• **Take notes**: "note Buy replacement cybernetic cooling coil"
• **Check system**: "Show system dashboard", "What time is it?"
• **Customize**: "Change wallpaper", "Open settings"`,suggestedPrompts:[`Open calculator`,`Show system dashboard`,`Open terminal`,`What time is it?`]}:t.includes(`hello`)||t.includes(`hi`)||t.includes(`hey`)?{text:`Greetings, Operative. Nova WebOS is fully initialized and standing by. What would you like to accomplish today?`,suggestedPrompts:[`Open notes`,`Show system dashboard`,`Open music player`]}:{text:`Understood: "${e}". I am continuously learning system commands. Try asking me to open apps like "Open calculator", "Show system dashboard", "note [text]", or "What time is it?".`,suggestedPrompts:[`Open calculator`,`Open notes`,`Show system dashboard`,`What time is it?`]}}},m=class{constructor(e){this.selectedIconId=null,this.activeCategory=`all`,this.searchQuery=``,this.contextMenuEl=null,this.container=e,this.init()}init(){this.render(),this.setupContextMenu()}render(){let e=a.getSettings();this.container.className=`w-full h-full flex flex-col relative overflow-hidden select-none p-3 sm:p-5`,this.container.innerHTML=`
      <!-- TOP DESKTOP TOOLBAR: Smart Category Filter & Quick Launcher -->
      <div id="desktop-toolbar" class="flex flex-wrap items-center justify-between gap-3 mb-4 z-20 pointer-events-auto">
        <!-- Category Filter Pills -->
        <div class="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-lg">
          <button data-cat="all" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm transition-all">
            All Apps (12)
          </button>
          <button data-cat="core" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all">
            Core & AI
          </button>
          <button data-cat="productivity" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all">
            Productivity
          </button>
          <button data-cat="media" class="desktop-cat-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent transition-all">
            Tools & Media
          </button>
        </div>

        <!-- Search desktop apps & widget toggle -->
        <div class="flex items-center gap-2">
          <div class="relative hidden sm:block">
            <span class="absolute left-3 top-2 text-slate-400">${s(`search`,`w-3.5 h-3.5`)}</span>
            <input type="text" id="desktop-filter-input" placeholder="Filter desktop..."
              class="w-36 lg:w-48 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-xl pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:w-56 transition-all" />
          </div>

          <button id="toggle-widgets-btn" class="px-2.5 py-1.5 rounded-xl bg-slate-950/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5">
            <span class="text-cyan-400">${s(`dashboard`,`w-3.5 h-3.5`)}</span>
            <span class="hidden md:inline">Widgets</span>
          </button>
        </div>
      </div>

      <!-- MAIN DESKTOP CONTENT: Icons Work Area + Right Widgets Panel -->
      <div class="flex-1 flex gap-4 overflow-hidden relative z-10">
        <!-- Desktop Icons Work Area (Scrollable if compact screen) -->
        <div id="desktop-icons-area" class="flex-1 overflow-y-auto pr-1 no-scrollbar flex flex-col gap-6">
          <!-- Rendered dynamically by category or unified grid -->
        </div>

        <!-- RIGHT SIDE: Modern Desktop Widgets Column -->
        <div id="desktop-widgets-col" class="w-72 hidden xl:flex flex-col gap-3.5 shrink-0 overflow-y-auto no-scrollbar pointer-events-auto" style="display: ${e.showDesktopWidgets?`flex`:`none`}">
          <!-- Widget 1: Holographic Chrono & Telemetry -->
          <div class="p-4 rounded-3xl bg-slate-950/75 border border-white/15 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-2 relative overflow-hidden group">
            <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl pointer-events-none"></div>
            <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span class="flex items-center gap-1.5 text-cyan-400">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                QUANTUM CLOCK
              </span>
              <span class="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">ONLINE</span>
            </div>
            <div id="chrono-time" class="text-3xl font-bold font-mono text-slate-100 tracking-wider">--:--:--</div>
            <div id="chrono-date" class="text-xs text-slate-400">Loading date...</div>

            <!-- Mini Telemetry Bars -->
            <div class="pt-2.5 border-t border-white/10 flex flex-col gap-2 text-[10px] font-mono">
              <div>
                <div class="flex justify-between text-slate-400 mb-1">
                  <span>CPU SYNAPSE</span>
                  <span id="widget-cpu-val" class="text-cyan-300">18%</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="widget-cpu-bar" class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" style="width: 18%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-slate-400 mb-1">
                  <span>RAM MATRIX</span>
                  <span id="widget-ram-val" class="text-purple-300">4.2 / 16 GB</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style="width: 28%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Widget 2: Nova AI Quick Command Bar -->
          <div class="p-4 rounded-3xl bg-slate-950/75 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40">
                  ${s(`assistant`,`w-4 h-4`)}
                </div>
                <span class="text-xs font-bold text-slate-200">Nova AI Command</span>
              </div>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">READY</span>
            </div>

            <div class="relative">
              <input type="text" id="widget-ai-input" placeholder="Type prompt or command..."
                class="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400" />
            </div>

            <!-- Quick Prompt Pills -->
            <div class="flex flex-wrap gap-1.5 text-[10px]">
              <button data-prompt="check system status" class="ai-quick-chip px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors">
                ⚡ Check Status
              </button>
              <button data-prompt="open terminal" class="ai-quick-chip px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors">
                💻 Terminal
              </button>
              <button data-prompt="set timer 5m" class="ai-quick-chip px-2 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-colors">
                ⏱️ 5m Timer
              </button>
            </div>
          </div>

          <!-- Widget 3: Desktop Quick Sticky Note -->
          <div class="p-4 rounded-3xl bg-amber-950/25 border border-amber-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-amber-300 flex items-center gap-1.5">
                ${s(`notes`,`w-4 h-4 text-amber-400`)}
                Quick Scratchpad
              </span>
              <button id="open-scratchpad-in-notes" class="text-[10px] text-amber-400/80 hover:text-amber-300 underline transition-colors">
                Open Notes →
              </button>
            </div>
            <textarea id="desktop-scratchpad" placeholder="Type quick thought right here... auto-saves."
              class="w-full h-20 bg-black/20 border border-white/5 rounded-xl p-2.5 text-xs text-amber-100 placeholder-amber-400/50 resize-none focus:outline-none focus:border-amber-400/50"></textarea>
          </div>
        </div>
      </div>

      <!-- Windows Mount Container (Bound inside Desktop) -->
      <div id="windows-container" class="absolute inset-0 overflow-hidden pointer-events-none z-30"></div>
    `,this.bindEvents(),this.renderOrganizedAppSections(),this.startChrono(),this.loadScratchpad()}renderOrganizedAppSections(){let e=this.container.querySelector(`#desktop-icons-area`);if(!e)return;let t=l.getRegisteredApps(),n=[{id:`core`,title:`Core System & AI Hub`,desc:`Autonomous assistant, kernel diagnostics & files`,appIds:[`assistant`,`dashboard`,`devlogs`,`files`],accent:`cyan`},{id:`productivity`,title:`Productivity Suite`,desc:`Documentation, schedule & calculations`,appIds:[`notes`,`calendar`,`calculator`,`alarm`],accent:`purple`},{id:`media`,title:`Cyber Tools & Media`,desc:`Synthesizer, shell terminal & web`,appIds:[`terminal`,`music`,`browser`,`settings`],accent:`emerald`}],r=n;this.activeCategory!==`all`&&(r=n.filter(e=>e.id===this.activeCategory));let i=``;r.forEach(e=>{let n=t.filter(t=>e.appIds.includes(t.id));this.searchQuery&&(n=n.filter(e=>e.title.toLowerCase().includes(this.searchQuery.toLowerCase()))),n.length!==0&&(i+=`
        <div class="flex flex-col gap-2.5">
          <!-- Section Header -->
          <div class="flex items-center gap-2 px-1">
            <span class="w-2 h-2 rounded-full ${e.accent===`cyan`?`bg-cyan-400`:e.accent===`purple`?`bg-purple-400`:`bg-emerald-400`}"></span>
            <h3 class="text-xs font-bold font-display uppercase tracking-wider text-slate-200">${e.title}</h3>
            <span class="text-[10px] text-slate-400 font-sans hidden sm:inline">— ${e.desc}</span>
          </div>

          <!-- Section Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            ${n.map(t=>this.renderAppCard(t,e.accent)).join(``)}
          </div>
        </div>
      `)}),i||=`
        <div class="p-8 text-center text-slate-400 text-xs">
          No applications matched "${this.searchQuery}".
        </div>
      `,e.innerHTML=i,this.bindIconEvents()}renderAppCard(e,t){let n=this.selectedIconId===e.id;return`
      <div data-appid="${e.id}" class="desktop-app-card group relative p-3 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border ${n?`border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.3)]`:`border-white/10 hover:border-white/20`} backdrop-blur-xl cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-center gap-3">
        <!-- Icon Badge -->
        <div class="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${t===`cyan`?`bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]`:t===`purple`?`bg-purple-500/15 text-purple-300 border border-purple-400/30 group-hover:shadow-[0_0_12px_rgba(192,132,252,0.4)]`:`bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.4)]`} transition-all">
          ${s(e.icon,`w-5 h-5`)}
        </div>

        <!-- App Info -->
        <div class="flex-1 overflow-hidden">
          <div class="text-xs font-bold text-slate-200 group-hover:text-white truncate transition-colors">
            ${e.title}
          </div>
          <p class="text-[10px] text-slate-400 truncate">
            Double click to open
          </p>
        </div>
      </div>
    `}bindIconEvents(){this.container.querySelectorAll(`.desktop-app-card`).forEach(e=>{let t=e.getAttribute(`data-appid`);e.addEventListener(`click`,n=>{n.stopPropagation(),this.selectedIconId=t,this.container.querySelectorAll(`.desktop-app-card`).forEach(e=>{e.classList.remove(`border-cyan-400`,`bg-cyan-500/10`,`shadow-[0_0_20px_rgba(0,240,255,0.3)]`),e.classList.add(`border-white/10`)}),e.classList.add(`border-cyan-400`,`bg-cyan-500/10`,`shadow-[0_0_20px_rgba(0,240,255,0.3)]`),e.classList.remove(`border-white/10`)}),e.addEventListener(`dblclick`,()=>{t&&(o.playOpen(),l.openWindow(t))});let n=null;e.addEventListener(`touchend`,()=>{n?(clearTimeout(n),n=null,t&&(o.playOpen(),l.openWindow(t))):n=setTimeout(()=>{n=null,t&&(o.playOpen(),l.openWindow(t))},350)})}),this.container.addEventListener(`click`,e=>{e.target.closest(`.desktop-app-card`)||(this.selectedIconId=null,this.container.querySelectorAll(`.desktop-app-card`).forEach(e=>{e.classList.remove(`border-cyan-400`,`bg-cyan-500/10`,`shadow-[0_0_20px_rgba(0,240,255,0.3)]`),e.classList.add(`border-white/10`)}))})}bindEvents(){this.container.querySelectorAll(`.desktop-cat-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-cat`)||`all`;this.activeCategory=t,this.container.querySelectorAll(`.desktop-cat-btn`).forEach(e=>{e.classList.remove(`bg-cyan-500/20`,`text-cyan-300`,`border-cyan-400/40`,`font-semibold`),e.classList.add(`text-slate-400`,`border-transparent`,`font-medium`)}),e.classList.add(`bg-cyan-500/20`,`text-cyan-300`,`border-cyan-400/40`,`font-semibold`),e.classList.remove(`text-slate-400`,`border-transparent`,`font-medium`),this.renderOrganizedAppSections()})}),this.container.querySelector(`#desktop-filter-input`)?.addEventListener(`input`,e=>{this.searchQuery=e.target.value,this.renderOrganizedAppSections()}),this.container.querySelector(`#toggle-widgets-btn`)?.addEventListener(`click`,()=>{o.playClick();let e=this.container.querySelector(`#desktop-widgets-col`);if(e){let t=e.style.display===`none`;e.style.display=t?`flex`:`none`;let n=a.getSettings();n.showDesktopWidgets=t,a.saveSettings(n)}});let e=this.container.querySelector(`#widget-ai-input`);e?.addEventListener(`keydown`,async t=>{if(t.key===`Enter`&&e.value.trim()){let t=e.value.trim();e.value=``,o.playOpen(),l.openWindow(`assistant`),setTimeout(async()=>{let e=l.getOpenWindows().find(e=>e.appId===`assistant`);if(e){let n=e.contentElement.querySelector(`#ai-input`),r=e.contentElement.querySelector(`#ai-send-btn`);if(n&&r){n.value=t,r.click();return}}await p.processQuery(t)},300)}}),this.container.querySelectorAll(`.ai-quick-chip`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-prompt`);t&&(o.playOpen(),l.openWindow(`assistant`),setTimeout(async()=>{let e=l.getOpenWindows().find(e=>e.appId===`assistant`);if(e){let n=e.contentElement.querySelector(`#ai-input`),r=e.contentElement.querySelector(`#ai-send-btn`);if(n&&r){n.value=t,r.click();return}}await p.processQuery(t)},300))})}),this.container.querySelector(`#open-scratchpad-in-notes`)?.addEventListener(`click`,()=>{o.playClick(),l.openWindow(`notes`)}),this.container.querySelector(`#chrono-time`)?.parentElement?.addEventListener(`click`,()=>{o.playClick(),l.openWindow(`calendar`)});let t=this.container.querySelector(`#desktop-scratchpad`);t?.addEventListener(`input`,()=>{localStorage.setItem(`nova_desktop_scratchpad`,t.value)})}loadScratchpad(){let e=this.container.querySelector(`#desktop-scratchpad`);e&&(e.value=localStorage.getItem(`nova_desktop_scratchpad`)||`Welcome to Nova WebOS!
- Multitask seamlessly
- Press Alt+Space for Nova AI`)}startChrono(){let e=()=>{let e=new Date,t=this.container.querySelector(`#chrono-time`),n=this.container.querySelector(`#chrono-date`),r=this.container.querySelector(`#widget-cpu-val`),i=this.container.querySelector(`#widget-cpu-bar`);if(t&&(t.textContent=e.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})),n&&(n.textContent=e.toLocaleDateString(void 0,{weekday:`long`,month:`short`,day:`numeric`})),r&&i&&Math.random()>.6){let e=Math.floor(12+Math.random()*18);r.textContent=`${e}%`,i.style.width=`${e}%`}};e(),setInterval(e,1e3)}setupContextMenu(){this.container.addEventListener(`contextmenu`,e=>{e.preventDefault(),this.showContextMenu(e.clientX,e.clientY)}),window.addEventListener(`click`,e=>{this.contextMenuEl&&!e.target.closest(`#desktop-context-menu`)&&(this.contextMenuEl.remove(),this.contextMenuEl=null)})}showContextMenu(e,t){this.contextMenuEl&&this.contextMenuEl.remove();let n=document.createElement(`div`);n.id=`desktop-context-menu`,n.className=`fixed z-[9999] w-60 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2 flex flex-col gap-1 text-xs select-none`;let r=Math.min(e,window.innerWidth-250),i=Math.min(t,window.innerHeight-280);n.style.left=`${r}px`,n.style.top=`${i}px`,n.innerHTML=`
      <button data-action="notes" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-cyan-400">${s(`notes`,`w-4 h-4`)}</span>
        <span>Create New Note</span>
      </button>
      <button data-action="terminal" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-emerald-400">${s(`terminal`,`w-4 h-4`)}</span>
        <span>Open Terminal CLI</span>
      </button>
      <button data-action="assistant" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-cyan-400">${s(`assistant`,`w-4 h-4`)}</span>
        <span>Launch Nova AI</span>
      </button>
      <button data-action="dashboard" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors">
        <span class="text-cyan-400">${s(`dashboard`,`w-4 h-4`)}</span>
        <span>System Dashboard</span>
      </button>
      <button data-action="devlogs" class="ctx-item px-3 py-2 rounded-xl hover:bg-cyan-500/15 text-slate-200 hover:text-purple-300 flex items-center gap-2.5 transition-colors">
        <span class="text-purple-400">${s(`devlogs`,`w-4 h-4`)}</span>
        <span>Dev Logs Journal</span>
      </button>
      <div class="my-1 border-t border-white/10"></div>
      <button data-action="settings" class="ctx-item px-3 py-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2.5 transition-colors">
        <span class="text-slate-400">${s(`settings`,`w-4 h-4`)}</span>
        <span>Personalize Desktop & Themes</span>
      </button>
      <button data-action="refresh" class="ctx-item px-3 py-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2.5 transition-colors">
        <span class="text-slate-400">${s(`refresh`,`w-4 h-4`)}</span>
        <span>Refresh Desktop</span>
      </button>
    `,document.body.appendChild(n),this.contextMenuEl=n,n.querySelectorAll(`.ctx-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-action`);t===`refresh`?(this.renderOrganizedAppSections(),u.show({title:`Desktop`,message:`Desktop refreshed`,type:`info`})):t&&l.openWindow(t),n.remove(),this.contextMenuEl=null})})}},h=class{constructor(e){this.isStartOpen=!1,this.isTrayOpen=!1,this.clockInterval=null,this.activeCategory=`all`,this.container=e,this.init()}init(){this.render(),l.onWindowsChange(()=>{this.renderDockIcons()}),window.addEventListener(`click`,e=>{let t=e.target;!t.closest(`#start-menu-flyout`)&&!t.closest(`#start-btn`)&&this.isStartOpen&&(this.isStartOpen=!1,this.updateFlyoutsState()),!t.closest(`#tray-flyout`)&&!t.closest(`#tray-btn`)&&this.isTrayOpen&&(this.isTrayOpen=!1,this.updateFlyoutsState())}),this.startClock()}render(){this.container.className=`w-full h-14 bg-slate-950/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] flex items-center justify-between px-3 z-[9990] select-none relative`,this.container.innerHTML=`
      <!-- LEFT SECTION: Start Button + Nova AI Search Pill -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Start Button -->
        <button id="start-btn" class="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 transition-all active:scale-95 shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:border-cyan-300">
          <span class="text-cyan-400 group-hover:scale-110 transition-transform">${s(`nova-logo`,`w-5 h-5`)}</span>
          <span class="text-xs font-bold font-display tracking-wider hidden sm:inline text-slate-100 group-hover:text-cyan-200">NOVA OS</span>
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse hidden sm:inline"></span>
        </button>

        <!-- Nova AI Quick Command Bar / Search Pill -->
        <div id="taskbar-ai-pill" class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 cursor-pointer transition-all text-slate-300 group shadow-inner">
          <span class="text-cyan-400 group-hover:scale-105 transition-transform">${s(`assistant`,`w-4 h-4`)}</span>
          <span class="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Ask Nova AI or search...</span>
          <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-cyan-300">⌘K</kbd>
        </div>
      </div>

      <!-- CENTER SECTION: Floating App Dock -->
      <div class="flex-1 flex items-center justify-center px-2 overflow-hidden h-full">
        <div id="taskbar-dock" class="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md overflow-x-auto max-w-full no-scrollbar">
          <!-- Dock icons rendered dynamically -->
        </div>
      </div>

      <!-- RIGHT SECTION: Control Center / System Tray -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Volume / Audio Flyout Toggle -->
        <button id="tray-btn" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white border border-transparent hover:border-white/10 transition-all text-xs" title="Sound & Audio Controls">
          <span class="text-cyan-400">${s(`volume`,`w-4 h-4`)}</span>
          <span id="tb-vol-label" class="font-mono text-[11px] hidden sm:inline">75%</span>
        </button>

        <!-- Quick Theme Cycle -->
        <button id="theme-quick-btn" class="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-transparent hover:border-white/10 transition-colors" title="Quick Theme Switcher">
          ${s(`settings`,`w-4 h-4`)}
        </button>

        <!-- Clock & Calendar Pill -->
        <button id="taskbar-clock" class="flex flex-col items-end px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/5 hover:border-cyan-400/30 transition-all text-right group cursor-pointer" title="Click to open Calendar & Schedule">
          <span id="tb-time" class="text-xs font-mono font-bold text-slate-100 group-hover:text-cyan-300 tracking-wider">00:00:00</span>
          <span id="tb-date" class="text-[10px] text-slate-400 font-sans tracking-tight">Jan 01</span>
        </button>

        <!-- Show Desktop Peek Button -->
        <button id="peek-desktop-btn" class="w-2.5 h-8 rounded hover:bg-cyan-400/40 transition-colors border-l border-white/10" title="Show Desktop / Minimize All"></button>
      </div>

      <!-- ================= START MENU FLYOUT ================= -->
      <div id="start-menu-flyout" class="absolute bottom-16 left-3 w-[400px] max-w-[calc(100vw-24px)] rounded-3xl bg-slate-950/95 backdrop-blur-3xl border border-cyan-500/25 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 flex flex-col gap-4 transition-all duration-200 opacity-0 pointer-events-none translate-y-4 z-[9999]">
        <!-- User Profile & System Status Header -->
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/15">
              ${s(`user`,`w-5 h-5`)}
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
            </div>
            <div>
              <div class="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                <span>Operative // Admin</span>
                <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">v4.2</span>
              </div>
              <p class="text-[10px] text-slate-400 font-mono">Nova Quantum Kernel Active</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="start-devlogs-btn" class="p-2 rounded-xl text-slate-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors" title="Open Dev Logs Journal">
              ${s(`devlogs`,`w-4 h-4`)}
            </button>
            <button id="start-reboot-btn" class="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" title="Reboot WebOS">
              ${s(`power`,`w-4 h-4`)}
            </button>
          </div>
        </div>

        <!-- Search Bar with Live Filter -->
        <div class="relative">
          <span class="absolute left-3.5 top-3 text-cyan-400">${s(`search`,`w-4 h-4`)}</span>
          <input type="text" id="start-search-input" placeholder="Type app name, file or command..."
            class="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          <button data-cat="all" class="start-cat-pill px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium">All (12)</button>
          <button data-cat="core" class="start-cat-pill px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent font-medium">Core & AI</button>
          <button data-cat="productivity" class="start-cat-pill px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent font-medium">Productivity</button>
          <button data-cat="media" class="start-cat-pill px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent font-medium">Tools & Web</button>
        </div>

        <!-- App Grid -->
        <div class="space-y-1">
          <div class="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1">Applications & Tools</div>
          <div id="start-apps-grid" class="grid grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Quick System Status Footer -->
        <div class="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <div class="flex items-center gap-1.5 text-cyan-300 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Online (Full Access)</span>
          </div>
          <button id="start-settings-btn" class="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors">
            ${s(`settings`,`w-3.5 h-3.5`)}
            <span>Settings</span>
          </button>
        </div>
      </div>

      <!-- ================= TRAY / AUDIO FLYOUT ================= -->
      <div id="tray-flyout" class="absolute bottom-16 right-3 w-80 rounded-3xl bg-slate-950/95 backdrop-blur-3xl border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 flex flex-col gap-4 transition-all duration-200 opacity-0 pointer-events-none translate-y-4 z-[9999]">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <span class="text-cyan-400">${s(`volume`,`w-4 h-4`)}</span>
            Audio & Control Hub
          </h4>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">SYNTH OK</span>
        </div>

        <!-- Audio Volume Slider & Mute -->
        <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">Master Synthesizer</span>
            <span id="tray-vol-text" class="font-mono text-cyan-300 font-bold">75%</span>
          </div>
          <div class="flex items-center gap-2.5">
            <button id="tray-mute-btn" class="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-400 transition-colors" title="Toggle Sound">
              ${s(`volume`,`w-4 h-4`)}
            </button>
            <input type="range" id="tray-vol-slider" min="0" max="100" value="75"
              class="flex-1 accent-cyan-400 cursor-pointer h-2 bg-white/15 rounded-lg" />
          </div>
          <button id="tray-test-sound-btn" class="w-full py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium transition-colors">
            Play Test Harmonic Chime
          </button>
        </div>

        <!-- Theme Switcher Grid -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Cyber Themes</span>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <button data-theme="cyberpunk" class="tray-theme-btn p-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
              <span>Cyberpunk</span>
            </button>
            <button data-theme="obsidian" class="tray-theme-btn p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-slate-200"></span>
              <span>Obsidian</span>
            </button>
            <button data-theme="aurora" class="tray-theme-btn p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
              <span>Aurora</span>
            </button>
            <button data-theme="emerald" class="tray-theme-btn p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
              <span>Matrix</span>
            </button>
            <button data-theme="solar" class="tray-theme-btn p-2 rounded-xl bg-orange-950/40 hover:bg-orange-900/50 border border-orange-500/40 text-orange-300 flex flex-col items-center gap-1 transition-all">
              <span class="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]"></span>
              <span>Solar</span>
            </button>
            <button id="tray-open-settings" class="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex flex-col items-center gap-1 transition-all">
              <span class="text-slate-400">${s(`settings`,`w-3 h-3`)}</span>
              <span>More...</span>
            </button>
          </div>
        </div>
      </div>
    `,this.bindEvents(),this.renderDockIcons(),this.renderStartMenuApps()}renderDockIcons(){let e=this.container.querySelector(`#taskbar-dock`);if(!e)return;let t=l.getRegisteredApps(),n=l.getOpenWindows(),r=l.getActiveWindowId();e.innerHTML=t.map(e=>{let t=n.filter(t=>t.appId===e.id),i=t.length>0,a=t.some(e=>e.id===r&&!e.isMinimized),o=i&&t.every(e=>e.isMinimized);return`
        <div class="relative group">
          <button data-appid="${e.id}" class="dock-app-btn relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${a?`bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-105`:i?o?`bg-white/10 text-slate-300 border border-white/15 opacity-75`:`bg-white/15 text-cyan-200 border border-white/20`:`hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent hover:scale-105`}">
            ${s(e.icon,`w-5 h-5`)}

            <!-- Running indicator bar -->
            ${i?`<span class="absolute -bottom-1 left-2 right-2 h-1 rounded-full ${a?`bg-cyan-400 shadow-[0_0_6px_#00f0ff]`:`bg-slate-400`}"></span>`:``}
          </button>

          <!-- Floating Tooltip -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-white/15 text-[11px] font-medium text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl z-50">
            ${e.title} ${i?o?`(Minimized)`:`(Running)`:``}
          </div>
        </div>
      `}).join(``),e.querySelectorAll(`.dock-app-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-appid`);if(!t)return;let n=l.getOpenWindows().find(e=>e.appId===t);n?n.isMinimized?(l.restoreWindow(n.id),l.focusWindow(n.id)):l.getActiveWindowId()===n.id?l.minimizeWindow(n.id):l.focusWindow(n.id):l.openWindow(t)})})}renderStartMenuApps(e=``){let t=this.container.querySelector(`#start-apps-grid`);if(!t)return;let n=l.getRegisteredApps();this.activeCategory===`core`?n=n.filter(e=>[`assistant`,`dashboard`,`devlogs`,`files`].includes(e.id)):this.activeCategory===`productivity`?n=n.filter(e=>[`notes`,`calendar`,`calculator`,`alarm`].includes(e.id)):this.activeCategory===`media`&&(n=n.filter(e=>[`terminal`,`music`,`browser`,`settings`].includes(e.id))),e&&(n=n.filter(t=>t.title.toLowerCase().includes(e.toLowerCase()))),t.innerHTML=n.map(e=>`
      <button data-appid="${e.id}" class="start-app-item p-2.5 rounded-2xl bg-white/5 hover:bg-cyan-500/15 hover:border-cyan-400/40 border border-white/5 flex flex-col items-center text-center gap-1.5 transition-all text-slate-300 hover:text-white group">
        <div class="p-2 rounded-xl bg-white/5 group-hover:bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
          ${s(e.icon,`w-5 h-5`)}
        </div>
        <span class="text-[11px] font-medium truncate w-full">${e.title}</span>
      </button>
    `).join(``),t.querySelectorAll(`.start-app-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.playOpen();let t=e.getAttribute(`data-appid`);t&&(l.openWindow(t),this.isStartOpen=!1,this.updateFlyoutsState())})})}updateFlyoutsState(){let e=this.container.querySelector(`#start-menu-flyout`),t=this.container.querySelector(`#tray-flyout`);if(e){if(this.isStartOpen){e.classList.remove(`opacity-0`,`pointer-events-none`,`translate-y-4`);let t=e.querySelector(`#start-search-input`);t&&(t.value=``,this.renderStartMenuApps(),setTimeout(()=>t.focus(),60))}else e.classList.add(`opacity-0`,`pointer-events-none`,`translate-y-4`)}t&&(this.isTrayOpen?t.classList.remove(`opacity-0`,`pointer-events-none`,`translate-y-4`):t.classList.add(`opacity-0`,`pointer-events-none`,`translate-y-4`))}bindEvents(){this.container.querySelector(`#start-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),o.playClick(),this.isStartOpen=!this.isStartOpen,this.isStartOpen&&(this.isTrayOpen=!1),this.updateFlyoutsState()}),this.container.querySelector(`#taskbar-ai-pill`)?.addEventListener(`click`,()=>{o.playClick(),l.openWindow(`assistant`)}),this.container.querySelector(`#tray-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),o.playClick(),this.isTrayOpen=!this.isTrayOpen,this.isTrayOpen&&(this.isStartOpen=!1),this.updateFlyoutsState()}),this.container.querySelector(`#theme-quick-btn`)?.addEventListener(`click`,()=>{o.playClick();let e=[`cyberpunk`,`obsidian`,`aurora`,`emerald`,`solar`],t=a.getSettings().theme,n=e[(e.indexOf(t)+1)%e.length],r=a.getSettings();r.theme=n,a.saveSettings(r),document.documentElement.setAttribute(`data-theme`,n),u.show({title:`Theme Applied`,message:`Active Cyber Theme: ${n.toUpperCase()}`,type:`info`,timeoutMs:2500})}),this.container.querySelector(`#taskbar-clock`)?.addEventListener(`click`,()=>{o.playClick(),l.openWindow(`calendar`)}),this.container.querySelector(`#peek-desktop-btn`)?.addEventListener(`click`,()=>{o.playClick();let e=l.getOpenWindows(),t=e.some(e=>!e.isMinimized);e.forEach(e=>{t?l.minimizeWindow(e.id):l.restoreWindow(e.id)})}),this.container.querySelectorAll(`.start-cat-pill`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-cat`)||`all`;this.activeCategory=t,this.container.querySelectorAll(`.start-cat-pill`).forEach(e=>{e.classList.remove(`bg-cyan-500/20`,`text-cyan-300`,`border-cyan-500/40`),e.classList.add(`bg-white/5`,`text-slate-400`,`border-transparent`)}),e.classList.add(`bg-cyan-500/20`,`text-cyan-300`,`border-cyan-500/40`),e.classList.remove(`bg-white/5`,`text-slate-400`,`border-transparent`);let n=this.container.querySelector(`#start-search-input`);this.renderStartMenuApps(n?n.value:``)})}),this.container.querySelector(`#start-search-input`)?.addEventListener(`input`,e=>{this.renderStartMenuApps(e.target.value)}),this.container.querySelector(`#start-devlogs-btn`)?.addEventListener(`click`,()=>{o.playOpen(),l.openWindow(`devlogs`),this.isStartOpen=!1,this.updateFlyoutsState()}),this.container.querySelector(`#start-reboot-btn`)?.addEventListener(`click`,()=>{this.isStartOpen=!1,this.updateFlyoutsState(),u.confirmModal({title:`Reboot Nova WebOS`,message:`Are you sure you want to reboot the operating system session?`,confirmText:`Reboot Now`,isDestructive:!1,onConfirm:()=>{window.location.reload()}})}),this.container.querySelector(`#start-settings-btn`)?.addEventListener(`click`,()=>{o.playOpen(),l.openWindow(`settings`),this.isStartOpen=!1,this.updateFlyoutsState()});let e=this.container.querySelector(`#tray-vol-slider`),t=this.container.querySelector(`#tray-vol-text`),n=this.container.querySelector(`#tb-vol-label`);e?.addEventListener(`input`,e=>{let r=parseInt(e.target.value,10);o.setVolume(r),t&&(t.textContent=`${r}%`),n&&(n.textContent=`${r}%`)}),this.container.querySelector(`#tray-test-sound-btn`)?.addEventListener(`click`,()=>{o.playBootChime()}),this.container.querySelectorAll(`.tray-theme-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-theme`);if(t){let e=a.getSettings();e.theme=t,a.saveSettings(e),document.documentElement.setAttribute(`data-theme`,t),u.show({title:`Theme Applied`,message:`Active Cyber Theme: ${t.toUpperCase()}`,type:`info`,timeoutMs:2e3})}})}),this.container.querySelector(`#tray-open-settings`)?.addEventListener(`click`,()=>{o.playOpen(),l.openWindow(`settings`),this.isTrayOpen=!1,this.updateFlyoutsState()})}startClock(){let e=()=>{let e=new Date,t=a.getSettings(),n=t.clockFormat===`12h`,r=t.showSeconds,i=e.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:r?`2-digit`:void 0,hour12:n}),o=e.toLocaleDateString(void 0,{weekday:`short`,month:`short`,day:`numeric`}),s=this.container.querySelector(`#tb-time`),c=this.container.querySelector(`#tb-date`);s&&(s.textContent=i),c&&(c.textContent=o)};e(),this.clockInterval=window.setInterval(e,1e3)}destroy(){this.clockInterval&&clearInterval(this.clockInterval)}},g=class{constructor(e,t){this.container=e,this.onComplete=t}start(){this.renderBiosScreen()}renderBiosScreen(){this.container.className=`fixed inset-0 z-50 bg-black text-cyan-400 font-mono flex flex-col justify-between p-6 sm:p-10 select-none`,this.container.innerHTML=`
      <div>
        <div class="flex items-center justify-between border-b border-cyan-950 pb-3 mb-4">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400">${s(`nova-logo`,`w-6 h-6`)}</span>
            <span class="font-bold tracking-widest text-sm">NOVA ARCHITECTURE SYSTEM // BIOS v4.2</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="boot-desktop-btn" class="text-xs px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all active:scale-95 shadow-md shadow-cyan-500/30">
              Enter Desktop Now →
            </button>
            <button id="boot-skip-btn" class="text-xs px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800 transition-colors">
              Skip [ESC]
            </button>
          </div>
        </div>

        <div id="bios-logs" class="space-y-1.5 text-xs sm:text-sm text-cyan-300">
          <div>INITIALIZING KERNEL SYSTEM...</div>
        </div>
      </div>

      <div class="space-y-2 pt-4 border-t border-cyan-950">
        <div class="flex justify-between text-xs text-cyan-400">
          <span id="boot-status-text">Loading subsystem drivers...</span>
          <span id="boot-pct" class="font-bold">0%</span>
        </div>
        <div class="w-full bg-cyan-950/50 h-2 rounded-full overflow-hidden border border-cyan-900/40">
          <div id="boot-progress-bar" class="bg-gradient-to-r from-cyan-500 to-purple-500 h-full w-0 transition-all duration-150"></div>
        </div>
      </div>
    `;let e=this.container.querySelector(`#bios-logs`),t=this.container.querySelector(`#boot-progress-bar`),n=this.container.querySelector(`#boot-pct`),r=this.container.querySelector(`#boot-status-text`),i=this.container.querySelector(`#boot-skip-btn`),a=this.container.querySelector(`#boot-desktop-btn`),c=!1,l=()=>{c||(c=!0,o.playOpen(),this.container.classList.add(`transition-opacity`,`duration-300`,`opacity-0`,`pointer-events-none`),setTimeout(()=>{this.container.remove(),this.onComplete()},300))};a?.addEventListener(`click`,l),i?.addEventListener(`click`,()=>{c||this.renderWelcomeScreen()});let u=e=>{(e.key===`Escape`||e.key===`Enter`||e.key===` `)&&(window.removeEventListener(`keydown`,u),c||l())};window.addEventListener(`keydown`,u),[{text:`CPU: Quantum Core Architecture [OK]`,delay:100,pct:20},{text:`MEMORY: 16384 MB V-RAM ALLOCATED [OK]`,delay:200,pct:40},{text:`VFS: Mounting /root /apps /home /user [OK]`,delay:350,pct:60},{text:`AUDIO: Initializing Procedural Synth Context [OK]`,delay:500,pct:75},{text:`NEURAL: Loading Nova AI Inference Core [OK]`,delay:650,pct:90},{text:`SYSTEM READY: Entering Session Gateway...`,delay:800,pct:100}].forEach(i=>{setTimeout(()=>{if(c||!e)return;let a=document.createElement(`div`);a.className=`text-cyan-200`,a.textContent=`> ${i.text}`,e.appendChild(a),t&&(t.style.width=`${i.pct}%`),n&&(n.textContent=`${i.pct}%`),r&&(r.textContent=i.text)},i.delay)}),setTimeout(()=>{window.removeEventListener(`keydown`,u),c||this.renderWelcomeScreen()},1e3)}renderWelcomeScreen(){o.playBootChime();let e=new Date,t=e.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),n=e.toLocaleDateString(void 0,{weekday:`long`,month:`long`,day:`numeric`});this.container.className=`fixed inset-0 z-50 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950/40 text-slate-100 flex flex-col items-center justify-between p-6 select-none backdrop-blur-xl animate-fade-in`,this.container.innerHTML=`
      <!-- Top Time Display -->
      <div class="text-center pt-8">
        <div class="text-5xl sm:text-6xl font-extrabold font-mono text-cyan-300 tracking-wider">${t}</div>
        <div class="text-sm sm:text-base text-slate-400 mt-1 font-sans">${n}</div>
      </div>

      <!-- Center Profile / Login Card -->
      <div class="max-w-xs w-full p-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center gap-4 text-center backdrop-blur-md">
        <!-- Avatar with neon glow -->
        <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20">
          <div class="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-cyan-400">
            ${s(`user`,`w-10 h-10`)}
          </div>
          <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow"></span>
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-100">Operative Nova</h2>
          <p class="text-xs text-cyan-400 font-mono">Session ID: #NV-8821</p>
        </div>

        <button id="welcome-enter-btn" class="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/30 active:scale-95 flex items-center justify-center gap-2">
          <span>Enter Desktop</span>
          ${s(`chevron-right`,`w-4 h-4`)}
        </button>
      </div>

      <!-- Bottom OS Identifier -->
      <div class="text-center pb-4 text-xs text-slate-500 font-mono flex items-center gap-2">
        <span>NOVA WEBOS v4.2</span>
        <span>•</span>
        <span>BROWSER RUNTIME ARCHITECTURE</span>
      </div>
    `;let r=this.container.querySelector(`#welcome-enter-btn`),i=()=>{o.playOpen(),this.container.classList.add(`transition-opacity`,`duration-500`,`opacity-0`,`pointer-events-none`),setTimeout(()=>{this.container.remove(),this.onComplete()},500)};r?.addEventListener(`click`,i);let a=e=>{(e.key===`Enter`||e.key===` `)&&(window.removeEventListener(`keydown`,a),i())};window.addEventListener(`keydown`,a)}};function _(e,t){let n=a.getNotes(),r=n.length>0?n[0].id:null,i=``;e.className=`w-full h-full flex flex-col md:flex-row bg-slate-950/70 text-slate-100 overflow-hidden`;let c=()=>{n=a.getNotes();let t=n.filter(e=>e.title.toLowerCase().includes(i.toLowerCase())||e.content.toLowerCase().includes(i.toLowerCase())||e.category.toLowerCase().includes(i.toLowerCase())),l=n.find(e=>e.id===r)||t[0]||null;l&&(r=l.id);let d=l&&l.content.trim()?l.content.trim().split(/\s+/).length:0,f=l?l.content.length:0;e.innerHTML=`
      <!-- Sidebar / Notes List -->
      <div class="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-slate-900/50 shrink-0 h-48 md:h-full">
        <div class="p-3 border-b border-white/10 flex items-center justify-between gap-2">
          <div class="relative flex-1">
            <input type="text" id="notes-search" placeholder="Search notes..." value="${i}"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400" />
          </div>
          <button id="notes-new-btn" class="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 rounded-lg transition-colors" title="New Note">
            ${s(`plus`,`w-4 h-4`)}
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
          ${t.length===0?`<div class="p-4 text-center text-xs text-slate-500">No notes found</div>`:``}
          ${t.map(e=>`
            <div data-id="${e.id}" class="note-item p-2.5 rounded-lg cursor-pointer transition-all border ${e.id===r?`bg-cyan-500/15 border-cyan-500/40 text-white`:`bg-white/5 border-transparent hover:bg-white/10 text-slate-300`}">
              <div class="flex items-center justify-between gap-2">
                <span class="font-medium text-xs truncate flex-1">${e.title||`Untitled Note`}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 shrink-0">${e.category}</span>
              </div>
              <p class="text-[11px] text-slate-400 truncate mt-1">${e.content.replace(/[#*`_]/g,``)||`Empty note...`}</p>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- Main Editor Area -->
      <div class="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/50">
        ${l?`
          <div class="p-3 border-b border-white/10 flex items-center justify-between gap-3 bg-white/5 shrink-0">
            <input type="text" id="note-title-input" value="${l.title}" placeholder="Note Title"
              class="bg-transparent font-semibold text-sm text-slate-100 focus:outline-none flex-1 border-b border-transparent focus:border-cyan-400/50 px-1 py-0.5" />
            <div class="flex items-center gap-2">
              <select id="note-category-select" class="bg-slate-900 border border-white/15 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none">
                <option value="Personal" ${l.category===`Personal`?`selected`:``}>Personal</option>
                <option value="Work" ${l.category===`Work`?`selected`:``}>Work</option>
                <option value="Ideas" ${l.category===`Ideas`?`selected`:``}>Ideas</option>
                <option value="Guides" ${l.category===`Guides`?`selected`:``}>Guides</option>
                <option value="Shortcuts" ${l.category===`Shortcuts`?`selected`:``}>Shortcuts</option>
                <option value="Project" ${l.category===`Project`?`selected`:``}>Project</option>
              </select>
              <button id="note-download-btn" class="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Export as TXT">
                ${s(`download`,`w-4 h-4`)}
              </button>
              <button id="note-delete-btn" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors" title="Delete Note">
                ${s(`trash`,`w-4 h-4`)}
              </button>
            </div>
          </div>

          <div class="flex-1 p-4 overflow-hidden flex flex-col">
            <textarea id="note-content-textarea" placeholder="Start typing your note here..."
              class="w-full flex-1 bg-transparent resize-none focus:outline-none text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">${l.content}</textarea>
          </div>

          <div class="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-black/20 shrink-0">
            <span>Words: <strong class="text-slate-200 font-mono">${d}</strong> • Chars: <strong class="text-slate-200 font-mono">${f}</strong></span>
            <span class="text-[10px] text-slate-500">Auto-saved to localStorage</span>
          </div>
        `:`
          <div class="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            ${s(`notes`,`w-12 h-12 mb-3 text-slate-600`)}
            <p class="text-sm">No note selected</p>
            <button id="notes-empty-new-btn" class="mt-3 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-xs font-medium">Create New Note</button>
          </div>
        `}
      </div>
    `;let p=e.querySelector(`#notes-search`);p&&p.addEventListener(`input`,t=>{i=t.target.value,c();let n=e.querySelector(`#notes-search`);n&&(n.focus(),n.selectionStart=n.selectionEnd=n.value.length)});let m=e.querySelector(`#notes-new-btn`),h=e.querySelector(`#notes-empty-new-btn`),g=()=>{o.playClick();let e={id:`note-`+Date.now(),title:`New Note`,content:``,category:`Personal`,updatedAt:new Date().toISOString()};n.unshift(e),a.saveNotes(n),r=e.id,u.show({title:`Notes`,message:`Created new note`,type:`success`}),c()};m&&m.addEventListener(`click`,g),h&&h.addEventListener(`click`,g),e.querySelectorAll(`.note-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick(),r=e.getAttribute(`data-id`),c()})});let _=e.querySelector(`#note-title-input`);_&&l&&_.addEventListener(`input`,e=>{l.title=e.target.value,l.updatedAt=new Date().toISOString(),a.saveNotes(n)});let v=e.querySelector(`#note-category-select`);v&&l&&v.addEventListener(`change`,e=>{l.category=e.target.value,a.saveNotes(n),c()});let y=e.querySelector(`#note-content-textarea`);y&&l&&y.addEventListener(`input`,t=>{l.content=t.target.value,l.updatedAt=new Date().toISOString(),a.saveNotes(n);let r=e.querySelector(`strong.font-mono`);r&&(r.textContent=`${l.content.trim()?l.content.trim().split(/\s+/).length:0}`)});let b=e.querySelector(`#note-download-btn`);b&&l&&b.addEventListener(`click`,()=>{o.playClick();let e=new Blob([l.content],{type:`text/plain;charset=utf-8`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`${l.title.replace(/[^a-z0-9]/gi,`_`)||`note`}.txt`,n.click(),URL.revokeObjectURL(t),u.show({title:`Notes`,message:`Exported ${l.title}.txt`,type:`info`})});let x=e.querySelector(`#note-delete-btn`);x&&l&&x.addEventListener(`click`,()=>{o.playClick(),n=n.filter(e=>e.id!==l.id),a.saveNotes(n),r=n.length>0?n[0].id:null,u.show({title:`Notes`,message:`Note deleted`,type:`warning`}),c()})};c()}function v(e,t){let n=`0`,r=``,i=[];e.className=`w-full h-full flex flex-col bg-slate-950/80 text-slate-100 select-none p-3 overflow-hidden`;let a=()=>{e.innerHTML=`
      <div class="flex flex-col h-full gap-2">
        <!-- Display Screen -->
        <div class="bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col justify-end items-end shrink-0 min-h-[70px]">
          <div class="text-[11px] text-slate-400 font-mono tracking-wider h-4 overflow-hidden truncate">${r}</div>
          <div id="calc-display" class="text-2xl sm:text-3xl font-bold font-mono tracking-wider text-cyan-300 break-all overflow-hidden text-right w-full">${n}</div>
        </div>

        <!-- History Drawer (collapsible) -->
        <div class="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span>Recent: <span class="text-slate-300 font-mono">${i.length>0?i[i.length-1]:`No history`}</span></span>
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
    `,e.querySelectorAll(`.calc-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-key`);t&&s(t)})});let t=e.querySelector(`#calc-clear-hist`);t&&t.addEventListener(`click`,()=>{i=[],a()})},s=e=>{if(o.playClick(),e===`C`)n=`0`,r=``;else if(e===`DEL`)n=n.length>1?n.slice(0,-1):`0`;else if(e===`=`){let e=f(r+n);e.success&&e.formatted!==void 0?(i.push(`${r+n} = ${e.formatted}`),i.length>10&&i.shift(),r=``,n=e.formatted):n=`Error`}else if([`+`,`-`,`*`,`/`].includes(e))r=`${n} ${e===`*`?`×`:e===`/`?`÷`:e===`-`?`−`:`+`} `,n=`0`;else if(e===`%`){let e=parseFloat(n);isNaN(e)||(n=String(e/100))}else e===`.`?n.includes(`.`)||(n+=`.`):n===`0`||n===`Error`?n=e:n+=e;a()},c=e=>{t.element.classList.contains(`active`)&&([`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`.`].includes(e.key)?s(e.key):e.key===`+`?s(`+`):e.key===`-`?s(`-`):e.key===`*`?s(`*`):e.key===`/`?(e.preventDefault(),s(`/`)):e.key===`Enter`||e.key===`=`?s(`=`):e.key===`Backspace`?s(`DEL`):e.key===`Escape`&&s(`C`))};window.addEventListener(`keydown`,c),t.onClose=()=>{window.removeEventListener(`keydown`,c)},a()}function y(e,t){let n=null,r=null,i=Array(20).fill(15),c=Array(20).fill(42);e.className=`w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 overflow-y-auto font-sans`;let u=Date.now(),d=()=>{let t=a.getNotes().length,n=a.getEvents().length,r=a.getFiles().length,p=l.getOpenWindows(),m=a.getStorageUsage(),h=new Date,g=h.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),_=h.toLocaleDateString(void 0,{weekday:`long`,month:`short`,day:`numeric`,year:`numeric`}),v=Math.floor((Date.now()-u)/1e3),y=Math.floor(v/3600),b=Math.floor(v%3600/60),x=v%60,S=`${y.toString().padStart(2,`0`)}:${b.toString().padStart(2,`0`)}:${x.toString().padStart(2,`0`)}`;e.innerHTML=`
      <!-- Header telemetry -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-3">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            ${s(`dashboard`,`w-6 h-6`)}
          </div>
          <div>
            <h2 class="text-sm font-bold tracking-wide uppercase text-slate-100 flex items-center gap-2">
              Nova Kernel Telemetry
              <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">ONLINE</span>
            </h2>
            <p class="text-xs text-slate-400">Host: ${navigator.platform||`Web Container`} • Sandbox Layer v4.2</p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-right">
          <div>
            <div class="text-xs font-mono font-bold text-cyan-300" id="dash-time">${g}</div>
            <div class="text-[11px] text-slate-400">${_}</div>
          </div>
          <div class="pl-4 border-l border-white/10">
            <div class="text-xs font-mono font-bold text-slate-200" id="dash-uptime">${S}</div>
            <div class="text-[11px] text-slate-400">System Uptime</div>
          </div>
        </div>
      </div>

      <!-- Live Performance Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <!-- CPU Load Card -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-medium text-slate-300 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              CPU Load & Core Activity
            </span>
            <span class="font-mono text-cyan-400 font-bold" id="cpu-load-val">${i[i.length-1]}%</span>
          </div>
          <canvas id="cpu-chart" width="300" height="70" class="w-full h-16 rounded bg-black/40 border border-white/5"></canvas>
          <div class="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Thread allocation: 4 Logical Workers</span>
            <span>Freq: 3.2 GHz (Virtual)</span>
          </div>
        </div>

        <!-- Memory Load Card -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="font-medium text-slate-300 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              Virtual Memory (V-RAM)
            </span>
            <span class="font-mono text-purple-400 font-bold" id="mem-load-val">${c[c.length-1]}%</span>
          </div>
          <canvas id="mem-chart" width="300" height="70" class="w-full h-16 rounded bg-black/40 border border-white/5"></canvas>
          <div class="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>Used: ~3.4 GB / 8.0 GB</span>
            <span>Garbage Collection: Stable</span>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">Running Apps</div>
          <div class="text-xl font-bold font-mono text-cyan-400 mt-1">${p.length}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Active in compositor</div>
        </div>

        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">Saved Notes</div>
          <div class="text-xl font-bold font-mono text-amber-400 mt-1">${t}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">In localStorage</div>
        </div>

        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">Calendar Events</div>
          <div class="text-xl font-bold font-mono text-emerald-400 mt-1">${n}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Scheduled items</div>
        </div>

        <div class="p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="text-[11px] text-slate-400">VFS Files</div>
          <div class="text-xl font-bold font-mono text-purple-400 mt-1">${r}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">Stored in VFS</div>
        </div>
      </div>

      <!-- Storage & Platform Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <!-- Storage usage -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-medium text-slate-300">Local Storage Quota</span>
            <span class="font-mono text-cyan-400 text-xs">${m.usedKb} KB / 5.0 MB (${m.percent}%)</span>
          </div>
          <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full" style="width: ${Math.max(3,m.percent)}%"></div>
          </div>
          <p class="text-[10px] text-slate-400 mt-2">Browser origin persistence is verified and active.</p>
        </div>

        <!-- Browser & Display -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs flex flex-col justify-between">
          <div class="flex justify-between items-center py-0.5 border-b border-white/5">
            <span class="text-slate-400">User Agent</span>
            <span class="font-mono text-slate-200 truncate max-w-[200px]" title="${navigator.userAgent}">${navigator.userAgent.split(` `)[0]}</span>
          </div>
          <div class="flex justify-between items-center py-0.5 border-b border-white/5">
            <span class="text-slate-400">Resolution</span>
            <span class="font-mono text-slate-200">${window.innerWidth} × ${window.innerHeight} px</span>
          </div>
          <div class="flex justify-between items-center py-0.5">
            <span class="text-slate-400">Network State</span>
            <span class="font-mono text-emerald-400">Connected (Online)</span>
          </div>
        </div>
      </div>

      <!-- Active Running Processes / Windows -->
      <div class="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
        <h3 class="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">Compositor Task Manager (${p.length} Active)</h3>
        <div class="flex flex-col gap-1.5">
          ${p.length===0?`<div class="text-xs text-slate-500 py-2">No active windows</div>`:p.map(e=>`
            <div class="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 text-xs">
              <div class="flex items-center gap-2 overflow-hidden">
                <span class="text-cyan-400">${s(e.icon,`w-4 h-4`)}</span>
                <span class="font-medium text-slate-200 truncate">${e.title}</span>
                <span class="text-[10px] font-mono text-slate-500">ID: ${e.id.split(`-`).slice(0,2).join(`-`)}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-[10px] font-mono text-slate-400">${e.isMinimized?`Minimized`:`Active`}</span>
                <button data-winid="${e.id}" class="dash-kill-win text-[10px] px-2 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded border border-rose-500/30 transition-colors">End Task</button>
              </div>
            </div>
          `).join(``)}
        </div>
      </div>
    `,e.querySelectorAll(`.dash-kill-win`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-winid`);t&&(l.closeWindow(t),d())})}),f()},f=()=>{let t=e.querySelector(`#cpu-chart`);if(t){let e=t.getContext(`2d`);if(e){e.clearRect(0,0,t.width,t.height),e.strokeStyle=`#00f0ff`,e.lineWidth=2,e.beginPath();let n=t.width/(i.length-1);i.forEach((r,i)=>{let a=t.height-r/100*(t.height-10)-5;i===0?e.moveTo(0,a):e.lineTo(i*n,a)}),e.stroke(),e.lineTo(t.width,t.height),e.lineTo(0,t.height);let r=e.createLinearGradient(0,0,0,t.height);r.addColorStop(0,`rgba(0, 240, 255, 0.25)`),r.addColorStop(1,`rgba(0, 240, 255, 0)`),e.fillStyle=r,e.fill()}}let n=e.querySelector(`#mem-chart`);if(n){let e=n.getContext(`2d`);if(e){e.clearRect(0,0,n.width,n.height),e.strokeStyle=`#c084fc`,e.lineWidth=2,e.beginPath();let t=n.width/(c.length-1);c.forEach((r,i)=>{let a=n.height-r/100*(n.height-10)-5;i===0?e.moveTo(0,a):e.lineTo(i*t,a)}),e.stroke(),e.lineTo(n.width,n.height),e.lineTo(0,n.height);let r=e.createLinearGradient(0,0,0,n.height);r.addColorStop(0,`rgba(192, 132, 252, 0.25)`),r.addColorStop(1,`rgba(192, 132, 252, 0)`),e.fillStyle=r,e.fill()}}};d(),n=window.setInterval(()=>{let t=e.querySelector(`#dash-time`),n=e.querySelector(`#dash-uptime`);if(t&&(t.textContent=new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`,second:`2-digit`})),n){let e=Math.floor((Date.now()-u)/1e3),t=Math.floor(e/3600),r=Math.floor(e%3600/60),i=e%60;n.textContent=`${t.toString().padStart(2,`0`)}:${r.toString().padStart(2,`0`)}:${i.toString().padStart(2,`0`)}`}},1e3),r=window.setInterval(()=>{let t=Math.max(8,Math.min(85,Math.round(i[i.length-1]+(Math.random()*16-8)))),n=Math.max(30,Math.min(65,Math.round(c[c.length-1]+(Math.random()*6-3))));i.shift(),i.push(t),c.shift(),c.push(n);let r=e.querySelector(`#cpu-load-val`),a=e.querySelector(`#mem-load-val`);r&&(r.textContent=`${t}%`),a&&(a.textContent=`${n}%`),f()},1500),t.onClose=()=>{n&&clearInterval(n),r&&clearInterval(r)}}function b(e,t){let n=new Date,r=new Date().toISOString().split(`T`)[0];e.className=`w-full h-full flex flex-col md:flex-row bg-slate-950/80 text-slate-100 p-3 gap-3 overflow-hidden select-none`;let i=()=>{let t=a.getEvents(),c=n.getFullYear(),l=n.getMonth(),d=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],f=new Date(c,l,1).getDay(),p=new Date(c,l+1,0).getDate(),m=new Date().toISOString().split(`T`)[0],h=t.filter(e=>e.date===r);e.innerHTML=`
      <!-- Left side: Calendar Grid -->
      <div class="flex-1 flex flex-col bg-slate-900/40 rounded-xl p-3 border border-white/10 overflow-hidden">
        <!-- Month / Year Navigation -->
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div class="flex items-center gap-2">
            <h2 class="font-bold text-sm tracking-wide text-cyan-300 font-display">${d[l]} ${c}</h2>
            <button id="cal-today-btn" class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/15 text-[10px] text-slate-300 transition-colors">Today</button>
          </div>
          <div class="flex items-center gap-1">
            <button id="cal-prev-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              ${s(`chevron-left`,`w-4 h-4`)}
            </button>
            <button id="cal-next-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              ${s(`chevron-right`,`w-4 h-4`)}
            </button>
          </div>
        </div>

        <!-- Days of week -->
        <div class="grid grid-cols-7 text-center text-[10px] font-mono text-slate-400 py-2 border-b border-white/5">
          <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
        </div>

        <!-- Dates Grid -->
        <div class="flex-1 grid grid-cols-7 grid-rows-6 gap-1 pt-1.5 text-xs font-mono">
          ${Array(f).fill(null).map(()=>`<div class="p-1 opacity-20"></div>`).join(``)}
          ${Array.from({length:p},(e,n)=>{let i=n+1,a=`${c}-${String(l+1).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`,o=a===m,s=a===r,u=t.filter(e=>e.date===a);return`
              <div data-date="${a}" class="cal-day-cell relative p-1 rounded-lg cursor-pointer transition-all flex flex-col justify-between items-center border ${s?`bg-cyan-500/25 border-cyan-400 text-white shadow-lg shadow-cyan-500/20`:o?`bg-purple-500/20 border-purple-400/60 text-purple-200`:`bg-white/5 border-transparent hover:bg-white/10 text-slate-300`}">
                <span class="${o?`font-bold`:``}">${i}</span>
                <div class="flex gap-0.5 mt-0.5">
                  ${u.slice(0,3).map(e=>`<span class="w-1.5 h-1.5 rounded-full" style="background-color: ${e.color||`#00f0ff`}"></span>`).join(``)}
                </div>
              </div>
            `}).join(``)}
        </div>
      </div>

      <!-- Right side: Events for Selected Date -->
      <div class="w-full md:w-72 bg-slate-900/50 rounded-xl p-3 border border-white/10 flex flex-col">
        <div class="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <h3 class="text-xs font-bold text-slate-200">Scheduled Events</h3>
            <p class="text-[10px] text-slate-400 font-mono">${r}</p>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">${h.length}</span>
        </div>

        <!-- Events List -->
        <div class="flex-1 overflow-y-auto py-2 flex flex-col gap-2">
          ${h.length===0?`<div class="text-center py-6 text-xs text-slate-500">No events on this date</div>`:h.map(e=>`
              <div class="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between gap-2">
                <div class="flex items-start gap-2 overflow-hidden">
                  <span class="w-2 h-2 rounded-full mt-1 shrink-0" style="background-color: ${e.color||`#00f0ff`}"></span>
                  <div>
                    <div class="text-xs font-semibold text-slate-200">${e.title}</div>
                    ${e.time?`<div class="text-[10px] text-slate-400 font-mono">${e.time}</div>`:``}
                    ${e.description?`<div class="text-[11px] text-slate-400 mt-0.5">${e.description}</div>`:``}
                  </div>
                </div>
                <button data-eventid="${e.id}" class="cal-del-event text-slate-500 hover:text-rose-400 p-1 rounded transition-colors">
                  ${s(`trash`,`w-3.5 h-3.5`)}
                </button>
              </div>
            `).join(``)}
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
    `,e.querySelector(`#cal-prev-btn`)?.addEventListener(`click`,()=>{o.playClick(),n.setMonth(n.getMonth()-1),i()}),e.querySelector(`#cal-next-btn`)?.addEventListener(`click`,()=>{o.playClick(),n.setMonth(n.getMonth()+1),i()}),e.querySelector(`#cal-today-btn`)?.addEventListener(`click`,()=>{o.playClick(),n=new Date,r=new Date().toISOString().split(`T`)[0],i()}),e.querySelectorAll(`.cal-day-cell`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-date`);t&&(r=t,i())})}),e.querySelectorAll(`.cal-del-event`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let n=e.getAttribute(`data-eventid`);if(n){let e=t.filter(e=>e.id!==n);a.saveEvents(e),u.show({title:`Calendar`,message:`Event removed`,type:`warning`}),i()}})});let g=e.querySelector(`#cal-add-btn`);g&&g.addEventListener(`click`,()=>{o.playClick();let n=e.querySelector(`#cal-new-title`),s=e.querySelector(`#cal-new-time`),c=e.querySelector(`#cal-new-color`),l=n?.value.trim();if(!l)return;let d={id:`event-`+Date.now(),date:r,title:l,time:s?.value||`12:00`,color:c?.value||`#00f0ff`};t.push(d),a.saveEvents(t),u.show({title:`Calendar`,message:`Added: ${d.title}`,type:`success`}),i()})};i()}function x(e,t){let n=`timer`,r=300,i=300,a=!1,s=null,c=`08:00`,l=!1,d=null,f=0,p=0,m=!1,h=null,g=[];e.className=`w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 select-none overflow-hidden`;let _=()=>{e.innerHTML=`
      <!-- Tabs -->
      <div class="flex items-center justify-center gap-2 pb-3 border-b border-white/10 shrink-0">
        <button id="tab-timer" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${n===`timer`?`bg-cyan-500/20 text-cyan-300 border border-cyan-500/40`:`text-slate-400 hover:text-white hover:bg-white/5`}">Countdown Timer</button>
        <button id="tab-alarm" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${n===`alarm`?`bg-cyan-500/20 text-cyan-300 border border-cyan-500/40`:`text-slate-400 hover:text-white hover:bg-white/5`}">Scheduled Alarm</button>
        <button id="tab-stopwatch" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${n===`stopwatch`?`bg-cyan-500/20 text-cyan-300 border border-cyan-500/40`:`text-slate-400 hover:text-white hover:bg-white/5`}">Precision Stopwatch</button>
      </div>

      <!-- Tab Content Area -->
      <div class="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        ${v()}
      </div>
    `,e.querySelector(`#tab-timer`)?.addEventListener(`click`,()=>{o.playClick(),n=`timer`,_()}),e.querySelector(`#tab-alarm`)?.addEventListener(`click`,()=>{o.playClick(),n=`alarm`,_()}),e.querySelector(`#tab-stopwatch`)?.addEventListener(`click`,()=>{o.playClick(),n=`stopwatch`,_()}),y()},v=()=>{if(n===`timer`){let e=Math.floor(i/60),t=i%60;return`
        <div class="flex flex-col items-center gap-5 w-full max-w-xs">
          <!-- Digital readout -->
          <div class="relative w-48 h-48 rounded-full border-4 border-white/10 flex flex-col items-center justify-center bg-black/30 shadow-inner">
            <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 240, 255, 0.8)" stroke-width="4"
                stroke-dasharray="283" stroke-dashoffset="${283-283*(r>0?i/r*100:0)/100}" stroke-linecap="round" class="transition-all duration-300"/>
            </svg>
            <div class="text-4xl font-mono font-bold text-cyan-300 tracking-wider">
              ${e.toString().padStart(2,`0`)}:${t.toString().padStart(2,`0`)}
            </div>
            <div class="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Remaining</div>
          </div>

          <!-- Quick presets -->
          <div class="flex gap-2 text-xs">
            <button data-sec="60" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">1m</button>
            <button data-sec="300" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">5m</button>
            <button data-sec="600" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">10m</button>
            <button data-sec="1500" class="timer-preset px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">25m</button>
          </div>

          <!-- Controls -->
          <div class="flex gap-3">
            <button id="timer-toggle-btn" class="px-6 py-2 rounded-xl font-bold text-xs ${a?`bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30`:`bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-lg shadow-cyan-500/30`} transition-all">
              ${a?`PAUSE`:`START`}
            </button>
            <button id="timer-reset-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors">
              RESET
            </button>
          </div>
        </div>
      `}if(n===`alarm`)return`
        <div class="flex flex-col items-center gap-6 w-full max-w-xs text-center">
          <div class="p-4 rounded-2xl bg-black/40 border border-white/10 w-full">
            <div class="text-xs text-slate-400 mb-1">Current System Time</div>
            <div class="text-2xl font-bold font-mono text-slate-200">${new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}</div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <label class="text-xs text-slate-400 font-medium">Trigger Alarm At:</label>
            <input type="time" id="alarm-time-input" value="${c}"
              class="bg-white/5 border border-white/20 text-3xl font-mono text-cyan-300 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-cyan-400"/>
          </div>

          <div class="flex items-center gap-3">
            <button id="alarm-toggle-btn" class="px-6 py-2 rounded-xl text-xs font-bold transition-all ${l?`bg-emerald-500/20 text-emerald-400 border border-emerald-500/40`:`bg-white/10 text-slate-300 border border-white/10 hover:bg-white/20`}">
              ${l?`● ALARM ACTIVE`:`○ ACTIVATE ALARM`}
            </button>
          </div>
          <p class="text-[11px] text-slate-500">Will play chime and trigger system toast when time matches.</p>
        </div>
      `;let e=m?p+(Date.now()-f):p,t=Math.floor(e/6e4),o=Math.floor(e%6e4/1e3),s=Math.floor(e%1e3/10);return`
      <div class="flex flex-col items-center gap-4 w-full max-w-sm h-full justify-between">
        <div class="text-4xl sm:text-5xl font-mono font-bold text-cyan-300 tracking-wider py-4" id="sw-display-val">
          ${`${t.toString().padStart(2,`0`)}:${o.toString().padStart(2,`0`)}.${s.toString().padStart(2,`0`)}`}
        </div>

        <div class="flex gap-3">
          <button id="sw-toggle-btn" class="px-6 py-2 rounded-xl text-xs font-bold ${m?`bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30`:`bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-lg shadow-cyan-500/30`} transition-all">
            ${m?`STOP`:`START`}
          </button>
          <button id="sw-lap-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium" ${m?``:`disabled`}>
            LAP
          </button>
          <button id="sw-reset-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium">
            RESET
          </button>
        </div>

        <!-- Laps List -->
        <div class="w-full flex-1 max-h-36 overflow-y-auto rounded-xl bg-black/30 border border-white/10 p-2 text-xs font-mono">
          ${g.length===0?`<div class="text-center text-slate-500 py-3 text-[11px]">No laps recorded</div>`:g.map((e,t)=>`
              <div class="flex justify-between py-1 px-2 border-b border-white/5">
                <span class="text-slate-400">Lap ${g.length-t}</span>
                <span class="text-cyan-300 font-bold">${e}</span>
              </div>
            `).join(``)}
        </div>
      </div>
    `},y=()=>{if(n===`timer`&&(e.querySelectorAll(`.timer-preset`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=parseInt(e.getAttribute(`data-sec`)||`300`,10);r=t,i=t,a&&s&&(clearInterval(s),a=!1),_()})}),e.querySelector(`#timer-toggle-btn`)?.addEventListener(`click`,()=>{o.playClick(),a?(s&&clearInterval(s),a=!1):(a=!0,s=window.setInterval(()=>{i>0?(i--,_()):(s&&clearInterval(s),a=!1,o.playAlarmBeep(),u.show({title:`Timer Complete! ⏰`,message:`Your countdown timer has reached zero.`,type:`alert`,timeoutMs:8e3}),_())},1e3)),_()}),e.querySelector(`#timer-reset-btn`)?.addEventListener(`click`,()=>{o.playClick(),s&&clearInterval(s),a=!1,i=r,_()})),n===`alarm`){let t=e.querySelector(`#alarm-time-input`);t&&t.addEventListener(`change`,e=>{c=e.target.value}),e.querySelector(`#alarm-toggle-btn`)?.addEventListener(`click`,()=>{o.playClick(),l=!l,l&&u.show({title:`Alarm Set`,message:`Alarm armed for ${c}`,type:`info`}),_()})}n===`stopwatch`&&(e.querySelector(`#sw-toggle-btn`)?.addEventListener(`click`,()=>{o.playClick(),m?(p+=Date.now()-f,m=!1,h&&clearInterval(h)):(f=Date.now(),m=!0,h=window.setInterval(()=>{let t=p+(Date.now()-f),n=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),i=Math.floor(t%1e3/10),a=e.querySelector(`#sw-display-val`);a&&(a.textContent=`${n.toString().padStart(2,`0`)}:${r.toString().padStart(2,`0`)}.${i.toString().padStart(2,`0`)}`)},33)),_()}),e.querySelector(`#sw-lap-btn`)?.addEventListener(`click`,()=>{if(!m)return;o.playClick();let e=p+(Date.now()-f),t=Math.floor(e/6e4),n=Math.floor(e%6e4/1e3),r=Math.floor(e%1e3/10);g.unshift(`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}.${r.toString().padStart(2,`0`)}`),_()}),e.querySelector(`#sw-reset-btn`)?.addEventListener(`click`,()=>{o.playClick(),h&&clearInterval(h),m=!1,p=0,g=[],_()}))};d=window.setInterval(()=>{if(!l)return;let e=new Date;`${e.getHours().toString().padStart(2,`0`)}:${e.getMinutes().toString().padStart(2,`0`)}`===c&&e.getSeconds()===0&&(o.playAlarmBeep(),u.show({title:`ALARM TRIGGERED! 🔔`,message:`Scheduled alarm for ${c} is ringing!`,type:`alert`,timeoutMs:1e4}))},1e3),t.onClose=()=>{s&&clearInterval(s),d&&clearInterval(d),h&&clearInterval(h)},_()}var S=new class{constructor(){this.files=[],this.files=a.getFiles()}getItemsInPath(e){let t=e===`/`?`/`:e.replace(/\/$/,``);return this.files.filter(e=>e.path===t)}getFileById(e){return this.files.find(t=>t.id===e)}createFile(e,t,n=``){let r=t===`/`?`/`:t.replace(/\/$/,``),i={id:`file-`+Date.now()+`-`+Math.random().toString(36).substr(2,4),name:e,path:r,type:`file`,content:n,size:`${Math.max(1,Math.round(n.length/1024*10)/10)} KB`,updatedAt:new Date().toISOString()};return this.files.push(i),a.saveFiles(this.files),i}createFolder(e,t){let n=t===`/`?`/`:t.replace(/\/$/,``),r={id:`folder-`+Date.now()+`-`+Math.random().toString(36).substr(2,4),name:e,path:n,type:`folder`,updatedAt:new Date().toISOString()};return this.files.push(r),a.saveFiles(this.files),r}updateFile(e,t){let n=this.files.find(t=>t.id===e);n&&n.type===`file`&&(n.content=t,n.size=`${Math.max(1,Math.round(t.length/1024*10)/10)} KB`,n.updatedAt=new Date().toISOString(),a.saveFiles(this.files))}deleteItem(e){let t=this.files.find(t=>t.id===e);if(t){if(t.type===`folder`){let n=(t.path===`/`?``:t.path)+`/`+t.name;this.files=this.files.filter(t=>t.id!==e&&!t.path.startsWith(n))}else this.files=this.files.filter(t=>t.id!==e);a.saveFiles(this.files)}}downloadFile(e){let t=this.files.find(t=>t.id===e);if(!t||t.type!==`file`)return;let n=new Blob([t.content||``],{type:`text/plain;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t.name,document.body.appendChild(i),i.click(),setTimeout(()=>{document.body.removeChild(i),URL.revokeObjectURL(r)},100)}getAllFiles(){return[...this.files]}getFiles(){return this.getAllFiles()}};function C(e,t){let n=`/`,r=[`/`],i=0,a=null,c=null;e.className=`w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-3 select-none overflow-hidden`;let l=()=>{let t=S.getItemsInPath(n),o=a?S.getFileById(a):null;e.innerHTML=`
      <!-- Toolbar & Breadcrumb -->
      <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10 shrink-0">
        <div class="flex items-center gap-1.5">
          <button id="files-back-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors ${i<=0?`opacity-30 pointer-events-none`:``}">
            ${s(`chevron-left`,`w-4 h-4`)}
          </button>
          <button id="files-fwd-btn" class="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors ${i>=r.length-1?`opacity-30 pointer-events-none`:``}">
            ${s(`chevron-right`,`w-4 h-4`)}
          </button>
          <div class="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-300">
            <span class="text-slate-400">root:</span>
            <span>${n}</span>
          </div>
        </div>

        <div class="flex items-center gap-1.5">
          <button id="files-new-folder-btn" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors">
            ${s(`folder`,`w-3.5 h-3.5 text-amber-400`)}
            <span>+ Folder</span>
          </button>
          <button id="files-new-file-btn" class="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs text-cyan-300 flex items-center gap-1.5 transition-colors">
            ${s(`plus`,`w-3.5 h-3.5`)}
            <span>+ Text File</span>
          </button>
        </div>
      </div>

      <!-- Main Explorer Layout -->
      <div class="flex-1 flex overflow-hidden pt-3 gap-3">
        <!-- Folders/Files Grid -->
        <div class="flex-1 overflow-y-auto pr-1">
          ${t.length===0?`<div class="text-center py-12 text-slate-500 text-xs">Folder is empty</div>`:`
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              ${t.map(e=>`
                <div data-id="${e.id}" class="file-item-card p-3 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${e.id===a?`bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20`:`bg-white/5 border-transparent hover:bg-white/10 text-slate-300`}">
                  <div class="mb-2">
                    ${e.type===`folder`?s(`folder`,`w-10 h-10 text-amber-400 drop-shadow`):s(`file`,`w-10 h-10 text-cyan-300 drop-shadow`)}
                  </div>
                  <span class="text-xs font-medium truncate w-full" title="${e.name}">${e.name}</span>
                  <span class="text-[10px] text-slate-500 mt-0.5">${e.type===`folder`?`Directory`:e.size||`0 KB`}</span>
                </div>
              `).join(``)}
            </div>
          `}
        </div>

        <!-- File Details Inspector Sidebar -->
        <div class="w-56 bg-slate-900/50 rounded-xl p-3 border border-white/10 flex flex-col justify-between shrink-0">
          <div>
            <h4 class="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">Inspector</h4>
            ${o?`
              <div class="flex flex-col gap-2 text-xs">
                <div class="p-2 rounded bg-white/5 border border-white/5 text-center mb-1">
                  ${o.type===`folder`?s(`folder`,`w-8 h-8 text-amber-400 mx-auto mb-1`):s(`file`,`w-8 h-8 text-cyan-400 mx-auto mb-1`)}
                  <span class="font-semibold break-all text-slate-200 text-xs">${o.name}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                  <span class="text-slate-400">Type</span>
                  <span class="font-mono text-slate-200 capitalize">${o.type}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                  <span class="text-slate-400">Size</span>
                  <span class="font-mono text-slate-200">${o.size||`Folder`}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                  <span class="text-slate-400">Path</span>
                  <span class="font-mono text-slate-200 truncate max-w-[100px]">${o.path}</span>
                </div>
              </div>
            `:`<p class="text-xs text-slate-500 py-4 text-center">Select an item to view properties</p>`}
          </div>

          ${o?`
            <div class="flex flex-col gap-2 pt-2 border-t border-white/10">
              ${o.type===`file`?`
                <button id="file-open-btn" class="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-medium transition-colors">
                  Open / Edit
                </button>
                <button id="file-download-btn" class="w-full py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                  ${s(`download`,`w-3.5 h-3.5`)}
                  <span>Download</span>
                </button>
              `:`
                <button id="folder-enter-btn" class="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-medium transition-colors">
                  Enter Directory
                </button>
              `}
              <button id="file-delete-btn" class="w-full py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition-colors">
                Delete
              </button>
            </div>
          `:``}
        </div>
      </div>

      <!-- File Content Preview Modal -->
      ${c?`
        <div class="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col p-4">
          <div class="flex items-center justify-between pb-3 border-b border-white/10">
            <div class="flex items-center gap-2">
              <span class="text-cyan-400">${s(`file`,`w-4 h-4`)}</span>
              <span class="font-bold text-xs text-slate-100 font-mono">${c.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="preview-save-btn" class="px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition-colors">Save</button>
              <button id="preview-close-btn" class="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10">${s(`close`,`w-4 h-4`)}</button>
            </div>
          </div>
          <div class="flex-1 py-3 overflow-hidden flex flex-col">
            <textarea id="preview-editor" class="w-full flex-1 bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-200 focus:outline-none resize-none leading-relaxed">${c.content||``}</textarea>
          </div>
        </div>
      `:``}
    `,f()},d=e=>{o.playClick(),n=e,a=null,r.splice(i+1),r.push(n),i=r.length-1,l()},f=()=>{e.querySelector(`#files-back-btn`)?.addEventListener(`click`,()=>{i>0&&(o.playClick(),i--,n=r[i],a=null,l())}),e.querySelector(`#files-fwd-btn`)?.addEventListener(`click`,()=>{i<r.length-1&&(o.playClick(),i++,n=r[i],a=null,l())}),e.querySelector(`#files-new-folder-btn`)?.addEventListener(`click`,()=>{o.playClick();let e=prompt(`Folder name:`,`New_Folder`);e&&e.trim()&&(S.createFolder(e.trim(),n),u.show({title:`Files`,message:`Created folder "${e.trim()}"`,type:`success`}),l())}),e.querySelector(`#files-new-file-btn`)?.addEventListener(`click`,()=>{o.playClick();let e=prompt(`File name (e.g. notes.txt):`,`document.txt`);e&&e.trim()&&(S.createFile(e.trim(),n,`New document created in Nova WebOS.
`),u.show({title:`Files`,message:`Created file "${e.trim()}"`,type:`success`}),l())}),e.querySelectorAll(`.file-item-card`).forEach(e=>{let t=e.getAttribute(`data-id`);e.addEventListener(`click`,()=>{o.playClick(),a=t,l()}),e.addEventListener(`dblclick`,()=>{if(!t)return;let e=S.getFileById(t);if(e?.type===`folder`){let t=(n===`/`?``:n)+`/`+e.name;d(t)}else e?.type===`file`&&(c=e,l())})}),e.querySelector(`#folder-enter-btn`)?.addEventListener(`click`,()=>{if(!a)return;let e=S.getFileById(a);if(e&&e.type===`folder`){let t=(n===`/`?``:n)+`/`+e.name;d(t)}}),e.querySelector(`#file-open-btn`)?.addEventListener(`click`,()=>{if(!a)return;let e=S.getFileById(a);e&&e.type===`file`&&(o.playClick(),c=e,l())}),e.querySelector(`#file-download-btn`)?.addEventListener(`click`,()=>{a&&(S.downloadFile(a),u.show({title:`Files`,message:`Downloading file...`,type:`info`}))}),e.querySelector(`#file-delete-btn`)?.addEventListener(`click`,()=>{a&&(o.playClick(),S.deleteItem(a),a=null,u.show({title:`Files`,message:`Item deleted`,type:`warning`}),l())}),e.querySelector(`#preview-close-btn`)?.addEventListener(`click`,()=>{o.playClick(),c=null,l()}),e.querySelector(`#preview-save-btn`)?.addEventListener(`click`,()=>{if(o.playClick(),c){let t=e.querySelector(`#preview-editor`);t&&(S.updateFile(c.id,t.value),u.show({title:`Files`,message:`Saved changes to file`,type:`success`}),c=null,l())}})};l()}function w(e,t){let n=a.getSettings();e.className=`w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 select-none overflow-y-auto font-sans`;let r=()=>{e.innerHTML=`
      <div class="max-w-xl mx-auto w-full flex flex-col gap-5 pb-6">
        <!-- Header -->
        <div class="flex items-center gap-3 pb-3 border-b border-white/10">
          <div class="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            ${s(`settings`,`w-6 h-6`)}
          </div>
          <div>
            <h2 class="text-sm font-bold tracking-wide uppercase text-slate-100">System Preferences & Customization</h2>
            <p class="text-xs text-slate-400">All configurations are stored securely in browser storage.</p>
          </div>
        </div>

        <!-- 1. Theme Selection -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div>
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Color Theme</h3>
            <p class="text-[11px] text-slate-400">Select the overall color accent and glass atmosphere.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            ${[{id:`cyberpunk`,name:`Cyberpunk Neon`,color:`#00f0ff`,desc:`Electric Cyan & Deep Indigo`},{id:`obsidian`,name:`Obsidian Onyx`,color:`#f8fafc`,desc:`Sleek Monochrome Luxury`},{id:`aurora`,name:`Nebula Aurora`,color:`#c084fc`,desc:`Cosmic Violet & Magenta`},{id:`emerald`,name:`Emerald Matrix`,color:`#10b981`,desc:`Bio-Cyberpunk Green`},{id:`solar`,name:`Solar Flare`,color:`#f97316`,desc:`Warm Radiant Amber`}].map(e=>`
              <button data-theme="${e.id}" class="theme-choice-btn p-2.5 rounded-lg border text-left flex flex-col gap-1.5 transition-all ${n.theme===e.id?`bg-white/15 border-cyan-400 shadow-md ring-1 ring-cyan-400/40`:`bg-black/30 border-white/5 hover:bg-white/10`}">
                <div class="flex items-center justify-between w-full">
                  <span class="text-xs font-semibold text-slate-200">${e.name}</span>
                  <span class="w-3 h-3 rounded-full shadow" style="background-color: ${e.color}"></span>
                </div>
                <span class="text-[10px] text-slate-400">${e.desc}</span>
              </button>
            `).join(``)}
          </div>
        </div>

        <!-- 2. Wallpaper Selection -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div>
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Desktop Wallpaper</h3>
            <p class="text-[11px] text-slate-400">Choose an interactive procedural canvas shader or background style.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${[{id:`canvas-grid`,name:`Interactive Grid`,desc:`Particle constellation canvas`},{id:`nebula`,name:`Deep Nebula`,desc:`Cosmic deep space glow`},{id:`circuit`,name:`Cyber Circuit`,desc:`Geometric vector lines`},{id:`minimal`,name:`Obsidian Void`,desc:`Pure dark minimal canvas`}].map(e=>`
              <button data-wall="${e.id}" class="wall-choice-btn p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${n.wallpaper===e.id?`bg-white/15 border-cyan-400 ring-1 ring-cyan-400/40`:`bg-black/30 border-white/5 hover:bg-white/10`}">
                <span class="text-xs font-semibold text-slate-200">${e.name}</span>
                <span class="text-[10px] text-slate-400">${e.desc}</span>
              </button>
            `).join(``)}
          </div>
        </div>

        <!-- 3. Clock & Telemetry Format -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div>
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Time & Clock Format</h3>
            <p class="text-[11px] text-slate-400">Configure taskbar and lockscreen digital clocks.</p>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="clock-format" value="12h" ${n.clockFormat===`12h`?`checked`:``} class="text-cyan-400" />
                <span>12-Hour (AM/PM)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="clock-format" value="24h" ${n.clockFormat===`24h`?`checked`:``} class="text-cyan-400" />
                <span>24-Hour (Military)</span>
              </label>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="clock-show-sec" ${n.showSeconds?`checked`:``} class="rounded text-cyan-400" />
              <span>Show Seconds</span>
            </label>
          </div>
        </div>

        <!-- 4. Sound & Audio Effects -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Web Audio Synthesizer</h3>
              <p class="text-[11px] text-slate-400">Procedural audio feedback for window launches, clicks and alarms.</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="sound-toggle-chk" ${n.soundEnabled?`checked`:``} class="rounded text-cyan-400" />
              <span class="text-xs font-medium">${n.soundEnabled?`Enabled`:`Muted`}</span>
            </label>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400">Volume:</span>
            <input type="range" id="sound-vol-range" min="0" max="100" value="${n.soundVolume}"
              class="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-white/10 rounded-lg" />
            <span class="font-mono text-xs text-cyan-300 w-8 text-right">${n.soundVolume}%</span>
            <button id="sound-test-btn" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-xs text-slate-300 transition-colors">Test Sound</button>
          </div>
        </div>

        <!-- 5. Performance & Desktop Widgets -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3 text-xs">
          <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Performance & UI Features</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label class="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 cursor-pointer">
              <span>Desktop Telemetry Widgets</span>
              <input type="checkbox" id="widgets-toggle" ${n.showDesktopWidgets?`checked`:``} class="rounded text-cyan-400" />
            </label>
            <label class="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5 cursor-pointer">
              <span>Glassmorphism Blur Filter</span>
              <input type="checkbox" id="blur-toggle" ${n.glassBlur?`checked`:``} class="rounded text-cyan-400" />
            </label>
          </div>
        </div>

        <!-- 6. Reset Storage -->
        <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between gap-3">
          <div>
            <h4 class="text-xs font-bold text-rose-300">Reset Operating System Storage</h4>
            <p class="text-[11px] text-rose-200/70">Wipe all notes, calendar events, and custom files back to defaults.</p>
          </div>
          <button id="settings-reset-all" class="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-semibold shrink-0 transition-colors">
            Reset Data
          </button>
        </div>
      </div>
    `,i()},i=()=>{e.querySelectorAll(`.theme-choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-theme`);t&&(n.theme=t,a.saveSettings(n),document.documentElement.setAttribute(`data-theme`,t),u.show({title:`Settings`,message:`Theme switched to ${t.toUpperCase()}`,type:`info`}),r())})}),e.querySelectorAll(`.wall-choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-wall`);t&&(n.wallpaper=t,a.saveSettings(n),u.show({title:`Settings`,message:`Wallpaper set to ${t}`,type:`info`}),r(),window.dispatchEvent(new CustomEvent(`wallpaper-changed`,{detail:t})))})}),e.querySelectorAll(`input[name="clock-format"]`).forEach(e=>{e.addEventListener(`change`,e=>{n.clockFormat=e.target.value,a.saveSettings(n)})}),e.querySelector(`#clock-show-sec`)?.addEventListener(`change`,e=>{n.showSeconds=e.target.checked,a.saveSettings(n)}),e.querySelector(`#sound-toggle-chk`)?.addEventListener(`change`,e=>{let t=e.target.checked;n.soundEnabled=t,o.setEnabled(t),a.saveSettings(n),r()}),e.querySelector(`#sound-vol-range`)?.addEventListener(`input`,t=>{let r=parseInt(t.target.value,10);n.soundVolume=r,o.setVolume(r),a.saveSettings(n);let i=e.querySelector(`#sound-vol-range`)?.nextElementSibling;i&&(i.textContent=`${r}%`)}),e.querySelector(`#sound-test-btn`)?.addEventListener(`click`,()=>{o.playOpen()}),e.querySelector(`#widgets-toggle`)?.addEventListener(`change`,e=>{let t=e.target.checked;n.showDesktopWidgets=t,a.saveSettings(n);let r=document.getElementById(`desktop-widgets`);r&&(r.style.display=t?`flex`:`none`)}),e.querySelector(`#blur-toggle`)?.addEventListener(`change`,e=>{let t=e.target.checked;n.glassBlur=t,a.saveSettings(n)}),e.querySelector(`#settings-reset-all`)?.addEventListener(`click`,()=>{u.confirmModal({title:`Factory Reset Nova WebOS`,message:`Are you sure you want to reset all stored notes, files, events, and preferences? This action cannot be undone.`,confirmText:`Clear All Data`,isDestructive:!0,onConfirm:()=>{o.playClose(),a.resetAllData(),u.show({title:`System Reset`,message:`All data cleared. Reloading session...`,type:`warning`}),setTimeout(()=>{window.location.reload()},800)}})})};r()}function T(e,t){let n=[{id:`t1`,title:`Cyber Horizon 2077`,artist:`Nova Sound Core`,duration:184,bpm:110,scale:[220,261.63,293.66,329.63,392,440,523.25]},{id:`t2`,title:`Quantum Drift`,artist:`Aether Syndicate`,duration:215,bpm:125,scale:[164.81,196,220,246.94,293.66,329.63,392]},{id:`t3`,title:`Midnight Matrix`,artist:`Neural Grid`,duration:198,bpm:95,scale:[130.81,155.56,174.61,196,233.08,261.63,311.13]}],r=0,i=!1,a=0,c=null,l=null,u=null;e.className=`w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 select-none overflow-hidden`;let d=()=>n[r],f=()=>{let t=d(),o=Math.floor(a/60),c=Math.floor(a%60),l=Math.floor(t.duration/60),u=Math.floor(t.duration%60),f=a/t.duration*100;e.innerHTML=`
      <div class="flex flex-col h-full justify-between max-w-md mx-auto w-full">
        <!-- Top Track Artwork & Visualizer -->
        <div class="flex-1 flex flex-col items-center justify-center gap-3">
          <!-- Album visual card -->
          <div class="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-tr from-cyan-900/40 via-purple-900/40 to-slate-900 border border-white/15 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <!-- Pulsing neon core -->
            <div class="w-20 h-20 rounded-full border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center ${i?`animate-pulse`:``}">
              <div class="text-cyan-400">
                ${s(`music`,`w-10 h-10`)}
              </div>
            </div>
            <!-- Dynamic neon halo -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none"></div>
          </div>

          <!-- Title & Artist -->
          <div class="text-center mt-2">
            <h3 class="text-sm font-bold text-slate-100 tracking-wide">${t.title}</h3>
            <p class="text-xs text-cyan-400 font-mono mt-0.5">${t.artist}</p>
          </div>

          <!-- Realtime Canvas Visualizer -->
          <canvas id="music-vis-canvas" width="280" height="40" class="w-full max-w-xs h-10 rounded bg-black/40 border border-white/5"></canvas>
        </div>

        <!-- Controls section -->
        <div class="flex flex-col gap-3 pt-2">
          <!-- Progress scrubber -->
          <div class="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>${o}:${c.toString().padStart(2,`0`)}</span>
            <div id="scrub-container" class="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
              <div class="bg-cyan-400 h-full rounded-full transition-all duration-300" style="width: ${f}%"></div>
            </div>
            <span>${l}:${u.toString().padStart(2,`0`)}</span>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-center gap-4">
            <button id="track-prev" class="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
              ${s(`chevron-left`,`w-5 h-5`)}
            </button>
            <button id="track-toggle" class="p-4 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-transform active:scale-95 shadow-xl shadow-cyan-500/30">
              ${s(i?`pause`:`play`,`w-6 h-6`)}
            </button>
            <button id="track-next" class="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
              ${s(`chevron-right`,`w-5 h-5`)}
            </button>
          </div>

          <!-- Playlist list -->
          <div class="max-h-24 overflow-y-auto rounded-lg bg-black/30 border border-white/10 p-1 flex flex-col gap-1 text-xs">
            ${n.map((e,t)=>`
              <div data-idx="${t}" class="track-row p-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${t===r?`bg-cyan-500/20 text-cyan-300 font-semibold`:`hover:bg-white/5 text-slate-300`}">
                <span class="truncate">${t+1}. ${e.title}</span>
                <span class="text-[10px] font-mono text-slate-500">${Math.floor(e.duration/60)}:${(e.duration%60).toString().padStart(2,`0`)}</span>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    `,g(),h()},p=()=>{i=!0;let e=d(),t=0;c=window.setInterval(()=>{if(!i)return;let n=e.scale[t%e.scale.length];t++;let r=o.createSynthVoice(n,`triangle`);if(r){let e=r.osc.context.currentTime;r.osc.start(e),r.osc.stop(e+.25)}},60/e.bpm*1e3),l=window.setInterval(()=>{a++,a>=e.duration&&(r=(r+1)%n.length,a=0),f()},1e3),f()},m=()=>{i=!1,c&&clearInterval(c),l&&clearInterval(l),f()},h=()=>{let t=e.querySelector(`#music-vis-canvas`);if(!t)return;let n=t.getContext(`2d`);if(!n)return;n.clearRect(0,0,t.width,t.height);let r=t.width/24;for(let e=0;e<24;e++){let a=4;i&&(a=Math.max(4,Math.random()*(t.height-6)));let o=e*r,s=t.height-a;n.fillStyle=i?`#00f0ff`:`#475569`,n.fillRect(o+1,s,r-2,a)}i&&(u=requestAnimationFrame(h))},g=()=>{e.querySelector(`#track-toggle`)?.addEventListener(`click`,()=>{o.playClick(),i?m():p()}),e.querySelector(`#track-prev`)?.addEventListener(`click`,()=>{o.playClick(),r=(r-1+n.length)%n.length,a=0,i?(m(),p()):f()}),e.querySelector(`#track-next`)?.addEventListener(`click`,()=>{o.playClick(),r=(r+1)%n.length,a=0,i?(m(),p()):f()}),e.querySelectorAll(`.track-row`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick(),r=parseInt(e.getAttribute(`data-idx`)||`0`,10),a=0,i?(m(),p()):f()})}),e.querySelector(`#scrub-container`)?.addEventListener(`click`,e=>{let t=e.currentTarget.getBoundingClientRect(),n=e.clientX-t.left,r=Math.max(0,Math.min(1,n/t.width));a=Math.floor(r*d().duration),f()})};t.onClose=()=>{m(),u&&cancelAnimationFrame(u)},f()}function E(e,t){let n=`https://nova.search/home`,r=[`https://nova.search/home`],i=0,a=``;e.className=`w-full h-full flex flex-col bg-slate-950 text-slate-100 select-none overflow-hidden`;let c=[{title:`Nova WebOS — Next-Generation Browser Operating System`,url:`https://webos.nova/overview`,snippet:`A revolutionary desktop environment executed directly in browser runtimes. Featuring zero-dependency vanilla JS window compositor, persistent VFS and Nova AI.`,content:`
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
      `},{title:`Vanilla JavaScript Best Practices in 2026`,url:`https://dev.portal/vanilla-js`,snippet:`Why developers are embracing frameworkless architectures for lightweight web apps, micro-frontends, and high-performance operating systems.`,content:`
        <h1 class="text-xl font-bold text-emerald-400 mb-2">The Power of Vanilla JavaScript</h1>
        <p class="text-sm text-slate-300 leading-relaxed mb-3">Modern browsers provide standard APIs for layout, animation, audio, and state that rival traditional framework abstractions without bundle overhead.</p>
        <p class="text-xs text-slate-400">By utilizing PointerEvents, custom CSS properties, and Web Audio, web applications can achieve 60fps performance on any modern hardware.</p>
      `},{title:`Web Audio API: Procedural Audio Generation`,url:`https://audio.labs/synth-guide`,snippet:`Complete technical reference for synthesizing oscillators, biquad filters, and ambient background music without external audio files.`,content:`
        <h1 class="text-xl font-bold text-purple-400 mb-2">Procedural Audio in Modern Browsers</h1>
        <p class="text-sm text-slate-300 leading-relaxed mb-3">Learn how Nova WebOS uses AudioContext and OscillatorNode to dynamically generate tactile UI clicks, window chimes, and full musical scales in real time.</p>
      `},{title:`Artificial Intelligence in Operating Systems`,url:`https://ai.futures/os-assistants`,snippet:`Integrating conversational intent models directly into desktop workflow orchestration. How natural language commands replace manual navigation.`,content:`
        <h1 class="text-xl font-bold text-amber-400 mb-2">AI-Driven OS Navigation</h1>
        <p class="text-sm text-slate-300 leading-relaxed">Modern operating systems now feature integrated assistants like Nova AI, capable of launching tools, altering system themes, and managing timers through intent recognition.</p>
      `}],l=()=>{e.innerHTML=`
      <!-- Top Navigation Bar -->
      <div class="p-2 border-b border-white/10 bg-slate-900/70 flex flex-col gap-1.5 shrink-0">
        <!-- Controls & URL Bar -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <button id="br-back" class="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors ${i<=0?`opacity-30 pointer-events-none`:``}">
              ${s(`chevron-left`,`w-4 h-4`)}
            </button>
            <button id="br-fwd" class="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors ${i>=r.length-1?`opacity-30 pointer-events-none`:``}">
              ${s(`chevron-right`,`w-4 h-4`)}
            </button>
            <button id="br-reload" class="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              ${s(`refresh`,`w-4 h-4`)}
            </button>
          </div>

          <!-- Address Input -->
          <div class="flex-1 relative flex items-center">
            <span class="absolute left-2.5 text-slate-500">
              ${s(`browser`,`w-3.5 h-3.5`)}
            </span>
            <input type="text" id="br-url-input" value="${n}" placeholder="Search web or enter address..."
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
        ${u()}
      </div>
    `,f()},u=()=>{if(n.includes(`nova.search/home`)||a){let e=a?c.filter(e=>e.title.toLowerCase().includes(a.toLowerCase())||e.snippet.toLowerCase().includes(a.toLowerCase())):c;return`
        <div class="max-w-2xl mx-auto w-full flex flex-col gap-6">
          <div class="text-center py-4">
            <div class="inline-flex items-center gap-2 text-cyan-400 mb-2">
              ${s(`nova-logo`,`w-8 h-8`)}
              <span class="text-xl font-bold font-display tracking-wider text-slate-100">NOVA SEARCH</span>
            </div>
            <p class="text-xs text-slate-400">Next-generation indexed knowledge network</p>
          </div>

          <div class="flex flex-col gap-4">
            <h4 class="text-xs font-mono text-slate-500 uppercase tracking-wider">
              ${a?`Search Results for "${a}" (${e.length})`:`Featured Topics & Knowledge Articles`}
            </h4>

            ${e.length===0?`<div class="text-center py-8 text-slate-500 text-xs">No indexed pages match your search.</div>`:e.map(e=>`
                <div data-url="${e.url}" class="br-result-card p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 cursor-pointer transition-all">
                  <span class="text-[10px] text-cyan-400 font-mono">${e.url}</span>
                  <h3 class="text-sm font-semibold text-slate-100 hover:underline mt-0.5">${e.title}</h3>
                  <p class="text-xs text-slate-400 mt-1 leading-relaxed">${e.snippet}</p>
                </div>
              `).join(``)}
          </div>
        </div>
      `}let e=c.find(e=>e.url===n);return e?`
        <div class="max-w-2xl mx-auto w-full bg-slate-900/60 p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div class="mb-4 pb-2 border-b border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>${e.url}</span>
            <button id="br-back-to-search" class="text-cyan-400 hover:underline">← Back to Search</button>
          </div>
          ${e.content}
        </div>
      `:`
      <div class="max-w-xl mx-auto w-full text-center py-12">
        <div class="text-slate-600 mb-3 mx-auto flex justify-center">${s(`browser`,`w-12 h-12`)}</div>
        <h3 class="text-base font-bold text-slate-200">Browsing: ${n}</h3>
        <p class="text-xs text-slate-400 mt-2">Simulated sandbox view. This browser safely renders internal WebOS knowledge pages and simulated documents.</p>
        <button id="br-back-home" class="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition-colors">
          Return to Nova Search
        </button>
      </div>
    `},d=e=>{o.playClick(),n=e,r.splice(i+1),r.push(n),i=r.length-1,a=``,l()},f=()=>{let t=e.querySelector(`#br-url-input`),s=e.querySelector(`#br-go-btn`),c=()=>{let e=t.value.trim();e&&(e.startsWith(`http://`)||e.startsWith(`https://`)?d(e):(a=e,n=`https://nova.search/results?q=${encodeURIComponent(e)}`,r.splice(i+1),r.push(n),i=r.length-1,l()))};t&&t.addEventListener(`keydown`,e=>{e.key===`Enter`&&c()}),s&&s.addEventListener(`click`,c),e.querySelector(`#br-back`)?.addEventListener(`click`,()=>{i>0&&(o.playClick(),i--,n=r[i],a=``,l())}),e.querySelector(`#br-fwd`)?.addEventListener(`click`,()=>{i<r.length-1&&(o.playClick(),i++,n=r[i],a=``,l())}),e.querySelector(`#br-reload`)?.addEventListener(`click`,()=>{o.playClick(),l()}),e.querySelectorAll(`.b-mark`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-burl`);t&&d(t)})}),e.querySelectorAll(`.br-result-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-url`);t&&d(t)})}),e.querySelector(`#br-back-to-search`)?.addEventListener(`click`,()=>{d(`https://nova.search/home`)}),e.querySelector(`#br-back-home`)?.addEventListener(`click`,()=>{d(`https://nova.search/home`)})};l()}function D(e,t){let n=[{id:`msg-init`,sender:`assistant`,text:`Hello, Operative. I am **Nova AI**, your integrated operating system intelligence.

You can issue natural language commands to control apps, manage settings, evaluate math, or inspect system state.`,timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),suggestedPrompts:[`Open calculator`,`Show system dashboard`,`Set a timer for 5 minutes`,`What time is it?`,`Open notes`]}],r=!1;e.className=`w-full h-full flex flex-col bg-slate-950/90 text-slate-100 select-none overflow-hidden font-sans`;let i=()=>{e.innerHTML=`
      <!-- Header with status pulse -->
      <div class="px-4 py-2.5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="relative w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            ${s(`assistant`,`w-4 h-4`)}
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
          ${s(`trash`,`w-3.5 h-3.5`)}
        </button>
      </div>

      <!-- Messages History -->
      <div id="ai-messages-container" class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        ${n.map(e=>`
          <div class="flex flex-col ${e.sender===`user`?`items-end`:`items-start`} max-w-full">
            <div class="flex items-center gap-2 mb-1 px-1">
              <span class="text-[10px] font-mono ${e.sender===`user`?`text-slate-400`:`text-cyan-400`} font-semibold">
                ${e.sender===`user`?`Operative`:`Nova AI`}
              </span>
              <span class="text-[9px] text-slate-500 font-mono">${e.timestamp}</span>
            </div>

            <div class="p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${e.sender===`user`?`bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-cyan-500/20`:`bg-white/10 text-slate-200 border border-white/10 rounded-tl-none`}">
              <div class="whitespace-pre-wrap">${a(e.text)}</div>
              ${e.actionTaken?`<div class="mt-2 pt-1.5 border-t border-white/10 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <span>✓</span>
                      <span>OS Action Executed: [${e.actionTaken}]</span>
                    </div>`:``}
            </div>

            <!-- Suggested Prompt Pills -->
            ${e.suggestedPrompts&&e.suggestedPrompts.length>0?`
              <div class="flex flex-wrap gap-1.5 mt-2.5 max-w-sm">
                ${e.suggestedPrompts.map(e=>`
                  <button data-prompt="${e}" class="ai-prompt-pill px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-medium transition-colors">
                    ${e}
                  </button>
                `).join(``)}
              </div>
            `:``}
          </div>
        `).join(``)}

        ${r?`
          <div class="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 w-32">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
            <span class="text-[10px] text-slate-400 font-mono ml-1">Analyzing...</span>
          </div>
        `:``}
      </div>

      <!-- Input Bar -->
      <div class="p-3 border-t border-white/10 bg-slate-900/50 flex items-center gap-2 shrink-0">
        <input type="text" id="ai-input" placeholder="Type a command or ask a question (e.g. 'Open calculator')..."
          class="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400" />
        <button id="ai-send-btn" class="px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-1.5">
          <span>Send</span>
          ${s(`sparkles`,`w-3.5 h-3.5`)}
        </button>
      </div>
    `,u(),c()},a=e=>e.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`).replace(/`([^`]+)`/g,`<code class="bg-black/40 px-1 py-0.5 rounded text-cyan-300 font-mono text-[11px]">$1</code>`),c=()=>{let t=e.querySelector(`#ai-messages-container`);t&&(t.scrollTop=t.scrollHeight)},l=async e=>{if(!e.trim()||r)return;o.playClick();let t={id:`msg-`+Date.now(),sender:`user`,text:e.trim(),timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})};n.push(t),r=!0,i();let a=await p.processQuery(e.trim());setTimeout(()=>{r=!1;let e={id:`msg-`+Date.now(),sender:`assistant`,text:a.text,timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),actionTaken:a.actionTaken,suggestedPrompts:a.suggestedPrompts};n.push(e),o.playNotification(),i()},450)},u=()=>{let t=e.querySelector(`#ai-input`),r=e.querySelector(`#ai-send-btn`),a=()=>{if(t&&t.value){let e=t.value;t.value=``,l(e)}};t&&(t.addEventListener(`keydown`,e=>{e.key===`Enter`&&a()}),setTimeout(()=>t.focus(),100)),r&&r.addEventListener(`click`,a),e.querySelectorAll(`.ai-prompt-pill`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-prompt`);t&&l(t)})}),e.querySelector(`#ai-clear-btn`)?.addEventListener(`click`,()=>{o.playClick(),n=[n[0]],i()})};i()}function O(e,t){let n=[],r=-1,i=[{text:`Nova Core Operating System Terminal — Shell v3.1`,type:`system`},{text:`Type "help" to view available commands or "neofetch" for system spec.`,type:`system`},{text:``,type:`output`}],s=!1,c=null;e.className=`w-full h-full flex flex-col bg-black/95 text-cyan-400 font-mono text-xs p-3 overflow-hidden select-text`;let u=()=>{e.innerHTML=`
      <!-- Lines Output Container -->
      <div id="term-lines" class="flex-1 overflow-y-auto space-y-1 pr-1">
        ${i.map(e=>{let t=`text-cyan-300`;return e.type===`input`?t=`text-slate-100 font-bold`:e.type===`error`?t=`text-rose-400`:e.type===`success`?t=`text-emerald-400`:e.type===`system`&&(t=`text-purple-400`),`<div class="${t} leading-relaxed whitespace-pre-wrap break-all">${d(e.text)}</div>`}).join(``)}

        ${s?`<div class="text-emerald-500 font-bold animate-pulse text-xs">=== MATRIX RAIN STREAM ACTIVE (type any key to stop) ===</div>`:``}
      </div>

      <!-- Command Prompt Input -->
      <div class="flex items-center gap-2 pt-2 border-t border-cyan-950 shrink-0">
        <span class="text-emerald-400 font-bold select-none">operative@nova:~$</span>
        <input type="text" id="term-input" autocomplete="off" spellcheck="false"
          class="flex-1 bg-transparent text-slate-100 focus:outline-none caret-cyan-400 border-none p-0 text-xs font-mono" />
      </div>
    `,g(),f()},d=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),f=()=>{let t=e.querySelector(`#term-lines`);t&&(t.scrollTop=t.scrollHeight)},p=e=>{let t=e.trim();if(!t)return;n.push(t),r=n.length,i.push({text:`operative@nova:~$ ${t}`,type:`input`});let s=t.split(/\s+/),c=s[0].toLowerCase(),d=s.slice(1);switch(c){case`help`:i.push({text:`Available Terminal Commands:
  help              Display this command list
  open <app>        Launch an app (ai, notes, calc, dash, calendar, alarm, files, music, browser, settings, devlogs)
  ls [path]         List directory contents
  cat <filename>    Display file contents
  mkdir <name>      Create directory
  touch <filename>  Create blank text file
  clear             Clear terminal screen
  neofetch          Display system architecture banner
  matrix            Toggle digital rain simulation
  date              Show current system date & time
  uptime            Show OS running time
  theme <name>      Switch theme (cyberpunk, obsidian, aurora, emerald, solar)
  echo <text>       Echo input text`,type:`output`});break;case`clear`:i=[];break;case`open`:if(!d[0])i.push({text:`Error: Please specify an application name. e.g. "open calc"`,type:`error`});else{let e=d[0].toLowerCase(),t={notes:`notes`,calc:`calculator`,calculator:`calculator`,dash:`dashboard`,dashboard:`dashboard`,calendar:`calendar`,alarm:`alarm`,timer:`alarm`,files:`files`,music:`music`,browser:`browser`,settings:`settings`,ai:`assistant`,assistant:`assistant`,devlogs:`devlogs`}[e]||e;try{let n=l.openWindow(t);n?i.push({text:`Process spawned: [${n.title}] with PID ${n.id}`,type:`success`}):i.push({text:`Failed to spawn: unknown application "${e}"`,type:`error`})}catch{i.push({text:`Failed to spawn: unknown application "${e}"`,type:`error`})}}break;case`ls`:let e=d[0]||`/`,t=S.getItemsInPath(e);if(t.length===0)i.push({text:`(Directory ${e} is empty)`,type:`output`});else{let e=t.map(e=>e.type===`folder`?`[DIR]  ${e.name}/`:`[FILE] ${e.name}  (${e.size||`0 KB`})`).join(`
`);i.push({text:e,type:`output`})}break;case`cat`:if(!d[0])i.push({text:`Usage: cat <filename>`,type:`error`});else{let e=S.getAllFiles().find(e=>e.name.toLowerCase()===d[0].toLowerCase());e?i.push({text:e.content||`(empty file)`,type:`output`}):i.push({text:`File not found: ${d[0]}`,type:`error`})}break;case`mkdir`:d[0]?(S.createFolder(d[0],`/`),i.push({text:`Created directory /${d[0]}`,type:`success`})):i.push({text:`Usage: mkdir <folder_name>`,type:`error`});break;case`touch`:d[0]?(S.createFile(d[0],`/`,`Created on ${new Date().toISOString()}`),i.push({text:`Created file ${d[0]}`,type:`success`})):i.push({text:`Usage: touch <filename>`,type:`error`});break;case`date`:i.push({text:new Date().toString(),type:`output`});break;case`uptime`:i.push({text:`Nova OS kernel active. Session initialized.`,type:`output`});break;case`theme`:if(!d[0])i.push({text:`Usage: theme <cyberpunk | obsidian | aurora | emerald | solar>`,type:`error`});else{let e=d[0].toLowerCase();if([`cyberpunk`,`obsidian`,`aurora`,`emerald`,`solar`].includes(e)){let t=a.getSettings();t.theme=e,a.saveSettings(t),document.documentElement.setAttribute(`data-theme`,e),i.push({text:`Theme switched to: ${e.toUpperCase()}`,type:`success`})}else i.push({text:`Invalid theme. Choose from: cyberpunk, obsidian, aurora, emerald, solar`,type:`error`})}break;case`echo`:i.push({text:d.join(` `),type:`output`});break;case`neofetch`:i.push({text:`
  _  _ _____   _____    ___  ___ 
 | \\| | _ \\ \\ / /   \\  / _ \\/ __|
 | .\` |  _/\\ V /| |) || (_) \\__ \\
 |_|\\_|_|   \\_/ |___/  \\___/|___/
 ---------------------------------
 OS:        Nova WebOS v4.2 [Cybernetic Edition]
 Host:      ${navigator.userAgent.split(` `)[0]}
 Kernel:    Browser WebPlatform Core (Vanilla TS)
 Shell:     Nova SH v3.1 (interactive)
 Theme:     ${a.getSettings().theme.toUpperCase()}
 Memory:    Virtual JS Heap (Managed)
 Windows:   ${l.getOpenWindows().length} active processes
 Audio:     Web Audio Synthesizer Engine
          `,type:`system`});break;case`matrix`:m();break;default:i.push({text:`Command not found: "${c}". Type "help" for a list of commands.`,type:`error`})}o.playClick(),u()},m=()=>{s=!0,c=window.setInterval(()=>{let e=``;for(let t=0;t<48;t++)e+=`01010101ABCDEFXYZ$%#@!&<>~*`[Math.floor(Math.random()*27)];i.push({text:e,type:`success`}),i.length>50&&i.shift(),u()},150)},h=()=>{s&&(s=!1,c&&clearInterval(c),i.push({text:`Matrix rain terminated.`,type:`system`}),u())},g=()=>{let t=e.querySelector(`#term-input`);t&&(t.focus(),t.addEventListener(`keydown`,e=>{if(s){h();return}e.key===`Enter`?p(t.value):e.key===`ArrowUp`?(e.preventDefault(),r>0&&(r--,t.value=n[r])):e.key===`ArrowDown`&&(e.preventDefault(),r<n.length-1?(r++,t.value=n[r]):(r=n.length,t.value=``))})),e.addEventListener(`click`,()=>{let t=e.querySelector(`#term-input`);t&&t.focus()})};t.onClose=()=>{c&&clearInterval(c)},u()}function k(e,t){let n=[{id:`devlog-1`,number:`#01`,tag:`Genesis & Core Architecture`,title:`Devlog #01 — The Beginning`,subtitle:`From Blank Canvas to a Living Browser Desktop`,date:`Cycle 01 // Architecture Sprint`,readTime:`4 min read`,badge:`ARCHITECTURAL FOUNDATION`,badgeColor:`cyan`,summary:`Conceiving a full desktop operating system inside the browser without heavyweight UI frameworks. Why raw DOM manipulation, modern CSS variables, and PointerEvents outperform virtual DOM abstractions for window compositing.`,sections:[{heading:`1. Vision & Technical Philosophy`,body:`Most web-based desktop simulations feel sluggish because they wrap every window coordinate update in heavy framework reconciliation cycles. For Nova WebOS, we committed to pure, unadulterated TypeScript and Vanilla DOM operations. By directly controlling element transforms and style properties during pointer dragging and corner resizing, we achieve buttery smooth 60 FPS motion on any device.`,highlights:[`Zero virtual-DOM overhead during continuous mouse/touch dragging`,`Full viewport boundary clamping with mathematical precision`,`State preservation across window minimize, maximize, and restore`]},{heading:`2. The Window Compositor & Layering Stack`,body:`The initial challenge was establishing an unbreakable z-index layering pipeline. We designed a central Window Manager that maintains a monotonic z-index counter, automatically promoting active windows on pointerdown, recalculating bounds, and maintaining taskbar process states.`,highlights:[`Dynamic z-index elevation and active window styling`,`Sub-pixel coordinate snapping to prevent font blurring`,`Responsive mobile fallback: full-screen touch ergonomics`]},{heading:`3. Aesthetic Philosophy: Beyond Generic UI`,body:`Rather than copying a standard Windows 95 or macOS template, Nova WebOS adopts a high-contrast cybernetic aesthetic: balanced neon accents, dark glassmorphism surfaces, subtle borders, and monospace telemetry. The experience transitions cleanly from a firmware POST bootloader, to a welcome gateway, to an unrestricted desktop.`}]},{id:`devlog-2`,number:`#02`,tag:`Subsystems & Storage`,title:`Devlog #02 — Building the OS`,subtitle:`Constructing the VFS, Procedural Audio & Core Apps`,date:`Cycle 02 // Engineering Sprint`,readTime:`6 min read`,badge:`SUBSYSTEMS & STORAGE`,badgeColor:`purple`,summary:`Engineering the internal plumbing: an in-memory & localStorage Virtual File System (VFS), procedural Web Audio synthesizers, and complete productivity utilities (Notes, Calculator, Calendar, Alarm, and System Dashboard).`,sections:[{heading:`1. In-Browser Virtual File System (VFS)`,body:`A desktop OS requires real file exploration. We built a hierarchical VFS that stores folders, files, sizes, and timestamps directly in browser localStorage. Users can create directories, write text documents, inspect metadata in real-time, and download simulated files to their actual physical machine.`,highlights:[`Hierarchical directory traversal with back/forward history stacks`,`Instant document editor with live text saving`,`Local file export via browser Blob generation`]},{heading:`2. Procedural Web Audio Synthesizer`,body:`External MP3 assets are prone to network latency and 404s. Nova WebOS features a procedural sound engine using the HTML5 Web Audio API. Using native oscillators and gain envelopes, we craft custom audio frequencies for window launches, clicks, timer alarms, and ambient electronic synthesizer tracks.`,highlights:[`Zero external audio asset dependencies`,`Real-time frequency modulation and harmonic gain shaping`,`Live canvas audio spectrum visualizer in the Music Player`]},{heading:`3. Full App Ecosystem`,body:`We crafted 10 modular applications that run simultaneously inside the compositor: a full-featured Notes app with search and categories, scientific Calculator with keyboard input, System Dashboard with real-time animated CPU charts, and an Alarm/Timer with background timers.`}]},{id:`devlog-3`,number:`#03`,tag:`Next-Gen Orchestration`,title:`Devlog #03 — Final Evolution`,subtitle:`Nova AI Assistant, Multi-Theming & Interactive Shell`,date:`Cycle 03 // Production Sprint`,readTime:`5 min read`,badge:`AI & FINAL POLISH`,badgeColor:`emerald`,summary:`Elevating the OS with our original signature innovation: Nova AI natural language assistant, interactive command terminal CLI, customizable themes, and unified desktop telemetry widgets.`,sections:[{heading:`1. Original Innovation: Nova AI Assistant`,body:`Operating systems are evolving from static menus to conversational control. Nova AI interprets natural language intents and directly executes OS-level operations: launching applications, setting timers, switching color themes, calculating math, or checking system status.`,highlights:[`Intent extraction engine with fallback intelligent reasoning`,`Direct programmatic coupling to WindowManager and storage services`,`Suggested prompt pills and conversational memory`]},{heading:`2. Nova SH: Interactive Terminal CLI`,body:"For power users, we introduced a bash-style command shell with tab simulation, command history (up/down arrow keys), file inspection (`ls`, `cat`), application spawning (`open calc`), system spec banners (`neofetch`), and digital rain simulations (`matrix`)."},{heading:`3. Complete Customization & Persistence`,body:`Users have complete sovereignty over their environment: 5 themes (Cyberpunk Neon, Obsidian Onyx, Nebula Aurora, Emerald Matrix, Solar Flare), customizable particle canvas wallpapers, clock options, and telemetry widgets—all automatically synchronized to localStorage.`}]}],r=`devlog-1`;e.className=`w-full h-full flex flex-col md:flex-row bg-slate-950/85 text-slate-100 select-none overflow-hidden font-sans`;let i=()=>{let t=n.find(e=>e.id===r)||n[0];e.innerHTML=`
      <!-- Sidebar / List of Logs -->
      <div class="w-full md:w-72 bg-slate-900/60 border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0 h-44 md:h-full">
        <div class="p-3 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-cyan-400">${s(`devlogs`,`w-5 h-5`)}</span>
            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-200">Dev Logs Journal</h3>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">3 / 3</span>
        </div>

        <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
          ${n.map(e=>`
            <div data-id="${e.id}" class="devlog-nav-item p-3 rounded-xl cursor-pointer border transition-all ${e.id===r?`bg-cyan-500/15 border-cyan-400/50 text-white shadow-lg shadow-cyan-500/15`:`bg-white/5 border-transparent hover:bg-white/10 text-slate-300`}">
              <div class="flex items-center justify-between gap-1 mb-1">
                <span class="text-[10px] font-mono font-bold text-cyan-400">${e.number}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono">${e.readTime}</span>
              </div>
              <h4 class="text-xs font-semibold truncate text-slate-100">${e.title}</h4>
              <p class="text-[11px] text-slate-400 truncate mt-0.5">${e.subtitle}</p>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- Main Reader Area -->
      <div class="flex-1 overflow-y-auto p-5 sm:p-7 flex flex-col bg-slate-950/40">
        <div class="max-w-2xl mx-auto w-full flex flex-col gap-5">
          <!-- Header info -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border ${t.badgeColor===`cyan`?`bg-cyan-500/15 border-cyan-400/40 text-cyan-300`:t.badgeColor===`purple`?`bg-purple-500/15 border-purple-400/40 text-purple-300`:`bg-emerald-500/15 border-emerald-400/40 text-emerald-300`}">
                ${t.badge}
              </span>
              <span class="text-xs text-slate-500 font-mono">•</span>
              <span class="text-xs text-slate-400 font-mono">${t.date}</span>
            </div>

            <h1 class="text-xl sm:text-2xl font-bold font-display text-slate-100 tracking-wide">${t.title}</h1>
            <p class="text-sm text-cyan-400 font-medium mt-1">${t.subtitle}</p>
          </div>

          <!-- Executive Summary Callout -->
          <div class="p-4 rounded-xl bg-white/5 border-l-4 border-cyan-400 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-gradient-to-r from-cyan-950/20 to-transparent">
            "${t.summary}"
          </div>

          <!-- Sections -->
          <div class="flex flex-col gap-6 pt-2">
            ${t.sections.map(e=>`
              <div class="flex flex-col gap-2">
                <h3 class="text-sm font-bold text-slate-200 tracking-wide font-display">${e.heading}</h3>
                <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${e.body}</p>

                ${e.highlights&&e.highlights.length>0?`
                  <div class="mt-2 p-3 rounded-lg bg-black/30 border border-white/5 flex flex-col gap-1.5">
                    <span class="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-bold">Key Engineering Takeaways:</span>
                    <ul class="text-xs text-slate-400 list-disc pl-4 space-y-1">
                      ${e.highlights.map(e=>`<li>${e}</li>`).join(``)}
                    </ul>
                  </div>
                `:``}
              </div>
            `).join(``)}
          </div>

          <!-- Footer Stamp -->
          <div class="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Project: NOVA-WEBOS</span>
            <span>Status: PRODUCTION READY</span>
          </div>
        </div>
      </div>
    `,a()},a=()=>{e.querySelectorAll(`.devlog-nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.playClick();let t=e.getAttribute(`data-id`);t&&(r=t,i())})})};i()}function A(){c.init();let e=a.getSettings();document.documentElement.setAttribute(`data-theme`,e.theme||`cyberpunk`),o.setEnabled(e.soundEnabled),o.setVolume(e.soundVolume),l.registerApp({id:`devlogs`,title:`Dev Logs Journal`,icon:`devlogs`,defaultWidth:780,defaultHeight:560,render:k}),l.registerApp({id:`assistant`,title:`Nova AI`,icon:`assistant`,defaultWidth:540,defaultHeight:600,render:D}),l.registerApp({id:`dashboard`,title:`System Dashboard`,icon:`dashboard`,defaultWidth:720,defaultHeight:560,render:y}),l.registerApp({id:`notes`,title:`Notes & Docs`,icon:`notes`,defaultWidth:680,defaultHeight:520,render:_}),l.registerApp({id:`calculator`,title:`Calculator`,icon:`calculator`,defaultWidth:340,defaultHeight:480,render:v}),l.registerApp({id:`files`,title:`File Manager`,icon:`files`,defaultWidth:740,defaultHeight:500,render:C}),l.registerApp({id:`calendar`,title:`Calendar & Schedule`,icon:`calendar`,defaultWidth:700,defaultHeight:500,render:b}),l.registerApp({id:`alarm`,title:`Alarm & Timer`,icon:`alarm`,defaultWidth:440,defaultHeight:480,render:x}),l.registerApp({id:`music`,title:`Synth Music Player`,icon:`music`,defaultWidth:420,defaultHeight:560,render:T}),l.registerApp({id:`browser`,title:`Nova Web Browser`,icon:`browser`,defaultWidth:800,defaultHeight:560,render:E}),l.registerApp({id:`terminal`,title:`Terminal CLI`,icon:`terminal`,defaultWidth:640,defaultHeight:440,render:O}),l.registerApp({id:`settings`,title:`System Settings`,icon:`settings`,defaultWidth:620,defaultHeight:560,render:w});let t=document.getElementById(`wallpaper-canvas`);t&&new d(t);let n=document.getElementById(`desktop`);n&&new m(n);let r=document.getElementById(`taskbar`);r&&new h(r);let i=document.getElementById(`boot-overlay`);i&&new g(i,()=>{u.show({title:`Nova WebOS v4.2 Active`,message:`Welcome Operative! Press Alt+Space anytime to invoke Nova AI.`,type:`success`,timeoutMs:6e3}),setTimeout(()=>{l.openWindow(`devlogs`)},300)}).start(),window.addEventListener(`keydown`,e=>{if((e.altKey||e.ctrlKey)&&e.code===`Space`&&(e.preventDefault(),o.playClick(),l.openWindow(`assistant`)),e.altKey&&(e.key===`t`||e.key===`T`)&&(e.preventDefault(),o.playClick(),l.openWindow(`terminal`)),e.altKey&&(e.key===`d`||e.key===`D`)){e.preventDefault(),o.playClick();let t=l.getOpenWindows(),n=t.some(e=>!e.isMinimized);t.forEach(e=>{n?l.minimizeWindow(e.id):l.restoreWindow(e.id)})}})}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,A):A();