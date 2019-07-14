function createComputerHierarchy() {
    class Keyboard {
        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(battery) {
            if (battery.constructor.name !== 'Battery') {
                throw new TypeError('The object should be of class Battery');
            }

            this._battery = battery;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(keyboard) {
            if (keyboard.constructor.name !== 'Keyboard') {
                throw new TypeError('The object should be of class Keyboard');
            }

            this._keyboard = keyboard;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(monitor) {
            if (monitor.constructor.name !== 'Monitor') {
                throw new TypeError('The object should be of class Monitor');
            }

            this._monitor = monitor;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}

const Battery = createComputerHierarchy().Battery;
const Keyboard = createComputerHierarchy().Keyboard;
const Monitor = createComputerHierarchy().Monitor;
const Computer = createComputerHierarchy().Computer;
const Laptop = createComputerHierarchy().Laptop;
const Desktop = createComputerHierarchy().Desktop;

const battery = new Battery('Acer', 'do utre');
const keyboard = new Keyboard('Asus', 'nikakvo');
// const laptop = new Laptop('Acer', 'baven', 'mnogo', 'biva', 3, 'zelen', battery);
console.log(keyboard);
const desktop = new Desktop('dff')
