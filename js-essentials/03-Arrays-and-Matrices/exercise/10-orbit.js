function orbit(input) {
    let [width, height, x, y] = input;
    let matrix = [];

    for (let row = 0; row < width; row++) {
        matrix.push([]);
        for (let col = 0; col < height; col++) {
            matrix[row].push(0);
        }
    }

    matrix[x][y] = 1;

    let orbitDigit = 2;
    let orbitXstart = x - 1;
    let orbitXend = x + 1;
    let orbitYstart = y - 1;
    let orbitYend = y + 1;

    while (orbitDigit <= Math.max(width, height)) {
        for (let row = Math.max(orbitXstart, 0); row <= Math.min(orbitXend, width - 1); row++) {
            for (let col = Math.max(orbitYstart, 0); col <= Math.min(orbitYend, height - 1); col++) {
                if (matrix[row][col] === 0) {
                    matrix[row][col] = orbitDigit;
                }
            }
        }
        orbitDigit++;
        orbitXstart--;
        orbitXend++;
        orbitYstart--;
        orbitYend++;
    }

    matrix.forEach(e => console.log(e.join(' ')));
}

orbit([4, 4, 0, 0])