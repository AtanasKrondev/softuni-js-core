function solve(matrix) {
    let leftToRight = 0;
    let rightToLeft = 0;

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (row === col) {
                leftToRight += matrix[row][col];
            }

            if (row + col === matrix.length - 1) {
                rightToLeft += matrix[row][col];
            }
        }
    }

    console.log(`${leftToRight} ${rightToLeft}`);
}

solve([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]])