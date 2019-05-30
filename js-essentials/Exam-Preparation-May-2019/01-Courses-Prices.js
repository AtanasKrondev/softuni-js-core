function coursesPrices(fundamentals, advanced, applications, form) {
    let fundamentalsPrice = 170;
    let advancedPrice = 180;
    let applicationsPrice = 190;

    if (fundamentals && advanced) {
        advancedPrice -= advancedPrice * 0.1;
    }
    let totalPrice = 0;

    if (fundamentals) {
        totalPrice += fundamentalsPrice;
    }
    if (advanced) {
        totalPrice += advancedPrice;
    }
    if (applications) {
        totalPrice += applicationsPrice;
    }

    if (fundamentals && advanced && applications) {
        totalPrice -= totalPrice * 0.06;
    }

    if (form === 'online') {
        totalPrice -= totalPrice * 0.06;
    }

    console.log(Math.round(totalPrice));
}

coursesPrices(true, false, false, "onsite");
coursesPrices(true, false, false, "online");
coursesPrices(true, true, false, "onsite");