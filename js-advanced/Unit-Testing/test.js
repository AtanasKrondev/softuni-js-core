const expect = require('chai').expect;
const AutoService = require('./AutoService');

describe('AutoService', () => {
    it('constructor', () => {
        let num = 2
        let autoService = new AutoService(num);
        expect(autoService).to.be.instanceOf(AutoService);
        expect(autoService.garageCapacity).to.equal(num);
        expect(autoService.workInProgress).to.be.instanceOf(Array);
        expect(autoService.backlogWork).to.be.instanceOf(Array);
    })
    it('availableSpace', () => {
        let autoService = new AutoService(4);
        autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
        autoService.signUpForReview('Philip', 'PB4321PB', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
        let availableSpace = autoService.availableSpace;
        expect(availableSpace).to.equal(1);
    })
    describe('signUpForReview', () => {
        it('adds an entry', () => {
            let autoService = new AutoService(2);
            let clientName = 'Peter';
            let plateNumber = 'CA1234CA';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' };
            autoService.signUpForReview(clientName, plateNumber, carInfo);
            expect(autoService.workInProgress.length).to.equal(1);
            expect(autoService.workInProgress[0].clientName).to.equal(clientName);
            expect(autoService.workInProgress[0].plateNumber).to.equal(plateNumber);
            expect(autoService.workInProgress[0].carInfo).to.eql(carInfo);
        });
        it('adds multiple', () => {
            let autoService = new AutoService(2);
            let clientName = 'Philip';
            let plateNumber = 'PB4321PB';
            let carInfo = { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' }
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
            autoService.signUpForReview(clientName, plateNumber, carInfo);
            expect(autoService.workInProgress.length).to.equal(2);
            expect(autoService.backlogWork.length).to.equal(1);
            expect(autoService.backlogWork[0].clientName).to.equal(clientName);
            expect(autoService.backlogWork[0].plateNumber).to.equal(plateNumber);
            expect(autoService.backlogWork[0].carInfo).to.eql(carInfo);

        })
    })
    describe('carInfo', () => {
        it('cant find car', () => {
            let autoService = new AutoService(2);
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
            autoService.signUpForReview('Philip', 'PB4321PB', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
            let plateNumber = 'CA1234CA';
            let clientName = 'Philip';
            let noCar = autoService.carInfo(plateNumber, clientName);
            expect(noCar).to.equal(`There is no car with platenumber ${plateNumber} and owner ${clientName}.`)
        })
        it('can find1', () => {
            let autoService = new AutoService(2);
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
            autoService.signUpForReview('Philip', 'PB4321PB', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
            let plateNumber = 'PB4321PB';
            let clientName = 'Philip';
            let car = autoService.carInfo(plateNumber, clientName);
            expect(car.plateNumber).to.equal(plateNumber);
            expect(car.clientName).to.equal(clientName);
            expect(car.carInfo).to.eql({ 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
        });
        it('can find2', () => {
            let autoService = new AutoService(2);
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
            autoService.signUpForReview('Philip', 'PB4321PB', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
            let plateNumber = 'CA1234CA';
            let clientName = 'Peter';
            let car = autoService.carInfo(plateNumber, clientName);
            expect(car.plateNumber).to.equal(plateNumber);
            expect(car.clientName).to.equal(clientName);
            expect(car.carInfo).to.eql({ 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
        })
    })
    describe('repairCar', () => {
        it('empty autoservice', () => {
            let autoService = new AutoService(2);
            let chillin = autoService.repairCar();
            expect(chillin).to.equal('No clients, we are just chilling...');
        });
        it('nothing to repair', () => {
            let autoService = new AutoService(2);
            autoService.signUpForReview('Philip', 'PB4321PB', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
            let fineCar = autoService.repairCar();
            expect(fineCar).to.equal('Your car was fine, nothing was repaired.');
        });
        it('repairs', () => {
            let autoService = new AutoService(2);
            autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
            let repair = autoService.repairCar();
            expect(autoService.workInProgress.length).to.equal(0);
            expect(repair).to.equal('Your doors and wheels and tires were repaired.');
        })
    })
})

let autoService = new AutoService(2);
autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken' });
autoService.signUpForReview('Peter', 'CA1234CA', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken' });
autoService.signUpForReview('Philip', 'PB4321PB', { 'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS' });
// console.log(autoService.carInfo('PB4321PB', 'Philip'));

// console.log(autoService.repairCar());
// console.log(autoService.availableSpace);

// console.log(autoService);
// console.log(autoService.repairCar());
// console.log(autoService.repairCar());
// console.log(autoService);


