function solve() {
    let arr = JSON.parse(document.getElementById('arr').value);
    let button = document.querySelector('input[type="button"]');
    let result = document.getElementById('result');
    let regex = /^([A-Z][a-z]* [A-Z][a-z]*) (\+359 \d \d{3} \d{3}|\+359-\d-\d{3}-\d{3}) ([a-z0-9]+@[a-z]+\.[a-z]{2,3})$/g;

    button.addEventListener('click', extract(arr));

    function extract(arr) {
        arr.forEach(e => {
            let match = regex.exec(e);
            if (match) {
                appendParagraph(`Name: ${match[1]}`);
                appendParagraph(`Phone Number: ${match[2]}`);
                appendParagraph(`Email: ${match[3]}`);
            } else {
                appendParagraph('Invalid data');
            }
            appendParagraph('- - -');
        });
    }

    function appendParagraph(text) {
        let p = document.createElement('p');
        p.textContent = text;
        result.appendChild(p);
    }
}