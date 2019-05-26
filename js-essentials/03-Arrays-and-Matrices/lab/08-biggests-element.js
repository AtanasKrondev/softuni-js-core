function solve(matrix) {
    let max = Number.MIN_SAFE_INTEGER;
    for (const row of matrix) {
        if (Math.max(...row) > max) {
            max = Math.max(...row);
        }
    }
    console.log(max);
}

solve([[3, 5, 7, 12],
[-1, 4, 33, 2],
[8, 3, 0, 4]]);