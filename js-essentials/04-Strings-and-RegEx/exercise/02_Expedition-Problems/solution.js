function solve() {
    let string = document.getElementById('string').value;
    let text = document.getElementById('text').value;
    let result = document.getElementById('result');
    let regex = /(east|north).*?([0-9]{2})[^,]*?,[^,]*?([0-9]{6})/;
    let coordinates = []

    let matches = text.match(new RegExp(regex, 'gi')).forEach(e => {
        let match = new RegExp(regex, 'i').exec(e);
        coordinates.push(`${match[2]}.${match[3]} ${match[1][0].toUpperCase()}`);
    });

    let north = '';
    let east = '';

    for (let el of coordinates) {
        if (el.includes('N')) {
            north = el;
        } else if (el.includes('E')) {
            east = el;
        }
    }

    let message = text.split(string).splice(1, 1);

    appendP(north);
    appendP(east);
    appendP(`Message: ${message}`);

    function appendP(str) {
        let p = document.createElement('p');
        p.textContent = str;
        result.appendChild(p);
    }
}