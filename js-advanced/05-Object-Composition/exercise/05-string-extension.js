(function () {
    String.prototype.ensureStart = function (str) {
        if (str !== this.substring(0, str.length)) {
            return `${str}${this}`;
        } else {
            return `${this}`;
        }
    }

    String.prototype.ensureEnd = function (str) {
        if (str !== this.substring(this.length - str.length)) {
            return `${this}${str}`;
        } else {
            return `${this}`;
        }
    }

    String.prototype.isEmpty = function () {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    String.prototype.truncate = function (n) {
        if (n >= this.length) {
            return `${this}`;
        } else {
            let result = `${this.substring(0, n)}`;
            let lastSpace = result.lastIndexOf(' ');
            if (lastSpace >= 0) {
                result = `${result.substring(0, lastSpace)}...`;
                if (result.length > n) {
                    lastSpace = result.lastIndexOf(' ');
                    if (lastSpace >= 0) {
                        result = `${result.substring(0, lastSpace)}...`;
                    }
                }
                return result;
            } else {
                let result = `${this.substring(0, n - 3)}...`;
                if (result.length > n) {
                    result = result.substring(0, n);
                }
                return result;
            }
        }
    }

    String.format = function (string, ...params) {
        const regex = /\{[0-9]+\}/g;
        let result = string;
        const matches = string.match(regex);

        for (let i = 0; i < Math.min(matches.length, params.length); i++) {
            result = result.replace(matches[i], params[i]);
        }

        return result;
    }
}())