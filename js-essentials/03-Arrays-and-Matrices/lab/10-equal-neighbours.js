function solve(matrix) {
    let result = 0;

    for (let row = 1; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === matrix[row - 1][col]) {
                result++;
            }
        }
    }
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 1; col < matrix[row].length; col++) {
            if (matrix[row][col] === matrix[row][col - 1]) {
                result++;
            }
        }
    }

    console.log(result);
}

solve([['test', 'yes', 'yo', 'ho'],
['well', 'done', 'yo', '6'],
['not', 'done', 'yet', '5']]);