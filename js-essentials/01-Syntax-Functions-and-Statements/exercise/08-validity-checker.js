function validityCheck(input) {
    let [x1, y1, x2, y2] = input;
    checker(x1, y1, 0, 0);
    checker(x2, y2, 0, 0);
    checker(x1, y1, x2, y2);

    function checker(x1, y1, x2, y2) {
        let isInteger = Number.isInteger(Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)));
        if (isInteger) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        } else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }
}

validityCheck([2, 1, 1, 1]);
