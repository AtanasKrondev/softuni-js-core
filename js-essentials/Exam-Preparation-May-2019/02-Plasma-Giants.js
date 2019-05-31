function plasmaGiants(arr, n) {
    let firstArr = arr.slice(0, arr.length / 2);
    let secondArr = arr.slice(arr.length / 2, arr.length);

    let firstGiant = createGiant(firstArr, n);
    let secondGiant = createGiant(secondArr, n);

    let hit = Math.min(...arr);
    let minHealth = Math.max(...arr);
    let rounds = 1;

    while (firstGiant > minHealth && secondGiant > minHealth) {
        rounds++;
        firstGiant -= hit;
        secondGiant -= hit;
    }

    if (firstGiant > secondGiant) {
        console.log(`First Giant defeated Second Giant with result ${firstGiant} - ${secondGiant} in ${rounds} rounds`);
    } else if (secondGiant > firstGiant) {
        console.log(`Second Giant defeated First Giant with result ${secondGiant} - ${firstGiant} in ${rounds} rounds`);
    } else if (firstGiant === secondGiant) {
        console.log(`Its a draw ${firstGiant} - ${secondGiant}`);

    }


    function createGiant(arr, n) {
        let matrix = [[]];
        let counter = 0;
        for (let el of arr) {
            if (counter === n) {
                matrix.push([]);
                counter = 0;
            }
            matrix[matrix.length - 1].push(el);
            counter++;
        }

        let product = []

        matrix.forEach(e => {
            product.push(e.reduce((a, b) => a * b));
        })

        return product.reduce((a, b) => a + b);
    }
}

plasmaGiants([3, 3, 3, 4, 5, 6, 7, 8, 9, 10, 5, 4], 2);
plasmaGiants([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], 2);