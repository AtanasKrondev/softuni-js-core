function negativePositivePositions(arr) {
    let result = [];

    for (let el of arr) {
        if (el < 0) {
            result.unshift(el);
        } else {
            result.push(el);
        }
    }

    result.forEach(el => {
        console.log(el);
    });
}

negativePositivePositions([7, -2, 8, 9]);