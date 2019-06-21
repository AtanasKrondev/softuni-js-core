const expect = require('chai').expect;

function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

describe('Check for symmetry', () => {
    it('Return false for any input that isn’t of the correct type', () => {
        let expected = isSymmetric('arr');
        expect(expected).to.equal(false, 'Incorrect input');
    });
    it('Return true if the input array is symmetric', () => {
        let expected = isSymmetric(['1', '2', '3', '2', '1']);
        expect(expected).to.equal(true, 'Incorrect check for true symmetry');
    });
    it('Return true if the input array is symmetric', () => {
        let expected = isSymmetric(['1', 2, '3', 2, '1']);
        expect(expected).to.equal(true, 'Incorrect check for true symmetry');
    });
    it('Return true if the input array is symmetric', () => {
        let expected = isSymmetric([1, 2, 3, '2', '1']);
        expect(expected).to.equal(false, 'Incorrect check for true symmetry');
    });
    it('Return false if the input array is asymmetric', () => {
        let expected = isSymmetric(['1', '2', '3', '4', '5']);
        expect(expected).to.equal(false, 'Incorrect check for false symmetry');
    });
});