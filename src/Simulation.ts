import { Particle } from './Particle';
import { Physics } from './Physics';

export class Simulation {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private lastTime: number = 0;
    private fps: number = 0;
    private frameCount: number = 0;
    private fpsUpdateTime: number = 0;
    private animationId: number | null = null;

    constructor(canvas: HTMLCanvasElement, particleCount: number = 100) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = context;

        // Initialize particles
        this.initParticles(particleCount);
    }

    private initParticles(count: number): void {
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push(
                Particle.random(this.canvas.width, this.canvas.height, 5, 20)
            );
        }
    }

    private update(deltaTime: number): void {
        // Update particle positions
        for (const particle of this.particles) {
            particle.update(deltaTime);
        }

        // Handle wall collisions
        for (const particle of this.particles) {
            Physics.handleBoundaryCollision(
                particle,
                this.canvas.width,
                this.canvas.height
            );
        }

        // Handle particle-particle collisions
        Physics.updateCollisions(this.particles);
    }

    private render(): void {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        for (const particle of this.particles) {
            particle.draw(this.ctx);
        }
    }

    private updateFPS(currentTime: number): void {
        this.frameCount++;

        if (currentTime - this.fpsUpdateTime >= 1000) {
            this.fps = Math.round(
                (this.frameCount * 1000) / (currentTime - this.fpsUpdateTime)
            );
            this.frameCount = 0;
            this.fpsUpdateTime = currentTime;

            // Update UI
            this.updateUI();
        }
    }

    private updateUI(): void {
        const fpsElement = document.getElementById('fps');
        const particlesElement = document.getElementById('particles');

        if (fpsElement) {
            fpsElement.textContent = `FPS: ${this.fps}`;
        }

        if (particlesElement) {
            particlesElement.textContent = `Particles: ${this.particles.length}`;
        }
    }

    private loop = (currentTime: number): void => {
        // Calculate delta time in seconds
        const deltaTime = this.lastTime === 0 ? 0 : (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Cap delta time to prevent large jumps
        const cappedDeltaTime = Math.min(deltaTime, 0.1);

        // Update FPS counter
        this.updateFPS(currentTime);

        // Update physics and render
        this.update(cappedDeltaTime);
        this.render();

        // Continue loop
        this.animationId = requestAnimationFrame(this.loop);
    };

    start(): void {
        if (this.animationId === null) {
            this.lastTime = 0;
            this.fpsUpdateTime = performance.now();
            this.animationId = requestAnimationFrame(this.loop);
        }
    }

    stop(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    reset(particleCount: number = 100): void {
        this.stop();
        this.initParticles(particleCount);
        this.start();
    }

    getParticles(): Particle[] {
        return this.particles;
    }
}
