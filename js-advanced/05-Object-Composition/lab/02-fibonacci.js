function getFibonator() {
    let sum = 0;
    let first = 0;
    let second = 1;
    return function () {
        sum = first + second;
        first = second;
        second = sum;
        return first;
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
