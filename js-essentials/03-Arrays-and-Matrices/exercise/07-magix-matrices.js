function doMagic(matrix) {
    let magic = true;
    let rowSum = 0;

    for (let row = 0; row < matrix.length; row++) {
        let currRowSum = 0;
        for (let col = 0; col < matrix[row].length; col++) {
            currRowSum += matrix[row][col];
        }

        if (row === 0) {
            rowSum = currRowSum;
        } else if (rowSum !== currRowSum) {
            magic = false;
            break;
        }
    }

    for (let col = 0; col < matrix[0].length; col++) {
        let colSum = 0;
        for (let row = 0; row < matrix.length; row++) {
            colSum += matrix[row][col];
        }
        if (colSum!==rowSum) {
            magic = false;
            break;
        }
    }

    console.log(magic);
}

doMagic([1, 2]);