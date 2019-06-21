const expect = require('chai').expect;

function createCalculator() {
    let value = 0;
    return {
        add: function (num) { value += Number(num); },
        subtract: function (num) { value -= Number(num); },
        get: function () { return value; }
    }
}

describe('Calculator', () => {
    it('Get value', () => {
        let expected = createCalculator();
        expect(expected.get()).to.equal(0, 'miscalculation');
    });
    it('Add value', () => {
        let expected = createCalculator();
        expected.add(1);
        expect(expected.get()).to.equal(1, 'miscalculation');
    });
    it('Subtract value', () => {
        let expected = createCalculator();
        expected.subtract(1);
        expect(expected.get()).to.equal(-1, 'miscalculation');
    });
    it('Add string', () => {
        let expected = createCalculator();
        expected.add('1');
        expect(expected.get()).to.equal(1, 'miscalculation');
    });
    it('Subtract string', () => {
        let expected = createCalculator();
        expected.subtract('1');
        expect(expected.get()).to.equal(-1, 'miscalculation');
    });
})