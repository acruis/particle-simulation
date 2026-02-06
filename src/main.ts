import { Simulation } from './Simulation';

// Initialize simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    // Create simulation with 100 particles
    const simulation = new Simulation(canvas, 100);

    // Start the simulation
    simulation.start();

    console.log('Particle simulation started!');

    // Expose simulation to window for debugging
    (window as any).simulation = simulation;
});