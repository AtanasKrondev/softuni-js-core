function solve() {
    let input = document.getElementById('input').value;
    let button = document.getElementsByTagName('button')[0];
    let result = document.getElementById('resultOutput');
    let resultBox = document.getElementsByClassName('boxes')[0];

    let decoded = '';
    let weightNum = input.split('').reduce((a, b) => +a + +b);
    let weightStr = weightNum.toString();

    while (weightStr.length > 1) {
        weightNum = 0;
        for (let digit of weightStr) {
            weightNum += +digit;
        }
        weightStr = weightNum.toString();
    }

    input = input.slice(weightNum);
    input = input.substring(0, input.length - weightNum);

    let arr = input.match(/.{1,8}/g);
    arr.forEach(e => {
        let c = String.fromCharCode(parseInt(e, 2))
        if (/[A-Za-z ]+/g.test(c)) {
            decoded += c;
        }
    });

    let validChars = decoded.split('').filter(c => /[A-Za-z ]+/g.test(c))

    resultBox.style.display = 'flex';
    result.textContent = decoded;
}