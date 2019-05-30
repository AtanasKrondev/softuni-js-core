function solve() {
    let [key, ...textInput] = JSON.parse(document.getElementById('array').value);
    let result = document.getElementById('result');
    let splitByKey = new RegExp(`(?<= |^)${key}`, 'i');
    let encodingPattern = /^ +[A-Z!%$#]{8,}(?= |\.|\,)/;

    for (let text of textInput) {
        let textArr = text.split(splitByKey);
        let matchesArr = [];

        for (let i = 1; i < textArr.length; i++) {
            if (textArr[i].match(encodingPattern) !== null) {
                matchesArr.push(textArr[i].match(encodingPattern)[0]);
            }
        }

        let resultText = text;

        matchesArr.forEach(e => {
            let substitute = e
                .toLowerCase()
                .replace(/!/g, '1')
                .replace(/%/g, '2')
                .replace(/\#/g, '3')
                .replace(/\$/g, '4')
            resultText = resultText.replace(e, substitute);
        })

        appendP(resultText)
    }

    function appendP(str) {
        let p = document.createElement('p');
        p.textContent = str;
        result.appendChild(p);
    }
}
