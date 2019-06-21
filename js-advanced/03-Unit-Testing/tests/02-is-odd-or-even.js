// const expect = require('chai').expect;

// function isOddOrEven(string) {
//     if (typeof (string) !== 'string') {
//         return undefined;
//     }
//     if (string.length % 2 === 0) {
//         return "even";
//     }

//     return "odd";
// }

// describe('isOddOrEven', function () {
//     it('test with number parameter, should return undefined', function () {
//         let expected = isOddOrEven(100);

//         expect(expected).to.equal(undefined, 'function did not return the right result');
//     });
//     it('test with object parameter, should return undefined', function () {
//         let expected = isOddOrEven({ name: 'Bibi' });

//         expect(expected).to.equal(undefined, 'function did not return the right result');
//     });
//     it('String parameter with even length, should return even', function(){
//         const expected = isOddOrEven('JS4Ever!');

//         expect(expected).to.equal("even",'function returns correct result with even string length');
//     })
//     it('String parameter with odd length, should return odd', function(){
//         const expected = isOddOrEven('JS4Ever');

//         expect(expected).to.equal("odd",'function returns correct result with odd string length');
//     })
// })