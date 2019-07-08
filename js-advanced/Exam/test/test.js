const expect = require('chai').expect;
const PizzUni = require('../02. PizzUni');

describe('PizzUni', () => {
    let pizza;
    beforeEach(() => {
        pizza = new PizzUni();
    })

    it('constructs', () => {
        expect(pizza).to.be.instanceOf('PizzUni')
    })
})

