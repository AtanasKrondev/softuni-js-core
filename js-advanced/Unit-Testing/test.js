const PaymentPackage = require('./PaymentPackage.js')
const { expect } = require('chai');

describe('String building tests', function () {
    let sb;
    beforeEach(function () {
        sb = new StringBuilder();
    });

    describe('Constructor tests', function () {
        it('checks if funcs are attached to proto', function () {
            expect(typeof StringBuilder.prototype.append === 'function').to.be.true;
            expect(typeof StringBuilder.prototype.prepend === 'function').to.be.true;
            expect(typeof StringBuilder.prototype.insertAt === 'function').to.be.true;
            expect(typeof StringBuilder.prototype.remove === 'function').to.be.true;
            expect(typeof StringBuilder.prototype.toString === 'function').to.be.true;
        })
        it('is initialized with wrong params throw error', function () {
            expect(() => new StringBuilder({})).to.throw(TypeError);
        })

        it('is initialized without params', function () {
            expect(sb._stringArray.join('')).to.equal('', 'Empty string expected');
        });

        it('is initialized with params', function () {
            sb = new StringBuilder('test');
            const expected = 'test';
            expect(sb._stringArray.join('')).to.equal(expected, 'Wrong construct');
        })
    })

    describe('Prepend tests', function () {
        it('is initialized with wrong param', function () {
            const errorFunc = () => {
                sb.prepend({ name: 'Pesho' });
            }

            expect(errorFunc).to.throw(TypeError);
        });

        it('is initialized with correct data', function () {
            sb.prepend('Test');
            const expected = 'Test';
            expect(sb._stringArray.join('')).to.equal(expected, 'Wrong prepend');
        });

        it('is initialized with multiple correct data', function () {
            sb.prepend('the other side');
            sb.prepend('from ');
            sb.prepend('Hello ');
            const expected = 'Hello from the other side';
            expect(sb._stringArray.join('')).to.equal(expected, 'Wrong prepend');
        });
    })

    describe('Append tests', function () {
        it('is initialized with wrong param', function () {
            const errorFunc = () => {
                sb.append({ name: 'Pesho' });
            }

            expect(errorFunc).to.throw(TypeError);
        });

        it('is initialized with correct data', function () {
            sb.append('Test');
            const expected = 'Test';
            expect(sb._stringArray.join('')).to.equal(expected, 'Wrong append');
        });

        it('is initialized with multiple correct data', function () {
            sb.append('Hello ');
            sb.append('from ');
            sb.append('the other side');
            const expected = 'Hello from the other side';
            expect(sb._stringArray.join('')).to.equal(expected, 'Wrong append');
        });
    })

    describe('Insert at test', function () {
        it('works correctly', function () {
            const expected = 'Hello from the other side';
            sb.prepend('the other side');
            sb.prepend('Hello ');
            sb.insertAt('from ', 6);
            expect(sb.toString()).to.equal(expected, `Expected ${expected}`);
        });
        it('insert at beginning', function () {
            const expected = 'Hello from the other side';
            sb.prepend('the other side');
            sb.prepend('from ');
            sb.insertAt('Hello ', 0);
            expect(sb.toString()).to.equal(expected, `Expected ${expected}`);
        });
        it('insert at the end', function () {
            const expected = 'Hello from the other side';
            sb.prepend('the other ');
            sb.prepend('from ');
            sb.prepend('Hello ');
            sb.insertAt('side', sb.toString().length)
            expect(sb.toString()).to.equal(expected, `Expected ${expected}`);
        });
        it('tested with wrong parameter', function () {
            const errorFunc = () => {
                sb.insertAt({});
            }
            expect(errorFunc).to.throw(TypeError);
        });
        it('inserts correctly', function () {
            let str = 'kek';
            builder.insertAt(str, 3);
            let expected = Array.from(startingString);
            expected.splice(3, 0, ...str);
            compareArray(builder._stringArray, expected);
        });
    });

    describe('Remove test', function () {
        it('works correctly', function () {
            const expected = 'Hello from the other side';
            sb.prepend('the other side');
            sb.prepend('from ');
            sb.prepend('Hello ');
            sb.prepend('12345');
            sb.remove(0, 5)
            expect(sb.toString()).to.equal(expected, `Expected ${expected}`);
        });
    });

    describe('to string tests', function () {
        it('test ToString', function () {
            sb.prepend('Test');

            expect(sb.toString()).to.equal('Test', 'Doesnt work');
        })
    })
})