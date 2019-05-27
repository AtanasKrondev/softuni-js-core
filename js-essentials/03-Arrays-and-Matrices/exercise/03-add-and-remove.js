function addAndRemove(arrOfCommands) {
    let arrOfNumbers = [];
    let number = 1;

    for (let i = 0; i < arrOfCommands.length; i++) {
        let command = arrOfCommands[i];
        switch (command) {
            case 'add':
                arrOfNumbers.push(number);
                break;
            case 'remove':
                arrOfNumbers.pop();
                break;
        }
        number++
    }

    if (arrOfNumbers.length > 0) {
        console.log(arrOfNumbers.join('\n'));
    } else {
        console.log('Empty');
    }
}

addAndRemove(['remove',
    'remove',
    'remove'])