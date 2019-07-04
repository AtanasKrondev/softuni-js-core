const { expect } = require('chai');
const FilmStudio = require('./filmStudio');

describe('FilmStudio', () => {

    it('constructs', () => {
        let filmStudio = new FilmStudio('SU-Studio');
        expect(filmStudio).to.be.an.instanceOf(FilmStudio);
        expect(filmStudio.name).to.be.equal('SU-Studio');
        expect(filmStudio.films).to.be.eql([]);
    })

    describe('makeMovie', () => {
        it('invalid parameters', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            let wrongTypes = () => filmStudio.makeMovie(3, 'array');
            expect(wrongTypes).to.throw('Invalid arguments');
        })
        it('only one parameter', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            let singleParameter = () => filmStudio.makeMovie('movie name');
            expect(singleParameter).to.throw('Invalid arguments count');
        })
        it('makes movie', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            let film = filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            expect(film).to.eql({
                filmName: 'The Avengers',
                filmRoles:
                    [{ role: 'Iron-Man', actor: false },
                    { role: 'Thor', actor: false },
                    { role: 'Hulk', actor: false },
                    { role: 'Arrow guy', actor: false }]
            });
            let filmName = filmStudio.films[0].filmName;
            let rolesArray = filmStudio.films[0].filmRoles.length;
            expect(filmName).to.equal('The Avengers');
            expect(rolesArray).to.equal(4);
        })
        it('makes sequel', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let sequel = filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy', 'Ant-man']);
            expect(sequel.filmName).to.equal('The Avengers 2');
            expect(filmStudio.films.length).to.equal(2);
        })
    })

    describe('casting', () => {
        it('empty films list', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            let emptyStudio = filmStudio.casting('Pesho', 'The big boss');
            expect(emptyStudio).to.equal(`There are no films yet in ${filmStudio.name}.`)
        });
        it('can not find the role', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let actor = 'Leo DiCaprio';
            let role = 'Pikachu';
            let missingRole = filmStudio.casting(actor, role);
            expect(missingRole).to.equal(`${actor}, we cannot find a ${role} role...`)
        })
        it('tales the role', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let actor = 'RDJ';
            let role = 'Iron-Man';
            let roleTaken = filmStudio.casting(actor, role);
            expect(roleTaken).to.equal(`You got the job! Mr. ${actor} you are next ${role} in the The Avengers. Congratz!`);
            expect(filmStudio.films[0].filmRoles).to.deep.include({ role: 'Iron-Man', actor: 'RDJ' });
        })
    })

    describe('lookForProducer', () => {
        it('throws error', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let film = 'The Scavengers';
            let errorMessage = () => filmStudio.lookForProducer(film);
            expect(errorMessage).to.throw(Error, `${film} do not exist yet, but we need the money...`)
        });
        it('findsProducer', () => {
            let filmStudio = new FilmStudio('SU-Studio');
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let film = 'The Avengers';
            let findsProducer = filmStudio.lookForProducer(film);
            let filmOutput = `Film name: ${film}\nCast:\n`;
            Object.keys(filmStudio.films[0].filmRoles).forEach((role) => {
                filmOutput += `${filmStudio.films[0].filmRoles[role].actor} as ${filmStudio.films[0].filmRoles[role].role}\n`;
            });
            expect(findsProducer).to.equal(filmOutput);
        })
    })
})

let filmStudio = new FilmStudio('SU-Studio');
filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
// let actor = 'RDJ';
// let role = 'Iron-Man';
// let roleTaken = filmStudio.casting(actor, role);

console.log(filmStudio.lookForProducer('The Avengers'));
// console.log(filmStudio.lookForProducer('The Scavengers'));


// let filmStudio = new FilmStudio('SU-Studio');
// console.log(filmStudio.casting('', 'Iron-Ma'));
// filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
// filmStudio.makeMovie('The New Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy', 'Black Panther']);