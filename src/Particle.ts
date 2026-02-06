import { Vector2D } from './Vector2D';

export class Particle {
    position: Vector2D;
    velocity: Vector2D;
    mass: number;
    radius: number;
    color: string;

    constructor(
        position: Vector2D,
        velocity: Vector2D,
        mass: number,
        radius: number,
        color: string = '#ffffff'
    ) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
    }

    update(deltaTime: number): void {
        // Update position based on velocity
        this.position = this.position.add(this.velocity.multiply(deltaTime));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    static random(
        canvasWidth: number,
        canvasHeight: number,
        minRadius: number = 5,
        maxRadius: number = 15
    ): Particle {
        // Random radius
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const position = Vector2D.random(
            radius,
            canvasWidth - radius,
            radius,
            canvasHeight - radius
        );

        // Random velocity between -50 and 50 pixels per second
        const velocity = new Vector2D(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200
        );

        // Mass proportional to area (uniform density)
        // Using area = π * r² for 2D circles
        const mass = Math.PI * radius * radius;

        // Random color
        const hue = Math.random() * 360;
        const color = `hsl(${hue}, 70%, 60%)`;

        return new Particle(position, velocity, mass, radius, color);
    }
}
