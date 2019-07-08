const expect = require('chai').expect;
const PizzUni = require('./PizzUni');

describe('PizzUni', () => {
    let pizza;
    beforeEach(() => {
        pizza = new PizzUni();
    })

    it('constructor', () => {
        expect(pizza).to.be.instanceOf(PizzUni);
        expect(pizza.registeredUsers).to.be.instanceOf(Array);
        expect(pizza.orders).to.be.instanceOf(Array);
        let availableProducts = {
            pizzas: ['Italian Style', 'Barbeque Classic', 'Classic Margherita'],
            drinks: ['Coca-Cola', 'Fanta', 'Water']
        };
        expect(pizza.availableProducts).to.eql(availableProducts);
    });

    describe('registerUser', () => {
        it('registers', () => {
            let email = 'a@b.c';
            pizza.registerUser(email);
            let user = {
                email,
                orderHistory: []
            }
            expect(pizza.registeredUsers[0]).to.eql(user);
        });

        it('returns', () => {
            let email = 'a@b.c';
            let newUser = pizza.registerUser(email);
            let user = {
                email,
                orderHistory: []
            }
            expect(newUser).to.eql(user);
        });

        it('throws error', () => {
            let email = 'a@b.c'
            pizza.registerUser(email);
            let error = () => pizza.registerUser(email);
            expect(error).to.throw(`This email address (${email}) is already being used!`);
        })
    })

    describe('makeAnOrder', () => {
        beforeEach(() => {
            pizza.registerUser('a@b.c');
            pizza.registerUser('d@e.f');
        })

        it('invalid user', () => {
            let error = () => pizza.makeAnOrder('asd@sa.bg', 'Italian Style', 'Water');
            expect(error).to.throw('You must be registered to make orders!');
        });

        it('invalid pizza', () => {
            let error = () => pizza.makeAnOrder('a@b.c', 'pizz', 'Water');
            expect(error).to.throw('You must order at least 1 Pizza to finish the order.');
        });

        it('orders without valid drink', () => {
            let order = pizza.makeAnOrder('a@b.c', 'Italian Style', 'limonada');
            let orderObj = {
                orderedPizza: 'Italian Style',
                email: 'a@b.c',
                status: 'pending'
            }
            expect(order).to.equal(0);
            expect(pizza.orders[0]).to.eql(orderObj);
            expect(pizza.registeredUsers[0].orderHistory[0]).to.eql({ orderedPizza: 'Italian Style' });

        })

        it('orders with a drink', () => {
            pizza.makeAnOrder('a@b.c', 'Italian Style', 'limonada');
            let order = pizza.makeAnOrder('a@b.c', 'Italian Style', 'Water');
            let orderObj = {
                orderedPizza: 'Italian Style',
                orderedDrink: 'Water',
                email: 'a@b.c',
                status: 'pending'
            }

            expect(order).to.equal(1);
            expect(pizza.orders[1]).to.eql(orderObj);
            expect(pizza.registeredUsers[0].orderHistory[1]).to.eql({ orderedPizza: 'Italian Style', orderedDrink: 'Water' });
        })
    })

    it('completeOrder', () => {
        pizza.registerUser('a@b.c');
        pizza.registerUser('d@e.f');
        pizza.makeAnOrder('a@b.c', 'Italian Style', 'limonada');
        let complete = pizza.completeOrder();
        let orderObj = {
            orderedPizza: 'Italian Style',
            email: 'a@b.c',
            status: 'completed'
        }

        expect(complete).to.eql(orderObj);
        expect(pizza.orders[0]).to.equal(complete);
    })

    it('details order', () => {
        pizza.registerUser('a@b.c');
        pizza.registerUser('d@e.f');
        pizza.makeAnOrder('a@b.c', 'Italian Style', 'limonada');
        pizza.makeAnOrder('d@e.f', 'Italian Style', 'Water');
        pizza.completeOrder();
        let first = pizza.detailsAboutMyOrder(0);
        let second = pizza.detailsAboutMyOrder(1);
        let third = pizza.detailsAboutMyOrder(2);
        expect(first).to.equal('Status of your order: completed');
        expect(second).to.equal('Status of your order: pending');
        expect(third).to.equal(undefined);
    })
})
