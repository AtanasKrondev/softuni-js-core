function spiralMatrix(rows, cols) {
    let matrix = [];
    for (let row = 0; row < rows; row++) {
        matrix[row] = [];
        for (let col = 0; col < cols; col++) {
            matrix[row][col] = 0;
        }
    }

    let counter = 1;
    let row = 0;
    let col = 0;
    let direction = 'right';
    let start = 0;

    for (let i = 0; i < rows * cols; i++) {
        matrix[row][col] = counter;
        counter++;

        if (direction === 'right') {
            if (col + 1 >= cols || matrix[row][col + 1] !== 0) {
                direction = 'down';
                row++;
            }
            else {
                col++;
            }
        } else if (direction == 'down') {
            if (row + 1 >= rows || matrix[row + 1][col] !== 0) {
                direction = 'left';
                col--;
            } else {
                row++;
            }

        } else if (direction === 'left') {
            if (col - 1 < 0 || matrix[row][col - 1] !== 0) {
                direction = 'up';
                row--;
            } else {
                col--;
            }
        } else if (direction === 'up') {
            if (row - 1 < 0 || matrix[row - 1][col] !== 0) {
                direction = 'right';
                col++;
            } else {
                row--;
            }
        }
    }

    matrix.forEach(row => console.log(row.join(' ')));
}

spiralMatrix(5, 5);