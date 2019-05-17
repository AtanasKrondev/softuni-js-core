function coffeeMachine(input) {
    let income = 0;

    for (let inputRow of input) {
        let order = inputRow.split(', ');
        let sugar = +order.pop();
        let coins = +order.shift();
        let drink = order.shift();
        let typeOfCoffee = ''
        if (drink === 'coffee') {
            typeOfCoffee = order.shift();
        }
        let gotMilk = order.includes('milk');
        let price = 0;

        if (drink === 'coffee') {
            if (typeOfCoffee === 'caffeine') {
                price = 0.8
            } else {
                price = 0.9;
            }
        } else {
            price = 0.8;
        }

        if (gotMilk) {
            price = +((price * 1.1).toFixed(1));
        }

        if (sugar !== 0) {
            price += 0.1;
        }

        if (coins < price) {
            console.log(`Not enough money for ${drink}. Need $${(price - coins).toFixed(2)} more.`);
        } else {
            console.log(`You ordered ${drink}. Price: $${price.toFixed(2)} Change: $${(coins - price).toFixed(2)}`);
            income += price;
        }
    }

    console.log(`Income Report: $${income.toFixed(2)}`);

}

coffeeMachine(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2', '1.00, coffee, decaf, 0']);