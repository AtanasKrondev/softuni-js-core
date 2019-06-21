const expect = require('chai').expect;

function lookupChar(string, index) {
    if (typeof (string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe('lookUpChar', function () {
    it('Should return undefined with a non-string first parameter', function () {
        let expected = lookupChar(1, 1);
        expect(expected).to.equal(undefined, 'first parameter should be string only');
    });
    it('Should return undefined with a non-integer second parameter', function () {
        let expected = lookupChar('1', '1');
        expect(expected).to.equal(undefined, 'second parameter should be integer only (test with string)');
    });
    it('Should return undefined with a non-integer second parameter', function () {
        let expected = lookupChar('1', 1.5);
        expect(expected).to.equal(undefined, 'second parameter should be integer only (test with floating point number)');
    });
    it('Should return "Incorrect index" with negative second parameter',function(){
        let expected = lookupChar('Hello', -10);
        expect(expected).to.equal("Incorrect index", 'did not return correct index');
    });
    it('Should return "Incorrect index" with second parameter larger than the length',function(){
        let expected = lookupChar('Hello', 10000);
        expect(expected).to.equal("Incorrect index", 'did not return correct index');
    });
    it('Should return correct character', function(){
        let expected = lookupChar('Hello', 1);
        expect(expected).to.equal('e', 'the function returns incorrect result')
    })
});