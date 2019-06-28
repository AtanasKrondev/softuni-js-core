const Warehouse = require('./warehouse.js')
const { expect } = require('chai');

describe('Warehouse', function () {
    describe('Constructor', function () {
        it('throws error with invalid capacity', function () {
            let wrongType = () => new Warehouse('3');
            expect(wrongType).to.throw(`Invalid given warehouse space`);
            let negativeNumber = () => new Warehouse(-1);
            expect(negativeNumber).to.throw(`Invalid given warehouse space`);
        })
        it('constructs with correct data', function () {
            let warehouse = new Warehouse(20);
            expect(warehouse).to.be.an('object');
            expect(warehouse._capacity).to.equal(20);
            expect(warehouse.availableProducts).to.be.an('object');
        })

        it('Should has functions to proto', function () {
            let warehouse = new Warehouse(20);
            expect(Object.getPrototypeOf(warehouse).hasOwnProperty('addProduct')).to.equal(true)
            expect(Object.getPrototypeOf(warehouse).hasOwnProperty('orderProducts')).to.equal(true)
            expect(Object.getPrototypeOf(warehouse).hasOwnProperty('occupiedCapacity')).to.equal(true)
            expect(Object.getPrototypeOf(warehouse).hasOwnProperty('revision')).to.equal(true)
            expect(Object.getPrototypeOf(warehouse).hasOwnProperty('scrapeAProduct')).to.equal(true)
        })

        it('sets new capacity', function () {
            let warehouse = new Warehouse(20);
            warehouse.capacity = 3;
            expect(warehouse._capacity).to.equal(3)
        })
        it('Error new capacity', function () {
            let warehouse = new Warehouse(20);
            let error1 = () => warehouse.capacity = '3';
            let error2 = () => warehouse.capacity = -3;
            expect(error1).to.throw(`Invalid given warehouse space`);
            expect(error2).to.throw(`Invalid given warehouse space`);
        })

        it('gets capacity', function () {
            let warehouse = new Warehouse(20);
            let capacity = warehouse.capacity;
            expect(capacity).to.equal(20);
            expect(capacity).to.equal(warehouse._capacity);
        })
    })

    describe('Add product', function () {
        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
        })

        it('When there is no place for the current product, you should throw ', function () {
            let overload = () => warehouse.addProduct('Drink', 'Beer', 28);
            expect(overload).to.throw(`There is not enough space or the warehouse is already full`);
            let overload2 = () => {
                warehouse.addProduct('Drink', 'Beer', 8);
                warehouse.addProduct('Drink', 'Beer', 8);
                warehouse.addProduct('Drink', 'Beer', 8);
            }
            expect(overload2).to.throw(`There is not enough space or the warehouse is already full`);
        })

        it('adds correctly a product', function () {
            warehouse.addProduct('Food', 'Pizza', 8);
            warehouse.addProduct('Drink', 'Coffee', 9);
            let result1 = warehouse.availableProducts['Food']['Pizza'];
            let result2 = warehouse.availableProducts['Drink']['Coffee'];
            expect(result1).to.equal(8);
            expect(result2).to.equal(9);
        })

        it('sums correctly proucts', function () {
            warehouse.addProduct('Food', 'Pizza', 4);
            warehouse.addProduct('Food', 'Pizza', 4);
            warehouse.addProduct('Drink', 'Coffee', 3);
            warehouse.addProduct('Drink', 'Coffee', 3);
            let result1 = warehouse.availableProducts['Food']['Pizza'];
            let result2 = warehouse.availableProducts['Drink']['Coffee'];
            expect(result1).to.equal(8);
            expect(result2).to.equal(6);
        })

        it('returns object', function () {
            expect(warehouse.addProduct('Food', 'Pizza', 4)).to.eql({ 'Pizza': 4 });
            expect(warehouse.addProduct('Drink', 'Coffee', 3)).to.eql({ 'Coffee': 3 });
            expect(warehouse.availableProducts.Food).to.haveOwnProperty('Pizza');
            expect(warehouse.availableProducts.Drink).to.haveOwnProperty('Coffee');
        })
    })

    describe('Order products', function () {
        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(200);
        })

        it('sorts products', function () {
            warehouse.addProduct('Food', 'Bread', 8);
            warehouse.addProduct('Food', 'Donut', 1);
            warehouse.addProduct('Food', 'Cucumber', 4);
            warehouse.addProduct('Food', 'Avocado', 12);
            let sortedFoods = warehouse.orderProducts('Food');
            expect(sortedFoods).to.eql({ Avocado: 12, Bread: 8, Cucumber: 4, Donut: 1 });
        })

        it('sorts products', function () {
            warehouse.addProduct('Drink', 'Beer', 8);
            warehouse.addProduct('Drink', 'Daiquiri', 1);
            warehouse.addProduct('Drink', 'Coffee', 4);
            warehouse.addProduct('Drink', 'Ale', 12);
            let sortedDrinks = warehouse.orderProducts('Drink');
            expect(sortedDrinks).to.eql({ Ale: 12, Beer: 8, Coffee: 4, Daiquiri: 1 });
        })
    })

    describe('Occupied capacity', function () {
        it('should return occupied capacity', function () {
            let warehouse = new Warehouse(200);
            warehouse.addProduct('Drink', 'Ale', 12);
            let occupied = warehouse.occupiedCapacity();
            expect(occupied).to.equal(12);
            warehouse.addProduct('Food', 'Avocado', 11);
            occupied = warehouse.occupiedCapacity();
            expect(occupied).to.equal(23);
        })
    })

    describe('Revision', function () {
        it('empty warehouse', function () {
            let warehouse = new Warehouse(40);
            let empty = warehouse.revision();
            expect(empty).to.equal('The warehouse is empty');
        });

        it('revises', function () {
            let result = ['Product type - [Food]',
                '- Pizza 8',
                '- Salami 1',
                'Product type - [Drink]',
                '- Coffee 4',
                '- Ale 12'];
            let warehouse = new Warehouse(200);
            warehouse.addProduct('Food', 'Pizza', 8);
            warehouse.addProduct('Food', 'Salami', 1);
            warehouse.addProduct('Drink', 'Coffee', 4);
            warehouse.addProduct('Drink', 'Ale', 12);
            let revision = warehouse.revision();
            expect(revision).to.equal(result.join('\n'));
        })
    })

    describe('Scrape', function () {
        let warehouse;
        beforeEach(function () {
            warehouse = new Warehouse(20);
            warehouse.addProduct('Food', 'Sausage', 3);
        })

        it('Error for non existing', function () {
            let error = () => warehouse.scrapeAProduct('banichka', 3);
            expect(error).to.throw('banichka do not exists');
        })

        it('Subtracts', function () {
            let subtract = warehouse.scrapeAProduct('Sausage', 1);
            expect(subtract).to.eql({ Sausage: 2 });
            expect(warehouse.availableProducts.Food['Sausage']).to.equal(2);
        })

        it('Resets', function () {
            let subtract = warehouse.scrapeAProduct('Sausage', 4);
            expect(subtract).to.eql({ Sausage: 0 });
            expect(warehouse.availableProducts.Food['Sausage']).to.equal(0);
        })
    })
})