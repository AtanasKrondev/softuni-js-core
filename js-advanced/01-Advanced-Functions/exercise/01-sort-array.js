function sortArray(arr, sorting) {
    if (sorting === 'asc') {
        return arr.sort((a, b) => a - b);
    } else if (sorting === 'desc') {
        return arr.sort((a, b) => b - a);
    }
}

console.log(sortArray([14, 7, 17, 6, 8], 'desc'));
