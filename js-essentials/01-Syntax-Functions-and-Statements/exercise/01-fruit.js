function fruit(fruit, quantity, pricePerKg) {
    let kgs = quantity / 1000;
    let money = kgs * pricePerKg;
    console.log(`I need $${money.toFixed(2)} to buy ${kgs.toFixed(2)} kilograms ${fruit}.`);

}

fruit('orange', 2500, 1.80);