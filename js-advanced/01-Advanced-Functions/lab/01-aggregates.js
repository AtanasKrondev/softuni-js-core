function aggregates(arr) {
    console.log(`Sum = ${arr.reduce((a, b) => a + b, 0)}`);
    console.log(`Min = ${arr.reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER)}`);
    console.log(`Max = ${arr.reduce((a, b) => Math.max(a, b), Number.MIN_SAFE_INTEGER)}`);
    console.log(`Product = ${arr.reduce((a, b) => a * b, 1)}`);
    console.log(`Product = ${arr.reduce((a, b) => `${a}${b}`, '')}`);

}

aggregates([5, -3, 20, 7, 0.5]);