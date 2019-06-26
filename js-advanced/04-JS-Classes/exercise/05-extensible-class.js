(function solve() {
    let id = 0;
    class Extensible {
        constructor() {
            this.id = id++;
        }

        extend(template) {
            for (const key in template) {
                if (typeof template[key] === 'function') {
                    Extensible.prototype[key] = template[key];
                } else {
                    this[key] = template[key];
                }
            }
        }
    };

    return Extensible;
}())
