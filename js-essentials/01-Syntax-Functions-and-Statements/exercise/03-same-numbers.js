function sameNumbers(input) {
    let areSame = true;
    let sum = 0;
    let arr = input.toString()
        .split('');

    arr.forEach(el => {
        if (el !== arr[0]) {
            areSame = false;
        }
        sum += +el;
    });

    console.log(areSame);
    console.log(sum);
}

sameNumbers(1234);