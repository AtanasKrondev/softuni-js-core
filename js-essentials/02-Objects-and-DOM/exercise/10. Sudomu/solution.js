function solve() {
    let rowsLength = document.querySelectorAll('tbody tr').length;
    let cells = Array.from(document.querySelectorAll('tbody td'));
    let table = document.getElementsByTagName('table')[0];
    let checkResult = document.querySelector('#check p');
    let quickCheck = document.getElementsByTagName('button')[0];
    let clearBtn = document.getElementsByTagName('button')[1];

    quickCheck.addEventListener('click', check);
    clearBtn.addEventListener('click', clear);

    function check() {
        let hasValidInput = true;
        let digitsArray = [];

        for (let cell of cells) {
            let digit = Number(cell.children[0].value);

            if (digit < 1 || digit > rowsLength) {
                hasValidInput = false;
                notYetMessage()
                break;
            } else {
                digitsArray.push(digit);
            }
        }

        console.log(`Valid input: ${hasValidInput}`);

        if (hasValidInput) {
            let matrix = fillMatrix(digitsArray);
            let areRowsSolved = true;

            for (let row of matrix) {
                areRowsSolved = checkArrayUnique(row);
                if (!areRowsSolved) {
                    notYetMessage()
                    break;
                }
            }

            console.log(`Solved rows: ${areRowsSolved}`);

            if (areRowsSolved) {
                let areColsSolved = true;

                for (let i = 0; i < rowsLength; i++) {
                    let colArray = [];
                    for (let j = 0; j < rowsLength; j++) {
                        colArray.push((matrix[j][i]));
                    }

                    areColsSolved = checkArrayUnique(colArray);

                    if (!areColsSolved) {
                        notYetMessage()
                        break;
                    }
                }

                console.log(`Solved cols: ${areColsSolved}`);

                if (areColsSolved) {
                    solveMessage();
                }
            }
        }

        console.log('End of event');
    }

    function fillMatrix(arr) {
        let matrix = [];
        let i = 0;
        for (let row = 0; row < rowsLength; row++) {
            matrix.push([]);
            for (let col = 0; col < rowsLength; col++) {
                matrix[row].push(arr[i]);
                i++;
            }
        }

        return matrix;
    }

    function clear() {
        for (let cell of cells) {
            cell.children[0].value = '';
        }
        table.style.border = '';
        checkResult.style.color = '';
        checkResult.textContent = '';
    }

    function checkArrayUnique(arr) {
        return (new Set(arr)).size === arr.length;
    }

    function solveMessage() {
        table.style.border = '2px solid green';
        checkResult.style.color = 'green';
        checkResult.textContent = 'You solve it! Congratulations!';
    }

    function notYetMessage() {
        table.style.border = '2px solid red';
        checkResult.style.color = 'red';
        checkResult.textContent = 'NOP! You are not done yet...';
    }
}