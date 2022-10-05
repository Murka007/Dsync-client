export default class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromAngle(angle: number): Readonly<Vector> {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    add(vec: Vector): Readonly<Vector> {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    sub(vec: Vector): Readonly<Vector> {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mult(scalar: number): Readonly<Vector> {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar: number): Readonly<Vector> {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Readonly<Vector> {
        return this.length > 0 ? this.div(this.length) : this;
    }

    setLength(value: number): Readonly<Vector> {
        return this.normalize().mult(value);
    }

    copy(): Readonly<Vector> {
        return new Vector(this.x, this.y);
    }

    distance(vec: Vector): number {
        return this.copy().sub(vec).length;
    }

    angle(vec: Vector): number {
        const copy = vec.copy().sub(this);
        return Math.atan2(copy.y, copy.x);
    }

    dot(vec: Vector): number {
        return this.x * vec.x + this.y * vec.y;
    }

    direction(angle: number, scalar: number): Readonly<Vector> {
        return this.copy().add(Vector.fromAngle(angle).mult(scalar));
    }
}