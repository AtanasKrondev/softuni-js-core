function solve() {
  let input = document.getElementById('text').value;
  let button = document.querySelector('input[type="button"]');

  button.addEventListener('click', convertToAscii(input));

  function convertToAscii(input) {
    let split = input.split(' ').filter(e => e !== '');
    let word = '';
    let result = document.getElementById('result');
    for (let element of split) {
      if (Number(element)) {
        word += String.fromCharCode(element);
      } else {
        let wordsToAscii = [];

        for (let letter of element) {
          wordsToAscii.push(letter.charCodeAt(0));
        }
        let p = document.createElement('p');
        p.textContent = wordsToAscii.join(' ');
        result.appendChild(p);
      }
    }

    let p = document.createElement('p');
    p.textContent = word;
    result.appendChild(p);
  }
}