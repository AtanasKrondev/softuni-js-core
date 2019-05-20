function countWords(input) {
    let countObj = {};
    let foundWords;
    let regEx = /\w+/g;
    // let wordsArr = input.match(/\w+/g);

    while ((foundWords = regEx.exec(input)) !== null) {
        if (!countObj.hasOwnProperty(foundWords[0])) {
            countObj[foundWords[0]] = 0;
        }
        countObj[foundWords[0]]++;
    }

    console.log(JSON.stringify(countObj));
}

countWords('JS devs use Node.js for server-side JS.-- JS for devs');