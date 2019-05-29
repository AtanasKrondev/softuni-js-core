function solve() {
    let word = document.getElementById('word').value;
    let text = document.getElementById('text').value;
    let button = document.querySelector('input[type="button"]');
    let result = document.getElementById('result');

    button.addEventListener('click', replace(word, text));

    function replace(word, text) {
        let arr = JSON.parse(text);
        let toReplace = new RegExp(arr[0].split(' ')[2].toLowerCase(), 'i');

        arr.forEach(e => {
            let p = document.createElement('p');
            p.textContent = e.replace(toReplace, word);
            result.appendChild(p);
        });
    }
}