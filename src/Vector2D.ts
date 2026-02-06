export class Vector2D {
    constructor(public x: number, public y: number) {}

    add(v: Vector2D): Vector2D {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector2D): Vector2D {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vector2D {
        return new Vector2D(this.x / scalar, this.y / scalar);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    magnitudeSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    normalize(): Vector2D {
        const mag = this.magnitude();
        return mag > 0 ? this.divide(mag) : new Vector2D(0, 0);
    }

    dot(v: Vector2D): number {
        return this.x * v.x + this.y * v.y;
    }

    distance(v: Vector2D): number {
        return this.subtract(v).magnitude();
    }

    distanceSquared(v: Vector2D): number {
        return this.subtract(v).magnitudeSquared();
    }

    clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    static zero(): Vector2D {
        return new Vector2D(0, 0);
    }

    static random(minX: number, maxX: number, minY: number, maxY: number): Vector2D {
        return new Vector2D(
            Math.random() * (maxX - minX) + minX,
            Math.random() * (maxY - minY) + minY
        );
    }
}
