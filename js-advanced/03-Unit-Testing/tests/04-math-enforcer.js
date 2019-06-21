const expect = require('chai').expect;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe('MathEnforcerObject', function () {
    it('AddFive with positive number should return the number + 5', () => {
        let expected = mathEnforcer.addFive(10);
        expect(expected).to.equal(15, 'wrong result with possitive number');
    });
    it('AddFive with negative number should return the number + 5', () => {
        let expected = mathEnforcer.addFive(-10);
        expect(expected).to.equal(-5, 'wrong result with negative number');
    });
    it('AddFive with floating number should return the number + 5', () => {
        let expected = mathEnforcer.addFive(10.234);
        expect(expected).to.equal(15.234, 'wrong result with floating number');
    });
    it('AddFive with string for parameter should return undefined', () => {
        let expected = mathEnforcer.addFive('10.234');
        expect(expected).to.equal(undefined, 'wrong result with string parameter');
    })
    it('subtractTen with positive number should return the number - 10', () => {
        let expected = mathEnforcer.subtractTen(10);
        expect(expected).to.equal(0, 'wrong result with possitive number');
    });
    it('subtractTen with negative number should return the number - 10', () => {
        let expected = mathEnforcer.subtractTen(-10);
        expect(expected).to.equal(-20, 'wrong result with negative number');
    });
    it('subtractTen with floating number should return the number - 10', () => {
        let expected = mathEnforcer.subtractTen(10.234);
        expect(expected).to.closeTo(0.234, 0.01, 'wrong result with floating number');
    });
    it('subtractTen with string for parameter should return undefined', () => {
        let expected = mathEnforcer.subtractTen('10.234');
        expect(expected).to.equal(undefined, 'wrong result with string parameter');
    });
    it('sum with two possitive numbers should return their sum', () => {
        let expected = mathEnforcer.sum(1, 2);
        expect(expected).to.equal(3, 'wrong result with two possitive numbers');
    });
    it('sum with two negative numbers should return their sum', () => {
        let expected = mathEnforcer.sum(-1, -2);
        expect(expected).to.equal(-3, 'wrong result with two negative numbers');
    });
    it('sum with two floatin numbers should return their sum', () => {
        let expected = mathEnforcer.sum(-1.1, -2.2);
        expect(expected).to.closeTo(-3.3, 0.01, 'wrong result with two floatin numbers');
    });
    it('sum with number and string should return undefined', () => {
        let expected = mathEnforcer.sum(1, '2');
        expect(expected).to.equal(undefined, 'wrong result with first number, second string');
    });
    it('sum with number and string should return undefined', () => {
        let expected = mathEnforcer.sum('1', 1);
        expect(expected).to.equal(undefined, 'wrong result with first string, second number');
    });
});
