function elemelons() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Water';
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Fire';
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Earth';
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Air';
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        morph() {
            switch (this.element) {
                case 'Water': this.element = 'Fire'; break;
                case 'Fire': this.element = 'Earth'; break;
                case 'Earth': this.element = 'Air'; break;
                case 'Air': this.element = 'Water'; break;
            }
        }
    }

    return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon }
}

const Melon = elemelons().Melon;
const Watermelon = elemelons().Watermelon;
const Melolemonmelon = elemelons().Melolemonmelon;

// let test = new Melon(100, "Test");
//Throws error

let watermelon = new Melolemonmelon(12.5, "Kingsize");
console.log(watermelon.toString());
watermelon.morph();
console.log(watermelon.toString());


// Element: Water
// Sort: Kingsize
// Element Index: 100
