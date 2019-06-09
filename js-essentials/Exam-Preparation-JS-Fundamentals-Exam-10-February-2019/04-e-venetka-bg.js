function eVenetka(input) {
    let dataBase = {};

    for (const line of input) {
        let model = line.model;
        let regNumber = line.regNumber;
        let town = line.town;
        let price = line.price;

        if (!dataBase.hasOwnProperty(town)) {
            dataBase[town] = [];
        }

        dataBase[town].push({model, regNumber, price });
    }

    let sortedArr = Object.entries(dataBase);

    console.log(dataBase.Varna);
    
}

eVenetka([{ model: 'BMW', regNumber: 'B1234SM', town: 'Varna', price: 2 },
{ model: 'BMW', regNumber: 'C5959CZ', town: 'Sofia', price: 8 },
{ model: 'Tesla', regNumber: 'NIKOLA', town: 'Burgas', price: 9 },
{ model: 'BMW', regNumber: 'A3423SM', town: 'Varna', price: 3 },
{ model: 'Lada', regNumber: 'SJSCA', town: 'Sofia', price: 3 }]);