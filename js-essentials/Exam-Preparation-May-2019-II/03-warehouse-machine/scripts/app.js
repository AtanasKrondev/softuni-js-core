function coffeeStorage() {
    let inputElement = JSON.parse(document.getElementsByTagName('textarea')[0].value);
    let [reportElement, inspectElement] = Array.from(document.querySelectorAll('div p'));
    let storage = {};

    for (const command of inputElement) {
        if (command === 'REPORT') {
            let reportArr = [];

            let arrayStorage = Object.entries(storage);
            arrayStorage.forEach(([brand, coffee]) => {
                let reportCoffeeArr = [];
                let arrayBrand = Object.entries(coffee);
                arrayBrand.forEach(([coffee, info]) => {
                    reportCoffeeArr.push(`${coffee} - ${info.expDate} - ${info.qty}.`)
                })

                let reportStr = `${brand}: ${reportCoffeeArr.join(' ')}`;
                reportArr.push(reportStr);
            })

            reportElement.innerHTML = reportArr.join('<br>');
        } else if (command === 'INSPECTION') {
            let reportArr = [];

            let arrayStorage = Object.entries(storage).sort((a, b) => a[0].localeCompare(b[0]));
            arrayStorage.forEach(([brand, coffee]) => {
                let reportCoffeeArr = [];
                let arrayBrand = Object.entries(coffee).sort((a, b) => b[1].qty - a[1].qty);
                arrayBrand.forEach(([coffee, info]) => {
                    reportCoffeeArr.push(`${coffee} - ${info.expDate} - ${info.qty}.`)
                })

                let reportStr = `${brand}: ${reportCoffeeArr.join(' ')}`;
                reportArr.push(reportStr);
            })

            inspectElement.innerHTML = reportArr.join('<br>');
        } else {
            let [action, brand, coffee, expDate, qty] = command.split(', ');
            if (action === 'IN') {
                if (!storage.hasOwnProperty(brand)) {
                    storage[brand] = {};
                }

                if (!storage[brand].hasOwnProperty(coffee)) {
                    storage[brand][coffee] = { expDate, qty: +qty };
                } else {
                    if (storage[brand][coffee].expDate < expDate) {
                        storage[brand][coffee].expDate = expDate;
                        storage[brand][coffee].qty = +qty;
                    } else if (storage[brand][coffee].expDate === expDate) {
                        storage[brand][coffee].qty += +qty;
                    }
                }
            } else if (action === 'OUT') {
                if (storage.hasOwnProperty(brand)
                    && storage[brand].hasOwnProperty(coffee)
                    && storage[brand][coffee].expDate > expDate
                    && storage[brand][coffee].qty >= +qty) {
                    storage[brand][coffee].qty -= +qty;
                }
            }
        }
    }
}