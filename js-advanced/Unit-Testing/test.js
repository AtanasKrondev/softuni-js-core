const PaymentPackage = require('./PaymentPackage.js')
const { expect } = require('chai');

describe('Payment Package testing', function () {
    let object;

    it('Should initiate with valid name', function () {
        let invalidName = () => object = new PaymentPackage({});
        expect(invalidName).to.throw(Error, 'Name must be a non-empty string');
        let emptyName = () => object = new PaymentPackage('');
        expect(emptyName).to.throw(Error, 'Name must be a non-empty string');
    })

    it('Should initiate with valid value', function () {
        let emptyValue = () => object = new PaymentPackage('HR Services');
        expect(emptyValue).to.throw(Error, 'Value must be a non-negative number');
        let negativeValue = () => object = new PaymentPackage('HR Services', -20);
        expect(negativeValue).to.throw(Error, 'Value must be a non-negative number');
    });

    describe('Initiate all properties and functions', function () {
        beforeEach(function () {
            object = new PaymentPackage('HR Services', 1500);
        });

        it('Should has all properties', function () {
            expect(object.hasOwnProperty('_name')).to.equal(true);
            expect(object.hasOwnProperty('_value')).to.equal(true);
            expect(object.hasOwnProperty('_VAT')).to.equal(true);
            expect(object.hasOwnProperty('_active')).to.equal(true);
        });

        it('Should has functions to proto', function () {
            expect(Object.getPrototypeOf(object).hasOwnProperty('toString')).to.equal(true)
        })
    });

    describe('Check accessors', function () {
        beforeEach(function () {
            object = new PaymentPackage('HR Services', 1500);
        });

        it('Should update correctly', function () {
            let wrongName = () => object.name = null;
            expect(wrongName).to.throw(Error, 'Name must be a non-empty string');
            let wrongValue = () => object.value = null;
            expect(wrongValue).to.throw(Error, 'Value must be a non-negative number');
            let wrongVAT = () => object.VAT = null;
            expect(wrongVAT).to.throw(Error, 'VAT must be a non-negative number');
            let wrongActive = () => object.active = null;
            expect(wrongActive).to.throw(Error, 'Active status must be a boolean');
        })

        it('Should update active correctly', function () {
            object.name = 'Gosho';
            object.value = 38;
            object.VAT = 39
            object.active = false;
            expect(object._name).to.equal('Gosho');
            expect(object._value).to.equal(38);
            expect(object._VAT).to.equal(39);
            expect(object._active).to.equal(false);
        })
    })
});


// let package = new PaymentPackage('HR Services', 1500)
// console.log(package);
// console.log(package.toString());

// Should throw an error
// try {
//     const hrPack = new PaymentPackage('HR Services');
// } catch(err) {
//     console.log('Error: ' + err.message);
// }
// const packages = [
//     new PaymentPackage('HR Services', 1500),
//     new PaymentPackage('Consultation', 800),
//     new PaymentPackage('Partnership Fee', 7000),
// ];
// console.log(packages.join('\n'));

// const wrongPack = new PaymentPackage('Transfer Fee', 100);
// // Should throw an error
// try {
//     wrongPack.active = null;
// } catch(err) {
//     console.log('Error: ' + err.message);
// }
