function plasmaGiants(arr, n) {
    let firstArr = arr.slice(0, arr.length / 2);
    let secondArr = arr.slice(arr.length / 2, arr.length);

    let firstMatrix = createMatrix(firstArr, n);
    let secondMatrix = createMatrix(secondArr, n);

    let firstGiant = buildGiant(firstMatrix);
    let secondGiant = buildGiant(secondMatrix);

    let hit = Math.min(...arr);
    let fatalHealth = Math.max(...arr);
    let rounds = 1;

    if (hit !== 0) {
        while (firstGiant > fatalHealth && secondGiant > fatalHealth) {
            firstGiant -= hit;
            secondGiant -= hit;
            rounds++;
        }
    }

    if (firstGiant > secondGiant) {
        console.log(`First Giant defeated Second Giant with result ${firstGiant} - ${secondGiant} in ${rounds} rounds`);
    } else if (secondGiant > firstGiant) {
        console.log(`Second Giant defeated First Giant with result ${secondGiant} - ${firstGiant} in ${rounds} rounds`);
    } else if (firstGiant === secondGiant) {
        console.log(`Its a draw ${firstGiant} - ${secondGiant}`);
    }
    
    function createMatrix(arr, n) {
        if (n === 0) {
            return [];
        } else {
            let matrix = [[]];
            for (const el of arr) {
                if (matrix[matrix.length - 1].length === n) {
                    matrix.push([]);
                }
                matrix[matrix.length - 1].push(el);
            }
            return matrix;
        }
    }

    function buildGiant(arr) {
        let product = 0;
        arr.forEach(element => {
            product += element.reduce((a, b) => a * b);
        });
        return product;
    }
}

plasmaGiants([3, 3, 3, 4, 5, 6, 7, 8, 9, 10, 5, 4], 2);
plasmaGiants([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], 2);