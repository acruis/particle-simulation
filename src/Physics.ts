import { Particle } from './Particle';
import { Vector2D } from './Vector2D';

export class Physics {
    /**
     * Check if two particles are colliding
     */
    static detectCollision(p1: Particle, p2: Particle): boolean {
        const distanceSquared = p1.position.distanceSquared(p2.position);
        const minDistance = p1.radius + p2.radius;
        return distanceSquared <= minDistance * minDistance;
    }

    /**
     * Resolve elastic collision between two particles
     * Uses conservation of momentum and energy
     */
    static resolveCollision(p1: Particle, p2: Particle): void {
        // Vector from p1 to p2
        const delta = p2.position.subtract(p1.position);
        const distance = delta.magnitude();

        // Avoid division by zero
        if (distance === 0) return;

        // Minimum translation distance to separate particles
        const overlap = (p1.radius + p2.radius - distance) / 2;
        const direction = delta.normalize();

        // Separate particles so they're no longer overlapping
        p1.position = p1.position.subtract(direction.multiply(overlap));
        p2.position = p2.position.add(direction.multiply(overlap));

        // Relative velocity
        const relativeVelocity = p1.velocity.subtract(p2.velocity);

        // Velocity component along collision normal
        const velocityAlongNormal = relativeVelocity.dot(direction);

        // Don't resolve if velocities are separating
        if (velocityAlongNormal < 0) return;

        // Perfectly elastic collision (simplified)
        // Exchange velocity components along collision normal
        const totalMass = p1.mass + p2.mass;
        const velocityChange = direction.multiply(2 * velocityAlongNormal * p2.mass / totalMass);

        p1.velocity = p1.velocity.subtract(velocityChange);
        p2.velocity = p2.velocity.add(velocityChange.multiply(p1.mass / p2.mass));
    }

    /**
     * Handle boundary collisions (bounce off walls)
     */
    static handleBoundaryCollision(
        particle: Particle,
        width: number,
        height: number
    ): void {
        const restitution = 0.95; // Wall bounce damping

        // Left and right walls
        if (particle.position.x - particle.radius < 0) {
            particle.position.x = particle.radius;
            particle.velocity.x = -particle.velocity.x * restitution;
        } else if (particle.position.x + particle.radius > width) {
            particle.position.x = width - particle.radius;
            particle.velocity.x = -particle.velocity.x * restitution;
        }

        // Top and bottom walls
        if (particle.position.y - particle.radius < 0) {
            particle.position.y = particle.radius;
            particle.velocity.y = -particle.velocity.y * restitution;
        } else if (particle.position.y + particle.radius > height) {
            particle.position.y = height - particle.radius;
            particle.velocity.y = -particle.velocity.y * restitution;
        }
    }

    /**
     * Check all particle collisions and resolve them
     */
    static updateCollisions(particles: Particle[]): void {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                if (this.detectCollision(particles[i], particles[j])) {
                    this.resolveCollision(particles[i], particles[j]);
                }
            }
        }
    }
}
