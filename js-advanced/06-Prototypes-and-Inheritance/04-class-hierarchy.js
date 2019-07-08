function solve() {
    class Figure {
        constructor() {
            if (new.target === Figure) throw new Error;
        }

        toString() {
            let allProperties = [];
            for (const key in this) {
                allProperties.push(`${key}: ${this[key]}`);
            }
            return `${this.constructor.name} - ${allProperties.join(', ')}`
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
        }

        get area() {
            return (Math.PI * this.radius * this.radius)
        }
    }

    class Rectangle extends Figure {
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
        }

        get area() {
            return this.width * this.height;
        }
    }

    return { Figure, Circle, Rectangle }
}
