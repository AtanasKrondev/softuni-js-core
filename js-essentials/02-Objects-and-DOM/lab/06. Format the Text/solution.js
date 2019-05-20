function solve() {
  let text = document.getElementById('input').textContent
    .split('.')
    .filter(e => e.length > 0)
    .map(e => e + '.');

  let output = document.getElementById('output');

  let textArray = [];

  for (let i = 0; i < text.length; i++) {
    if (i % 3 === 0) {
      textArray.push([text[i]])
    } else {
      textArray[textArray.length - 1].push(text[i]);
    }
  }

  for (let sentence of textArray) {
    let p = document.createElement('p');
    p.textContent = sentence.join(' ');
    output.appendChild(p);
  }
}