function solve(arr) {
    let k = arr.shift();
    let first = [];
    let last = [];

    for (let i = 0; i < k; i++) {
        first.push(arr[i]);
    }

    for (let i = arr.length - k; i < arr.length; i++) {
        last.push(arr[i]);
    }

    console.log(first.join(' '));
    console.log(last.join(' '));    
}

solve([2, 7, 8, 9]);