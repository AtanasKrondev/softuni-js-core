function diagonalAttack(arrayOfStrings) {
    let matrix = arrayOfStrings.map(e => e.split(' ').map(Number));
    let firstDiagonal = 0;
    let secondDiagonal = 0;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (row === col) {
                firstDiagonal += matrix[row][col];
            }
            if (row + col === matrix.length - 1) {
                secondDiagonal += matrix[row][col];
            }
        }

    }

    if (firstDiagonal === secondDiagonal) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (row === col || row + col == matrix.length - 1) {
                    continue;
                } else {
                    matrix[row][col] = firstDiagonal;
                }
            }
        }
    }

    matrix.forEach(row => console.log(row.join(' ')));
}

diagonalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);