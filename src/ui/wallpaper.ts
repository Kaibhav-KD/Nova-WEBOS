import { storage } from '../services/storage';

export class WallpaperManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private animId: number | null = null;
  private mouse = { x: -1000, y: -1000 };
  private particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
  private currentType: string = 'canvas-grid';

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.init();
  }

  private init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('wallpaper-changed', (e: any) => {
      this.setType(e.detail);
    });

    this.currentType = storage.getSettings().wallpaper || 'canvas-grid';
    this.initParticles();
    this.startAnimation();
  }

  public setType(type: string) {
    this.currentType = type;
    this.initParticles();
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  private initParticles() {
    this.particles = [];
    const count = Math.min(65, Math.floor((this.canvas.width * this.canvas.height) / 22000));
    const colors = ['#00f0ff', '#c084fc', '#38bdf8', '#818cf8'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  private startAnimation() {
    const loop = () => {
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  private draw() {
    if (!this.ctx) return;
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    if (this.currentType === 'minimal') {
      // Clean subtle radial gradient
      const bgGrad = this.ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, width, height);
      return;
    }

    if (this.currentType === 'nebula') {
      // Cosmic glow clouds
      const bgGrad = this.ctx.createRadialGradient(width * 0.3, height * 0.4, 20, width * 0.3, height * 0.4, width * 0.7);
      bgGrad.addColorStop(0, 'rgba(88, 28, 135, 0.45)');
      bgGrad.addColorStop(1, 'rgba(2, 6, 23, 0.95)');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, width, height);

      const secGrad = this.ctx.createRadialGradient(width * 0.7, height * 0.7, 30, width * 0.7, height * 0.7, width * 0.6);
      secGrad.addColorStop(0, 'rgba(6, 78, 59, 0.3)');
      secGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = secGrad;
      this.ctx.fillRect(0, 0, width, height);
    } else if (this.currentType === 'circuit') {
      // Geometric circuit lines
      this.ctx.fillStyle = '#030712';
      this.ctx.fillRect(0, 0, width, height);

      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      this.ctx.lineWidth = 1;

      const step = 60;
      for (let x = 0; x < width; x += step) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
      }
    } else {
      // Canvas Interactive Grid & Particles (Default)
      const grad = this.ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#050b14');
      grad.addColorStop(0.5, '#020617');
      grad.addColorStop(1, '#070f1e');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, width, height);

      // Perspective grid on bottom third
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      this.ctx.lineWidth = 1;
      const horizonY = height * 0.65;

      for (let y = horizonY; y < height; y += 28) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
      }
    }

    // Connect and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Connect to mouse if near
      const dxMouse = p.x - this.mouse.x;
      const dyMouse = p.y - this.mouse.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 140) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - distMouse / 140)})`;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }

      // Connect to neighboring particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 110)})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
  }

  public destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
