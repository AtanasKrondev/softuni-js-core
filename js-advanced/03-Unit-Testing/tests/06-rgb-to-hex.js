const expect = require('chai').expect;

function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

console.log(rgbToHexColor(0, 0, 0));
console.log(rgbToHexColor(255, 255, 255));
console.log(rgbToHexColor('0', '0', '0'));
console.log(rgbToHexColor('255', '255', '255'));


describe('RGB to Hex', ()=>{
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor(0, 0, 0);
        expect(expected).to.equal('#000000', 'Miscalculation')
    });
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor(255, 255, 255);
        expect(expected).to.equal('#FFFFFF', 'Miscalculation')
    });
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor(300, 300, 300);
        expect(expected).to.equal(undefined, 'Miscalculation')
    });
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor(-300, -300, -300);
        expect(expected).to.equal(undefined, 'Miscalculation')
    });
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor('0', '0', '0');
        expect(expected).to.equal(undefined, 'Miscalculation')
    });
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor('255', '255', '255');
        expect(expected).to.equal(undefined, 'Miscalculation')
    });
    it('Return the same color in hexadecimal format as a string',()=>{
        let expected = rgbToHexColor(100, 100, 300);
        expect(expected).to.equal(undefined, 'Miscalculation')
    });
})