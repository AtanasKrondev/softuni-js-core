function evenPositions(arr) {
    evens = [];

    for (let i = 0; i < arr.length; i += 2) {
        evens.push(arr[i]);
    }

    console.log(evens.join(' '));
}

evenPositions(['20', '30', '40']);