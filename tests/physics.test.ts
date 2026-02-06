import { describe, test, expect } from 'bun:test';
import { Physics } from '../src/Physics';
import { Particle } from '../src/Particle';
import { Vector2D } from '../src/Vector2D';

describe('Physics', () => {
    describe('detectCollision', () => {
        test('should detect collision when particles overlap', () => {
            const p1 = new Particle(
                new Vector2D(0, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );
            const p2 = new Particle(
                new Vector2D(15, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );

            expect(Physics.detectCollision(p1, p2)).toBe(true);
        });

        test('should not detect collision when particles are apart', () => {
            const p1 = new Particle(
                new Vector2D(0, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );
            const p2 = new Particle(
                new Vector2D(50, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );

            expect(Physics.detectCollision(p1, p2)).toBe(false);
        });

        test('should detect collision when particles are exactly touching', () => {
            const p1 = new Particle(
                new Vector2D(0, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );
            const p2 = new Particle(
                new Vector2D(20, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );

            expect(Physics.detectCollision(p1, p2)).toBe(true);
        });
    });

    describe('resolveCollision', () => {
        test('should conserve momentum in head-on collision', () => {
            const p1 = new Particle(
                new Vector2D(0, 0),
                new Vector2D(10, 0),
                1,
                5,
                '#fff'
            );
            const p2 = new Particle(
                new Vector2D(10, 0),
                new Vector2D(-10, 0),
                1,
                5,
                '#fff'
            );

            const initialMomentum =
                p1.velocity.x * p1.mass + p2.velocity.x * p2.mass;

            Physics.resolveCollision(p1, p2);

            const finalMomentum = p1.velocity.x * p1.mass + p2.velocity.x * p2.mass;

            // Momentum should be approximately conserved (allowing for floating point errors)
            expect(Math.abs(finalMomentum - initialMomentum)).toBeLessThan(0.01);
        });

        test('should separate overlapping particles', () => {
            const p1 = new Particle(
                new Vector2D(0, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );
            const p2 = new Particle(
                new Vector2D(10, 0),
                new Vector2D(0, 0),
                1,
                10,
                '#fff'
            );

            Physics.resolveCollision(p1, p2);

            const distance = p1.position.distance(p2.position);
            const minDistance = p1.radius + p2.radius;

            expect(distance).toBeGreaterThanOrEqual(minDistance - 0.01);
        });

        test('should handle unequal mass collision correctly', () => {
            const p1 = new Particle(
                new Vector2D(0, 0),
                new Vector2D(10, 0),
                1,
                5,
                '#fff'
            );
            const p2 = new Particle(
                new Vector2D(10, 0),
                new Vector2D(0, 0),
                10,
                5,
                '#fff'
            );

            Physics.resolveCollision(p1, p2);

            // Lighter particle should have larger velocity change
            // Heavy particle should move less
            expect(Math.abs(p1.velocity.x)).toBeGreaterThan(Math.abs(p2.velocity.x));
        });
    });

    describe('handleBoundaryCollision', () => {
        test('should bounce off left wall', () => {
            const particle = new Particle(
                new Vector2D(3, 50),
                new Vector2D(-10, 0),
                1,
                5,
                '#fff'
            );

            Physics.handleBoundaryCollision(particle, 100, 100);

            expect(particle.position.x).toBe(5); // Should be at radius distance
            expect(particle.velocity.x).toBeGreaterThan(0); // Should bounce back
        });

        test('should bounce off right wall', () => {
            const particle = new Particle(
                new Vector2D(97, 50),
                new Vector2D(10, 0),
                1,
                5,
                '#fff'
            );

            Physics.handleBoundaryCollision(particle, 100, 100);

            expect(particle.position.x).toBe(95); // Should be at width - radius
            expect(particle.velocity.x).toBeLessThan(0); // Should bounce back
        });

        test('should bounce off top wall', () => {
            const particle = new Particle(
                new Vector2D(50, 3),
                new Vector2D(0, -10),
                1,
                5,
                '#fff'
            );

            Physics.handleBoundaryCollision(particle, 100, 100);

            expect(particle.position.y).toBe(5); // Should be at radius distance
            expect(particle.velocity.y).toBeGreaterThan(0); // Should bounce back
        });

        test('should bounce off bottom wall', () => {
            const particle = new Particle(
                new Vector2D(50, 97),
                new Vector2D(0, 10),
                1,
                5,
                '#fff'
            );

            Physics.handleBoundaryCollision(particle, 100, 100);

            expect(particle.position.y).toBe(95); // Should be at height - radius
            expect(particle.velocity.y).toBeLessThan(0); // Should bounce back
        });
    });
});
