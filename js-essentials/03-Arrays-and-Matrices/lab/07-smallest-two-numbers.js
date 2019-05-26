function solve(arr) {
    let smallest = Math.min(...arr);
    arr.splice(arr.indexOf(smallest), 1);
    let secondSmallest = Math.min(...arr);
    console.log(`${smallest} ${secondSmallest}`);
}

solve([30, 15, 50, 5]);