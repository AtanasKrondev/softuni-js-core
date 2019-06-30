function solve(input) {
    let cars = [];

    for (const line of input) {
        const commandLine = line.split(' ');
        const command = commandLine[0];

        switch (command) {
            case 'create':
                const newName = commandLine[1];
                const newObj = {};
                if (commandLine[2] === undefined) {
                    newObj[newName] = {};
                } else {
                    const parrentCar = commandLine[3]
                    newObj[newName] = Object.create(cars.find(c => c[parrentCar]));
                }
                cars.push(newObj);
                break;
            case 'set':
                const updateCar = commandLine[1];
                const key = commandLine[2];
                const value = commandLine[3];
                cars.find(c => c[updateCar])[updateCar][key] = value;
                break;
            case 'print':
                const printCar = commandLine[1];
                let printCarObj = cars.find(c => c[printCar])[printCar];
                for (const key in printCarObj) {
                    console.log(key);
                    console.log(printCarObj[key]);
                    
                }
                // console.log(Object.values(Object.getPrototypeOf(printCarObj)));


                break;
        }
    }
    console.log(cars);
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
)