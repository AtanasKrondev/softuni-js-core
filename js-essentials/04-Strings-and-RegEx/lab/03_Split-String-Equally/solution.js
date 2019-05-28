function solve() {
    let input = document.getElementById('text').value;
    let n = +document.getElementById('number').value;
    let button = document.querySelector('input[type="button"]');

    button.addEventListener('click', splitString(input, n))

    function splitString(input, n) {
        let result = [''];
        let counter = 1;
        for (let char of input) {
            result[result.length - 1] += char;
            if (counter === n) {
                result.push('');
                counter = 0;
            }
            counter++;
        }

        result = result.filter(e => e !== '');

        let charsToFill = n - result[result.length - 1].length;

        for (let i = 0; i < charsToFill; i++) {
            result[result.length - 1] += input[i]
        }

        document.getElementById('result').textContent = result.join(' ');
    }
}