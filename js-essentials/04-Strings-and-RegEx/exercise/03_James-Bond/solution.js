function solve() {
    let [key, text] = JSON.parse(document.getElementById('array').value);
    let result = document.getElementById('result');

    

    function appendP(str) {
        let p = document.createElement('p');
        p.textContent = str;
        result.appendChild(p);
    }
}
