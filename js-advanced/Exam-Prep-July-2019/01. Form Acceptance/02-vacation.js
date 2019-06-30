class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
        this.numberOfChildren = 0;
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = [];
        }

        for (const kid of this.kids[grade]) {
            const [kidName, kidBudget] = kid.split('-');
            if (kidName === name) {
                return `${name} is already in the list for this ${this.destination} vacation.`;
            }
        }

        this.kids[grade].push(`${name}-${budget}`);
        this.numberOfChildren++;
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (!this.kids.hasOwnProperty(grade)) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        for (const kid of this.kids[grade]) {
            const [kidName, kidBudget] = kid.split('-');
            if (kidName === name) {
                let index = this.kids[grade].indexOf(kid);
                this.kids[grade].splice(index, 1);
                this.numberOfChildren--;
                return this.kids[grade];
            }
        }

        return `We couldn't find ${name} in ${grade} grade.`;
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let result = [];
        result.push(`${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}`);

        let gradesArr = Object.entries(this.kids);
        gradesArr.sort((a, b) => +a[0] - +b[0]);

        for (const [grade, kids] of gradesArr) {
            result.push(`Grade: ${grade}`);
            for (let i = 0; i < kids.length; i++) {
                result.push(`${i + 1}. ${kids[i]}`);
            }
        }

        return `${result.join('\n')}\n`;
    }
}

let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);
// vacation.registerChild('Gosho', 5, 3000);
// vacation.registerChild('Lilly', 6, 1500);
// vacation.registerChild('Pesho', 7, 4000);
// vacation.registerChild('Tanya', 5, 5000);
// vacation.registerChild('Mitko', 10, 5500)
console.log(vacation.toString());
