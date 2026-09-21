import { WindowState } from '../types';
import { sound } from '../services/sound';
import { getSvgIcon } from '../ui/icons';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  bpm: number;
  scale: number[];
}

export function renderMusicApp(container: HTMLElement, win: WindowState) {
  const tracks: Track[] = [
    {
      id: 't1',
      title: 'Cyber Horizon 2077',
      artist: 'Nova Sound Core',
      duration: 184,
      bpm: 110,
      scale: [220, 261.63, 293.66, 329.63, 392.0, 440, 523.25],
    },
    {
      id: 't2',
      title: 'Quantum Drift',
      artist: 'Aether Syndicate',
      duration: 215,
      bpm: 125,
      scale: [164.81, 196.0, 220.0, 246.94, 293.66, 329.63, 392.0],
    },
    {
      id: 't3',
      title: 'Midnight Matrix',
      artist: 'Neural Grid',
      duration: 198,
      bpm: 95,
      scale: [130.81, 155.56, 174.61, 196.0, 233.08, 261.63, 311.13],
    },
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let progressSec = 0;
  let synthLoopInterval: number | null = null;
  let clockInterval: number | null = null;
  let visualizerAnim: number | null = null;

  container.className = 'w-full h-full flex flex-col bg-slate-950/85 text-slate-100 p-4 select-none overflow-hidden';

  const curTrack = () => tracks[currentTrackIdx];

  const updateUI = () => {
    const track = curTrack();
    const curM = Math.floor(progressSec / 60);
    const curS = Math.floor(progressSec % 60);
    const totM = Math.floor(track.duration / 60);
    const totS = Math.floor(track.duration % 60);
    const pct = (progressSec / track.duration) * 100;

    container.innerHTML = `
      <div class="flex flex-col h-full justify-between max-w-md mx-auto w-full">
        <!-- Top Track Artwork & Visualizer -->
        <div class="flex-1 flex flex-col items-center justify-center gap-3">
          <!-- Album visual card -->
          <div class="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-tr from-cyan-900/40 via-purple-900/40 to-slate-900 border border-white/15 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <!-- Pulsing neon core -->
            <div class="w-20 h-20 rounded-full border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-center ${
              isPlaying ? 'animate-pulse' : ''
            }">
              <div class="text-cyan-400">
                ${getSvgIcon('music', 'w-10 h-10')}
              </div>
            </div>
            <!-- Dynamic neon halo -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none"></div>
          </div>

          <!-- Title & Artist -->
          <div class="text-center mt-2">
            <h3 class="text-sm font-bold text-slate-100 tracking-wide">${track.title}</h3>
            <p class="text-xs text-cyan-400 font-mono mt-0.5">${track.artist}</p>
          </div>

          <!-- Realtime Canvas Visualizer -->
          <canvas id="music-vis-canvas" width="280" height="40" class="w-full max-w-xs h-10 rounded bg-black/40 border border-white/5"></canvas>
        </div>

        <!-- Controls section -->
        <div class="flex flex-col gap-3 pt-2">
          <!-- Progress scrubber -->
          <div class="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>${curM}:${curS.toString().padStart(2, '0')}</span>
            <div id="scrub-container" class="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
              <div class="bg-cyan-400 h-full rounded-full transition-all duration-300" style="width: ${pct}%"></div>
            </div>
            <span>${totM}:${totS.toString().padStart(2, '0')}</span>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-center gap-4">
            <button id="track-prev" class="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
              ${getSvgIcon('chevron-left', 'w-5 h-5')}
            </button>
            <button id="track-toggle" class="p-4 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-transform active:scale-95 shadow-xl shadow-cyan-500/30">
              ${isPlaying ? getSvgIcon('pause', 'w-6 h-6') : getSvgIcon('play', 'w-6 h-6')}
            </button>
            <button id="track-next" class="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
              ${getSvgIcon('chevron-right', 'w-5 h-5')}
            </button>
          </div>

          <!-- Playlist list -->
          <div class="max-h-24 overflow-y-auto rounded-lg bg-black/30 border border-white/10 p-1 flex flex-col gap-1 text-xs">
            ${tracks
              .map(
                (t, idx) => `
              <div data-idx="${idx}" class="track-row p-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                  idx === currentTrackIdx ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'hover:bg-white/5 text-slate-300'
                }">
                <span class="truncate">${idx + 1}. ${t.title}</span>
                <span class="text-[10px] font-mono text-slate-500">${Math.floor(t.duration / 60)}:${(t.duration % 60)
                  .toString()
                  .padStart(2, '0')}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    bindEvents();
    drawVisualizer();
  };

  const startPlayback = () => {
    isPlaying = true;
    const track = curTrack();

    // Sound synthesizer loop
    let step = 0;
    synthLoopInterval = window.setInterval(() => {
      if (!isPlaying) return;
      const freq = track.scale[step % track.scale.length];
      step++;
      const voice = sound.createSynthVoice(freq, 'triangle');
      if (voice) {
        const now = voice.osc.context.currentTime;
        voice.osc.start(now);
        voice.osc.stop(now + 0.25);
      }
    }, (60 / track.bpm) * 1000);

    clockInterval = window.setInterval(() => {
      progressSec++;
      if (progressSec >= track.duration) {
        currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
        progressSec = 0;
      }
      updateUI();
    }, 1000);

    updateUI();
  };

  const stopPlayback = () => {
    isPlaying = false;
    if (synthLoopInterval) clearInterval(synthLoopInterval);
    if (clockInterval) clearInterval(clockInterval);
    updateUI();
  };

  const drawVisualizer = () => {
    const canvas = container.querySelector('#music-vis-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bars = 24;
    const barWidth = canvas.width / bars;

    for (let i = 0; i < bars; i++) {
      let h = 4;
      if (isPlaying) {
        h = Math.max(4, Math.random() * (canvas.height - 6));
      }
      const x = i * barWidth;
      const y = canvas.height - h;

      ctx.fillStyle = isPlaying ? '#00f0ff' : '#475569';
      ctx.fillRect(x + 1, y, barWidth - 2, h);
    }

    if (isPlaying) {
      visualizerAnim = requestAnimationFrame(drawVisualizer);
    }
  };

  const bindEvents = () => {
    container.querySelector('#track-toggle')?.addEventListener('click', () => {
      sound.playClick();
      if (isPlaying) stopPlayback();
      else startPlayback();
    });

    container.querySelector('#track-prev')?.addEventListener('click', () => {
      sound.playClick();
      currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
      progressSec = 0;
      if (isPlaying) {
        stopPlayback();
        startPlayback();
      } else updateUI();
    });

    container.querySelector('#track-next')?.addEventListener('click', () => {
      sound.playClick();
      currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
      progressSec = 0;
      if (isPlaying) {
        stopPlayback();
        startPlayback();
      } else updateUI();
    });

    container.querySelectorAll('.track-row').forEach((row) => {
      row.addEventListener('click', () => {
        sound.playClick();
        const idx = parseInt(row.getAttribute('data-idx') || '0', 10);
        currentTrackIdx = idx;
        progressSec = 0;
        if (isPlaying) {
          stopPlayback();
          startPlayback();
        } else updateUI();
      });
    });

    container.querySelector('#scrub-container')?.addEventListener('click', (e) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const clickX = (e as MouseEvent).clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      progressSec = Math.floor(pct * curTrack().duration);
      updateUI();
    });
  };

  win.onClose = () => {
    stopPlayback();
    if (visualizerAnim) cancelAnimationFrame(visualizerAnim);
  };

  updateUI();
}
