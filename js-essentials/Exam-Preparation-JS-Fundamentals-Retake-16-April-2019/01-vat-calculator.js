function vatCalc(price, vatRate) {
    console.log((price / (1 + (vatRate / 100))).toFixed(2));
}

vatCalc(120.00, 20.00);
vatCalc(220.00, 10.00);