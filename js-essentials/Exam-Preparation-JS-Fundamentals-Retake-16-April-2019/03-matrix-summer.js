function matrixSummer(first, second) {
    let sum = [];

    for (let row = 0; row < first.length; row++) {
        let reminder = 0;
        sum.push([]);
        for (let col = 0; col < first[row].length; col++) {
            let sumCell = first[row][col] + second[row][col] + reminder;
            if (sumCell <= 9) {
                sum[row][col] = sumCell;
            } else if (sumCell > 9) {
                sum[row][col] = 9;
            }
            reminder = sumCell - sum[row][col];
        }

        while (reminder > 9) {
            sum[row].push(9);
            reminder -= 9;
        }
        if (reminder > 0) {
            sum[row].push(reminder);
        }
    }

    console.log(JSON.stringify(sum));
}

// matrixSummer([[1, 2, 3], [3, 4, 5], [5, 6, 7]],
//     [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
// matrixSummer([[9, 2, 3], [4, 5, 6], [7, 8, 8]],
//     [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
matrixSummer([[9, 9, 9], [4, 7, 9]],
    [[9, 9, 9], [1, 2, 9]]);