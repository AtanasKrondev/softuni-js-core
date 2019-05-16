function circleArea(r) {
    if (typeof (r) === 'number') {
        console.log((r ** 2 * Math.PI).toFixed(2));
    } else {
        console.log(`We can not calculate the circle area, because we receive a ${typeof (r)}.`);
    }
}

circleArea(true);