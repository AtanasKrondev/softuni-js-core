function coffeeMachine(input) {
    let income = 0;

    for (let element of input) {
        let order = element.split(', ');
        let credit = +order.shift();
        let drink = order.shift();
        let sugar = +order.pop();
        let price = 0;

        if (drink === 'coffee') {
            let caffeineOrDecaf = order.shift();
            if (caffeineOrDecaf === 'caffeine') {
                price = 0.8;
            } else if (caffeineOrDecaf === 'decaf') {
                price = 0.9;
            }
        } else if (drink === 'tea') {
            price = 0.8;
        }

        if (order.length === 1) {
            price += price * 0.1;
            price = +price.toFixed(1);
        }

        if (sugar > 0) {
            price += 0.1;
        }

        if (price <= credit) {
            console.log(`You ordered ${drink}. Price: ${price.toFixed(2)}$ Change: ${(credit - price).toFixed(2)}$`);
            income += price;
        } else {
            console.log(`Not enough money for ${drink}. Need ${(price - credit).toFixed(2)}$ more.`);
        }
    }

    console.log(`Income Report: ${income.toFixed(2)}$`);
}

coffeeMachine(['1.00, coffee, caffeine, milk, 4', '0.40, tea, milk, 2',
    '1.00, coffee, decaf, 0']);
coffeeMachine(['8.00, coffee, decaf, 4',
    '1.00, tea, 2']);