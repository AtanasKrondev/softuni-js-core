function solve(n, k) {
    let arr = [1];

    for (let i = 1; i < n; i++) {
        let nextNum = 0;

        for (let j = Math.max(i - k, 0); j < i; j++) {
            nextNum += arr[j];
        }

        arr.push(nextNum);
    }

    console.log(arr.join(' '));
}

solve(8, 2);