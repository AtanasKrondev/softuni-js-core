function solve() {
    let [key, ...textInput] = JSON.parse(document.getElementById('array').value);
    let result = document.getElementById('result');

    let pattern = new RegExp(`(\\s|^)(${key}\\s+)([A-Z!#$%]{8,})(\\.|,|\\s|$)`, 'gi');

    for (let text of textInput) {
        let match = pattern.exec(text);

        while (match) {
            if (match[3] === match[3].toUpperCase()) {
                text = text.replace(match[0], match[1] + match[2] + decodeMessage(match[3]) + match[4])
            }

            match = pattern.exec(text);
        }

        appendP(text);
    }

    function appendP(str) {
        let p = document.createElement('p');
        p.textContent = str;
        result.appendChild(p);
    }

    function decodeMessage(str) {
        return str.toLowerCase()
            .replace(/!/g, '1')
            .replace(/%/g, '2')
            .replace(/\#/g, '3')
            .replace(/\$/g, '4')
    }
}
